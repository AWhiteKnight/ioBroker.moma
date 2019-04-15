// @ts-nocheck
'use strict';

// needed constant definitions
const defs = require(__dirname + '/definitions');

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
    let id = name;
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
            // adapter.log.debug('createEntry() channel : ' + newId + ' value: ' + JSON.stringify(entry));
            createChannelEntry(adapter, parent, id);
            for (const key in entry) {
                if (entry.hasOwnProperty(key)) {
                    const newEntry = entry[key];
                    // adapter.log.debug('createEntry() recursion : ' + newEntry + ' value: ' + JSON.stringify(entry));
                    createEntry(adapter, newEntry, newId, key, ++level);
                }
            }
        }
    }
}

async function removeEntry(adapter, id2delete) {
    try {
        adapter.log.debug('deleting ' + id2delete);
        let found = false;
        // delete device recursive
        let devices = await adapter.getDevicesAsync();
        let promise = [];
        for (let j in devices) {
            let id = devices[j]._id.split('.').pop();
            if (id && id == id2delete) {
                found = true;
                promise.push(await deleteDeviceRecursiveAsync(adapter, id));
            }
        }
        // maybe it is a state directly connected to the moma.<instance> like cpuflags
        if(!found) {
            // delete states
            let states = await adapter.getStatesOfAsync(adapter.namespace);
            for (let j in states) {
                let id = states[j]._id.split('.').pop();
                if (id && id == id2delete) {
                    promise.push(await adapter.delObjectAsync(id));
                }
            }
        }

        await Promise.all(promise);
    } catch (err) {
        adapter.log.error('error deleting objects: ' + err);
    }
 }

async function deleteDeviceRecursiveAsync(adapter, deviceid) {
    try {
      if (deviceid) {
          // delete channels
        let channels = await adapter.getChannelsOfAsync(deviceid);
        // adapter.log.debug('deleting channels of device ' + deviceid);
        for (let i in channels) {
            let channelid = channels[i]._id.split('.').pop();
            let states = await adapter.getStatesOfAsync(deviceid, channelid);
            // adapter.log.debug('deleting states of channel ' + channelid);
            for (let j in states) {
                let stateid = states[j]._id.split('.').pop();
                let id = deviceid + '.' + channelid + '.' + stateid;
                await adapter.delObjectAsync(id);
            }
          await adapter.deleteChannelAsync(deviceid, channelid);
        }

        // delete states
        // adapter.log.debug('deleting states of device ' + deviceid);
        let states = await adapter.getStatesOfAsync(deviceid, deviceid);
        for (let j in states) {
          let stateid = states[j]._id.split('.').pop();
          let id = deviceid + '.' + stateid;
          await adapter.delObjectAsync(id);
        }

        // delete device
        await adapter.deleteDeviceAsync(deviceid);
      }
    } catch (error) {
        adapter.log.error('error deleting device: ' + deviceid + ' - ' + error);
    }
  }

/**
 * Creates all entries for an array below a parent device or channel 
 */
module.exports.createArrayEntry = (adapter, parent, id) => {
    try {
        let comp = parent.split('.')
        let template = defs.sysInfo[comp[0]];
        let level = 0;
        for(let i = 1; i < comp.length; i++) {
            template = template[comp[i]]
            level++;
        }
        const entry = template[0];
        createEntry(adapter, entry, parent, id, level);
    } catch(err) {
        adapter.log.error('createArrayEntry() parent: ' + parent + ' id: ' + id);
    }
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
                // remove entry
                removeEntry(adapter, key0);
            }
        }
    }
}

/**
 * Creates all meta entries.
 */
module.exports.createMomaMetaEntries = (adapter) => {
    adapter.log.info('creating moma meta entries');
  
    let state = {
        _id:  defs.hostNeedsUpdate,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'hostNeedsUpdate',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostNeedsUpdateList,
        type: 'state',
        common: {
            role:  'value',
            name:  'hostNeedsUpdateList',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostNeedsReboot,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'hostNeedsReboot',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostNeedsRebootList,
        type: 'state',
        common: {
            role:  'value',
            name:  'hostNeedsRebootList',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.deviceNeedsBatteryChange,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'deviceNeedsBatteryChange',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.deviceNeedsBatteryChangeList,
        type: 'state',
        common: {
            role:  'value',
            name:  'deviceNeedsBatteryChangeList',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    // create entry into list of hosts
    let channel = {
        _id:  defs.hostListEntry,
        type: 'channel',
        common: {
            name:  'hostname'
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(channel._id, channel);

    state = {
        _id:  defs.hostEntryInstance,
        type: 'state',
        common: {
            role:  'value',
            name:  'instance',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryHasUpdates,
        type: 'state',
        common: {
            role:  'value',
            name:  'numUpdates',
            type:  'number',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryNeedsReboot,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'needsReboot',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryListOfUpdates,
        type: 'state',
        common: {
            role:  'value',
            name:  'updates',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);
} 

// end of helper functions

