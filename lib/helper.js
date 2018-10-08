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

function removeEntry(adapter, id) {
/*
    let key = adapter.namespace + '.' + id;
    found = false;
    adapter.getDevices(function (err, devices) {
        for(let d = 0; d < devices.length; d++) {
            if(devices[d]._id == key) {
                adapter.log.info('deleting Device ' + devices[d]._id);
                adapter.getStates(devices[d], function(err, states) {
                    if(states) {
                        for(let s = 0; s < states.length; s ++) {
                            adapter.deleteState(states[s]._id);
                        }
                    }
                });
                adapter.deleteDevice(devices[d]._id);
                adapter.deleteDevice(id);
                found = true;
            }
        }
    });
    if(!found) {
        adapter.getChannels(function (err, devices) {
            for(let d = 0; d < devices.length; d++) {
                if(devices[d]._id == key) {
                    adapter.log.info('deleting Channel' + devices[d]._id);
                    adapter.getStates(devices[d], function(err, states) {
                        if(states) {
                            for(let s = 0; s < states.length; s ++) {
                                adapter.deleteState(states[s]._id);
                                adapter.log.debug('err ' + JSON.stringify(err) + ' obj '+ JSON.stringify(obj));
                            }
                        }
                    });
                    adapter.deleteChannel(devices[d]._id);
                    adapter.deleteChannel(id);
                    found = true;
                }
            }
        });
    }
    if(!found) {
        adapter.getStates(id, function (err, obj) {
            if(obj) {
                adapter.deleteState(id, function (err, obj) {
                    adapter.log.info('deleted State: ' + id);
                    adapter.log.debug('err ' + JSON.stringify(err) + ' obj '+ JSON.stringify(obj));
                    found = true;
                });
            }
        });
    }
*/
}

/**
 * Creates all entries for an array below a parent device or channel 
 */
