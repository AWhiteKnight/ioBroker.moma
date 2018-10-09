'use strict';

// needed for all
const defs = require('./definitions');
const helper = require('./helper');
// remember the adapter on init()
let adapter = null;
// --------------------------------------------------------------------------------------------
// library systeminformation
// --------------------------------------------------------------------------------------------
const si = require('systeminformation');

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

// --------------------------------------------------------------------------------------------
// moma new stuff
// --------------------------------------------------------------------------------------------
// needs access to os information
const os = require('os');
// we read from file system
const fs = require('fs');
// we want to spawn commands
const cmd = require('child_process');

/*
 * structure containing all Info of this machineInfo
 */
const machine = {
  //  aix,darwin,freebsd,linux,openbsd,sunos,win32
  platform: os.platform(),
  // packageManager on Linux
  pkgMgr: undefined,
  // amount of updates: maintained by coding call function getListOfUpdates(false|true)
  numUpdates: 0,
};

/*
 * initialize module internal fields
 */
module.exports.init = (pAdapter) => {
  adapter = pAdapter;
  adapter.log.info('Version of systeminformation: ' + si.version());

  // create Entries moma.x.<hostname>.*
  helper.createMomaXEntries(adapter);
  // create Entries moma.<instanceId>.*
  helper.createMomaInstanceEntries(adapter);
  // set the instance in moma.x.<hostname>.instance
  adapter.setForeignState(defs.hostEntryInstance, {val: adapter.namespace, ack: true});

  // RedHat Package-Manager zypper
  fs.exists('/usr/bin/zypper', (exists) => {
    if(exists) {
      machine.pkgMgr = "zypper";
    } else {
      // Debian Package-Manager apt
      fs.exists('/usr/bin/apt', (exists) => {
        if(exists) {
          machine.pkgMgr = "apt";
        } else {
          // RedHat Package-Manager yum
          fs.exists('/usr/bin/yum', (exists) => {
            if(exists) {
              machine.pkgMgr = "yum";
            } else {
              // unknown
              machine.pkgMgr = null;
            } 
          });
        } 
      });
    } 
  });
  return;
}

module.exports.getNumUpdates = () => {
  return machine.numUpdates;
}

module.exports.checkUpdates = () => {
  //getListOfUpdates(false);
  adapter.setForeignState(defs.hostEntryUpdates, {val: machine.numUpdates, ack: true});
}

/*
 * fetches the list of updates available for the machine
 * parameter: log - if set to true, the full information will be returned, otherweise only package name
 * format: [package-info|package-info|...]
 */
function getListOfUpdates(long) {
  let list = [];
  switch(machine.platform) {
    case 'linux':
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
        // TODO:redhat packages with yum
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
    case 'win32':
      // TODO implement
      // win10 mit powershell
      if(machine.osversion[0] >= 10 ) {
        /* für die PowerShell unter win10:
        $UpdateSession = New-Object -ComObject Microsoft.Update.Session
        $UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
        $UpdateSearcher.ServerSelection = 3
        $UpdateSearcher.ServiceID = "7971F918-A847-4430-9279-4A52D1EFE18D"
        $WUPacks = @($UpdateSearcher.Search("IsHidden=0 and IsInstalled=0").Updates)
        */
      } else {
        /* no PowerShell */
        ;
      }
      break;
    default:
      break;
  }

  // maintain machine state
  machine.numUpdates = list.length;
  return list;
}

