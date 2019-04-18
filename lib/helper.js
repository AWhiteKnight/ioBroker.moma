// @ts-nocheck
'use strict';

// structure of systeminformation data
const sysInfo = {
    'time': {
        'current':      {'type': 'number',  'role': ''},
        'uptime':       {'type': 'number',  'role': ''},
        'timezone':     {'type': 'string',  'role': ''},
        'timezoneName': {'type': 'string',  'role': ''}
    },
    'system': {
        'manufacturer': {'type': 'string',  'role': ''},
        'model':        {'type': 'string',  'role': ''},
        'version':      {'type': 'string',  'role': ''},
        'serial':       {'type': 'string',  'role': ''},
        'uuid':         {'type': 'string',  'role': ''},
        'sku':          {'type': 'string',  'role': ''}
    },
    'bios': {
        'vendor':      {'type': 'string',  'role': ''},
        'version':     {'type': 'string',  'role': ''},
        'releaseDate': {'type': 'string',  'role': ''},
        'revision':    {'type': 'string',  'role': ''}
    },
    'baseboard': {
        'manufacturer': {'type': 'string',  'role': ''},
        'model':        {'type': 'string',  'role': ''},
        'version':      {'type': 'string',  'role': ''},
        'serial':       {'type': 'string',  'role': ''},
        'assetTag':     {'type': 'string',  'role': ''}
    },
    'chassis': {
        'manufacturer': {'type': 'string',  'role': ''},
        'model':        {'type': 'string',  'role': ''},
        'type':         {'type': 'string',  'role': ''},
        'version':      {'type': 'string',  'role': ''},
        'serial':       {'type': 'string',  'role': ''},
        'assetTag':     {'type': 'string',  'role': ''},
        'sku':          {'type': 'string',  'role': ''}
    },
    'cpu': {
        'manufacturer': {'type': 'string',  'role': ''},
        'brand':        {'type': 'string',  'role': ''},
        'speed':        {'type': 'number',  'role': ''},
        'speedmin':     {'type': 'number',  'role': ''},
        'speedmax':     {'type': 'number',  'role': ''},
        'cores':        {'type': 'number',  'role': ''},
        'physicalCores':{'type': 'number',  'role': ''},
        'processors':   {'type': 'string',  'role': ''},
        'socket':       {'type': 'string',  'role': ''},
        'vendor':       {'type': 'string',  'role': ''},
        'family':       {'type': 'string',  'role': ''},
        'model':        {'type': 'string',  'role': ''},
        'stepping':     {'type': 'string',  'role': ''},
        'revision':     {'type': 'string',  'role': ''},
        'voltage':      {'type': 'number',  'role': ''},
        'cache': {
            'l1d': {'type': 'number',  'role': ''},
            'l1i': {'type': 'number',  'role': ''},
            'l2':  {'type': 'number',  'role': ''},
            'l3':  {'type': 'number',  'role': ''}
        }
    },
    'cpuFlags': {'type': 'string',  'role': ''},
    'cpuCurrentSpeed': {
        'avg':  {'type': 'number',  'role': ''},
        'min':  {'type': 'number',  'role': ''},
        'max':  {'type': 'number',  'role': ''},
        'cores': [{'type': 'number',  'role': ''}]   
    },
    'cpuTemperature': {
        'main': {'type': 'number',  'role': ''},
        'max':  {'type': 'number',  'role': ''},
        'cores':[{'type': 'number',  'role': ''}]
    },
    'mem': {
        'total':     {'type': 'number',  'role': ''},
        'free':      {'type': 'number',  'role': ''},
        'used':      {'type': 'number',  'role': ''},
        'active':    {'type': 'number',  'role': ''},
        'buffcache': {'type': 'number',  'role': ''},
        'available': {'type': 'number',  'role': ''},
        'swaptotal': {'type': 'number',  'role': ''},
        'swapused':  {'type': 'number',  'role': ''},
        'swapfree':  {'type': 'number',  'role': ''}
    },
    'memLayout': [ 
        {
            'size':              {'type': 'number',  'role': ''},
            'bank':              {'type': 'number',  'role': ''},
            'type':              {'type': 'string',  'role': ''},
            'clockSpeed':        {'type': 'number',  'role': ''},
            'formFactor':        {'type': 'number',  'role': ''},
            'manufacturer':      {'type': 'string',  'role': ''},
            'partNum':           {'type': 'number',  'role': ''},
            'serialNum':         {'type': 'number',  'role': ''},
            'voltageConfigured': {'type': 'number',  'role': ''},
            'voltageMin':        {'type': 'number',  'role': ''},
            'voltageMax':        {'type': 'number',  'role': ''}
        }
    ],
    'battery': {
        'hasbattery':      {'type': 'boolean', 'role': ''},
        'cyclecount':      {'type': 'number',  'role': ''},
        'ischarging':      {'type': 'boolean', 'role': ''},
        'maxcapacity':     {'type': 'number',  'role': ''},
        'currentcapacity': {'type': 'number',  'role': ''},
        'percent':         {'type': 'number',  'role': ''},
        'timeremaining':   {'type': 'number',  'role': ''},
        'acconnected':     {'type': 'boolean', 'role': ''},
        'type':            {'type': 'string',  'role': ''},
        'model':           {'type': 'string',  'role': ''},
        'manufacturer':    {'type': 'string',  'role': ''},
        'serial':          {'type': 'string',  'role': ''}
    },
    'graphics': {
        'controllers': [
            {
                'model':       {'type': 'string',  'role': ''},
                'vendor':      {'type': 'string',  'role': ''},
                'bus':         {'type': 'string',  'role': ''},
                'vram':        {'type': 'number',  'role': ''},
                'vramDynamic': {'type': 'number',  'role': ''}
            }
        ],
        'displays': [
            {
                'model':       {'type': 'string',  'role': ''},
                'main':        {'type': 'string',  'role': ''},
                'builtin':     {'type': 'boolean', 'role': ''},
                'connection':  {'type': 'string',  'role': ''},
                'sizex':       {'type': 'number',  'role': ''},
                'sizey':       {'type': 'number',  'role': ''},
                'pixeldepth':  {'type': 'number',  'role': ''},
                'resolutionx': {'type': 'number',  'role': ''},
                'resolutiony': {'type': 'number',  'role': ''}
            }
        ]
    },
    'osInfo': {
        'platform': {'type': 'string',  'role': ''},
        'distro':   {'type': 'string',  'role': ''},
        'release':  {'type': 'string',  'role': ''},
        'codename': {'type': 'string',  'role': ''},
        'kernel':   {'type': 'string',  'role': ''},
        'arch':     {'type': 'string',  'role': ''},
        'hostname': {'type': 'string',  'role': ''},
        'codepage': {'type': 'string',  'role': ''},
        'logofile': {'type': 'string',  'role': ''},
        'serial':   {'type': 'string',  'role': ''},
        'build':    {'type': 'string',  'role': ''}
    },
    'uuid': {
        'os': {'type': 'string',  'role': ''}
    },
    'shell': {'type': 'string',  'role': ''},
    'versions': {
        'kernel':           {'type': 'string',  'role': ''},
        'openssl':          {'type': 'string',  'role': ''},
        'systemOpenssl':    {'type': 'string',  'role': ''},
        'systemOpensslLib': {'type': 'string',  'role': ''},
        'node':             {'type': 'string',  'role': ''},
        'v8':               {'type': 'string',  'role': ''},
        'npm':              {'type': 'string',  'role': ''},
        'yarn':             {'type': 'string',  'role': ''},
        'pm2':              {'type': 'string',  'role': ''},
        'gulp':             {'type': 'string',  'role': ''},
        'grunt':            {'type': 'string',  'role': ''},
        'git':              {'type': 'string',  'role': ''},
        'tsc':              {'type': 'string',  'role': ''},
        'mysql':            {'type': 'string',  'role': ''},
        'redis':            {'type': 'string',  'role': ''},
        'mongodb':          {'type': 'string',  'role': ''},
        'apache':           {'type': 'string',  'role': ''},
        'ngginx':           {'type': 'string',  'role': ''},
        'php':              {'type': 'string',  'role': ''},
        'docker':           {'type': 'string',  'role': ''},
        'postfix':          {'type': 'string',  'role': ''},
        'postgresql':       {'type': 'string',  'role': ''},
        'perl':             {'type': 'string',  'role': ''},
        'python':           {'type': 'string',  'role': ''},
        'python3':          {'type': 'string',  'role': ''},
        'java':             {'type': 'string',  'role': ''},
        'gcc':              {'type': 'string',  'role': ''}
    },
    'users': [
        {
            'user':    {'type': 'string',  'role': ''},
            'tty':     {'type': 'string',  'role': ''},
            'date':    {'type': 'string',  'role': ''},
            'time':    {'type': 'string',  'role': ''},
            'ip':      {'type': 'string',  'role': ''},
            'command': {'type': 'string',  'role': ''}
        }
    ],
    'diskLayout': [
        {
            'device':            {'type': 'string',  'role': ''},
            'type':              {'type': 'string',  'role': ''},
            'name':              {'type': 'string',  'role': ''},
            'vendor':            {'type': 'string',  'role': ''},
            'size':              {'type': 'number',  'role': ''},
            'totalCylinders':    {'type': 'string',  'role': ''},
            'totalHeads':        {'type': 'number',  'role': ''},
            'totalTracks':       {'type': 'number',  'role': ''},
            'totalSectors':      {'type': 'string',  'role': ''},
            'tracksPerCylinder': {'type': 'number',  'role': ''},
            'sectorsPerTrack':   {'type': 'number',  'role': ''},
            'bytesPerSector':    {'type': 'number',  'role': ''},
            'firmwareRevision':  {'type': 'string',  'role': ''},
            'serialNum':         {'type': 'number',  'role': ''},
            'interfaceType':     {'type': 'string',  'role': ''},
            'smartStatus':       {'type': 'number',  'role': ''}
        }
    ], 
    'blockDevices': [
        {
            'name':      {'type': 'string',  'role': ''},
            'type':      {'type': 'string',  'role': ''},
            'fstype':    {'type': 'string',  'role': ''},
            'mount':     {'type': 'string',  'role': ''},
            'size':      {'type': 'number',  'role': ''},
            'physical':  {'type': 'string',  'role': ''},
            'uuid':      {'type': 'string',  'role': ''},
            'label':     {'type': 'string',  'role': ''},
            'model':     {'type': 'string',  'role': ''},
            'serial':    {'type': 'string',  'role': ''},
            'removable': {'type': 'boolean', 'role': ''},
            'protocol':  {'type': 'string',  'role': ''}
        }
    ],
    'disksIO': {
        'rIO':     {'type': 'number',  'role': ''},
        'wIO':     {'type': 'number',  'role': ''},
        'tIO':     {'type': 'number',  'role': ''},
        'rIO_sec': {'type': 'number',  'role': ''},
        'wIO_sec': {'type': 'number',  'role': ''},
        'tIO_sec': {'type': 'number',  'role': ''},
        'ms':      {'type': 'number',  'role': ''}
    },
    'fsSize': [
        {
            'fs':    {'type': 'string',  'role': ''},
            'type':  {'type': 'string',  'role': ''},
            'size':  {'type': 'number',  'role': ''},
            'used':  {'type': 'number',  'role': ''},
            'use':   {'type': 'number',  'role': ''},
            'mount': {'type': 'string',  'role': ''}
        }
    ],
    'fsStats': {
        'rx':     {'type': 'number',  'role': ''},
        'wx':     {'type': 'number',  'role': ''},
        'tx':     {'type': 'number',  'role': ''},
        'rx_sec': {'type': 'number',  'role': ''},
        'wx_sec': {'type': 'number',  'role': ''},
        'tx_sec': {'type': 'number',  'role': ''},
        'ms':     {'type': 'number',  'role': ''}
    },
    'networkInterfaces': [
        {
            'iface':            {'type': 'string',  'role': ''},
            'ifaceName':        {'type': 'string',  'role': ''},
            'ip4':              {'type': 'string',  'role': ''},
            'ip6':              {'type': 'string',  'role': ''},
            'mac':              {'type': 'string',  'role': ''},
            'internal':         {'type': 'boolean', 'role': ''},
            'operstate':        {'type': 'string',  'role': ''},
            'type':             {'type': 'string',  'role': ''},
            'duplex':           {'type': 'string',  'role': ''},
            'mtu':              {'type': 'string',  'role': ''},
            'speed':            {'type': 'string',  'role': ''},
            'carrierChanges':   {'type': 'string',  'role': ''}
       }
    ],
    'networkInterfaceDefault':  {'type': 'string',  'role': ''},
    'networkStats': [
        {
            'iface':     {'type': 'string',  'role': ''},
            'operstate': {'type': 'string',  'role': ''},
            'rx_bytes':  {'type': 'number',  'role': ''},
            'rx_errors': {'type': 'number',  'role': ''},
            'rx_dropped':{'type': 'number',  'role': ''},
            'tx_bytes':  {'type': 'number',  'role': ''},
            'tx_errors': {'type': 'number',  'role': ''},
            'tx_dropped':{'type': 'number',  'role': ''},
            'rx_sec':    {'type': 'number',  'role': ''},
            'tx_sec':    {'type': 'number',  'role': ''},
            'ms':        {'type': 'number',  'role': ''}
        }
    ],
    'networkConnections': [
        {
            'protocol':     {'type': 'string',  'role': ''},
            'localaddress': {'type': 'string',  'role': ''},
            'localport':    {'type': 'string',  'role': ''},
            'peeraddress':  {'type': 'string',  'role': ''},
            'peerport':     {'type': 'string',  'role': ''},
            'state':        {'type': 'string',  'role': ''}
        }
    ],
/*
    'inetChecksite': {
        'url':    {'type': 'string',  'role': ''},
        'ok':     {'type': 'string',  'role': ''},
        'status': {'type': 'string',  'role': ''},
        'ms':     {'type': 'number',  'role': ''}
    },
    'inetLatency': {'type': 'number',  'role': ''},
*/
    'currentLoad': {
        'avgload':            {'type': 'number',  'role': ''},
        'currentload':        {'type': 'number',  'role': ''},
        'currentload_user':   {'type': 'number',  'role': ''},
        'currentload_system': {'type': 'number',  'role': ''},
        'currentload_nice':   {'type': 'number',  'role': ''},
        'currentload_idle':   {'type': 'number',  'role': ''},
        'currentload_irq':    {'type': 'number',  'role': ''},
        'raw_currentload':    {'type': 'number',  'role': ''},
        'cpus': [
            {
                'load':        {'type': 'number',  'role': ''},
                'load_user':   {'type': 'number',  'role': ''},
                'load_system': {'type': 'number',  'role': ''},
                'load_nice':   {'type': 'number',  'role': ''},
                'load_idle':   {'type': 'number',  'role': ''},
                'load_irq':    {'type': 'number',  'role': ''}
            }
        ]
    },
    'fullLoad': {'type': 'number',  'role': ''},
    'processes': {
        'all':      {'type': 'number',  'role': ''},
        'running':  {'type': 'number',  'role': ''},
        'blocked':  {'type': 'number',  'role': ''},
        'sleeping': {'type': 'number',  'role': ''},
        'unknown':  {'type': 'number',  'role': ''},
        'list':     {'type': 'string',  'role': ''}
        // details see @Interval.js
    }
}

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
        adapter.log.silly('createEntry() state : ' + newId + ' value: ' + JSON.stringify(entry));
        createStateEntry(adapter, parent, id);
    } else if(isArrayEntry(entry)) {
        adapter.log.silly('createEntry() array : ' + newId + ' value: ' + JSON.stringify(entry));
        createChannelEntry(adapter, parent, id);
    } else {
        if(level > 5) {
            adapter.log.error('./lib/helper/createEntry() to deep level reached in ' + parent + ' for ' + id + ' in level ' + level);
        } else {
            adapter.log.silly('createEntry() channel : ' + newId + ' value: ' + JSON.stringify(entry));
            createChannelEntry(adapter, parent, id);
            for (const key in entry) {
                if (entry.hasOwnProperty(key)) {
                    const newEntry = entry[key];
                    adapter.log.silly('createEntry() recursion : ' + newEntry + ' value: ' + JSON.stringify(entry));
                    createEntry(adapter, newEntry, newId, key, ++level);
                }
            }
        }
    }
}

