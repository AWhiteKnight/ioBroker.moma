const defs = require('./definitions');

// helper functions

module.exports.createMomaEntry = (adapter, template) => {
    // the element infos
    if (defs.sysInfo.hasOwnProperty(template)) {
        const element = defs.sysInfo[template];
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
        adapter.log.debug('created ' + template);
    }
}

module.exports.createMomaArrayEntry = (adapter, instanceNum, template) => {
    //all the array element infos
    if (defs.sysTemplates.hasOwnProperty(template)) {
        const element = defs.sysTemplates[template];
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
        adapter.log.debug('created ' + template);
    }
}

module.exports.createMomaXEntries = (adapter) => {
    adapter.getForeignObject(defs.hostEntryInstance, function() {
        adapter.log.info('creating missing moma.x entries');
        let hostListEntry = {
            _id:  defs.hostEntry,
            type: 'device',
            common: {
                name:  'hostname',
            },
            native: {}
        };
        adapter.setForeignObjectNotExists(hostListEntry._id, hostListEntry);

        let obj = {
            _id:  defs.hostEntryInstance,
            type: 'state',
            common: {
                role:  'value',
                name:  'instance',
                type:  'string',
                read:  true,
                write: false,
                def:   'moma.?'
            },
            native: {}
        };
        adapter.setForeignObjectNotExists(obj._id, obj);
    });
} 

module.exports.removeMomaEntry = (adapter, key) => {
        adapter.delObject(key, function() {
            adapter.log.debug('deleted ' + key);
        });        
}
// end of helper functions

