const os = require('os');
// helper values
module.exports.base = 'moma.x';
module.exports.hostsBase = this.base + '.hosts';
module.exports.hostEntry = this.hostsBase + '.' + os.hostname();
module.exports.hostEntryInstance = this.hostEntry + '.instance';

module.exports.sysInfo = {
    "system": {
        "manufacturer": {"id": "info.system.manufacturer",   "type": "string",   "role": ""},
        "model":        {"id": "info.system.model",          "type": "string",   "role": ""},
        "version":      {"id": "info.system.version",        "type": "string",   "role": ""},
        "serial":       {"id": "info.system.serial",         "type": "string",   "role": ""},
        "uuid":         {"id": "info.system.uuid",           "type": "string",   "role": ""},
        "suk":          {"id": "info.system.suk",            "type": "string",   "role": ""}
    },
    "bios": {
        "vendor":       {"id": "info.bios.vendor",       "type": "string",   "role": ""},
        "version":      {"id": "info.bios.version",      "type": "string",   "role": ""},
        "releaseDate":  {"id": "info.bios.releaseDate",  "type": "string",   "role": ""},
        "revision":     {"id": "info.bios.revision",     "type": "string",   "role": ""}
    },
    "baseboard": {
        "manufacturer": {"id": "info.baseboard.manufacturer",    "type": "string",   "role": ""},
        "model":        {"id": "info.baseboard.model",           "type": "string",   "role": ""},
        "version":      {"id": "info.baseboard.version",         "type": "string",   "role": ""},
        "serial":       {"id": "info.baseboard.serial",          "type": "string",   "role": ""},
        "assetTag":     {"id": "info.baseboard.assetTag",        "type": "string",   "role": ""}
    },
    "osInfo": {
        "platform":     {"id": "info.osInfo.platform",   "type": "string",   "role": ""},
        "distro":       {"id": "info.osInfo.distro",     "type": "string",   "role": ""},
        "release":      {"id": "info.osInfo.release",    "type": "string",   "role": ""},
        "codename":     {"id": "info.osInfo.codename",   "type": "string",   "role": ""},
        "kernel":       {"id": "info.osInfo.kernel",     "type": "string",   "role": ""},
        "arch":         {"id": "info.osInfo.arch",       "type": "string",   "role": ""},
        "hostname":     {"id": "info.osInfo.hostname",   "type": "string",   "role": ""},
        "logofile":     {"id": "info.osInfo.logofile",   "type": "string",   "role": ""}
    },
    "cpu": {
        "manufacturer": {"id": "info.cpu.manufacturer",  "type": "string",   "role": ""},
        "brand":        {"id": "info.cpu.model",         "type": "string",   "role": ""},
        "speed":        {"id": "layout.cpu.speed",       "type": "number",   "role": ""},
        "speedmin":     {"id": "layout.cpu.speedmin",    "type": "number",   "role": ""},
        "speedmax":     {"id": "layout.cpu.speedmax",    "type": "number",   "role": ""},
        "cores":        {"id": "layout.cpu.cores",       "type": "number",   "role": ""},
        "vendor":       {"id": "info.cpu.vendor",        "type": "string",   "role": ""},
        "family":       {"id": "info.cpu.family",        "type": "string",   "role": ""},
        "model":        {"id": "info.cpu.model",         "type": "string",   "role": ""},
        "stepping":     {"id": "info.cpu.stepping",      "type": "string",   "role": ""},
        "revision":     {"id": "info.cpu.revision",      "type": "string",   "role": ""},
        "voltage":      {"id": "layout.cpu.voltage",     "type": "number",   "role": ""},
        "cacheL1d":     {"id": "layout.cpu.cache.l1d",   "type": "string",   "role": ""},
        "cacheL1i":     {"id": "layout.cpu.cache.l1i",   "type": "string",   "role": ""},
        "cacheL2":      {"id": "layout.cpu.cache.l2",    "type": "string",   "role": ""},
        "cacheL3":      {"id": "layout.cpu.cache.l3",    "type": "string",   "role": ""},
        "flags":        {"id": "info.cpu.flags",         "type": "string",   "role": ""}
    },
    "cpuspeed": {
        "average":      {"id": "state.cpu.speed.avg",    "type": "number",   "role": ""},
        "min":          {"id": "state.cpu.speed.min",    "type": "number",   "role": ""},
        "max":          {"id": "state.cpu.speed.max",    "type": "number",   "role": ""},
        "cores":        {"id": "state.cpu.speed.cores",  "type": "string",   "role": ""}
    },
    "cputemp": {
        "main":         {"id": "state.cpu.temp.main",   "type": "number",   "role": ""},
        "cores":        {"id": "state.cpu.temp.cores",  "type": "string",   "role": ""},
        "max":          {"id": "state.cpu.temp.max",    "type": "number",   "role": ""}
    },
    "mem": {
        "total":        {"id": "layout.mem.total",      "type": "number",   "role": ""},
        "free":         {"id": "state.mem.free",        "type": "number",   "role": ""},
        "used":         {"id": "state.mem.used",        "type": "number",   "role": ""},
        "active":       {"id": "state.mem.active",      "type": "number",   "role": ""},
        "buffcache":    {"id": "state.mem.buffcache",   "type": "number",   "role": ""},
        "available":    {"id": "state.mem.available",   "type": "number",   "role": ""},
        "swaptotal":    {"id": "layout.mem.swaptotal",  "type": "number",   "role": ""},
        "swapused":     {"id": "state.mem.swapused",    "type": "number",   "role": ""},
        "swapfree":     {"id": "state.mem.swapfree",    "type": "number",   "role": ""}
    },
    "battery": {
        "hasbattery":       {"id": "layout.battery.hasbattery",     "type": "boolean",  "role": ""},
        "cyclecount":       {"id": "state.battery.cyclecount",      "type": "number",   "role": ""},
        "ischarging":       {"id": "state.battery.ischarging",      "type": "boolean",  "role": ""},
        "maxcapacity":      {"id": "layout.battery.maxcapacity",    "type": "number",   "role": ""},
        "currentcapacity":  {"id": "state.battery.currentcapacity", "type": "number",   "role": ""},
        "percent":          {"id": "state.battery.percent",         "type": "number",   "role": ""},
        "timeremaining":    {"id": "state.battery.timeremaining",   "type": "number",   "role": ""},
        "acconnected":      {"id": "state.battery.acconnected",     "type": "boolean",  "role": ""},
        "type":             {"id": "info.battery.type",             "type": "string",   "role": ""},
        "model":            {"id": "info.battery.model",            "type": "string",   "role": ""},
        "manufacturer":     {"id": "info.battery.manufacturer",     "type": "string",   "role": ""},
        "serial":           {"id": "info.battery.serial",           "type": "string",   "role": ""}
    },
    "fsStats": {
        "rx":       {"id": "state.fsStats.rx",      "type": "number",   "role": ""},
        "wx":       {"id": "state.fsStats.wx",      "type": "number",   "role": ""},
        "tx":       {"id": "state.fsStats.tx",      "type": "number",   "role": ""},
        "rx_sec":   {"id": "state.fsStats.rx_esc",  "type": "number",   "role": ""},
        "wx_sec":   {"id": "state.fsStats.wx_sec",  "type": "number",   "role": ""},
        "tx_sec":   {"id": "state.fsStats.tx_sec",  "type": "number",   "role": ""},
        "ms":       {"id": "state.fsStats.ms",      "type": "number",   "role": ""}
    },
    "disksIO": {
        "rIO":      {"id": "state.disksIO.rx",      "type": "number",   "role": ""},
        "wIO":      {"id": "state.disksIO.wx",      "type": "number",   "role": ""},
        "tIO":      {"id": "state.disksIO.tx",      "type": "number",   "role": ""},
        "rIO_sec":  {"id": "state.disksIO.rx_esc",  "type": "number",   "role": ""},
        "wIO_sec":  {"id": "state.disksIO.wx_sec",  "type": "number",   "role": ""},
        "tIO_sec":  {"id": "state.disksIO.tx_sec",  "type": "number",   "role": ""},
        "ms":       {"id": "state.disksIO.ms",      "type": "number",   "role": ""}
    },
    "network": {
        "defaultIF":  {"id": "info.network.defaultIF",      "type": "string",   "role": ""}
    },
    "load": {
        "average":  {"id": "state.load.average",    "type": "number",   "role": ""},
        "current":  {"id": "state.load.current",    "type": "number",   "role": ""},
        "user":     {"id": "state.load.user",       "type": "number",   "role": ""},
        "system":   {"id": "state.load.system",     "type": "number",   "role": ""},
        "nice":     {"id": "state.load.nice",       "type": "number",   "role": ""},
        "idle":     {"id": "state.load.idle",       "type": "number",   "role": ""},
        "irq":      {"id": "state.load.irq",        "type": "number",   "role": ""}
    },
    "fullLoad": {
        "machine":  {"id": "state.fullLoad.machine",    "type": "number",   "role": ""},
    }
}