async function removeEntry(adapter, id2delete) {
    try {
        adapter.log.debug('deleting ' + id2delete);
        let deviceFound = false;
        // delete device recursive
        let devices = await adapter.getDevicesAsync();
        for (let j in devices) {
            let id = devices[j]._id.split('.').pop();
            if (id && id == id2delete) {
                deviceFound = true;
                let promiseDeleteChannels = [];
                // delete states below device
                adapter.log.debug('deleting states of device ' + id2delete);
                let states = await adapter.getStatesOfAsync(id2delete, id2delete);
                for (let j in states) {
                    let stateid = states[j]._id.split('.').pop();
                    let id = id2delete + '.' + stateid;
                    promiseDeleteChannels.push(await adapter.delObjectAsync(id));
                }
                // delete channels below device
                let channels = await adapter.getChannelsOfAsync(id2delete);
                adapter.log.debug('deleting channels of device ' + id2delete);
                for (let i in channels) {
                    let channelid = channels[i]._id.split('.').pop();
                    // delete states below channel
                    let states = await adapter.getStatesOfAsync(id2delete, channelid);
                    adapter.log.debug('deleting states of channel ' + channelid);
                    let promiseDeleteStates = [];
                    for (let j in states) {
                        let stateid = states[j]._id.split('.').pop();
                        let id = id2delete + '.' + channelid + '.' + stateid;
                        promiseDeleteStates.push(await adapter.delObjectAsync(id));
                    }
                    // wait for deletion of state children
                    await Promise.all(promiseDeleteStates);
                    // delete channel
                    promiseDeleteChannels.push(await adapter.deleteChannelAsync(id2delete, channelid));
                }
                // wait for deletion of state and channel children
                await Promise.all(promiseDeleteChannels);
                // delete device
                await adapter.deleteDeviceAsync(id2delete);
              }
        }
        // maybe it is a state directly connected to the moma.<instance> like 'cpuflags'
        if(!deviceFound) {
            // delete state
            adapter.log.debug('deleting state ' + id2delete + ' of ' + adapter.namespace);
            let states = await adapter.getStatesOfAsync(adapter.namespace);
            for (let j in states) {
                let id = states[j]._id.split('.').pop();
                if (id && id == id2delete) {
                    await adapter.delObjectAsync(id);
                }
            }
        }
    } catch (err) {
        adapter.log.error('error deleting objects: ' + err);
    }
 }

