'use strict';

// needed for all
const defs = require('./definitions');
const helper = require('./helper');

// --------------------------------------------------------------------------------------------
// library systeminformation
// --------------------------------------------------------------------------------------------
const si = require('systeminformation');

module.exports.baseboard = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'baseboard');
    si.baseboard(function(data) {
      adapter.setState(defs.sysInfo.baseboard.manufacturer.id, {val: data.manufacturer, ack: true});
      adapter.setState(defs.sysInfo.baseboard.model.id, {val: data.model, ack: true});
      adapter.setState(defs.sysInfo.baseboard.version.id, {val: data.version, ack: true});
      adapter.setState(defs.sysInfo.baseboard.serial.id, {val: data.serial, ack: true});
      adapter.setState(defs.sysInfo.baseboard.assetTag.id, {val: data.assetTag, ack: true});
    });
  }
}

module.exports.bios = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'bios');
    si.bios(function(data) {
      adapter.setState(defs.sysInfo.bios.vendor.id, {val: data.vendor, ack: true});
      adapter.setState(defs.sysInfo.bios.version.id, {val: data.version, ack: true});
      adapter.setState(defs.sysInfo.bios.releaseDate.id, {val: data.releaseDate, ack: true});
      adapter.setState(defs.sysInfo.bios.revision.id, {val: data.revision, ack: true});
    });
  }
}

module.exports.system = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'baseboard');
    si.system(function(data) {
      adapter.setState(defs.sysInfo.system.manufacturer.id, {val: data.manufacturer, ack: true});
      adapter.setState(defs.sysInfo.system.model.id, {val: data.model, ack: true});
      adapter.setState(defs.sysInfo.system.version.id, {val: data.version, ack: true});
      adapter.setState(defs.sysInfo.system.serial.id, {val: data.serial, ack: true});
      adapter.setState(defs.sysInfo.system.uuid.id, {val: data.uuid, ack: true});
      adapter.setState(defs.sysInfo.system.suk.id, {val: data.suk, ack: true});
    });
  }
}

module.exports.cpu = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'cpu');
    si.cpu(function(data) {
      adapter.setState(defs.sysInfo.cpu.manufacturer.id, {val: data.manufacturer, ack: true});
      adapter.setState(defs.sysInfo.cpu.brand.id, {val: data.brand, ack: true});
      adapter.setState(defs.sysInfo.cpu.speed.id, {val: data.speed, ack: true});
      adapter.setState(defs.sysInfo.cpu.speedmin.id, {val: data.speedmin, ack: true});
      adapter.setState(defs.sysInfo.cpu.speedmax.id, {val: data.speedmax, ack: true});
      adapter.setState(defs.sysInfo.cpu.cores.id, {val: data.cores, ack: true});
      adapter.setState(defs.sysInfo.cpu.vendor.id, {val: data.vendor, ack: true});
      adapter.setState(defs.sysInfo.cpu.family.id, {val: data.family, ack: true});
      adapter.setState(defs.sysInfo.cpu.model.id, {val: data.model, ack: true});
      adapter.setState(defs.sysInfo.cpu.stepping.id, {val: data.stepping, ack: true});
      adapter.setState(defs.sysInfo.cpu.revision.id, {val: data.revision, ack: true});
      adapter.setState(defs.sysInfo.cpu.voltage.id, {val: data.voltage, ack: true});
      adapter.setState(defs.sysInfo.cpu.cacheL1d.id, {val: data.cache.l1d, ack: true});
      adapter.setState(defs.sysInfo.cpu.cacheL1i.id, {val: data.cache.l1i, ack: true});
      adapter.setState(defs.sysInfo.cpu.cacheL2.id, {val: data.cache.l2, ack: true});
      adapter.setState(defs.sysInfo.cpu.cacheL3.id, {val: data.cache.l3, ack: true});
    });
    si.cpuFlags(function(data) {
      adapter.setState(defs.sysInfo.cpu.flags.id, {val: data, ack: true});
    });
  }
}

