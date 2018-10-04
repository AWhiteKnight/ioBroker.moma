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

function showData(source, structure) {
  let dest = defs.sysInfo[structure];
  for (const key1 in dest) {
    if (source.hasOwnProperty(key1)) {
      const element1 = source[key1];
      let dest1 = dest[key1];
      if(dest1['array'] == "true") {
        adapter.log.debug('array: ' + structure+'.'+key1 + ' value: ' + element1 + ' length: ' + element1.length);
        helper.createChannelEntries(adapter, element1.length, structure+'.'+key1, dest1['type'], dest1['role']);
      } else if(typeof element1 == 'object') {
        // we have a nested structure-object
        for (const key2 in element1) {
          const element2 = element1[key2];
          if(typeof element2 == 'object') {
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
    showData(data, 'time');
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
      showData(data, 'baseboard');
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
      showData(data, 'bios');
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
      showData(data, 'system');
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
          showData(data, 'cpu');
        });
      });
    }
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cpu');
      helper.removeMomaEntry(adapter, 'cpuFlags');
    }
  }
}

module.exports.osInfo = (init) => {
  if(adapter.config.osinfo) {
    if(init) {
      helper.createMomaEntry(adapter, 'osInfo');
    }
    si.osInfo(function(data) {
      showData(data, 'osInfo');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'osInfo');
    }
  }
}

