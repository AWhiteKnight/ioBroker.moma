const os = require('os');
// helper values
module.exports.base = 'moma.x';
module.exports.hostsBase = this.base + '.hosts';
module.exports.hostEntry = this.hostsBase + '.' + os.hostname();
module.exports.hostEntryInstance = this.hostEntry + '.instance';

module.exports.sysInfo = {
    "time": {
        "current":      {"id": "time.current",   "type": "number",   "role": ""},
        "uptime":       {"id": "time.uptime",    "type": "number",   "role": ""},
        "timezone":     {"id": "time.timezone",  "type": "string",   "role": ""},
        "name":         {"id": "time.name",      "type": "string",   "role": ""}
    },
    "system": {
        "manufacturer": {"id": "system.manufacturer",   "type": "string",   "role": ""},
        "model":        {"id": "system.model",          "type": "string",   "role": ""},
        "version":      {"id": "system.version",        "type": "string",   "role": ""},
        "serial":       {"id": "system.serial",         "type": "string",   "role": ""},
        "uuid":         {"id": "system.uuid",           "type": "string",   "role": ""},
        "suk":          {"id": "system.suk",            "type": "string",   "role": ""}
    },
    "bios": {
        "vendor":       {"id": "bios.vendor",       "type": "string",   "role": ""},
        "version":      {"id": "bios.version",      "type": "string",   "role": ""},
        "releaseDate":  {"id": "bios.releaseDate",  "type": "string",   "role": ""},
        "revision":     {"id": "bios.revision",     "type": "string",   "role": ""}
    },
    "baseboard": {
        "manufacturer": {"id": "baseboard.manufacturer",    "type": "string",   "role": ""},
        "model":        {"id": "baseboard.model",           "type": "string",   "role": ""},
        "version":      {"id": "baseboard.version",         "type": "string",   "role": ""},
        "serial":       {"id": "baseboard.serial",          "type": "string",   "role": ""},
        "assetTag":     {"id": "baseboard.assetTag",        "type": "string",   "role": ""}
    },
    "osInfo": {
        "platform":     {"id": "osInfo.platform",   "type": "string",   "role": ""},
        "distro":       {"id": "osInfo.distro",     "type": "string",   "role": ""},
        "release":      {"id": "osInfo.release",    "type": "string",   "role": ""},
        "codename":     {"id": "osInfo.codename",   "type": "string",   "role": ""},
        "kernel":       {"id": "osInfo.kernel",     "type": "string",   "role": ""},
        "arch":         {"id": "osInfo.arch",       "type": "string",   "role": ""},
        "hostname":     {"id": "osInfo.hostname",   "type": "string",   "role": ""},
        "logofile":     {"id": "osInfo.logofile",   "type": "string",   "role": ""}
    },
    "cpu": {
        "manufacturer": {"id": "cpu.manufacturer",  "type": "string",   "role": ""},
        "brand":        {"id": "cpu.model",         "type": "string",   "role": ""},
        "speed":        {"id": "cpu.speed",         "type": "number",   "role": ""},
        "speedmin":     {"id": "cpu.speedmin",      "type": "number",   "role": ""},
        "speedmax":     {"id": "cpu.speedmax",      "type": "number",   "role": ""},
        "cores":        {"id": "cpu.cores",         "type": "number",   "role": ""},
        "vendor":       {"id": "cpu.vendor",        "type": "string",   "role": ""},
        "family":       {"id": "cpu.family",        "type": "string",   "role": ""},
        "model":        {"id": "cpu.model",         "type": "string",   "role": ""},
        "stepping":     {"id": "cpu.stepping",      "type": "string",   "role": ""},
        "revision":     {"id": "cpu.revision",      "type": "string",   "role": ""},
        "voltage":      {"id": "cpu.voltage",       "type": "number",   "role": ""},
        "cacheL1d":     {"id": "cpu.cache.l1d",     "type": "string",   "role": ""},
        "cacheL1i":     {"id": "cpu.cache.l1i",     "type": "string",   "role": ""},
        "cacheL2":      {"id": "cpu.cache.l2",      "type": "string",   "role": ""},
        "cacheL3":      {"id": "cpu.cache.l3",      "type": "string",   "role": ""},
        "flags":        {"id": "cpu.flags",         "type": "string",   "role": ""}
    },
    "cpuspeed": {
        "average":      {"id": "cpu.speed.avg",    "type": "number",   "role": ""},
        "min":          {"id": "cpu.speed.min",    "type": "number",   "role": ""},
        "max":          {"id": "cpu.speed.max",    "type": "number",   "role": ""},
        "cores":        {"id": "cpu.speed.cores",  "type": "string",   "role": ""}
    },
    "cputemp": {
        "main":         {"id": "cpu.temp.main",   "type": "number",   "role": ""},
        "cores":        {"id": "cpu.temp.cores",  "type": "string",   "role": ""},
        "max":          {"id": "cpu.temp.max",    "type": "number",   "role": ""}
    },
    "mem": {
        "total":        {"id": "mem.total",      "type": "number",   "role": ""},
        "free":         {"id": "mem.free",       "type": "number",   "role": ""},
        "used":         {"id": "mem.used",       "type": "number",   "role": ""},
        "active":       {"id": "mem.active",     "type": "number",   "role": ""},
        "buffcache":    {"id": "mem.buffcache",  "type": "number",   "role": ""},
        "available":    {"id": "mem.available",  "type": "number",   "role": ""},
        "swaptotal":    {"id": "mem.swaptotal",  "type": "number",   "role": ""},
        "swapused":     {"id": "mem.swapused",   "type": "number",   "role": ""},
        "swapfree":     {"id": "mem.swapfree",   "type": "number",   "role": ""}
    },
    "battery": {
        "hasbattery":       {"id": "battery.hasbattery",        "type": "boolean",  "role": ""},
        "cyclecount":       {"id": "battery.cyclecount",        "type": "number",   "role": ""},
        "ischarging":       {"id": "battery.ischarging",        "type": "boolean",  "role": ""},
        "maxcapacity":      {"id": "battery.maxcapacity",       "type": "number",   "role": ""},
        "currentcapacity":  {"id": "battery.currentcapacity",   "type": "number",   "role": ""},
        "percent":          {"id": "battery.percent",           "type": "number",   "role": ""},
        "timeremaining":    {"id": "battery.timeremaining",     "type": "number",   "role": ""},
        "acconnected":      {"id": "battery.acconnected",       "type": "boolean",  "role": ""},
        "type":             {"id": "battery.type",              "type": "string",   "role": ""},
        "model":            {"id": "battery.model",             "type": "string",   "role": ""},
        "manufacturer":     {"id": "battery.manufacturer",      "type": "string",   "role": ""},
        "serial":           {"id": "battery.serial",            "type": "string",   "role": ""}
    },
    "fsStats": {
        "rx":       {"id": "fsStats.rx",      "type": "number",   "role": ""},
        "wx":       {"id": "fsStats.wx",      "type": "number",   "role": ""},
        "tx":       {"id": "fsStats.tx",      "type": "number",   "role": ""},
        "rx_sec":   {"id": "fsStats.rx_esc",  "type": "number",   "role": ""},
        "wx_sec":   {"id": "fsStats.wx_sec",  "type": "number",   "role": ""},
        "tx_sec":   {"id": "fsStats.tx_sec",  "type": "number",   "role": ""},
        "ms":       {"id": "fsStats.ms",      "type": "number",   "role": ""}
    },
    "disksIO": {
        "rIO":      {"id": "disksIO.rx",      "type": "number",   "role": ""},
        "wIO":      {"id": "disksIO.wx",      "type": "number",   "role": ""},
        "tIO":      {"id": "disksIO.tx",      "type": "number",   "role": ""},
        "rIO_sec":  {"id": "disksIO.rx_esc",  "type": "number",   "role": ""},
        "wIO_sec":  {"id": "disksIO.wx_sec",  "type": "number",   "role": ""},
        "tIO_sec":  {"id": "disksIO.tx_sec",  "type": "number",   "role": ""},
        "ms":       {"id": "disksIO.ms",      "type": "number",   "role": ""}
    },
    "network": {
        "default":  {"id": "network.default",      "type": "string",   "role": ""}
    },
    "load": {
        "average":  {"id": "load.average",    "type": "number",   "role": ""},
        "current":  {"id": "load.current",    "type": "number",   "role": ""},
        "user":     {"id": "load.user",       "type": "number",   "role": ""},
        "system":   {"id": "load.system",     "type": "number",   "role": ""},
        "nice":     {"id": "load.nice",       "type": "number",   "role": ""},
        "idle":     {"id": "load.idle",       "type": "number",   "role": ""},
        "irq":      {"id": "load.irq",        "type": "number",   "role": ""}
    },
    "fullLoad": {
        "machine":  {"id": "fullLoad.machine",    "type": "number",   "role": ""},
    },
    "processes": {
        "all":      {"id": "processes.all",       "type": "number",   "role": ""},
        "running":  {"id": "processes.running",   "type": "number",   "role": ""},
        "blocked":  {"id": "processes.blocked",   "type": "number",   "role": ""},
        "sleeping": {"id": "processes.sleeping",  "type": "number",   "role": ""},
        "unknown":  {"id": "processes.unknown",   "type": "number",   "role": ""}
    }
}