module.exports.osInfo = (adapter, init) => {
  si.osInfo(function(data) {
    if(init) {
      helper.createMomaEntry(adapter, 'osInfo');
      adapter.setState(defs.sysInfo.osInfo.platform.id, {val: data.platform, ack: true});
      adapter.setState(defs.sysInfo.osInfo.distro.id, {val: data.distro, ack: true});
      adapter.setState(defs.sysInfo.osInfo.arch.id, {val: data.arch, ack: true});
      adapter.setState(defs.sysInfo.osInfo.logofile.id, {val: data.logofile, ack: true});
    }
    adapter.setState(defs.sysInfo.osInfo.release.id, {val: data.release, ack: true});
    adapter.setState(defs.sysInfo.osInfo.codename.id, {val: data.codename, ack: true});
    adapter.setState(defs.sysInfo.osInfo.kernel.id, {val: data.kernel, ack: true});
    adapter.setState(defs.sysInfo.osInfo.hostname.id, {val: data.hostname, ack: true});
  });
}

module.exports.blockDevices = (adapter, init) => {
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
}

module.exports.users = (adapter, init) => {
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
  }

module.exports.fsSize = (adapter, init) => {
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

}

module.exports.memLayout = (adapter, init) => {
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
}

module.exports.diskLayout = (adapter, init) => {
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
}

module.exports.graphics = (adapter, init) => {
  // TODO: displays sind dynamisch!!
  si.graphics(function(data) {
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
    num = data.displays.length;
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
  });

}

module.exports.cpuCurrentSpeed = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'cpuCurrentSpeed');
  }
  si.cpuCurrentspeed(function(data) {
    adapter.setState(defs.sysInfo.cpuspeed.average.id, {val: data.avg, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.min.id, {val: data.min, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.max.id, {val: data.max, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.cores.id, {val: data.cores, ack: true});
  });
}

module.exports.cpuTemperature = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'cpuTemperature');
  }
  si.cpuTemperature(function(data) {
    adapter.setState(defs.sysInfo.cputemp.main.id, {val: data.main, ack: true});
    adapter.setState(defs.sysInfo.cputemp.cores.id, {val: data.cores, ack: true});
    adapter.setState(defs.sysInfo.cputemp.max.id, {val: data.max, ack: true});
  });
}

module.exports.mem = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'mem');
  }
  si.mem(function(data) {
    adapter.setState(defs.sysInfo.mem.total.id, {val: data.total, ack: true});
    adapter.setState(defs.sysInfo.mem.free.id, {val: data.free, ack: true});
    adapter.setState(defs.sysInfo.mem.used.id, {val: data.used, ack: true});
    adapter.setState(defs.sysInfo.mem.active.id, {val: data.active, ack: true});
    adapter.setState(defs.sysInfo.mem.buffcache.id, {val: data.buffcache, ack: true});
    adapter.setState(defs.sysInfo.mem.available.id, {val: data.available, ack: true});
    adapter.setState(defs.sysInfo.mem.swaptotal.id, {val: data.swaptotal, ack: true});
    adapter.setState(defs.sysInfo.mem.swapused.id, {val: data.swapused, ack: true});
    adapter.setState(defs.sysInfo.mem.swapfree.id, {val: data.swapfree, ack: true});
  });
}

module.exports.battery = (adapter, init) => {
  si.battery(function(data) {
    if(init) {
      helper.createMomaEntry(adapter, 'battery');
      adapter.setState(defs.sysInfo.battery.hasbattery.id, {val: data.hasbattery, ack: true});
      adapter.setState(defs.sysInfo.battery.maxcapacity.id, {val: data.maxcapacity, ack: true});
      adapter.setState(defs.sysInfo.battery.type.id, {val: data.type, ack: true});
      adapter.setState(defs.sysInfo.battery.model.id, {val: data.model, ack: true});
      adapter.setState(defs.sysInfo.battery.manufacturer.id, {val: data.manufacturer, ack: true});
      adapter.setState(defs.sysInfo.battery.serial.id, {val: data.serial, ack: true});
    }
    adapter.setState(defs.sysInfo.battery.cyclecount.id, {val: data.cyclecount, ack: true});
    adapter.setState(defs.sysInfo.battery.ischarging.id, {val: data.ischarging, ack: true});
    adapter.setState(defs.sysInfo.battery.currentcapacity.id, {val: data.currentcapacity, ack: true});
    adapter.setState(defs.sysInfo.battery.percent.id, {val: data.percent, ack: true});
    adapter.setState(defs.sysInfo.battery.timeremaining.id, {val: data.timeremaining, ack: true});
    adapter.setState(defs.sysInfo.battery.acconnected.id, {val: data.acconnected, ack: true});
  });
}

