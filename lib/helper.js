const defs = require('./definitions');

// helper functions

module.exports.createMomaEntry = (adapter, template) => {
    // the element infos
    if (defs.sysInfo.hasOwnProperty(template)) {
        adapter.setObjectNotExists(template, {
            type: 'device',
            common: {
                name: template
            },
            native: {}
        });
        const element = defs.sysInfo[template];
        for (const key1 in element) {
            const entry1 = element[key1];
            if(entry1["array"] == "true") {
                // we expect an array later on, 
                // do nothing because we don't know how many elements it will have
                adapter.log.debug('nested array');
                adapter.setObjectNotExists(template+'.'+key1, {
                    type: 'channel',
                    common: {
                        name: key1
                    },
                    native: {}
                });
            } else if(!entry1["type"]) {
                // we have a nested structure-object
                for (const key2 in entry1) {
                    const entry2 = entry1[key2];
                    if(!entry2["type"]) {
                        // nested nested object
                        adapter.log.error('nested-nested object');
                    } else {
                        adapter.log.debug('nested object');
                        adapter.setObjectNotExists(template+'.'+key1, {
                            type: 'channel',
                            common: {
                                name: key1
                            },
                            native: {}
                        });
                        adapter.setObjectNotExists(template+'.'+key1+'.'+key2, {
                            type: 'state',
                            common: {
                                name: key2,
                                type: entry2["type"],
                                role: entry2["role"]
                            },
                            native: {}
                        });
                    }
                } 
            } else {
                adapter.setObjectNotExists(template+'.'+key1, {
                    type: 'state',
                    common: {
                        name: key1,
                        type: entry1["type"],
                        role: entry1["role"]
                    },
                    native: {}
                });
            }
        }
        adapter.log.debug('created ' + template);
    }
}

module.exports.createChannelEntries = (adapter, instances, parentId, type, role) => {
    for(let i = 0; i < instances; i++) {
        adapter.setObjectNotExists(parentId+'.'+i, {
            type: 'state',
            common: {
                name: ''+i,
                type: type,
                role: role
            },
            native: {}
        });
    }
}

module.exports.createMomaArrayEntry = (adapter, instance, template) => {
    //all the array element infos
    if (defs.sysTemplates.hasOwnProperty(template)) {
        adapter.setObjectNotExists(template, {
            type: 'device',
            common: {
                name: template
            },
            native: {}
        });
        const element = defs.sysTemplates[template];
        for (const key2 in element) {
            if (element.hasOwnProperty(key2)) {
                const entry = element[key2];
                let newType = 'string';
                let newRole = '';
                if (entry.hasOwnProperty("type")) {
                    newType = entry["type"];
                }
                if (entry.hasOwnProperty("role")) {
                    newRole = entry["role"];
                }
                adapter.setObjectNotExists(template+'.'+instance, {
                    type: 'channel',
                    common: {
                        name: instance
                    },
                    native: {}
                });
                adapter.setObjectNotExists(template+'.'+instance+'.'+key2, {
                    type: 'state',
                    common: {
                        name: key2,
                        type: newType,
                        role: newRole
                    },
                    native: {}
                });
            }
        }
        adapter.log.debug('created ' + template);
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

module.exports.removeMomaEntry = (adapter, id) => {
    let key = adapter.namespace + '.' + id;
    adapter.getDevices(function (err, devices) {
        for(let d = 0; d < devices.length; d++) {
            if(devices[d]._id == key) {
                adapter.log.info('deleting ' + devices[d]._id);
/*
                adapter.getStates(devices[d], function(err, states) {
                    if(states) {
                        for(let s = 0; s < states.length; s ++) {
                            adapter.deleteState(states[s]._id);
                        }
                    }
                });
*/
                adapter.deleteDevice(devices[d]._id);
                adapter.deleteDevice(id);
            }
        }
    });
/*
    adapter.findState(id, 'device', function (err, obj) {
        if(obj) {
            adapter.deleteDevice(id, function (err, obj) {
                adapter.log.info('deleted device: ' + id);
                adapter.log.debug('err ' + JSON.stringify(err) + ' obj '+ JSON.stringify(obj));
            });
        }
    });
*/
}
// end of helper functions

