'use strict';

// needed for all
const defs = require(__dirname + '/definitions');
const helper = require(__dirname + '/helper');
// remember the adapter on init()
let adapter = null;
// --------------------------------------------------------------------------------------------
// library systeminformation
// --------------------------------------------------------------------------------------------
const si = require('systeminformation');

// --------------------------------------------------------------------------------------------
// moma stuff
// --------------------------------------------------------------------------------------------

/*
 * structure containing all Info of this machineInfo
 */
const machine = {
  //  aix,darwin,freebsd,linux,openbsd,sunos,win32
  platform: undefined,
  // packageManager on Linux
  pkgMgr: undefined,
  // amount of updates: maintained by coding call function getListOfUpdates(false|true)
  numUpdates: 0,
  // flag whether machine needs reboot: maintained by coding call function getListOfUpdates(false|true)
  needsReboot: false
};

/*
 * initialize module internal fields
 */
module.exports.init = (pAdapter) => {
  adapter = pAdapter;
  adapter.log.info('Version of systeminformation: ' + si.version());
  
  // create Entries moma.meta.<hostname>.*
  helper.createMomaMetaEntries(adapter);
  // create Entries moma.<instanceId>.*
  helper.createMomaInstanceEntries(adapter);
  // set the instance in moma.meta.<hostname>.instance
  adapter.setForeignState(defs.hostEntryInstance, {val: adapter.namespace, ack: true});

  // needs access to os information
  const os = require('os');
  // we read from file system
  const fs = require('fs');
  // init variables
  machine.platform =  os.platform();

  // RedHat Package-Manager zypper
  if(fs.existsSync('/usr/bin/zypper')) {
    machine.pkgMgr = "zypper";
  // Debian Package-Manager apt
  } else if (fs.existsSync('/usr/bin/apt')) {
    machine.pkgMgr = "apt";
  // RedHat Package-Manager yum
  } else if (fs.existsSync('/usr/bin/yum')) {
    machine.pkgMgr = "yum";
  // unknown
  } else {
    machine.pkgMgr = null;
  }
}

module.exports.getNumUpdates = () => {
  return machine.numUpdates;
}

module.exports.checkUpdates = (isInit) => {
  if(adapter.config.updates) {
    getListOfUpdates(false);
    adapter.setForeignState(defs.hostEntryHasUpdates, {val: machine.numUpdates, ack: true});
    adapter.setForeignState(defs.hostEntryNeedsReboot, {val: machine.needsReboot, ack: true});
    if(machine.numUpdates > 0) {
      adapter.setForeignState(defs.hostNeedsUpdate, {val: true, ack: true});
    }
    if(machine.needsReboot) {
      adapter.setForeignState(defs.hostNeedsReboot, {val: true, ack: true});
    }
  }
}

module.exports.update = () => {
  return doUpdates();
}

module.exports.reboot = () => {
  return scheduleReboot();
}

/*
 * fetches the list of updates available for the machine
 * parameter: log - if set to true, the full information will be returned, otherweise only package name
 * format: [package-info|package-info|...]
 */
function getListOfUpdates(long) {
  // we want to spawn commands
  const cmd = require('child_process');

  adapter.log.info('Checking for updates');

  let list = [];
  switch(machine.platform) {
    case 'linux':
      if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
        adapter.log.info('Package-Manager not initialized!');
        return;
      }
      // TODO implement for different package managers
      if(machine.pkgMgr === "apt") {
        // debian packages with apt 
        cmd.execSync('apt update');
        let lines = cmd.execSync('apt list --upgradeable 2> /dev/null').toString().split('\n');
        let k = 0;
        for(let i = 0; i < lines.length; i++) {
          if(lines[i].length > 16) {
            if(!long) {
              let pkg = lines[i].toString().split('/');
              list[k++] = pkg[0];
            } else {
              list[k++] = lines[i];
            }
          }
        }
      } else if(machine.pkgMgr === "yum") {
        let lines = cmd.execSync('yum check-update 2> /dev/null').toString().split('\n');
        let k = 0;
        // TODO: wie arbeitet yum
        for(let i = 0; i < lines.length; i++) {
          if(!long) {
            let pkg = lines[i].toString().split('|');
            list[k++] = pkg[1];
          } else {
            list[k++] = lines[i];
          }
        }
      } else if(machine.pkgMgr === "zypper") {
        // redhat packages with zypper
        cmd.execSync('zypper refresh');
        let lines = cmd.execSync('zypper list-updates 2> /dev/null').toString().split('\n');
        let k = 0;
        for(let i = 5; i < lines.length; i++) {
          if(!long) {
            let pkg = lines[i].toString().split('|');
            list[k++] = pkg[1];
          } else {
            list[k++] = lines[i];
          }
        }
      }
      break;
    case 'darwin':
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
    case 'win32':
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
    default:
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
  }

  // maintain machine state
  machine.numUpdates = list.length;
  return list;
}

