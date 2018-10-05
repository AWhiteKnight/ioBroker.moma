const os = require('os');
// helper values
module.exports.base = 'moma.x';
module.exports.hostsBase = this.base + '.hosts';
module.exports.hostEntry = this.hostsBase + '.' + os.hostname();
module.exports.hostEntryInstance = this.hostEntry + '.instance';
module.exports.hostEntryUpdates = this.hostEntry + '.updates';

module.exports.sysInfo = {
    "time": {
        "current":      {"type": "number",   "role": ""},
        "uptime":       {"type": "number",   "role": ""},
        "timezone":     {"type": "string",   "role": ""},
        "timezoneName": {"type": "string",   "role": ""}
    },
    "system": {
        "manufacturer": {"type": "string",   "role": ""},
        "model":        {"type": "string",   "role": ""},
        "version":      {"type": "string",   "role": ""},
        "serial":       {"type": "string",   "role": ""},
        "uuid":         {"type": "string",   "role": ""},
        "suk":          {"type": "string",   "role": ""}
    },
    "bios": {
        "vendor":       {"type": "string",   "role": ""},
        "version":      {"type": "string",   "role": ""},
        "releaseDate":  {"type": "string",   "role": ""},
        "revision":     {"type": "string",   "role": ""}
    },
    "baseboard": {
        "manufacturer": {"type": "string",   "role": ""},
        "model":        {"type": "string",   "role": ""},
        "version":      {"type": "string",   "role": ""},
        "serial":       {"type": "string",   "role": ""},
        "assetTag":     {"type": "string",   "role": ""}
    },
    "cpu": {
        "manufacturer": {"type": "string",   "role": ""},
        "brand":        {"type": "string",   "role": ""},
        "speed":        {"type": "number",   "role": ""},
        "speedmin":     {"type": "number",   "role": ""},
        "speedmax":     {"type": "number",   "role": ""},
        "cores":        {"type": "number",   "role": ""},
        "vendor":       {"type": "string",   "role": ""},
        "family":       {"type": "string",   "role": ""},
        "model":        {"type": "string",   "role": ""},
        "stepping":     {"type": "string",   "role": ""},
        "revision":     {"type": "string",   "role": ""},
        "voltage":      {"type": "number",   "role": ""},
        "cache": {
            "l1d":      {"type": "number",   "role": ""},
            "l1i":      {"type": "number",   "role": ""},
            "l2":       {"type": "number",   "role": ""},
            "l3":       {"type": "number",   "role": ""}
        },
        "flags":        {"type": "string",   "role": ""}
    },
    "cpuspeed": {
        "avg":      {"type": "number",   "role": ""},
        "min":      {"type": "number",   "role": ""},
        "max":      {"type": "number",   "role": ""},
        "cores":    {"type": "number",   "role": "",    "array": "true"}
    },
    "cputemp": {
        "main":     {"type": "number",   "role": ""},
        "max":      {"type": "number",   "role": ""},
        "cores":    {"type": "number",   "role": "",    "array": "true"}
    },
    "mem": {
        "total":        {"type": "number",   "role": ""},
        "free":         {"type": "number",   "role": ""},
        "used":         {"type": "number",   "role": ""},
        "active":       {"type": "number",   "role": ""},
        "buffcache":    {"type": "number",   "role": ""},
        "available":    {"type": "number",   "role": ""},
        "swaptotal":    {"type": "number",   "role": ""},
        "swapused":     {"type": "number",   "role": ""},
        "swapfree":     {"type": "number",   "role": ""}
    },
    "memlayout": {
        "banks": {"type": "object", "role": "", "array": "true"}
    },
    "disklayout": {
        "disks": {"type": "object", "role": "", "array": "true"}
    },
    "battery": {
        "hasbattery":       {"type": "boolean",  "role": ""},
        "cyclecount":       {"type": "number",   "role": ""},
        "ischarging":       {"type": "boolean",  "role": ""},
        "maxcapacity":      {"type": "number",   "role": ""},
        "currentcapacity":  {"type": "number",   "role": ""},
        "percent":          {"type": "number",   "role": ""},
        "timeremaining":    {"type": "number",   "role": ""},
        "acconnected":      {"type": "boolean",  "role": ""},
        "type":             {"type": "string",   "role": ""},
        "model":            {"type": "string",   "role": ""},
        "manufacturer":     {"type": "string",   "role": ""},
        "serial":           {"type": "string",   "role": ""}
    },
    "graphics": {
        "controller": {"type": "object", "role": "", "array": "true"},
        "displays": {"type": "object", "role": "", "array": "true"}
    },
    "osInfo": {
        "platform": {"type": "string",   "role": ""},
        "distro":   {"type": "string",   "role": ""},
        "release":  {"type": "string",   "role": ""},
        "codename": {"type": "string",   "role": ""},
        "kernel":   {"type": "string",   "role": ""},
        "arch":     {"type": "string",   "role": ""},
        "hostname": {"type": "string",   "role": ""},
        "logofile": {"type": "string",   "role": ""}
    },
    "users": {
        "user": {"type": "object", "role": "", "array": "true"}
    },
    "fssize": {
        "fss": {"type": "object", "role": "", "array": "true"}
    },
    "bdev": {
        "devs": {"type": "object", "role": "", "array": "true"}
    },
    "fsstats": {
        "rx":       {"type": "number",   "role": ""},
        "wx":       {"type": "number",   "role": ""},
        "tx":       {"type": "number",   "role": ""},
        "rx_sec":   {"type": "number",   "role": ""},
        "wx_sec":   {"type": "number",   "role": ""},
        "tx_sec":   {"type": "number",   "role": ""},
        "ms":       {"type": "number",   "role": ""}
    },
    "disksio": {
        "rIO":      {"type": "number",   "role": ""},
        "wIO":      {"type": "number",   "role": ""},
        "tIO":      {"type": "number",   "role": ""},
        "rIO_sec":  {"type": "number",   "role": ""},
        "wIO_sec":  {"type": "number",   "role": ""},
        "tIO_sec":  {"type": "number",   "role": ""},
        "ms":       {"type": "number",   "role": ""}
    },
    "network": {
        "ifs": {"type": "object", "role": "", "array": "true"},
        "default":  {"type": "string",   "role": ""}
    },
    "networkstats": {
        "ifs": {"type": "object", "role": "", "array": "true"}
    },
    "networkconnections": {
        "connections": {"type": "object", "role": "", "array": "true"}
    },
    "currentload": {
        "average":  {"type": "number",   "role": ""},
        "current":  {"type": "number",   "role": ""},
        "user":     {"type": "number",   "role": ""},
        "system":   {"type": "number",   "role": ""},
        "nice":     {"type": "number",   "role": ""},
        "idle":     {"type": "number",   "role": ""},
        "irq":      {"type": "number",   "role": ""},
        "cpus":     {"type": "object", "role": "", "array": "true"}
    },
    "fullload": {
        "machine":  {"type": "number",   "role": ""},
    },
    "processes": {
        "all":      {"type": "number",   "role": ""},
        "running":  {"type": "number",   "role": ""},
        "blocked":  {"type": "number",   "role": ""},
        "sleeping": {"type": "number",   "role": ""},
        "unknown":  {"type": "number",   "role": ""}
    }
}

