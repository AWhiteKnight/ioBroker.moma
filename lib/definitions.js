// @ts-nocheck
const os = require('os');
// helper values
module.exports.base = 'moma.meta';
module.exports.hostsList = this.base + '.hosts';
module.exports.hostNeedsUpdate = this.base + '.hostNeedsUpdate';
module.exports.hostNeedsUpdateList = this.base + '.hostNeedsUpdateList';
module.exports.hostNeedsReboot = this.base + '.hostNeedsReboot';
module.exports.hostNeedsRebootList = this.base + '.hostNeedsRebootList';
module.exports.deviceNeedsBatteryChange = this.base + '.deviceNeedsBatteryChange';
module.exports.deviceNeedsBatteryChangeList = this.base + '.deviceNeedsBatteryChangeList';
module.exports.hostListEntry = this.hostsList + '.' + os.hostname();
module.exports.hostEntryInstance = this.hostListEntry + '.instance';
module.exports.hostEntryHasUpdates = this.hostListEntry + '.numUpdates';
module.exports.hostEntryNeedsReboot = this.hostListEntry + '.needsReboot';
module.exports.hostEntryListOfUpdates = this.hostListEntry + '.updates';

module.exports.sysInfo = {
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
    'uuids': {
        'os': {'type': 'string',  'role': ''}
    },
    'shell': {'type': 'string',  'role': ''},
    'packageversions': {
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
// TODO: how to implement?
/*
    'inetChecksite': {
        'url':    {'type': 'string',  'role': ''},
        'ok':     {'type': 'string',  'role': ''},
        'status': {'type': 'string',  'role': ''},
        'ms':     {'type': 'number',  'role': ''}
    },
*/
// TODO: how to implement?
/*
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
// TODO: how to implement?
/*
        [
            {
                'pid':      {'type': 'number',  'role': ''},
                'parentPid':{'type': 'number',  'role': ''},
                'name':     {'type': 'number',  'role': ''},
                'pcpu':     {'type': 'number',  'role': ''},
                'pcpuu':    {'type': 'number',  'role': ''},
                'pcpus':    {'type': 'number',  'role': ''},
                'pmem':     {'type': 'number',  'role': ''},
                'priority': {'type': 'number',  'role': ''},
                'mem_vsz':  {'type': 'number',  'role': ''},
                'mem_rss':  {'type': 'number',  'role': ''},
                'nice':     {'type': 'number',  'role': ''},
                'started':  {'type': 'number',  'role': ''},
                'state':    {'type': 'number',  'role': ''},
                'tty':      {'type': 'number',  'role': ''},
                'user':     {'type': 'number',  'role': ''},
                'command':  {'type': 'number',  'role': ''}
            }
        ]
*/
    }
}
