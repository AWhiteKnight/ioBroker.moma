const defs = require('./definitions');

// helper functions
module.exports.createListEntry = (adapter) => {
  adapter.log.debug('creating missing entries');
  
  let hostListEntry = {
      _id:  defs.hostEntry,
      type: 'device',
      common: {
          name:  'Name of host',
      },
      native: {}
  };
  adapter.setForeignObjectNotExists(hostListEntry._id, hostListEntry);

  // create states
  let obj = {
    _id:  defs.hostEntryTemp,
    type: 'state',
    common: {
        role:  'value',
        name:  'Temperature',
        type:  'number',
        read:  true,
        write: false,
        def:   -274
    },
    native: {}
  };
  adapter.setForeignObjectNotExists(obj._id, obj);

  obj = {
      _id:  defs.hostEntryUptime,
      type: 'state',
      common: {
          role:  'value',
          name:  'Uptime of host',
          type:  'string',
          read:  true,
          write: false,
          def:   '0:0:00:00'
      },
      native: {}
  };
  adapter.setForeignObjectNotExists(obj._id, obj);

  obj = {
    _id:  defs.hostEntryLoad,
    type: 'state',
    common: {
        role:  'value',
        name:  'Avg. load 1 min',
        type:  'number',
        read:  true,
        write: false,
        def:   0
    },
    native: {}
  };
  adapter.setForeignObjectNotExists(obj._id, obj);

  obj = {
    _id:  defs.hostEntryUpdates,
    type: 'state',
    common: {
        role:  'value',
        name:  'Number of pending updates',
        type:  'number',
        read:  true,
        write: false,
        def:   0
    },
    native: {}
  };
  adapter.setForeignObjectNotExists(obj._id, obj);

  return;
} // end of createEntries
