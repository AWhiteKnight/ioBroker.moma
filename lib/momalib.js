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
}

/*==== Block below is for functions for systeminfolib============================================*/
function showData(src, tgtId, init) {
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

module.exports.battery = (init) => {
  if(adapter.config.battery) {
    si.battery(function(data) {
      showData(data, 'battery', init);
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

module.exports.uuids = (init) => {
  if(adapter.config.fullLoad) {
    si.uuid(function(data) {
      showData(data, 'uuids');
    });
  }
}

module.exports.shell = (init) => {
  if(adapter.config.fullLoad) {
    si.shell(function(data) {
      showData(data, 'shell');
    });
  }
}

module.exports.versions = (init) => {
  if(adapter.config.fullLoad) {
    si.versions(function(data) {
      showData(data, 'packageversions');
    });
  }
}

