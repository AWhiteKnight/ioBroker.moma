const defs = require('./definitions');

// helper functions

module.exports.createMomaEntries = (adapter) => {
    adapter.log.debug('creating missing moma instance entries');
    // all the single element infos
    let allStates = defs.sysInfo;
    for (const key1 in allStates) {
        if (allStates.hasOwnProperty(key1)) {
            const element = allStates[key1];
            for (const key2 in element) {
                let newName = ''+key2;
                if (element.hasOwnProperty(key2)) {
                    const entry = element[key2];
                    let newId = 'trash';
                    let newType = 'string';
                    let newRole = '';
                    if (entry.hasOwnProperty("id")) {
                        newId = entry["id"];
                    }
                    if (entry.hasOwnProperty("type")) {
                        newType = entry["type"];
                    }
                    if (entry.hasOwnProperty("role")) {
                        newRole = entry["role"];
                    }
                    adapter.setObjectNotExists(newId, {
                        type: 'state',
                        common: {
                            name: ''+newName,
                            type: ''+newType,
                            role: ''+newRole
                        },
                        native: {}
                    });
                }
            }
        }
    }
}

module.exports.createMomaArrayEntry = (adapter, instanceNum, template) => {
    //all the array element infos
    let allTemplates = defs.sysTemplates;
    if (allTemplates.hasOwnProperty(template)) {
        const element = allTemplates[template];
        for (const key2 in element) {
            let newName = ''+key2;
            if (element.hasOwnProperty(key2)) {
                const entry = element[key2];
                let newIdSchema = 'trash';
                let newType = 'string';
                let newRole = '';
                if (entry.hasOwnProperty("id")) {
                    newIdSchema = entry["id"];
                }
                if (entry.hasOwnProperty("type")) {
                    newType = entry["type"];
                }
                if (entry.hasOwnProperty("role")) {
                    newRole = entry["role"];
                }
                let newId = newIdSchema.replace('x',instanceNum); 
                adapter.setObjectNotExists(newId, {
                    type: 'state',
                    common: {
                        name: ''+newName,
                        type: ''+newType,
                        role: ''+newRole
                    },
                    native: {}
                });
            }
        }
    }
}

module.exports.createMomaXEntries = (adapter) => {
  adapter.log.debug('creating missing moma.x entries');
  
  // create states
  let hostListEntry = {
      _id:  defs.hostEntry,
      type: 'device',
      common: {
          name:  'Name of host',
      },
      native: {}
  };
  adapter.setForeignObjectNotExists(hostListEntry._id, hostListEntry);

  let obj = {
    _id:  defs.hostEntryInstance,
    type: 'state',
    common: {
        role:  'value',
        name:  'Instance',
        type:  'string',
        read:  true,
        write: false,
        def:   'moma.0'
    },
    native: {}
  };
  adapter.setForeignObjectNotExists(obj._id, obj);

  return;
} // end of createEntries

