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
        "speed":        {"id": "info.cpu.speed",         "type": "number",   "role": ""},
        "speedmin":     {"id": "info.cpu.speedmin",      "type": "number",   "role": ""},
        "speedmax":     {"id": "info.cpu.speedmax",      "type": "number",   "role": ""},
        "cores":        {"id": "info.cpu.cores",         "type": "number",   "role": ""},
        "vendor":       {"id": "info.cpu.vendor",        "type": "string",   "role": ""},
        "family":       {"id": "info.cpu.family",        "type": "string",   "role": ""},
        "model":        {"id": "info.cpu.model",         "type": "string",   "role": ""},
        "stepping":     {"id": "info.cpu.stepping",      "type": "string",   "role": ""},
        "revision":     {"id": "info.cpu.revision",      "type": "string",   "role": ""},
        "voltage":      {"id": "info.cpu.voltage",       "type": "number",   "role": ""},
        "cache-l1d":    {"id": "info.cpu.cache.l1d",     "type": "string",   "role": ""},
        "cache-l1i":    {"id": "info.cpu.cache.l1i",     "type": "string",   "role": ""},
        "cache-l2":     {"id": "info.cpu.cache.l2",      "type": "string",   "role": ""},
        "cache-l3":     {"id": "info.cpu.cache.l3",      "type": "string",   "role": ""},
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
        "total":        {"id": "state.mem.total",       "type": "number",   "role": ""},
        "free":         {"id": "state.mem.free",        "type": "number",   "role": ""},
        "used":         {"id": "state.mem.used",        "type": "number",   "role": ""},
        "active":       {"id": "state.mem.active",      "type": "number",   "role": ""},
        "buffcache":    {"id": "state.mem.buffcache",   "type": "number",   "role": ""},
        "available":    {"id": "state.mem.available",   "type": "number",   "role": ""},
        "swaptotal":    {"id": "state.mem.swaptotal",   "type": "number",   "role": ""},
        "swapused":     {"id": "state.mem.swapused",    "type": "number",   "role": ""},
        "swapfree":     {"id": "state.mem.swapfree",    "type": "number",   "role": ""}
    }
}

module.exports.sysTemplates = {
    "memLayout": {
        "size":                 {"id": "layout.mem.x.size",               "type": "number",   "role": ""},
        "bank":                 {"id": "layout.mem.x.bank",               "type": "number",   "role": ""},
        "type":                 {"id": "layout.mem.x.type",               "type": "string",   "role": ""},
        "clockSpeed":           {"id": "layout.mem.x.clockSpeed",         "type": "number",   "role": ""},
        "formFactor":           {"id": "layout.mem.x.formFactor",         "type": "number",   "role": ""},
        "manufacturer":         {"id": "layout.mem.x.manufacturer",       "type": "string",   "role": ""},
        "partNum":              {"id": "layout.mem.x.partNum",            "type": "number",   "role": ""},
        "serialNum":            {"id": "layout.mem.x.serialNum",          "type": "number",   "role": ""},
        "voltageConfigured":    {"id": "layout.mem.x.voltageConfigured",  "type": "number",   "role": ""},
        "voltageMin":           {"id": "layout.mem.x.voltageMin",         "type": "number",   "role": ""},
        "voltageMax":           {"id": "layout.mem.x.voltageMax",         "type": "number",   "role": ""}
    },
    "diskLayout": {
        "type":             {"id": "layout.disk.x.type",               "type": "string",   "role": ""},
        "name":             {"id": "layout.disk.x.name",               "type": "string",   "role": ""},
        "vendor":           {"id": "layout.disk.x.vendor",             "type": "string",   "role": ""},
        "firmwareRevision": {"id": "layout.disk.x.firmwareRevision",   "type": "string",   "role": ""},
        "serialNum":        {"id": "layout.disk.x.serialNum",          "type": "number",   "role": ""},
        "interfaceType":    {"id": "layout.disk.x.interfaceType",      "type": "string",   "role": ""},
        "size":             {"id": "layout.disk.x.size",               "type": "number",   "role": ""},
        "totalCylinders":   {"id": "layout.disk.x.totalCylinders",     "type": "string",   "role": ""},
        "totalHeads":       {"id": "layout.disk.x.totalHeads",         "type": "number",   "role": ""},
        "totalTracks":      {"id": "layout.disk.x.totalTracks",        "type": "number",   "role": ""},
        "tracksPerCylinder":{"id": "layout.disk.x.tracksPerCylinder",  "type": "number",   "role": ""},
        "sectorsPerTrack":  {"id": "layout.disk.x.sectorsPerTrack",    "type": "number",   "role": ""},
        "totalSectors":     {"id": "layout.disk.x.totalSectors",       "type": "string",   "role": ""},
        "bytesPerSector":   {"id": "layout.disk.x.bytesPerSector",     "type": "number",   "role": ""},
        "smartStatus":      {"id": "layout.disk.x.smartStatus",        "type": "number",   "role": ""}
    },
    "fsSize": {
        "fs":           {"id": "state.fs.x.fs",    "type": "number",   "role": ""},
        "type":         {"id": "state.fs.x.type",  "type": "number",   "role": ""},
        "size":         {"id": "state.fs.x.size",  "type": "number",   "role": ""},
        "used":         {"id": "state.fs.x.used",  "type": "number",   "role": ""},
        "use":          {"id": "state.fs.x.use",   "type": "number",   "role": ""},
        "mount":        {"id": "state.fs.x.mount", "type": "string",   "role": ""}
    },
    "blockDevices": {
        "name":         {"id": "state.bdev.x.fs",       "type": "number",   "role": ""},
        "type":         {"id": "state.bdev.x.type",     "type": "number",   "role": ""},
        "fstype":       {"id": "state.bdev.x.fstype",   "type": "number",   "role": ""},
        "mount":        {"id": "state.bdev.x.mount",    "type": "number",   "role": ""},
        "size":         {"id": "state.bdev.x.size",     "type": "number",   "role": ""},
        "physical":     {"id": "state.bdev.x.physical", "type": "string",   "role": ""},
        "uuid":         {"id": "state.bdev.x.uuid",     "type": "string",   "role": ""},
        "label":        {"id": "state.bdev.x.label",    "type": "string",   "role": ""},
        "model":        {"id": "state.bdev.x.model",    "type": "string",   "role": ""},
        "serial":       {"id": "state.bdev.x.serial",   "type": "string",   "role": ""},
        "removable":    {"id": "state.bdev.x.removable","type": "string",   "role": ""}
    }
}