module.exports.sysArrays = {
    "memlayout.banks": {
        "size":                 {"type": "number",   "role": ""},
        "bank":                 {"type": "number",   "role": ""},
        "type":                 {"type": "string",   "role": ""},
        "clockSpeed":           {"type": "number",   "role": ""},
        "formFactor":           {"type": "number",   "role": ""},
        "manufacturer":         {"type": "string",   "role": ""},
        "partNum":              {"type": "number",   "role": ""},
        "serialNum":            {"type": "number",   "role": ""},
        "voltageConfigured":    {"type": "number",   "role": ""},
        "voltageMin":           {"type": "number",   "role": ""},
        "voltageMax":           {"type": "number",   "role": ""}
    },
    "disklayout.disks": {
        "type":             {"type": "string",   "role": ""},
        "name":             {"type": "string",   "role": ""},
        "vendor":           {"type": "string",   "role": ""},
        "firmwareRevision": {"type": "string",   "role": ""},
        "serialNum":        {"type": "number",   "role": ""},
        "interfaceType":    {"type": "string",   "role": ""},
        "size":             {"type": "number",   "role": ""},
        "totalCylinders":   {"type": "string",   "role": ""},
        "totalHeads":       {"type": "number",   "role": ""},
        "totalTracks":      {"type": "number",   "role": ""},
        "tracksPerCylinder":{"type": "number",   "role": ""},
        "sectorsPerTrack":  {"type": "number",   "role": ""},
        "totalSectors":     {"type": "string",   "role": ""},
        "bytesPerSector":   {"type": "number",   "role": ""},
        "smartStatus":      {"type": "number",   "role": ""}
    },
    "graphics.controller": {
        "model":        {"type": "string",   "role": ""},
        "vendor":       {"type": "string",   "role": ""},
        "bus":          {"type": "string",   "role": ""},
        "vram":         {"type": "number",   "role": ""},
        "vramDynamic":  {"type": "number",   "role": ""}
    },
    "graphics.display": {
        "model":        {"type": "string",   "role": ""},
        "main":         {"type": "string",   "role": ""},
        "builtin":      {"type": "boolean",  "role": ""},
        "connection":   {"type": "string",   "role": ""},
        "resolutionx":  {"type": "number",   "role": ""},
        "resolutiony":  {"type": "number",   "role": ""},
        "pixeldepth":   {"type": "number",   "role": ""},
        "sizex":        {"type": "number",   "role": ""},
        "sizey":        {"type": "number",   "role": ""}
    },
    "users.user": {
        "user":     {"type": "string",   "role": ""},
        "tty":      {"type": "string",   "role": ""},
        "date":     {"type": "string",   "role": ""},
        "time":     {"type": "string",   "role": ""},
        "ip":       {"type": "string",   "role": ""},
        "command":  {"type": "string",   "role": ""}
    },
    "fssize.fss": {
        "fs":       {"type": "string",   "role": ""},
        "type":     {"type": "string",   "role": ""},
        "size":     {"type": "number",   "role": ""},
        "used":     {"type": "number",   "role": ""},
        "use":      {"type": "number",   "role": ""},
        "mount":    {"type": "string",   "role": ""}
    },
    "bdev.devs": {
        "name":         {"type": "string",   "role": ""},
        "type":         {"type": "string",   "role": ""},
        "fstype":       {"type": "string",   "role": ""},
        "mount":        {"type": "string",   "role": ""},
        "size":         {"type": "number",   "role": ""},
        "physical":     {"type": "string",   "role": ""},
        "uuid":         {"type": "string",   "role": ""},
        "label":        {"type": "string",   "role": ""},
        "model":        {"type": "string",   "role": ""},
        "serial":       {"type": "string",   "role": ""},
        "removable":    {"type": "boolean",  "role": ""},
        "protocol":     {"type": "string",   "role": ""}
    },
    "network.ifs": {
        "iface":    {"type": "string",   "role": ""},
        "ip4":      {"type": "string",   "role": ""},
        "ip6":      {"type": "string",   "role": ""},
        "mac":      {"type": "string",   "role": ""},
        "internal": {"type": "boolean",  "role": ""}
    },
    "networkstats.ifs": {
        "iface":        {"type": "string",   "role": ""},
        "operstate":    {"type": "string",   "role": ""},
        "rx":           {"type": "number",   "role": ""},
        "tx":           {"type": "number",   "role": ""},
        "rx_sec":       {"type": "number",   "role": ""},
        "tx_sec":       {"type": "number",   "role": ""},
        "ms":           {"type": "number",   "role": ""}
    },
    "networkconnections.connections": {
        "protocol":     {"type": "string",   "role": ""},
        "localaddress": {"type": "string",   "role": ""},
        "localport":    {"type": "string",   "role": ""},
        "peeraddress":  {"type": "string",   "role": ""},
        "peerport":     {"type": "string",   "role": ""},
        "state":        {"type": "string",   "role": ""}
    },
    "load.cpus": {
        "current":  {"type": "number",   "role": ""},
        "user":     {"type": "number",   "role": ""},
        "system":   {"type": "number",   "role": ""},
        "nice":     {"type": "number",   "role": ""},
        "idle":     {"type": "number",   "role": ""},
        "irq":      {"type": "number",   "role": ""}
    }
}
