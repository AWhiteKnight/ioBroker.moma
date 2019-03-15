// @ts-nocheck
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
  adapter.log.debug('version of systeminformation: ' + si.version());
  
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

  switch(machine.platform) {
    case 'linux':
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
      break;
    case 'darwin':
    case 'win32':
    default:
      machine.pkgMgr = null;
      break;
  }
}

module.exports.getNumUpdates = () => {
  return machine.numUpdates;
}

module.exports.checkUpdates = (init) => {
  if(adapter.config.updates) {
    getListOfUpdates();
  }
}

module.exports.update = () => {
  doUpdates();
}

module.exports.reboot = () => {
  return scheduleReboot();
}

async function maintainStates(list) {
  try {
    machine.numUpdates = list.length;
    if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
      adapter.log.info('Package-Manager not initialized!');
    } else if(machine.pkgMgr === "apt") {
      // we read from file system
      // check whether /var/run/reboot-required existiert
      if(require('fs').existsSync('/var/run/reboot-required')) {
        machine.needsReboot = true;
      } else {
        machine.needsReboot = false;
      }
    } else {
      machine.needsReboot = false;
    }

    // maintain states of this machine
    adapter.setForeignState(defs.hostEntryHasUpdates, {val: machine.numUpdates, ack: true});
    adapter.setForeignState(defs.hostEntryNeedsReboot, {val: machine.needsReboot, ack: true});
    adapter.setForeignState(defs.hostEntryListOfUpdates, {val: list, ack: true});

    // maintain global states hostNeedsReboot / hostNeedsUpdate properly regarding other machines
    let hostNeedsReboot = machine.needsReboot;
    let hostNeedsUpdate = (machine.numUpdates > 0);
    //fetch device
    adapter.getForeignObject(defs.hostsList, function(err, device) {
      if(err) {
        adapter.log.error(err);
      } else {
        if(device) {
          adapter.getForeignObjects(device._id+".*", 'channel', '', function(err, channels) {
            if(err) {
              adapter.log.error(err);
            } else {
              for (let i in channels) {
                adapter.getForeignObjects(channels[i]._id+".*", 'state', function(err, states) {
                  if(err) {
                   adapter.log.error(err);
                  } else {
                    for (let j in states) {
                      let stateid = states[j]._id.split('.').pop();
                      if(stateid == 'needsReboot') {
                        adapter.getForeignState(states[j]._id, function(err, state) {
                        if(err) {
                            adapter.log.error(err);
                        } else {
                          if(state.val == true) {
                            hostNeedsReboot = true;
                          }
                        }
                      });
                    } else if(stateid == 'numUpdates') {
                      adapter.getForeignState(states[j]._id, function(err, state) {
                        if(err) {
                          adapter.log.error(err);
                        } else {
                          if(state.val > 0) {
                            hostNeedsUpdate = true;
                          }
                        }
                       });
                      }
                    }
                  }
                });
              }
            }
          });
        }
      }
    }); 
    // set values
    adapter.setForeignState(defs.hostNeedsUpdate, {val: hostNeedsUpdate, ack: true});
    adapter.setForeignState(defs.hostNeedsReboot, {val: hostNeedsReboot, ack: true});
  } catch (error) {
    adapter.log.error('Error maintaining states / ' + error);
  }
}

/*
 * fetches the list of updates available for the machine
 * parameter: long - if set to true, the full information will be returned, otherweise only package name
 * format: [package-info|package-info|...]
 */
function getListOfUpdates() {

  if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
    adapter.log.debug('Package-Manager not initialized!');
    return;
  }
  adapter.log.debug('checking for updates');

  // we want to spawn commands
  const cmd = require('child_process');

  let list = [];
  switch(machine.platform) {
    case 'linux':
      // TODO implement for different package managers
      if(machine.pkgMgr === "apt") {
        // debian packages with apt 
        cmd.execSync('sudo apt update 2> /dev/null');
        let lines = cmd.execSync('sudo apt list --upgradeable 2> /dev/null').toString().split('\n');
        let k = 0;
        let pkg = '';
        for(let i = 0; i < lines.length; i++) {
          if(lines[i].length > 16) {
            pkg = lines[i].toString().split('/');
            if(pkg != undefined && pkg[0] != undefined) {
              list[k++] = pkg[0].trim();
            }
          }
        }
      } else if(machine.pkgMgr === "yum") {
        let lines = cmd.execSync('sudo yum check-update 2> /dev/null').toString().split('\n');
        let k = 0;
        // TODO: wie arbeitet yum
        let pkg = '';
        for(let i = 0; i < lines.length; i++) {
          pkg = lines[i].toString().split('|');
          if(pkg != undefined && pkg[1] != undefined) {
            list[k++] = pkg[1].trim();
          }
        }
      } else if(machine.pkgMgr === "zypper") {
        // redhat packages with zypper
        cmd.execSync('sudo zypper refresh');
        let lines = cmd.execSync('sudo zypper list-updates 2> /dev/null').toString().split('\n');
        let k = 0;
        let pkg = '';
        for(let i = 5; i < lines.length; i++) {
          pkg = lines[i].toString().split('|');
          if(pkg != undefined && pkg[2] != undefined) {
            list[k++] = pkg[2].trim();
          }
        }
      }
      break;
    case 'darwin':
    case 'win32':
    default:
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
  }
  // maintain machine state
  maintainStates(list);
}