module.exports.createArrayEntry = (adapter, parent, id) => {
    //adapter.log.debug('A0-parent: ' + parent + ' id: ' + id);
    let comp = parent.split('.')
    let template = defs.sysInfo[comp[0]];
    for(let i = 1; i < comp.length; i++) {
        template = template[comp[i]]
    }
    const level0 = template[0];
    // check for state entry
    if(isStateEntry(level0)) {
        //adapter.log.debug('A0-state : ' + id + ' value: ' + JSON.stringify(level0));
        createStateEntry(adapter, parent, id);
    // check for array entry
    } else if(isArrayEntry(level0)) {
        //adapter.log.debug('A0-array : ' + id + ' value: ' + JSON.stringify(level0));
        let parent0 = createDeviceEntry(adapter, parent, id);
    // not a state and not an object entry
    } else {
        //adapter.log.debug('A0-channel : ' + id + ' value: ' + JSON.stringify(level0));
        let parent0 = createChannelEntry(adapter, parent, id);
        for (const key1 in level0) {
            if (level0.hasOwnProperty(key1)) {
                const level1 = level0[key1];
                if(isStateEntry(level1)) {
                    //adapter.log.debug('A1-state : ' + key1 + ' value: ' + JSON.stringify(level1));
                    createStateEntry(adapter, parent0, key1);
                } else if(isArrayEntry(level1)) {
                    //adapter.log.debug('A1-array : ' + key1 + ' value: ' + JSON.stringify(level1));
                    let parent1 = createChannelEntry(adapter, parent0, key1);
                } else {
                    //adapter.log.debug('A1-channel : ' + key1 + ' value: ' + JSON.stringify(level1));
                    let parent1 = createChannelEntry(adapter, parent0, key1);
                    for (const key2 in level1) {
                        if (level1.hasOwnProperty(key2)) {
                            const level2 = level1[key2];
                            if(isStateEntry(level2)) {
                                //adapter.log.debug('A2-state : ' + key2 + ' value: ' + JSON.stringify(level2));
                                createStateEntry(adapter, parent1, key2);
                            } else if(isArrayEntry(level2)) {
                                //adapter.log.debug('A2-array : ' + key2 + ' value: ' + JSON.stringify(level2));
                                let parent2 = createChannelEntry(adapter, parent1, key2);
                            } else {
                                //adapter.log.debug('A2-channel : ' + key2 + ' value: ' + JSON.stringify(level2));
                                let parent2 = createChannelEntry(adapter, parent1, key2);
                                for (const key3 in level2) {
                                    if (level2.hasOwnProperty(key3)) {
                                        const level3 = level2[key3];
                                        if(isStateEntry(level3)) {
                                            //adapter.log.debug('A3-state : ' + key3 + ' value: ' + JSON.stringify(level3));
                                            createStateEntry(adapter, parent2, key3);
                                        } else if(isArrayEntry(key0)) {
                                            //adapter.log.debug('A3-array : ' + key3 + ' value: ' + JSON.stringify(level3));
                                            let parent3 = createChannelEntry(adapter, parent2, key3);
                                        } else {
                                            //adapter.log.debug('A3-channel : ' + key3 + ' value: ' + JSON.stringify(level3));
                                            let parent3 = createChannelEntry(adapter, parent2, key3);
                                            for (const key4 in level3) {
                                                if (level3.hasOwnProperty(key4)) {
                                                    const level4 = level3[key4];
                                                    adapter.log.error('./lib/helper/createArrayEntry() level 4 reached in ' + parent + ' for ' + id);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * Creates all entries needed for the current configuration.
 * Entries that have been deselected will be deleted. 
 */
module.exports.createMomaInstanceEntries = (adapter) => {
    const template = defs.sysInfo;
    for (const key0 in template) {
        //adapter.log.debug('0-key: ' + key0);
        if (template.hasOwnProperty(key0)) {
            const level0 = template[key0];
            // check configuration
            if(adapter.config[key0]) {
                // check for state entry
                if(isStateEntry(level0)) {
                    //adapter.log.debug('0-state : ' + key0 + ' value: ' + JSON.stringify(level0));
                    createStateEntry(adapter, '', key0);
                // check for array entry
                } else if(isArrayEntry(level0)) {
                    //adapter.log.debug('0-array : ' + key0 + ' value: ' + JSON.stringify(level0));
                    let parent0 = createDeviceEntry(adapter, null, key0);
                // not a state and not an object entry
                } else {
                    //adapter.log.debug('0-device : ' + key0 + ' value: ' + JSON.stringify(level0));
                    let parent0 = createDeviceEntry(adapter, null, key0);
                    for (const key1 in level0) {
                        if (level0.hasOwnProperty(key1)) {
                            const level1 = level0[key1];
                            if(isStateEntry(level1)) {
                                //adapter.log.debug('1-state : ' + key1 + ' value: ' + JSON.stringify(level1));
                                createStateEntry(adapter, parent0, key1);
                            } else if(isArrayEntry(level1)) {
                                //adapter.log.debug('1-array : ' + key1 + ' value: ' + JSON.stringify(level1));
                                let parent1 = createChannelEntry(adapter, parent0, key1);
                            } else {
                                //adapter.log.debug('1-channel : ' + key1 + ' value: ' + JSON.stringify(level1));
                                let parent1 = createChannelEntry(adapter, parent0, key1);
                                for (const key2 in level1) {
                                    if (level1.hasOwnProperty(key2)) {
                                        const level2 = level1[key2];
                                        if(isStateEntry(level2)) {
                                            //adapter.log.debug('2-state : ' + key2 + ' value: ' + JSON.stringify(level2));
                                            createStateEntry(adapter, parent1, key2);
                                        } else if(isArrayEntry(level2)) {
                                            //adapter.log.debug('2-array : ' + key2 + ' value: ' + JSON.stringify(level2));
                                            let parent2 = createChannelEntry(adapter, parent1, key2);
                                        } else {
                                            //adapter.log.debug('2-channel : ' + key2 + ' value: ' + JSON.stringify(level2));
                                            let parent2 = createChannelEntry(adapter, parent1, key2);
                                            for (const key3 in level2) {
                                                if (level2.hasOwnProperty(key3)) {
                                                    const level3 = level2[key3];
                                                    if(isStateEntry(level3)) {
                                                        //adapter.log.debug('3-state : ' + key3 + ' value: ' + JSON.stringify(level3));
                                                        createStateEntry(adapter, parent2, key3);
                                                    } else if(isArrayEntry(key0)) {
                                                        //adapter.log.debug('3-array : ' + key3 + ' value: ' + JSON.stringify(level3));
                                                        let parent3 = createChannelEntry(adapter, parent2, key3);
                                                    } else {
                                                        //adapter.log.debug('3-channel : ' + key3 + ' value: ' + JSON.stringify(level3));
                                                        let parent3 = createChannelEntry(adapter, parent2, key3);
                                                        for (const key4 in level3) {
                                                            if (level3.hasOwnProperty(key4)) {
                                                                const level4 = level3[key4];
                                                                adapter.log.error('./lib/helper/createMomaInstanceEntries() level 4 reached in ' + key0 + ' for ' + key4);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // remove entry
                removeEntry(adapter, key0);
            }
        }
    }
}


module.exports.createMomaXEntries = (adapter) => {
    adapter.getForeignObject(defs.hostEntryInstance, function (err, obj) {
        if(!obj) {
            adapter.log.info('create missing moma.x entries');
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