module.exports.cpuCurrentSpeed = (init) => {
  if(adapter.config.cpuspeed) {
    if(init) {
      helper.createMomaEntry(adapter, 'cpuCurrentspeed');
    }
    si.cpuCurrentspeed(function(data) {
      showData(data, 'cpuCurrentspeed');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cpuCurrentspeed');
    }
  }
}

module.exports.cpuTemperature = (init) => {
  if(adapter.config.cputemperature) {
    if(init) {
      helper.createMomaEntry(adapter, 'cpuTemperature');
    }
    si.cpuTemperature(function(data) {
      showData(data, 'cpuTemperature');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'cpuTemperature');
    }
  }
}

module.exports.blockDevices = (init) => {
  if(adapter.config.bdev) {
    si.blockDevices(function(data) {
      let num = data.length;
      // TODO: anders lösen, da externe Geräte hinzukommen können 
      for(let i = 0; i < num; i++) {
        helper.createMomaArrayEntry(adapter, i, 'blockDevices');
        adapter.setState(defs.sysTemplates.blockDevices.name.id.replace('x', i), {val: data[i].name, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.type.id.replace('x', i), {val: data[i].type, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.fstype.id.replace('x', i), {val: data[i].fstype, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.mount.id.replace('x', i), {val: data[i].mount, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.size.id.replace('x', i), {val: data[i].size, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.physical.id.replace('x', i), {val: data[i].physical, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.uuid.id.replace('x', i), {val: data[i].uuid, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.label.id.replace('x', i), {val: data[i].label, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.model.id.replace('x', i), {val: data[i].model, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.serial.id.replace('x', i), {val: data[i].serial, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.removable.id.replace('x', i), {val: data[i].removable, ack: true});
        adapter.setState(defs.sysTemplates.blockDevices.protocol.id.replace('x', i), {val: data[i].protocol, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'blockDevices');
    }
  }
}

module.exports.users = (init) => {
  if(adapter.config.users) {
    // TODO anders lösen, da user dynamisch zu und weg kommen
    si.users(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        helper.createMomaArrayEntry(adapter, i, 'user');
        adapter.setState(defs.sysTemplates.user.user.id.replace('x', i), {val: data[i].user, ack: true});
        adapter.setState(defs.sysTemplates.user.tty.id.replace('x', i), {val: data[i].tty, ack: true});
        adapter.setState(defs.sysTemplates.user.date.id.replace('x', i), {val: data[i].date, ack: true});
        adapter.setState(defs.sysTemplates.user.time.id.replace('x', i), {val: data[i].time, ack: true});
        adapter.setState(defs.sysTemplates.user.ip.id.replace('x', i), {val: data[i].ip, ack: true});
        adapter.setState(defs.sysTemplates.user.command.id.replace('x', i), {val: data[i].command, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'user');
    }
  }
}

module.exports.fsSize = (init) => {
  if(adapter.config.fssize) {
    // TODO: anders lösen, da fs mount/unmount
    si.fsSize(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        helper.createMomaArrayEntry(adapter, i, 'fsSize');
        adapter.setState(defs.sysTemplates.fsSize.fs.id.replace('x', i), {val: data[i].fs, ack: true});
        adapter.setState(defs.sysTemplates.fsSize.type.id.replace('x', i), {val: data[i].type, ack: true});
        adapter.setState(defs.sysTemplates.fsSize.size.id.replace('x', i), {val: data[i].size, ack: true});
        adapter.setState(defs.sysTemplates.fsSize.used.id.replace('x', i), {val: data[i].used, ack: true});
        adapter.setState(defs.sysTemplates.fsSize.use.id.replace('x', i), {val: data[i].use, ack: true});
        adapter.setState(defs.sysTemplates.fsSize.mount.id.replace('x', i), {val: data[i].mount, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fsSize');
    }
  }
}

module.exports.memLayout = (init) => {
  if(adapter.config.memlayout) {
    if(init) {
      si.memLayout(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        if(data[i].type !== 'Empty') {
            helper.createMomaArrayEntry(adapter, i, 'memLayout');
            adapter.setState(defs.sysTemplates.memLayout.size.id.replace('x', i), {val: data[i].size, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.bank.id.replace('x', i), {val: data[i].bank, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.type.id.replace('x', i), {val: data[i].type, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.clockSpeed.id.replace('x', i), {val: data[i].clockSpeed, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.formFactor.id.replace('x', i), {val: data[i].formFactor, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.manufacturer.id.replace('x', i), {val: data[i].manufacturer, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.partNum.id.replace('x', i), {val: data[i].partNum, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.serialNum.id.replace('x', i), {val: data[i].serialNum, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.voltageConfigured.id.replace('x', i), {val: data[i].voltageConfigured, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.voltageMin.id.replace('x', i), {val: data[i].voltageMin, ack: true});
            adapter.setState(defs.sysTemplates.memLayout.voltageMax.id.replace('x', i), {val: data[i].voltageMax, ack: true});
          }
        }
      });
    }
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'memLayout');
    }
  }
}

module.exports.diskLayout = (init) => {
  if(adapter.config.disklayout) {
    // TODO: anders lösen, da USB-Platten dynamisch sind
    si.diskLayout(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        if(init) {
          helper.createMomaArrayEntry(adapter, i, 'diskLayout');
          adapter.setState(defs.sysTemplates.diskLayout.type.id.replace('x', i), {val: data[i].type, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.name.id.replace('x', i), {val: data[i].name, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.vendor.id.replace('x', i), {val: data[i].vendor, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.firmwareRevision.id.replace('x', i), {val: data[i].firmwareRevision, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.serialNum.id.replace('x', i), {val: data[i].serialNum, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.interfaceType.id.replace('x', i), {val: data[i].interfaceType, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.size.id.replace('x', i), {val: data[i].size, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.totalCylinders.id.replace('x', i), {val: data[i].totalCylinders, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.totalHeads.id.replace('x', i), {val: data[i].totalHeads, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.totalTracks.id.replace('x', i), {val: data[i].totalTracks, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.tracksPerCylinder.id.replace('x', i), {val: data[i].tracksPerCylinder, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.sectorsPerTrack.id.replace('x', i), {val: data[i].sectorsPerTrack, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.totalSectors.id.replace('x', i), {val: data[i].totalSectors, ack: true});
          adapter.setState(defs.sysTemplates.diskLayout.bytesPerSector.id.replace('x', i), {val: data[i].bytesPerSector, ack: true});
        }
        adapter.setState(defs.sysTemplates.diskLayout.smartStatus.id.replace('x', i), {val: data[i].smartStatus, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'diskLayout');
    }
  }
}

module.exports.graphics = (init) => {
  if(adapter.config.graphics || adapter.config.display) {
    // TODO: displays sind dynamisch!!
    si.graphics(function(data) {
      if(adapter.config.graphics) {
        let num = data.controllers.length;
        if(init) {
          for(let i = 0; i < num; i++) {
            helper.createMomaArrayEntry(adapter, i, 'graphiccontroller');
            adapter.setState(defs.sysTemplates.graphiccontroller.model.id.replace('x', i), {val: data.controllers[i].model, ack: true});
            adapter.setState(defs.sysTemplates.graphiccontroller.vendor.id.replace('x', i), {val: data.controllers[i].vendor, ack: true});
            adapter.setState(defs.sysTemplates.graphiccontroller.bus.id.replace('x', i), {val: data.controllers[i].bus, ack: true});
            adapter.setState(defs.sysTemplates.graphiccontroller.vram.id.replace('x', i), {val: data.controllers[i].vram, ack: true});
            adapter.setState(defs.sysTemplates.graphiccontroller.vramDynamic.id.replace('x', i), {val: data.controllers[i].vramDynamic, ack: true});
          }
        }
      } else {
        if(init) {
          helper.removeMomaEntry(adapter, 'graphiccontroller');
        }
      }
      if(adapter.config.display) {
        let num = data.displays.length;
        for(let i = 0; i < num; i++) {
          helper.createMomaArrayEntry(adapter, i, 'display');
          adapter.setState(defs.sysTemplates.display.model.id.replace('x', i), {val: data.displays[i].model, ack: true});
          adapter.setState(defs.sysTemplates.display.main.id.replace('x', i), {val: data.displays[i].main, ack: true});
          adapter.setState(defs.sysTemplates.display.builtin.id.replace('x', i), {val: data.displays[i].builtin, ack: true});
          adapter.setState(defs.sysTemplates.display.connection.id.replace('x', i), {val: data.displays[i].connection, ack: true});
          adapter.setState(defs.sysTemplates.display.resolutionx.id.replace('x', i), {val: data.displays[i].resolutionx, ack: true});
          adapter.setState(defs.sysTemplates.display.resolutiony.id.replace('x', i), {val: data.displays[i].resolutiony, ack: true});
          adapter.setState(defs.sysTemplates.display.pixeldepth.id.replace('x', i), {val: data.displays[i].pixeldepth, ack: true});
          adapter.setState(defs.sysTemplates.display.sizex.id.replace('x', i), {val: data.displays[i].sizex, ack: true});
          adapter.setState(defs.sysTemplates.display.sizey.id.replace('x', i), {val: data.displays[i].sizey, ack: true});
        }
      } else {
        if(init) {
          helper.removeMomaEntry(adapter, 'display');
        }
      }
    });
  }
}


module.exports.mem = (init) => {
  if(adapter.config.mem) {
    if(init) {
      helper.createMomaEntry(adapter, 'mem');
    }
    si.mem(function(data) {
      showData(data, 'mem');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'mem');
    }
  }
}

module.exports.battery = (init) => {
  if(adapter.config.battery) {
    if(init) {
      helper.createMomaEntry(adapter, 'battery');
    }
    si.battery(function(data) {
      showData(data, 'battery');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'battery');
    }
  }
}

module.exports.fsStats = (init) => {
  if(adapter.config.fsstats) {
    if(init) {
      helper.createMomaEntry(adapter, 'fsStats');
    }
    si.fsStats(function(data) {
      showData(data, 'fsStats');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fsStats');
    }
  }
}

module.exports.disksIO = (init) => {
  if(adapter.config.disksio) {
    if(init) {
      helper.createMomaEntry(adapter, 'disksIO');
    }
    si.disksIO(function(data) {
      showData(data, 'disksIO');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'disksIO');
    }
  }
}  

module.exports.network = (init) => {
  if(adapter.config.network) {
    if(init) {
      helper.createMomaEntry(adapter, 'network');
    }
    si.networkInterfaceDefault(function(data) {
      adapter.setState(defs.sysInfo.network.default.id, {val: data, ack: true});
    });
    si.networkInterfaces(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        if(init) {
          helper.createMomaArrayEntry(adapter, i, 'network');
        }
        adapter.setState(defs.sysTemplates.network.iface.id.replace('x', i), {val: data[i].iface, ack: true});
        adapter.setState(defs.sysTemplates.network.ip6.id.replace('x', i), {val: data[i].ip6, ack: true});
        adapter.setState(defs.sysTemplates.network.ip4.id.replace('x', i), {val: data[i].ip4, ack: true});
        adapter.setState(defs.sysTemplates.network.mac.id.replace('x', i), {val: data[i].mac, ack: true});
        adapter.setState(defs.sysTemplates.network.internal.id.replace('x', i), {val: data[i].internal, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'network');
    }
  }
}  

module.exports.networkStats = (init) => {
  if(adapter.config.netstats) {
    si.networkInterfaces(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        if(init) {
          helper.createMomaArrayEntry(adapter, i, 'networkStats');
        }
        si.networkStats(data[i].iface, function(data2) {
          adapter.setState(defs.sysTemplates.networkStats.iface.id.replace('x', i), {val: data2.iface, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.operstate.id.replace('x', i), {val: data2.operstate, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.rx.id.replace('x', i), {val: data2.rx, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.tx.id.replace('x', i), {val: data2.tx, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.rx_sec.id.replace('x', i), {val: data2.rx_sec, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.tx_sec.id.replace('x', i), {val: data2.tx_sec, ack: true});
          adapter.setState(defs.sysTemplates.networkStats.ms.id.replace('x', i), {val: data2.internal, ack: true});
        });
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'networkStats');
    }
  }
}  

module.exports.networkConnections = (init) => {
  if(adapter.config.netconnections) {
    si.networkConnections(function(data) {
      let num = data.length;
      for(let i = 0; i < num; i++) {
        if(init) {
          helper.createMomaArrayEntry(adapter, i, 'networkConnections');
        }
        adapter.setState(defs.sysTemplates.networkConnections.protocol.id.replace('x', i), {val: data[i].protocol, ack: true});
        adapter.setState(defs.sysTemplates.networkConnections.localaddress.id.replace('x', i), {val: data[i].localaddress, ack: true});
        adapter.setState(defs.sysTemplates.networkConnections.localport.id.replace('x', i), {val: data[i].localport, ack: true});
        adapter.setState(defs.sysTemplates.networkConnections.peeraddress.id.replace('x', i), {val: data[i].peeraddress, ack: true});
        adapter.setState(defs.sysTemplates.networkConnections.peerport.id.replace('x', i), {val: data[i].peerport, ack: true});
        adapter.setState(defs.sysTemplates.networkConnections.state.id.replace('x', i), {val: data[i].state, ack: true});
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'networkConnections');
    }
  }
}  

module.exports.currentLoad = (init) => {
  if(adapter.config.load) {
    if(init) {
      helper.createMomaEntry(adapter, 'load');
    }
    si.currentLoad(function(data) {
      adapter.setState(defs.sysInfo.load.average.id, {val: data.avgload, ack: true});
      adapter.setState(defs.sysInfo.load.current.id, {val: data.currentload, ack: true});
      adapter.setState(defs.sysInfo.load.user.id, {val: data.currentload_user, ack: true});
      adapter.setState(defs.sysInfo.load.system.id, {val: data.currentload_system, ack: true});
      adapter.setState(defs.sysInfo.load.nice.id, {val: data.currentload_nice, ack: true});
      adapter.setState(defs.sysInfo.load.idle.id, {val: data.currentload_idle, ack: true});
      adapter.setState(defs.sysInfo.load.irq.id, {val: data.currentload_irq, ack: true});
      for (const key in data.cpus) {
        if (data.cpus.hasOwnProperty(key)) {
          const content = data.cpus[key];
          if(init) {
            helper.createMomaArrayEntry(adapter, key, 'load');
          }

          let element = [0,0,0,0,0,0,0,0,0,0,0,0,0];
          let i = 0;
          for (const key2 in content) {
            if (content.hasOwnProperty(key2)) {
              element[i] = content[key2];
              i++;
            }
          }
          adapter.setState(defs.sysTemplates.load.current.id.replace('x', key), {val: element[0], ack: true});
          adapter.setState(defs.sysTemplates.load.user.id.replace('x', key), {val: element[1], ack: true});
          adapter.setState(defs.sysTemplates.load.system.id.replace('x', key), {val: element[2], ack: true});
          adapter.setState(defs.sysTemplates.load.nice.id.replace('x', key), {val: element[3], ack: true});
          adapter.setState(defs.sysTemplates.load.idle.id.replace('x', key), {val: element[4], ack: true});
          adapter.setState(defs.sysTemplates.load.irq.id.replace('x', key), {val: element[5], ack: true});
        }
      }
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'load');
    }
  }
}

module.exports.fullLoad = (init) => {
  if(adapter.config.fullload) {
    if(init) {
      helper.createMomaEntry(adapter, 'fullLoad');
    }
    si.fullLoad(function(data) {
      showData(data, 'fullLoad');
    });
  } else {
    if(init) {
      helper.removeMomaEntry(adapter, 'fullLoad');
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

