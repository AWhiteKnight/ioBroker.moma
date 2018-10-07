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
  adapter.log.debug('M0-src: ' + JSON.stringify(src));
  if(typeof src !== 'object') {
    adapter.log.debug('M0-state: ' + tgtId + ' value: ' + src);
    adapter.setState(tgtId, {val: src, ack: true});      
  } else if(src.length != undefined) {
    adapter.log.debug('M0-array: ' + tgtId + ' value: ' + JSON.stringify(src));
    for(let i = 0; i < src.length; i++) {
      const element = src[i];
      if(element != undefined) {
        adapter.log.debug('C0-array: ' + i + ' value: ' + JSON.stringify(element));
        if(init) {
          helper.createArrayEntry(adapter, tgtId, i);        
        }
        showData(element, tgtId+'.'+i, init);
      }
    }
  } else {
    adapter.log.debug('M0-object: ' + tgtId + ' value: ' + JSON.stringify(src));
    for (const srcId1 in src) {
      const src1 = src[srcId1];
      const tgtId1 = tgtId+'.'+srcId1;
      adapter.log.debug('M1-srcId: ' + srcId1 + ' tgtId: ' + tgtId1);
      adapter.log.debug('M1-src: ' + JSON.stringify(src1));
      if(typeof src1 !== 'object') {
        adapter.log.debug('M1-state: ' + tgtId1 + ' value: ' + src1);
        adapter.setState(tgtId1, {val: src1, ack: true});      
      } else if(src1.length != undefined) {
        adapter.log.debug('M1-array: ' + tgtId1 + ' value: ' + src1);
        for(let i = 0; i < src1.length; i++) {
          const element1 = src1[i];
          if(element1 != undefined) {
            adapter.log.debug('C1-array: ' + i + ' value: ' + JSON.stringify(element1));
            if(init) {
              helper.createArrayEntry(adapter, tgtId1, i);        
            }
            showData(element1, tgtId1+'.'+i, init);
          }
        }
      } else {
        adapter.log.debug('M1-object: ' + tgtId1 + ' value: ' + JSON.stringify(src1));
        for (const srcId2 in src1) {
          const src2 = src1[srcId2];
          const tgtId2 = tgtId1+'.'+srcId2;
          adapter.log.debug('M2-srcId: ' + srcId2 + ' tgtId: ' + tgtId2);
          adapter.log.debug('M2-src: ' + JSON.stringify(src2));
          if(typeof src2 !== 'object') {
            adapter.log.debug('M2-state: ' + tgtId2 + ' value: ' + src2);
            adapter.setState(tgtId2, {val: src2, ack: true});      
          } else if(src2.length != undefined) {
            adapter.log.debug('M2-array: ' + tgtId2 + ' value: ' + src2);
            for(let i = 0; i < src2.length; i++) {
              const element2 = src2[i];
              if(element2 != undefined) {
                adapter.log.debug('C2-array: ' + i + ' value: ' + JSON.stringify(element2));
                if(init) {
                  helper.createArrayEntry(adapter, tgtId2, i);
                }
                showData(element2, tgtId2+'.'+i, init);
              }
            }
          } else {
            for (const srcId3 in src2) {
              const src3 = src2[srcId3];
              const tgtId3 = tgtId2+'.'+srcId3;
              adapter.log.debug('M3-srcId: ' + srcId3 + ' tgtId: ' + tgtId3);
              adapter.log.debug('M3-src: ' + JSON.stringify(src3));
            }
          }
        }
      }
    }
  }
}

function showDataOld(source, structure) {
  let description = defs.sysInfo[structure];
  adapter.log.debug('level 0: ' + structure + ' data: ' + source);
  for (const key1 in description) {
    adapter.log.debug('level 1: ' + key1);
    // if we have an array on level 1 maybe there is no name in source
    let description1 = description[key1];
    if(description1['array'] == "true") {
      // we have a nested array without name
      adapter.log.debug('array: ' + structure+'.'+key1 + ' length: ' + source.length + ' value: ' + source);
      if(init) {
        helper.createChannelEntries(adapter, source.length, structure+'.'+key1, description1['type'], description1['role']);
      }
      if(description1['type'] == "array") {
        // we have a nested nested array
        adapter.log.error('nested array in nested array in ' + structure);
      } else if(description1['type'] == "object") {
        const element1 = source[key1];
        for (const key2 in element1) {
          adapter.log.debug('level 2: ' + key2);
          const element2 = element1[key2];
          adapter.log.debug('state: ' + structure+'.'+key1+'.'+key2 + ' value: ' + element2);
          adapter.setState(structure+'.'+key1+'.'+key2, {val: element2, ack: true});      
        }
      } else {
        const element1 = source[key1];
        adapter.log.debug('state: ' + structure+'.'+key1 + ' value: ' + element1);
        adapter.setState(structure+'.'+key1, {val: element1, ack: true});
      }
    } else if (source.hasOwnProperty(key1)) {
      const element1 = source[key1];
      if(description1['array'] == "true") {
        // we have a nested array
        adapter.log.debug('array: ' + structure+'.'+key1 + ' length: ' + element1.length + ' value: ' + element1);
        if(init) {
          helper.createChannelEntries(adapter, element1.length, structure+'.'+key1, description1['type'], description1['role']);
        }
        for (const key2 in element1) {
          adapter.log.debug('level 2: ' + key2);
          const element2 = element1[key2];
          adapter.log.debug('state: ' + structure+'.'+key1+'.'+key2 + ' value: ' + element2);
          adapter.setState(structure+'.'+key1+'.'+key2, {val: element2, ack: true});      
        }
      } else if(typeof element1 == 'object') {
        // we have a nested structure-object
        for (const key2 in element1) {
          adapter.log.debug('level 2: ' + key2);
          const element2 = element1[key2];
          if(element2['array'] == "true") {
            // we have a nested nested array
            adapter.log.error('nested array in nested object in ' + structure);
          } else if(typeof element2 == 'object') {
            // we have a nested nested structure-object
            adapter.log.error('nested object in nested object in ' + structure);
          } else {
            adapter.log.debug('state: ' + structure+'.'+key1+'.'+key2 + ' value: ' + element2);
            adapter.setState(structure+'.'+key1+'.'+key2, {val: element2, ack: true});      
          }
        }
      } else if(element1) {
        adapter.log.debug('state: ' + structure+'.'+key1 + ' value: ' + element1);
        adapter.setState(structure+'.'+key1, {val: element1, ack: true});
      }
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