/*
 * executes updates for the machine
 */
function doUpdates() {
  // we want to spawn commands
  const cmd = require('child_process');

  adapter.log.info('Executing updates');

  switch(machine.platform) {
    case 'linux':
      if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
        adapter.log.info('Package-Manager not initialized!');
        return;
      }
      // TODO implement for different package managers
      if(machine.pkgMgr === "apt") {
        // debian packages with apt 
        cmd.execSync('apt update');
        let result = cmd.execSync('apt full-upgrade -y 2> /dev/null').toString().split('\n');
      } else if(machine.pkgMgr === "yum") {
        // TODO:redhat packages with yum
        let result = cmd.execSync('yum update -y 2> /dev/null').toString().split('\n');
      } else if(machine.pkgMgr === "zypper") {
        // opennsuse packages with zypper
        cmd.execSync('zypper refresh');
        let result = cmd.execSync('zypper dup -y 2> /dev/null').toString().split('\n');
      }
      // TODO implement
      // maintain machine state
      machine.numUpdates = 0;
      machine.needsReboot = false;

      break;
    case 'darwin':
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
    case 'win32':
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
    default:
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
  }
}

/*
 * schedules reboot for the machine
 */
function scheduleReboot() {
  // we want to spawn commands
  const cmd = require('child_process');

  adapter.log.info('Scheduling reboot');

  switch(machine.platform) {
    case 'linux':
      // maintain machine state
      machine.numUpdates = 0;
      machine.needsReboot = false;
      let result = cmd.execSync('shutdown -r 1 2> /dev/null').toString().split('\n');
      break;
    case 'darwin':
      adapter.log.info('Reboot not implemented for ' + machine.platform);
      break;
    case 'win32':
      adapter.log.info('Reboot not implemented for ' + machine.platform);
      break;
    default:
      adapter.log.info('Reboot not implemented for ' + machine.platform);
      break;
  }
}

function showData(src, tgtId, init) {
  const tgt = defs.sysInfo[tgtId];
  //adapter.log.debug('showData() target: '  + tgtId + ' value ' + JSON.stringify(src));
  // state
  if(typeof src !== 'object') {
    //adapter.log.debug('showData() State');
    adapter.setState(tgtId, {val: src, ack: true});
  // array
  } else if(src.length != undefined) {
    //adapter.log.debug('showData() Array');
    for(let i = 0; i < src.length; i++) {
      const element = src[i];
      if(element != undefined) {
        if(init) {
          helper.createArrayEntry(adapter, tgtId, i);
        }
        showData(element, tgtId+'.'+i, init);
      }
    }
  // object
  } else {
    //adapter.log.debug('showData() Object');
    for (const key in src) {
      const element = src[key];
      showData(element, tgtId+'.'+key, init);
    }
  }
}

module.exports.time = (init) => {
  if(adapter.config.time) {
    let data = si.time();
    showData(data, 'time', init);
  }
}

module.exports.baseboard = (init) => {
  if(adapter.config.baseboard) {
    si.baseboard(function(data) {
      showData(data, 'baseboard', init);
    });
  }
}

module.exports.bios = (init) => {
  if(adapter.config.bios) {
    si.bios(function(data) {
      showData(data, 'bios', init);
    });
  }
}

