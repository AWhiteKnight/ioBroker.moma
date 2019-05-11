// @ts-nocheck
'use strict';

// structure of systeminformation data
const sysInfo = {
    'time': {
        'current':      {'type': 'number',  'role': 'date'},
        'uptime':       {'type': 'number',  'role': 'value'},
        'timezone':     {'type': 'string',  'role': 'text'},
        'timezoneName': {'type': 'string',  'role': 'text'}
    },
    'system': {
        'manufacturer': {'type': 'string',  'role': 'text'},
        'model':        {'type': 'string',  'role': 'text'},
        'version':      {'type': 'string',  'role': 'text'},
        'serial':       {'type': 'string',  'role': 'text'},
        'uuid':         {'type': 'string',  'role': 'text'},
        'sku':          {'type': 'string',  'role': 'text'}
    },
    'bios': {
        'vendor':      {'type': 'string',  'role': 'text'},
        'version':     {'type': 'string',  'role': 'text'},
        'releaseDate': {'type': 'string',  'role': 'date'},
        'revision':    {'type': 'string',  'role': 'text'}
    },
    'baseboard': {
        'manufacturer': {'type': 'string',  'role': 'text'},
        'model':        {'type': 'string',  'role': 'text'},
        'version':      {'type': 'string',  'role': 'text'},
        'serial':       {'type': 'string',  'role': 'text'},
        'assetTag':     {'type': 'string',  'role': 'text'}
    },
    'chassis': {
        'manufacturer': {'type': 'string',  'role': 'text'},
        'model':        {'type': 'string',  'role': 'text'},
        'type':         {'type': 'string',  'role': 'text'},
        'version':      {'type': 'string',  'role': 'text'},
        'serial':       {'type': 'string',  'role': 'text'},
        'assetTag':     {'type': 'string',  'role': 'text'},
        'sku':          {'type': 'string',  'role': 'text'}
    },
    'cpu': {
        'manufacturer': {'type': 'string',  'role': 'text'},
        'brand':        {'type': 'string',  'role': 'text'},
        'speed':        {'type': 'number',  'role': 'value'},
        'speedmin':     {'type': 'number',  'role': 'value.min'},
        'speedmax':     {'type': 'number',  'role': 'value.max'},
        'cores':        {'type': 'number',  'role': 'value'},
        'physicalCores':{'type': 'number',  'role': 'value'},
        'processors':   {'type': 'string',  'role': 'text'},
        'socket':       {'type': 'string',  'role': 'text'},
        'vendor':       {'type': 'string',  'role': 'text'},
        'family':       {'type': 'string',  'role': 'text'},
        'model':        {'type': 'string',  'role': 'text'},
        'stepping':     {'type': 'string',  'role': 'text'},
        'revision':     {'type': 'string',  'role': 'text'},
        'voltage':      {'type': 'number',  'role': 'value'},
        'cache': {
            'l1d': {'type': 'number',  'role': 'value'},
            'l1i': {'type': 'number',  'role': 'value'},
            'l2':  {'type': 'number',  'role': 'value'},
            'l3':  {'type': 'number',  'role': 'value'}
        }
    },
    'cpuFlags': {'type': 'string',  'role': ''},
    'cpuCurrentSpeed': {
        'avg':  {'type': 'number',  'role': 'value'},
        'min':  {'type': 'number',  'role': 'value'},
        'max':  {'type': 'number',  'role': 'value'},
        'cores': [{'type': 'number',  'role': 'value'}]   
    },
    'cpuTemperature': {
        'main': {'type': 'number',  'role': 'value'},
        'max':  {'type': 'number',  'role': 'value'},
        'cores':[{'type': 'number',  'role': 'value'}]
    },
    'mem': {
        'total':     {'type': 'number',  'role': 'value'},
        'free':      {'type': 'number',  'role': 'value'},
        'used':      {'type': 'number',  'role': 'value'},
        'active':    {'type': 'number',  'role': 'value'},
        'buffcache': {'type': 'number',  'role': 'value'},
        'available': {'type': 'number',  'role': 'value'},
        'swaptotal': {'type': 'number',  'role': 'value'},
        'swapused':  {'type': 'number',  'role': 'value'},
        'swapfree':  {'type': 'number',  'role': 'value'}
    },
    'memLayout': [ 
        {
            'size':              {'type': 'number',  'role': 'value'},
            'bank':              {'type': 'number',  'role': 'value'},
            'type':              {'type': 'string',  'role': 'text'},
            'clockSpeed':        {'type': 'number',  'role': 'value'},
            'formFactor':        {'type': 'number',  'role': 'value'},
            'manufacturer':      {'type': 'string',  'role': 'text'},
            'partNum':           {'type': 'number',  'role': 'value'},
            'serialNum':         {'type': 'number',  'role': 'value'},
            'voltageConfigured': {'type': 'number',  'role': 'value'},
            'voltageMin':        {'type': 'number',  'role': 'value'},
            'voltageMax':        {'type': 'number',  'role': 'value'}
        }
    ],
    'battery': {
        'hasbattery':      {'type': 'boolean', 'role': 'indicator'},
        'cyclecount':      {'type': 'number',  'role': 'value'},
        'ischarging':      {'type': 'boolean', 'role': 'indicator'},
        'maxcapacity':     {'type': 'number',  'role': 'value.max'},
        'currentcapacity': {'type': 'number',  'role': 'value.battery'},
        'percent':         {'type': 'number',  'role': 'value.battery'},
        'timeremaining':   {'type': 'number',  'role': 'value'},
        'acconnected':     {'type': 'boolean', 'role': 'indicator'},
        'type':            {'type': 'string',  'role': 'text'},
        'model':           {'type': 'string',  'role': 'text'},
        'manufacturer':    {'type': 'string',  'role': 'text'},
        'serial':          {'type': 'string',  'role': 'text'}
    },
    'graphics': {
        'controllers': [
            {
                'model':       {'type': 'string',  'role': 'text'},
                'vendor':      {'type': 'string',  'role': 'text'},
                'bus':         {'type': 'string',  'role': 'text'},
                'vram':        {'type': 'number',  'role': 'value'},
                'vramDynamic': {'type': 'number',  'role': 'value'}
            }
        ],
        'displays': [
            {
                'model':       {'type': 'string',  'role': 'text'},
                'main':        {'type': 'string',  'role': 'text'},
                'builtin':     {'type': 'boolean', 'role': 'indicator'},
                'connection':  {'type': 'string',  'role': 'text'},
                'sizex':       {'type': 'number',  'role': 'value'},
                'sizey':       {'type': 'number',  'role': 'value'},
                'pixeldepth':  {'type': 'number',  'role': 'value'},
                'resolutionx': {'type': 'number',  'role': 'value'},
                'resolutiony': {'type': 'number',  'role': 'value'}
            }
        ]
    },
    'osInfo': {
        'platform': {'type': 'string',  'role': 'text'},
        'distro':   {'type': 'string',  'role': 'text'},
        'release':  {'type': 'string',  'role': 'text'},
        'codename': {'type': 'string',  'role': 'text'},
        'kernel':   {'type': 'string',  'role': 'text'},
        'arch':     {'type': 'string',  'role': 'text'},
        'hostname': {'type': 'string',  'role': 'text'},
        'codepage': {'type': 'string',  'role': 'text'},
        'logofile': {'type': 'string',  'role': 'text'},
        'serial':   {'type': 'string',  'role': 'text'},
        'build':    {'type': 'string',  'role': 'text'}
    },
    'uuid': {
        'os': {'type': 'string',  'role': 'text'}
    },
    'shell': {'type': 'string',  'role': 'text'},
    'versions': {
        'kernel':           {'type': 'string',  'role': 'text'},
        'openssl':          {'type': 'string',  'role': 'text'},
        'systemOpenssl':    {'type': 'string',  'role': 'text'},
        'systemOpensslLib': {'type': 'string',  'role': 'text'},
        'node':             {'type': 'string',  'role': 'text'},
        'v8':               {'type': 'string',  'role': 'text'},
        'npm':              {'type': 'string',  'role': 'text'},
        'yarn':             {'type': 'string',  'role': 'text'},
        'pm2':              {'type': 'string',  'role': 'text'},
        'gulp':             {'type': 'string',  'role': 'text'},
        'grunt':            {'type': 'string',  'role': 'text'},
        'git':              {'type': 'string',  'role': 'text'},
        'tsc':              {'type': 'string',  'role': 'text'},
        'mysql':            {'type': 'string',  'role': 'text'},
        'redis':            {'type': 'string',  'role': 'text'},
        'mongodb':          {'type': 'string',  'role': 'text'},
        'apache':           {'type': 'string',  'role': 'text'},
        'ngginx':           {'type': 'string',  'role': 'text'},
        'php':              {'type': 'string',  'role': 'text'},
        'docker':           {'type': 'string',  'role': 'text'},
        'postfix':          {'type': 'string',  'role': 'text'},
        'postgresql':       {'type': 'string',  'role': 'text'},
        'perl':             {'type': 'string',  'role': 'text'},
        'python':           {'type': 'string',  'role': 'text'},
        'python3':          {'type': 'string',  'role': 'text'},
        'java':             {'type': 'string',  'role': 'text'},
        'gcc':              {'type': 'string',  'role': 'text'}
    },
    'users': [
        {
            'user':    {'type': 'string',  'role': 'text'},
            'tty':     {'type': 'string',  'role': 'text'},
            'date':    {'type': 'string',  'role': 'text'},
            'time':    {'type': 'string',  'role': 'text'},
            'ip':      {'type': 'string',  'role': 'text'},
            'command': {'type': 'string',  'role': 'text'}
        }
    ],
    'diskLayout': [
        {
            'device':            {'type': 'string',  'role': 'text'},
            'type':              {'type': 'string',  'role': 'text'},
            'name':              {'type': 'string',  'role': 'text'},
            'vendor':            {'type': 'string',  'role': 'text'},
            'size':              {'type': 'number',  'role': 'value'},
            'totalCylinders':    {'type': 'string',  'role': 'text'},
            'totalHeads':        {'type': 'number',  'role': 'value'},
            'totalTracks':       {'type': 'number',  'role': 'value'},
            'totalSectors':      {'type': 'string',  'role': 'text'},
            'tracksPerCylinder': {'type': 'number',  'role': 'value'},
            'sectorsPerTrack':   {'type': 'number',  'role': 'value'},
            'bytesPerSector':    {'type': 'number',  'role': 'value'},
            'firmwareRevision':  {'type': 'string',  'role': 'text'},
            'serialNum':         {'type': 'number',  'role': 'value'},
            'interfaceType':     {'type': 'string',  'role': 'text'},
            'smartStatus':       {'type': 'number',  'role': 'value'}
        }
    ], 
    'blockDevices': [
        {
            'name':      {'type': 'string',  'role': 'text'},
            'type':      {'type': 'string',  'role': 'text'},
            'fstype':    {'type': 'string',  'role': 'text'},
            'mount':     {'type': 'string',  'role': 'text'},
            'size':      {'type': 'number',  'role': 'value'},
            'physical':  {'type': 'string',  'role': 'text'},
            'uuid':      {'type': 'string',  'role': 'text'},
            'label':     {'type': 'string',  'role': 'text'},
            'model':     {'type': 'string',  'role': 'text'},
            'serial':    {'type': 'string',  'role': 'text'},
            'removable': {'type': 'boolean', 'role': 'indicator'},
            'protocol':  {'type': 'string',  'role': 'text'}
        }
    ],
    'disksIO': {
        'rIO':     {'type': 'number',  'role': 'value'},
        'wIO':     {'type': 'number',  'role': 'value'},
        'tIO':     {'type': 'number',  'role': 'value'},
        'rIO_sec': {'type': 'number',  'role': 'value'},
        'wIO_sec': {'type': 'number',  'role': 'value'},
        'tIO_sec': {'type': 'number',  'role': 'value'},
        'ms':      {'type': 'number',  'role': 'value'}
    },
    'fsSize': [
        {
            'fs':    {'type': 'string',  'role': 'text'},
            'type':  {'type': 'string',  'role': 'text'},
            'size':  {'type': 'number',  'role': 'value'},
            'used':  {'type': 'number',  'role': 'value'},
            'use':   {'type': 'number',  'role': 'value'},
            'mount': {'type': 'string',  'role': 'text'}
        }
    ],
    'fsStats': {
        'rx':     {'type': 'number',  'role': 'value'},
        'wx':     {'type': 'number',  'role': 'value'},
        'tx':     {'type': 'number',  'role': 'value'},
        'rx_sec': {'type': 'number',  'role': 'value'},
        'wx_sec': {'type': 'number',  'role': 'value'},
        'tx_sec': {'type': 'number',  'role': 'value'},
        'ms':     {'type': 'number',  'role': 'value'}
    },
    'networkInterfaces': [
        {
            'iface':            {'type': 'string',  'role': 'text'},
            'ifaceName':        {'type': 'string',  'role': 'text'},
            'ip4':              {'type': 'string',  'role': 'text'},
            'ip6':              {'type': 'string',  'role': 'text'},
            'mac':              {'type': 'string',  'role': 'text'},
            'internal':         {'type': 'boolean', 'role': 'indicator'},
            'operstate':        {'type': 'string',  'role': 'text'},
            'type':             {'type': 'string',  'role': 'text'},
            'duplex':           {'type': 'string',  'role': 'text'},
            'mtu':              {'type': 'string',  'role': 'text'},
            'speed':            {'type': 'string',  'role': 'text'},
            'carrierChanges':   {'type': 'string',  'role': 'text'}
       }
    ],
    'networkInterfaceDefault':  {'type': 'string',  'role': 'text'},
    'networkStats': [
        {
            'iface':     {'type': 'string',  'role': 'text'},
            'operstate': {'type': 'string',  'role': 'text'},
            'rx_bytes':  {'type': 'number',  'role': 'value'},
            'rx_errors': {'type': 'number',  'role': 'value'},
            'rx_dropped':{'type': 'number',  'role': 'value'},
            'tx_bytes':  {'type': 'number',  'role': 'value'},
            'tx_errors': {'type': 'number',  'role': 'value'},
            'tx_dropped':{'type': 'number',  'role': 'value'},
            'rx_sec':    {'type': 'number',  'role': 'value'},
            'tx_sec':    {'type': 'number',  'role': 'value'},
            'ms':        {'type': 'number',  'role': 'value'}
        }
    ],
    'networkConnections': [
        {
            'protocol':     {'type': 'string',  'role': 'text'},
            'localaddress': {'type': 'string',  'role': 'text'},
            'localport':    {'type': 'string',  'role': 'text'},
            'peeraddress':  {'type': 'string',  'role': 'text'},
            'peerport':     {'type': 'string',  'role': 'text'},
            'state':        {'type': 'string',  'role': 'text'}
        }
    ],
/*
    'inetChecksite': {
        'url':    {'type': 'string',  'role': 'text'},
        'ok':     {'type': 'string',  'role': 'text'},
        'status': {'type': 'string',  'role': 'text'},
        'ms':     {'type': 'number',  'role': 'value'}
    },
    'inetLatency': {'type': 'number',  'role': 'value'},
*/
    'currentLoad': {
        'avgload':            {'type': 'number',  'role': 'value'},
        'currentload':        {'type': 'number',  'role': 'value'},
        'currentload_user':   {'type': 'number',  'role': 'value'},
        'currentload_system': {'type': 'number',  'role': 'value'},
        'currentload_nice':   {'type': 'number',  'role': 'value'},
        'currentload_idle':   {'type': 'number',  'role': 'value'},
        'currentload_irq':    {'type': 'number',  'role': 'value'},
        'raw_currentload':    {'type': 'number',  'role': 'value'},
        'cpus': [
            {
                'load':        {'type': 'number',  'role': 'value'},
                'load_user':   {'type': 'number',  'role': 'value'},
                'load_system': {'type': 'number',  'role': 'value'},
                'load_nice':   {'type': 'number',  'role': 'value'},
                'load_idle':   {'type': 'number',  'role': 'value'},
                'load_irq':    {'type': 'number',  'role': 'value'}
            }
        ]
    },
    'fullLoad': {'type': 'number',  'role': 'value'},
    'processes': {
        'all':      {'type': 'number',  'role': 'value'},
        'running':  {'type': 'number',  'role': 'value'},
        'blocked':  {'type': 'number',  'role': 'value'},
        'sleeping': {'type': 'number',  'role': 'value'},
        'unknown':  {'type': 'number',  'role': 'value'},
        'list':     {'type': 'string',  'role': 'html'}
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

function createStateEntry(adapter, parent, newName, newType, newRole) {
    let id = newName
    if(parent != null && parent !== '') {
        id = parent+'.'+newName;
    }
    adapter.setObjectNotExists(id, {
        type: 'state',
        common: {
            name: newName,
            type: newType,
            role: newRole
        },
        native: {}
    });
}

function createEntry(adapter, entry, parent, id, level) {
    // adapter.log.debug('entry: ' + JSON.stringify(entry));
    const newId = parent+'.'+id;
    if(isStateEntry(entry)) {
        createStateEntry(adapter, parent, id, entry.type, entry.role);
    } else if(isArrayEntry(entry)) {
        createChannelEntry(adapter, parent, id);
    } else {
        if(level > 5) {
            adapter.log.error('./lib/helper/createEntry() to deep level reached in ' + parent + ' for ' + id + ' in level ' + level);
        } else {
            createChannelEntry(adapter, parent, id);
            for (const key in entry) {
                if (entry.hasOwnProperty(key)) {
                    const newEntry = entry[key];
                    createEntry(adapter, newEntry, newId, key, ++level);
                }
            }
        }
    }
}

async function removeEntry(adapter, id2delete) {
    try {
        let deviceFound = false;
        // delete device bottom up
        let devices = await adapter.getDevicesAsync();
        for (let j in devices) {
            let id = devices[j]._id.split('.').pop();
            if (id && id == id2delete) {
                deviceFound = true;
                let promiseDevicesChildrenDeleted = [];
                // delete channels below device
                let channels = await adapter.getChannelsOfAsync(id2delete);
                if(channels) {
                    for (let i in channels) {
                        let channelid = channels[i]._id.split('.').pop();
                        // delete states below channel
                        let states2 = await adapter.getStatesOfAsync(id2delete, channelid);
                        if(states2) {
                            let promiseChannelsChildrenDeleted = [];
                            for (let j in states2) {
                                let stateid = states2[j]._id.split('.').pop();
                                let id = id2delete + '.' + channelid + '.' + stateid;
                                try {
                                    promiseChannelsChildrenDeleted.push(await adapter.delObjectAsync(id));
                                } catch (err) {
                                    adapter.log.error('error deleting state ' + id + ' from channel ' + channelid + ': ' + err);
                                }
                            }
                            // wait for deletion of state children
                            await Promise.all(promiseChannelsChildrenDeleted);
                        }
                        // delete channel
                        try {
                            promiseDevicesChildrenDeleted.push(await adapter.deleteChannelAsync(id2delete, channelid));
                        } catch (err) {
                            adapter.log.error('error deleting channel ' + channelid + ' from device ' + id2delete + ': ' + err);
                        }
                    }
                }
                // delete states below device
                let states = await adapter.getStatesOfAsync(id2delete, id2delete);
                if(states) {
                    for (let j in states) {
                        let stateid = states[j]._id.split('.').pop();
                        let id = id2delete + '.' + stateid;
                        try {
                            promiseDevicesChildrenDeleted.push(await adapter.delObjectAsync(id));
                        } catch (err) {
                            adapter.log.error('error deleting state ' + id + ' from device ' + id2delete + ': ' + err);
                        }
                    }
                }
                // wait for deletion of state and channel children
                await Promise.all(promiseDevicesChildrenDeleted);
                // delete device
                await adapter.deleteDeviceAsync(id2delete);
            }
        }

        // maybe it is a state directly connected to the moma.<instance> like 'cpuflags'
        if (!deviceFound) {
            try {
                // delete state
                let states = await adapter.getStatesOfAsync(adapter.namespace);
                for (let j in states) {
                    let id = states[j]._id.split('.').pop();
                    if (id && id == id2delete) {
                        await adapter.delObjectAsync(id);
                    }
                }
            } catch(er) {
                adapter.log.error('error deleting state ' + id2delete + ': ' + err);
            }
        }
    } catch (err) {
        adapter.log.error('error deleting objects from ' + id2delete + ': ' + err);
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
    adapter.log.debug('creating moma instance entries');
    const template = sysInfo;
    for (const key0 in template) {
        if (template.hasOwnProperty(key0)) {
            const level0 = template[key0];
            // check configuration
            if(adapter.config[key0]) {
                // check for state entry
                if(isStateEntry(level0)) {
                    // adapter.log.debug('level0: ' + JSON.stringify(level0));
                    createStateEntry(adapter, '', key0, level0.type, level0.role);
                // check for array entry
                } else if(isArrayEntry(level0)) {
                    let parent0 = createDeviceEntry(adapter, null, key0);
                // not a state and not an object entry
                } else {
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
    adapter.log.debug('creating moma meta entries');
    // needed definitions
    const defs = require(__dirname + '/definitions');
  
    let state = {
        _id:  defs.hostNeedsAttention,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'hostNeedsAttention',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostNeedsAttentionList,
        type: 'state',
        common: {
            role:  'text',
            name:  'hostNeedsAttentionList',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
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
            role:  'text',
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
            role:  'text',
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
            role:  'text',
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
            role:  'text',
            name:  'instance',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryAlive,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'momaAlive',
            type:  'boolean',
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
            role:  'text',
            name:  'updates',
            type:  'string',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryLastUpdate,
        type: 'state',
        common: {
            role:  'date',
            name:  'lastUpdate',
            type:  'number',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);

    state = {
        _id:  defs.hostEntryNeedsAttention,
        type: 'state',
        common: {
            role:  'indicator',
            name:  'needsAttention',
            type:  'boolean',
            read:  true,
            write: false
        },
        native: {}
    };
    adapter.setForeignObjectNotExists(state._id, state);
} 

// end of helper functions