/**
 * Creates all entries for an array below a parent device or channel 
 */
module.exports.createArrayEntry = (adapter, parent, id) => {
    // don't create array entries for process list!
    if(parent =='processes.list') {
        return;
    }
    try {
        adapter.log.silly('createArrayEntry() parent : ' + parent + ' id: ' + id);
        let comp = parent.split('.')
        let template = sysInfo[comp[0]];
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
    const template = sysInfo;
    for (const key0 in template) {
        //adapter.log.debug('creating instance entries for ' + key0);
        if (template.hasOwnProperty(key0)) {
            const level0 = template[key0];
            // check configuration
            if(adapter.config[key0]) {
                // check for state entry
                if(isStateEntry(level0)) {
                    adapter.log.silly('createMomaInstanceEntries() state : ' + key0 + ' value: ' + JSON.stringify(level0));
                    createStateEntry(adapter, '', key0);
                // check for array entry
                } else if(isArrayEntry(level0)) {
                    adapter.log.silly('createMomaInstanceEntries() array : ' + key0 + ' value: ' + JSON.stringify(level0));
                    let parent0 = createDeviceEntry(adapter, null, key0);
                // not a state and not an object entry
                } else {
                    adapter.log.silly('createMomaInstanceEntries() device : ' + key0 + ' value: ' + JSON.stringify(level0));
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
    // needed definitions
    const defs = require(__dirname + '/definitions');
  
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