module.exports.system = (init) => {
  if(adapter.config.system) {
    si.system(function(data) {
      showData(data, 'system', init);
    });
  }
}

module.exports.cpu = (init) => {
  if(adapter.config.cpu) {
    si.cpu(function(data) {
      showData(data, 'cpu', init);
    });
  }
}

module.exports.cpuFlags = (init) => {
  if(adapter.config.cpuFlags) {
    si.cpuFlags(function(data) {
      showData(data, 'cpuFlags', init);
    });
  }
}

module.exports.cpuCurrentSpeed = (init) => {
  if(adapter.config.cpuCurrentSpeed) {
    si.cpuCurrentspeed(function(data) {
      showData(data, 'cpuCurrentSpeed', init);
    });
  }
}

module.exports.cpuTemperature = (init) => {
  if(adapter.config.cpuTemperature) {
    si.cpuTemperature(function(data) {
      showData(data, 'cpuTemperature', init);
    });
  }
}

module.exports.mem = (init) => {
  if(adapter.config.mem) {
    si.mem(function(data) {
      showData(data, 'mem', init);
    });
  }
}

module.exports.memLayout = (init) => {
  if(adapter.config.memLayout) {
    si.memLayout(function(data) {
      showData(data, 'memLayout', init);
    });
  }
}

module.exports.diskLayout = (init) => {
  if(adapter.config.diskLayout) {
    si.diskLayout(function(data) {
      showData(data, 'diskLayout', init);
    });
  }
}

module.exports.battery = (init) => {
  if(adapter.config.battery) {
    si.battery(function(data) {
      showData(data, 'battery', init);
    });
  }
}

module.exports.graphics = (init) => {
  if(adapter.config.graphics) {
    si.graphics(function(data) {
      showData(data, 'graphics', init);
    });
  }
}

module.exports.osInfo = (init) => {
  if(adapter.config.osInfo) {
    si.osInfo(function(data) {
      showData(data, 'osInfo', init);
    });
  }
}

module.exports.users = (init) => {
  if(adapter.config.users) {
    si.users(function(data) {
      showData(data, 'users', init);
    });
  }
}

module.exports.fsSize = (init) => {
  if(adapter.config.fsSize) {
    si.fsSize(function(data) {
      showData(data, 'fsSize', init);
    });
  }
}

module.exports.blockDevices = (init) => {
  if(adapter.config.blockDevices) {
    si.blockDevices(function(data) {
      showData(data, 'blockDevices', init);
    });
  }
}

module.exports.fsStats = (init) => {
  if(adapter.config.fsStats) {
    si.fsStats(function(data) {
      showData(data, 'fsStats', init);
    });
  }
}

module.exports.disksIO = (init) => {
  if(adapter.config.disksIO) {
    si.disksIO(function(data) {
      showData(data, 'disksIO', init);
    });
  }
}

module.exports.networkInterfaces = (init) => {
  if(adapter.config.networkInterfaces) {
    si.networkInterfaces(function(data) {
      showData(data, 'networkInterfaces', init);
    });
  }
}  

module.exports.networkInterfaceDefault = (init) => {
  if(adapter.config.networkInterfaceDefault) {
    si.networkInterfaceDefault(function(data) {
      showData(data, 'networkInterfaceDefault', init);
    });
  }
}  

module.exports.networkStats = (init) => {
  if(adapter.config.networkStats) {
    si.networkStats(function(data) {
      showData(data, 'networkStats', init);
    });
  }
}

module.exports.networkConnections = (init) => {
  if(adapter.config.networkConnections) {
    si.networkStats(function(data) {
      showData(data, 'networkConnections', init);
    });
  }
}  

module.exports.currentLoad = (init) => {
  if(adapter.config.currentLoad) {
    si.currentLoad(function(data) {
      showData(data, 'currentLoad', init);
    });
  }
}

module.exports.fullLoad = (init) => {
  if(adapter.config.fullLoad) {
    si.fullLoad(function(data) {
      showData(data, 'fullLoad');
    });
  }
}

module.exports.processes = (init) => {
  if(adapter.config.processes) {
    si.processes(function(data) {
      showData(data, 'processes');
    });
  }
}