module.exports.fsStats = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'fsStats');
  }
  si.fsStats(function(data) {
    adapter.setState(defs.sysInfo.fsStats.rx.id, {val: data.rx, ack: true});
    adapter.setState(defs.sysInfo.fsStats.wx.id, {val: data.wx, ack: true});
    adapter.setState(defs.sysInfo.fsStats.tx.id, {val: data.tx, ack: true});
    adapter.setState(defs.sysInfo.fsStats.rx_sec.id, {val: data.rx_sec, ack: true});
    adapter.setState(defs.sysInfo.fsStats.wx_sec.id, {val: data.wx_sec, ack: true});
    adapter.setState(defs.sysInfo.fsStats.tx_sec.id, {val: data.tx_sec, ack: true});
    adapter.setState(defs.sysInfo.fsStats.ms.id, {val: data.ms, ack: true});
  });
}

module.exports.disksIO = (adapter, init) => {
  si.disksIO(function(data) {
    if(init) {
      helper.createMomaEntry(adapter, 'disksIO');
    }
    adapter.setState(defs.sysInfo.disksIO.rIO.id, {val: data.rIO, ack: true});
    adapter.setState(defs.sysInfo.disksIO.wIO.id, {val: data.wIO, ack: true});
    adapter.setState(defs.sysInfo.disksIO.tIO.id, {val: data.tIO, ack: true});
    adapter.setState(defs.sysInfo.disksIO.rIO_sec.id, {val: data.rIO_sec, ack: true});
    adapter.setState(defs.sysInfo.disksIO.wIO_sec.id, {val: data.wIO_sec, ack: true});
    adapter.setState(defs.sysInfo.disksIO.tIO_sec.id, {val: data.tIO_sec, ack: true});
    adapter.setState(defs.sysInfo.disksIO.ms.id, {val: data.ms, ack: true});
  });
}  

module.exports.network = (adapter, init) => {
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
  si.networkInterfaceDefault(function(data) {
    if(init) {
      helper.createMomaEntry(adapter, 'network');
    }
    adapter.setState(defs.sysInfo.network.defaultIF.id, {val: data, ack: true});
  });
}  

module.exports.networkStats = (adapter, init) => {
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
}  

module.exports.networkConnections = (adapter, init) => {
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
}  

module.exports.currentLoad = (adapter, init) => {
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
}

module.exports.fullLoad = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'fullLoad');
  }
  si.fullLoad(function(data) {
    adapter.setState(defs.sysInfo.fullLoad.machine.id, {val: data, ack: true});
  });
}

module.exports.processes = (adapter, init) => {
  if(init) {
    helper.createMomaEntry(adapter, 'processes');
  }
  si.processes(function(data) {
    adapter.setState(defs.sysInfo.processes.all.id, {val: data.all, ack: true});
    adapter.setState(defs.sysInfo.processes.running.id, {val: data.running, ack: true});
    adapter.setState(defs.sysInfo.processes.blocked.id, {val: data.blocked, ack: true});
    adapter.setState(defs.sysInfo.processes.sleeping.id, {val: data.sleeping, ack: true});
    adapter.setState(defs.sysInfo.processes.unknown.id, {val: data.unknown, ack: true});    
  });
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
module.exports.init = (adapter) => {
  adapter.log.info('Version of systeminformation: ' + si.version());

  // create Entries moma.x.<hostname>.*
  helper.createMomaXEntries(adapter);
  // set the instance in moma.x.<hostname>.instance
  adapter.setForeignState(defs.hostEntryInstance, {val: 'moma.'+adapter.instance, ack: true});

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
