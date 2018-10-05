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

function showData(source, structure, init) {
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
    if(init) {
      helper.createMomaEntry(adapter, 'time');
    }
    showData(data, 'time', init);
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'time');
    }
  }
}

module.exports.baseboard = (init) => {
  if(adapter.config.baseboard) {
    if(init) {
      helper.createMomaEntry(adapter, 'baseboard');
    }
    si.baseboard(function(data) {
      showData(data, 'baseboard', init);
    });
} else {
    if(init) {
      helper.removeMomaEntry(adapter, 'baseboard');
    }
  }
}

module.exports.bios = (init) => {
  if(adapter.config.bios) {
    if(init) {
      helper.createMomaEntry(adapter, 'bios');
    }
    si.bios(function(data) {
      showData(data, 'bios', init);
    });
} else {
    if(init) {
      helper.removeMomaEntry(adapter, 'bios');
    }
  }
}

module.exports.system = (init) => {
  if(adapter.config.system) {
    if(init) {
      helper.createMomaEntry(adapter, 'system');
    }
    si.system(function(data) {
      showData(data, 'system', init);
    });
} else {
    if(init) {
      helper.removeMomaEntry(adapter, 'system');
    }
  }
}

module.exports.cpu = (init) => {
  if(adapter.config.cpu) {
    if(init) {
      helper.createMomaEntry(adapter, 'cpu');
      si.cpu(function(data) {
        si.cpuFlags(function(data2) {
          data['flags'] = data2;
          showData(data, 'cpu', init);
        });
      });
    }
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cpu');
    }
  }
}

module.exports.cpuCurrentSpeed = (init) => {
  if(adapter.config.cpuspeed) {
    if(init) {
      helper.createMomaEntry(adapter, 'cpuspeed');
    }
    si.cpuCurrentspeed(function(data) {
      showData(data, 'cpuspeed', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cpuspeed');
    }
  }
}

module.exports.cpuTemperature = (init) => {
  if(adapter.config.cputemperature) {
    if(init) {
      helper.createMomaEntry(adapter, 'cputemp');
    }
    si.cpuTemperature(function(data) {
      showData(data, 'cputemp', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cputemp');
    }
  }
}

module.exports.mem = (init) => {
  if(adapter.config.mem) {
    if(init) {
      helper.createMomaEntry(adapter, 'mem');
    }
    si.mem(function(data) {
      showData(data, 'mem', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'mem');
    }
  }
}

module.exports.memLayout = (init) => {
  if(adapter.config.memlayout) {
    if(init) {
      helper.createMomaEntry(adapter, 'memlayout');
    }
    si.memLayout(function(data) {
      showData(data, 'memlayout', init);
    });
  } else {
    helper.removeMomaEntry(adapter, 'memlayout');
  }
}

module.exports.diskLayout = (init) => {
  if(adapter.config.disklayout) {
    if(init) {
      helper.createMomaEntry(adapter, 'disklayout');
    }
    si.diskLayout(function(data) {
      showData(data, 'disklayout', init);
    });
  } else {
    helper.removeMomaEntry(adapter, 'disklayout');
  }
}

module.exports.battery = (init) => {
  if(adapter.config.battery) {
    if(init) {
      helper.createMomaEntry(adapter, 'battery');
    }
    si.battery(function(data) {
      showData(data, 'battery', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'battery');
    }
  }
}

module.exports.graphics = (init) => {
  if(adapter.config.graphics) {
    if(init) {
      helper.createMomaEntry(adapter, 'graphics');
    } 
    si.battery(function(data) {
      showData(data, 'graphics', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'graphics');
    }
  }
}

module.exports.osInfo = (init) => {
  if(adapter.config.osinfo) {
    if(init) {
      helper.createMomaEntry(adapter, 'osInfo');
    }
    si.osInfo(function(data) {
      showData(data, 'osInfo', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'osInfo');
    }
  }
}

module.exports.users = (init) => {
  if(adapter.config.users) {
    if(init) {
      helper.createMomaEntry(adapter, 'users');
    }
    si.users(function(data) {
      showData(data, 'users', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'users');
    }
  }
}

module.exports.fsSize = (init) => {
  if(adapter.config.fssize) {
    if(init) {
      helper.createMomaEntry(adapter, 'fssize');
    }
    si.fsSize(function(data) {
      showData(data, 'fssize', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fssize');
    }
  }
}

module.exports.blockDevices = (init) => {
  if(adapter.config.bdev) {
    if(init) {
      helper.createMomaEntry(adapter, 'bdev');
    }
    si.blockDevices(function(data) {
      showData(data, 'bdev', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'bdev');
    }
  }
}

module.exports.fsStats = (init) => {
  if(adapter.config.fsstats) {
    if(init) {
      helper.createMomaEntry(adapter, 'fsstats');
    }
    si.fsStats(function(data) {
      showData(data, 'fsstats', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fsstats');
    }
  }
}

module.exports.disksIO = (init) => {
  if(adapter.config.disksio) {
    if(init) {
      helper.createMomaEntry(adapter, 'disksio');
    }
    si.disksIO(function(data) {
      showData(data, 'disksio', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'disksio');
    }
  }
}  

module.exports.network = (init) => {
  if(adapter.config.network) {
    if(init) {
      helper.createMomaEntry(adapter, 'network');
    }
    si.networkInterfaces(function(data) {
      si.networkInterfaceDefault(function(data2) {
        data['default'] = data2;
         showData(data, 'network', init);
      });
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'network');
    }
  }
}  

module.exports.networkStats = (init) => {
  if(adapter.config.netstats) {
    if(init) {
      helper.createMomaEntry(adapter, 'networkstats');
    }
    si.networkStats(function(data) {
      showData(data, 'networkstats', init);
    });
} else {
    if(init) {
      helper.removeMomaEntry(adapter, 'networkstats');
    }
  }
}

module.exports.networkConnections = (init) => {
  if(adapter.config.netconnections) {
    if(init) {
      helper.createMomaEntry(adapter, 'networkconnections');
    }
    si.networkStats(function(data) {
      showData(data, 'networkconnections', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'networkconnections');
    }
  }
}  

module.exports.currentLoad = (init) => {
  if(adapter.config.load) {
    if(init) {
      helper.createMomaEntry(adapter, 'currentload');
    }
    si.currentLoad(function(data) {
      showData(data, 'currentload', init);
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'currentload');
    }
  }
}

module.exports.fullLoad = (init) => {
  if(adapter.config.fullload) {
    if(init) {
      helper.createMomaEntry(adapter, 'fullload');
    }
    si.fullLoad(function(data) {
      showData(data, 'fullload');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fullload');
    }
  }
}

module.exports.processes = (init) => {
  if(adapter.config.processes) {
    if(init) {
      helper.createMomaEntry(adapter, 'processes');
    }
    si.processes(function(data) {
      showData(data, 'processes');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'processes');
    }
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