module.exports.sysTemplates = {
    "memLayout": {
        "size":                 {"id": "mem.x.size",               "type": "number",   "role": ""},
        "bank":                 {"id": "mem.x.bank",               "type": "number",   "role": ""},
        "type":                 {"id": "mem.x.type",               "type": "string",   "role": ""},
        "clockSpeed":           {"id": "mem.x.clockSpeed",         "type": "number",   "role": ""},
        "formFactor":           {"id": "mem.x.formFactor",         "type": "number",   "role": ""},
        "manufacturer":         {"id": "mem.x.manufacturer",       "type": "string",   "role": ""},
        "partNum":              {"id": "mem.x.partNum",            "type": "number",   "role": ""},
        "serialNum":            {"id": "mem.x.serialNum",          "type": "number",   "role": ""},
        "voltageConfigured":    {"id": "mem.x.voltageConfigured",  "type": "number",   "role": ""},
        "voltageMin":           {"id": "mem.x.voltageMin",         "type": "number",   "role": ""},
        "voltageMax":           {"id": "mem.x.voltageMax",         "type": "number",   "role": ""}
    },
    "diskLayout": {
        "type":             {"id": "disc.x.type",               "type": "string",   "role": ""},
        "name":             {"id": "disc.x.name",               "type": "string",   "role": ""},
        "vendor":           {"id": "disc.x.vendor",             "type": "string",   "role": ""},
        "firmwareRevision": {"id": "disc.x.firmwareRevision",   "type": "string",   "role": ""},
        "serialNum":        {"id": "disc.x.serialNum",          "type": "number",   "role": ""},
        "interfaceType":    {"id": "disc.x.interfaceType",      "type": "string",   "role": ""},
        "size":             {"id": "disc.x.size",               "type": "number",   "role": ""},
        "totalCylinders":   {"id": "disc.x.totalCylinders",     "type": "string",   "role": ""},
        "totalHeads":       {"id": "disc.x.totalHeads",         "type": "number",   "role": ""},
        "totalTracks":      {"id": "disc.x.totalTracks",        "type": "number",   "role": ""},
        "tracksPerCylinder":{"id": "disc.x.tracksPerCylinder",  "type": "number",   "role": ""},
        "sectorsPerTrack":  {"id": "disc.x.sectorsPerTrack",    "type": "number",   "role": ""},
        "totalSectors":     {"id": "disc.x.totalSectors",       "type": "string",   "role": ""},
        "bytesPerSector":   {"id": "disc.x.bytesPerSector",     "type": "number",   "role": ""},
        "smartStatus":      {"id": "disc.x.smartStatus",        "type": "number",   "role": ""}
    },
    "graphiccontroller": {
        "model":        {"id": "graphiccontroller.x.model",          "type": "string",   "role": ""},
        "vendor":       {"id": "graphiccontroller.x.vendor",         "type": "string",   "role": ""},
        "bus":          {"id": "graphiccontroller.x.bus",            "type": "string",   "role": ""},
        "vram":         {"id": "graphiccontroller.x.vram",           "type": "number",   "role": ""},
        "vramDynamic":  {"id": "graphiccontroller.x.vramDynamic",    "type": "number",   "role": ""}
    },
    "display": {
        "model":        {"id": "display.x.model",        "type": "string",   "role": ""},
        "main":         {"id": "display.x.main",         "type": "string",   "role": ""},
        "builtin":      {"id": "display.x.builtin",      "type": "boolean",  "role": ""},
        "connection":   {"id": "display.x.connection",   "type": "string",   "role": ""},
        "resolutionx":  {"id": "display.x.resolutionx",  "type": "number",   "role": ""},
        "resolutiony":  {"id": "display.x.resolutiony",  "type": "number",   "role": ""},
        "pixeldepth":   {"id": "display.x.pixeldepth",   "type": "number",   "role": ""},
        "sizex":        {"id": "display.x.sizex",        "type": "number",   "role": ""},
        "sizey":        {"id": "display.x.sizey",        "type": "number",   "role": ""}
    },
    "user": {
        "user":     {"id": "user.x.user",     "type": "string",   "role": ""},
        "tty":      {"id": "user.x.tty",      "type": "string",   "role": ""},
        "date":     {"id": "user.x.date",     "type": "string",   "role": ""},
        "time":     {"id": "user.x.time",     "type": "string",   "role": ""},
        "ip":       {"id": "user.x.ip",       "type": "string",   "role": ""},
        "command":  {"id": "user.x.command",  "type": "string",   "role": ""}
    },
    "fsSize": {
        "fs":           {"id": "fs.x.fs",    "type": "string",   "role": ""},
        "type":         {"id": "fs.x.type",  "type": "string",   "role": ""},
        "size":         {"id": "fs.x.size",  "type": "number",   "role": ""},
        "used":         {"id": "fs.x.used",  "type": "number",   "role": ""},
        "use":          {"id": "fs.x.use",   "type": "number",   "role": ""},
        "mount":        {"id": "fs.x.mount", "type": "string",   "role": ""}
    },
    "blockDevices": {
        "name":         {"id": "bdev.x.fs",       "type": "string",   "role": ""},
        "type":         {"id": "bdev.x.type",     "type": "string",   "role": ""},
        "fstype":       {"id": "bdev.x.fstype",   "type": "string",   "role": ""},
        "mount":        {"id": "bdev.x.mount",    "type": "string",   "role": ""},
        "size":         {"id": "bdev.x.size",     "type": "number",   "role": ""},
        "physical":     {"id": "bdev.x.physical", "type": "string",   "role": ""},
        "uuid":         {"id": "bdev.x.uuid",     "type": "string",   "role": ""},
        "label":        {"id": "bdev.x.label",    "type": "string",   "role": ""},
        "model":        {"id": "bdev.x.model",    "type": "string",   "role": ""},
        "serial":       {"id": "bdev.x.serial",   "type": "string",   "role": ""},
        "removable":    {"id": "bdev.x.removable","type": "boolean",  "role": ""},
        "protocol":     {"id": "bdev.x.protocol", "type": "string",   "role": ""}
    },
    "network": {
        "iface":    {"id": "layout.network.x.iface",    "type": "string",   "role": ""},
        "ip4":      {"id": "layout.network.x.ip4",      "type": "string",   "role": ""},
        "ip6":      {"id": "layout.network.x.ip6",      "type": "string",   "role": ""},
        "mac":      {"id": "layout.network.x.mac",      "type": "string",   "role": ""},
        "internal": {"id": "layout.network.x.internal", "type": "boolean",  "role": ""}
    },
    "networkStats": {
        "iface":        {"id": "network.x.stats.iface",        "type": "string",   "role": ""},
        "operstate":    {"id": "network.x.stats.operstate",    "type": "string",   "role": ""},
        "rx":           {"id": "network.x.stats.rx",           "type": "number",   "role": ""},
        "tx":           {"id": "network.x.stats.tx",           "type": "number",   "role": ""},
        "rx_sec":       {"id": "network.x.stats.rx_sec",       "type": "number",   "role": ""},
        "tx_sec":       {"id": "network.x.stats.tx_sec",       "type": "number",   "role": ""},
        "ms":           {"id": "network.x.stats.ms",           "type": "number",   "role": ""}
    },
    "networkConnections": {
        "protocol":     {"id": "network.x.connections.protocol",      "type": "string",   "role": ""},
        "localaddress": {"id": "network.x.connections.localaddress",  "type": "string",   "role": ""},
        "localport":    {"id": "network.x.connections.localport",     "type": "string",   "role": ""},
        "peeraddress":  {"id": "network.x.connections.peeraddress",   "type": "string",   "role": ""},
        "peerport":     {"id": "network.x.connections.peerport",      "type": "string",   "role": ""},
        "state":        {"id": "network.x.connections.state",         "type": "string",   "role": ""}
    },
    "load": {
        "current":  {"id": "load.core.x.current",    "type": "number",   "role": ""},
        "user":     {"id": "load.core.x.user",       "type": "number",   "role": ""},
        "system":   {"id": "load.core.x.system",     "type": "number",   "role": ""},
        "nice":     {"id": "load.core.x.nice",       "type": "number",   "role": ""},
        "idle":     {"id": "load.core.x.idle",       "type": "number",   "role": ""},
        "irq":      {"id": "load.core.x.irq",        "type": "number",   "role": ""}
    }
}