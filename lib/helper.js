const defs = require('./definitions');

// internal helper functions
function isStateEntry(entry) {
    if(entry != undefined  && entry.hasOwnProperty('type') && entry.hasOwnProperty('role')) {
        return true;
    }
    return false;
}

function isArrayEntry(entry) {
    if(entry != undefined  && entry.length != undefined) {
        return true;
    }
    return false;
}

function createDeviceEntry(adapter, parent, name) {
    let id = name
    if(parent != null && parent !== '') {
        id = parent+'.'+name;
    }
    adapter.setObjectNotExists(id, {
        type: 'device',
        common: {
            name: name
        },
        native: {}
    });
    if(parent) {
        return parent + '.' + name;
    } else {
        return name;
    }
}

function createChannelEntry(adapter, parent, name) {
        adapter.setObjectNotExists(parent+'.'+name, {
        type: 'channel',
        common: {
            name: name
        },
        native: {}
    });
    return parent + '.' + name;
}

function createStateEntry(adapter, parent, name, type, role) {
    let id = name
    if(parent != null && parent !== '') {
        id = parent+'.'+name;
    }
    adapter.setObjectNotExists(id, {
        type: 'state',
        common: {
            name: name,
            type: type,
            role: role
        },
        native: {}
    });
}

function createEntry(adapter, entry, parent, id, level) {
    const newId = parent+'.'+id;
    if(isStateEntry(entry)) {
        //adapter.log.debug('createEntry() state : ' + newId + ' value: ' + JSON.stringify(entry));
        createStateEntry(adapter, parent, id);
    } else if(isArrayEntry(entry)) {
        //adapter.log.debug('createEntry() array : ' + newId + ' value: ' + JSON.stringify(entry));
        createChannelEntry(adapter, parent, id);
    } else {
        if(level > 5) {
            adapter.log.error('./lib/helper/createEntry() to deep level reached in ' + parent + ' for ' + id + ' in level ' + level);
        } else {
            //adapter.log.debug('createEntry() channel : ' + newId + ' value: ' + JSON.stringify(entry));
            for (const key in entry) {
                if (entry.hasOwnProperty(key)) {
                    const newEntry = entry[key];
                    //adapter.log.debug('createEntry() recursion : ' + newEntry + ' value: ' + JSON.stringify(entry));
                    createEntry(adapter, newEntry, newId, key, ++level);
                }
            }
        }
    }
}

function removeDevice(adapter, id) {
    adapter.getDevices(function (err, devices) {
        for(let d = 0; d < devices.length; d++) {
            if(devices[d]._id == id) {
                adapter.log.info('deleting Device ' + devices[d]._id);
                adapter.deleteDevice(devices[d]._id);
            }
        }
    });
}

/**
 * Creates all entries for an array below a parent device or channel 
 */
module.exports.createArrayEntry = (adapter, parent, id) => {
    //adapter.log.debug('createArrayEntry() parent: ' + parent + ' id: ' + id);
    let comp = parent.split('.')
    let template = defs.sysInfo[comp[0]];
    let level = 0;
    for(let i = 1; i < comp.length; i++) {
        template = template[comp[i]]
        level++;
    }
    const entry = template[0];
    createEntry(adapter, entry, parent, id, level);
}

/**
 * Creates all entries needed for the current configuration.
 * Device-Entries that have been deselected will be deleted. 
 */
module.exports.createMomaInstanceEntries = (adapter) => {
    adapter.log.info('creating moma instance entries');
    const template = defs.sysInfo;
    for (const key0 in template) {
        //adapter.log.debug('creating instance entries for ' + key0);
        if (template.hasOwnProperty(key0)) {
            const level0 = template[key0];
            // check configuration
            if(adapter.config[key0]) {
                // check for state entry
                if(isStateEntry(level0)) {
                    //adapter.log.debug('createMomaInstanceEntries() state : ' + key0 + ' value: ' + JSON.stringify(level0));
                    createStateEntry(adapter, '', key0);
                // check for array entry
                } else if(isArrayEntry(level0)) {
                    //adapter.log.debug('createMomaInstanceEntries() array : ' + key0 + ' value: ' + JSON.stringify(level0));
                    let parent0 = createDeviceEntry(adapter, null, key0);
                // not a state and not an object entry
                } else {
                    //adapter.log.debug('createMomaInstanceEntries() device : ' + key0 + ' value: ' + JSON.stringify(level0));
                    let parent0 = createDeviceEntry(adapter, null, key0);
                    for (const key1 in level0) {
                        if (level0.hasOwnProperty(key1)) {
                            const level1 = level0[key1];
                            createEntry(adapter, level1, parent0, key1, 1);
                        }
                    }
                }
            } else {
                // remove device entry
                removeDevice(adapter, key0);
            }
        }
    }
}

/**
 * Creates all global entries.
 */
module.exports.createMomaXEntries = (adapter) => {
    adapter.getForeignObject(defs.hostEntryInstance, function (err, obj) {
        if(!obj) {
            adapter.log.info('creating moma global entries');
            let hostListEntry = {
                _id:  defs.hostEntry,
                type: 'device',
                common: {
                    name:  'hostname'
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
        }
    });
} 

// end of helper functions