module.exports.sysTemplates = {
    "memLayout": {
        "size":                 {"id": "layout.mem.x.size",               "type": "number",   "role": ""},
        "bank":                 {"id": "layout.mem.x.bank",               "type": "number",   "role": ""},
        "type":                 {"id": "layout.mem.x.type",               "type": "string",   "role": ""},
        "clockSpeed":           {"id": "layout.mem.x.clockSpeed",         "type": "number",   "role": ""},
        "formFactor":           {"id": "layout.mem.x.formFactor",         "type": "number",   "role": ""},
        "manufacturer":         {"id": "info.mem.x.manufacturer",         "type": "string",   "role": ""},
        "partNum":              {"id": "info.mem.x.partNum",              "type": "number",   "role": ""},
        "serialNum":            {"id": "info.mem.x.serialNum",            "type": "number",   "role": ""},
        "voltageConfigured":    {"id": "layout.mem.x.voltageConfigured",  "type": "number",   "role": ""},
        "voltageMin":           {"id": "layout.mem.x.voltageMin",         "type": "number",   "role": ""},
        "voltageMax":           {"id": "layout.mem.x.voltageMax",         "type": "number",   "role": ""}
    },
    "diskLayout": {
        "type":             {"id": "layout.disk.x.type",               "type": "string",   "role": ""},
        "name":             {"id": "layout.disk.x.name",               "type": "string",   "role": ""},
        "vendor":           {"id": "info.disk.x.vendor",               "type": "string",   "role": ""},
        "firmwareRevision": {"id": "info.disk.x.firmwareRevision",     "type": "string",   "role": ""},
        "serialNum":        {"id": "info.disk.x.serialNum",            "type": "number",   "role": ""},
        "interfaceType":    {"id": "layout.disk.x.interfaceType",      "type": "string",   "role": ""},
        "size":             {"id": "layout.disk.x.size",               "type": "number",   "role": ""},
        "totalCylinders":   {"id": "layout.disk.x.totalCylinders",     "type": "string",   "role": ""},
        "totalHeads":       {"id": "layout.disk.x.totalHeads",         "type": "number",   "role": ""},
        "totalTracks":      {"id": "layout.disk.x.totalTracks",        "type": "number",   "role": ""},
        "tracksPerCylinder":{"id": "layout.disk.x.tracksPerCylinder",  "type": "number",   "role": ""},
        "sectorsPerTrack":  {"id": "layout.disk.x.sectorsPerTrack",    "type": "number",   "role": ""},
        "totalSectors":     {"id": "layout.disk.x.totalSectors",       "type": "string",   "role": ""},
        "bytesPerSector":   {"id": "layout.disk.x.bytesPerSector",     "type": "number",   "role": ""},
        "smartStatus":      {"id": "state.disk.x.smartStatus",         "type": "number",   "role": ""}
    },
    "graphiccontroller": {
        "model":        {"id": "info.graphiccontroller.x.model",            "type": "string",   "role": ""},
        "vendor":       {"id": "info.graphiccontroller.x.vendor",           "type": "string",   "role": ""},
        "bus":          {"id": "layout.graphiccontroller.x.bus",            "type": "string",   "role": ""},
        "vram":         {"id": "layout.graphiccontroller.x.vram",           "type": "number",   "role": ""},
        "vramDynamic":  {"id": "layout.graphiccontroller.x.vramDynamic",    "type": "number",   "role": ""}
    },
    "display": {
        "model":        {"id": "info.display.x.model",          "type": "string",   "role": ""},
        "main":         {"id": "info.display.x.main",           "type": "string",   "role": ""},
        "builtin":      {"id": "layout.display.x.builtin",      "type": "boolean",  "role": ""},
        "connection":   {"id": "info.display.x.connection",     "type": "string",   "role": ""},
        "resolutionx":  {"id": "layout.display.x.resolutionx",  "type": "number",   "role": ""},
        "resolutiony":  {"id": "layout.display.x.resolutiony",  "type": "number",   "role": ""},
        "pixeldepth":   {"id": "layout.display.x.pixeldepth",   "type": "number",   "role": ""},
        "sizex":        {"id": "layout.display.x.sizex",        "type": "number",   "role": ""},
        "sizey":        {"id": "layout.display.x.sizey",        "type": "number",   "role": ""}
    },
    "user": {
        "user":     {"id": "state.user.x.user",     "type": "string",   "role": ""},
        "tty":      {"id": "state.user.x.tty",      "type": "string",   "role": ""},
        "date":     {"id": "state.user.x.date",     "type": "string",   "role": ""},
        "time":     {"id": "state.user.x.time",     "type": "string",   "role": ""},
        "ip":       {"id": "state.user.x.ip",       "type": "string",   "role": ""},
        "command":  {"id": "state.user.x.command",  "type": "string",   "role": ""}
    },
    "fsSize": {
        "fs":           {"id": "state.fs.x.fs",    "type": "string",   "role": ""},
        "type":         {"id": "state.fs.x.type",  "type": "string",   "role": ""},
        "size":         {"id": "state.fs.x.size",  "type": "number",   "role": ""},
        "used":         {"id": "state.fs.x.used",  "type": "number",   "role": ""},
        "use":          {"id": "state.fs.x.use",   "type": "number",   "role": ""},
        "mount":        {"id": "state.fs.x.mount", "type": "string",   "role": ""}
    },
    "blockDevices": {
        "name":         {"id": "state.bdev.x.fs",       "type": "string",   "role": ""},
        "type":         {"id": "state.bdev.x.type",     "type": "string",   "role": ""},
        "fstype":       {"id": "state.bdev.x.fstype",   "type": "string",   "role": ""},
        "mount":        {"id": "state.bdev.x.mount",    "type": "string",   "role": ""},
        "size":         {"id": "state.bdev.x.size",     "type": "number",   "role": ""},
        "physical":     {"id": "state.bdev.x.physical", "type": "string",   "role": ""},
        "uuid":         {"id": "state.bdev.x.uuid",     "type": "string",   "role": ""},
        "label":        {"id": "state.bdev.x.label",    "type": "string",   "role": ""},
        "model":        {"id": "state.bdev.x.model",    "type": "string",   "role": ""},
        "serial":       {"id": "state.bdev.x.serial",   "type": "string",   "role": ""},
        "removable":    {"id": "state.bdev.x.removable","type": "boolean",  "role": ""},
        "protocol":     {"id": "state.bdev.x.protocol", "type": "string",   "role": ""}
    },
    "network": {
        "iface":    {"id": "layout.network.x.iface",    "type": "string",   "role": ""},
        "ip4":      {"id": "layout.network.x.ip4",      "type": "string",   "role": ""},
        "ip6":      {"id": "layout.network.x.ip6",      "type": "string",   "role": ""},
        "mac":      {"id": "layout.network.x.mac",      "type": "string",   "role": ""},
        "internal": {"id": "layout.network.x.internal", "type": "boolean",  "role": ""}
    },
    "networkStats": {
        "iface":        {"id": "state.network.x.iface",        "type": "string",   "role": ""},
        "operstate":    {"id": "state.network.x.operstate",    "type": "string",   "role": ""},
        "rx":           {"id": "state.network.x.rx",           "type": "number",   "role": ""},
        "tx":           {"id": "state.network.x.tx",           "type": "number",   "role": ""},
        "rx_sec":       {"id": "state.network.x.rx_sec",       "type": "number",   "role": ""},
        "tx_sec":       {"id": "state.network.x.tx_sec",       "type": "number",   "role": ""},
        "ms":           {"id": "state.network.x.ms",           "type": "number",   "role": ""}
    },
    "networkConnections": {
        "protocol":     {"id": "state.network.connections.x.protocol",      "type": "string",   "role": ""},
        "localaddress": {"id": "state.network.connections.x.localaddress",  "type": "string",   "role": ""},
        "localport":    {"id": "state.network.connections.x.localport",     "type": "string",   "role": ""},
        "peeraddress":  {"id": "state.network.connections.x.peeraddress",   "type": "string",   "role": ""},
        "peerport":     {"id": "state.network.connections.x.peerport",      "type": "string",   "role": ""},
        "state":        {"id": "state.network.connections.x.state",         "type": "string",   "role": ""}
    },
    "load": {
        "current":  {"id": "state.load.core.x.current",    "type": "number",   "role": ""},
        "user":     {"id": "state.load.core.x.user",       "type": "number",   "role": ""},
        "system":   {"id": "state.load.core.x.system",     "type": "number",   "role": ""},
        "nice":     {"id": "state.load.core.x.nice",       "type": "number",   "role": ""},
        "idle":     {"id": "state.load.core.x.idle",       "type": "number",   "role": ""},
        "irq":      {"id": "state.load.core.x.irq",        "type": "number",   "role": ""}
    }
}