/*
 * executes updates for the machine
 */
function doUpdates() {
  // we want to spawn commands
  const cmd = require('child_process');

  adapter.log.debug('Executing updates');

  switch(machine.platform) {
    case 'linux':
      if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
        adapter.log.debug('Package-Manager not initialized!');
        return;
      }
      // TODO implement for different package managers
      // TODO implement Auswertung von result
      let result = null;
      if(machine.pkgMgr === "apt") {
        // debian packages with apt 
        cmd.execSync('sudo apt update');
        result = cmd.execSync('sudo apt full-upgrade -y 2> /dev/null').toString().split('\n');
      } else if(machine.pkgMgr === "yum") {
        // TODO:redhat packages with yum / check for reboot: needs-restarting -r
        result = cmd.execSync('sudo yum update -y 2> /dev/null').toString().split('\n');
      } else if(machine.pkgMgr === "zypper") {
        // opennsuse packages with zypper
        cmd.execSync('zypper refresh');
        result = cmd.execSync('sudo zypper dup -y 2> /dev/null').toString().split('\n');
        // TODO check for reboot: needs-restarting -r or zypper ps -s
      }
      adapter.log.debug('update result: ' + result);
      // maintain machine state
      machine.numUpdates = 0;
      break;
    case 'darwin':
    case 'win32':
    default:
      adapter.log.info('Update-Manager not implemented for ' + machine.platform);
      break;
  }
  maintainStates([]);
}

/*
 * schedules reboot for the machine
 */
function scheduleReboot() {
  // we want to spawn commands
  const cmd = require('child_process');

  adapter.log.debug('Scheduling reboot');

  // TODO implement Auswertung von result
  switch(machine.platform) {
    case 'linux':
      let result = cmd.execSync('sudo shutdown -r 1 2> /dev/null').toString().split('\n');
      break;
    case 'darwin':
    case 'win32':
    default:
      adapter.log.info('Reboot not implemented for ' + machine.platform);
      break;
  }
}

function showData(src, tgtId, init) {
  const tgt = defs.sysInfo[tgtId];
  // state
  if(typeof src !== 'object') {
    adapter.setState(tgtId, {val: src, ack: true});
  // array
  } else if(src.length != undefined) {
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

module.exports.chassis = (init) => {
  if(adapter.config.chassis) {
    si.chassis(function(data) {
      showData(data, 'chassis', init);
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

module.exports.cpu = async (init) => {
  if(adapter.config.cpu) {
//    try {
//      const data = await si.cpu();
//      showData(data, 'cpu', init);  
//    } catch (e) {
//      adapter.log.debug(e);
//    }
    si.cpu(function(data) {
      showData(data, 'cpu', init);
    });
  }
}

module.exports.cpuFlags = (init) => {
  if(adapter.config.cpuFlags) {
//    try {
//      const data = await si.cpuFlags();
//      showData(data, 'cpuFlags', init);  
//    } catch (e) {
//      adapter.log.debug(e);
//    }
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

module.exports.uuid = (init) => {
  if(adapter.config.uuid) {
    si.uuid(function(data) {
      showData(data, 'uuid', init);
    });
  }
}

module.exports.shell = (init) => {
  if(adapter.config.shell) {
    si.shell(function(data) {
      showData(data, 'shell', init);
    });
  }
}

module.exports.versions = (init) => {
  if(adapter.config.versions) {
    si.versions(function(data) {
      showData(data, 'versions', init);
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
//      adapter.log.debug('Processes: ' + JSON.stringify(data));
      showData(data, 'processes');
    });
  }
}

