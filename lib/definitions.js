const os = require('os');
// helper values
module.exports.base = 'moma.x';
module.exports.hostsBase = this.base + '.hosts';
module.exports.hostEntry = this.hostsBase + '.' + os.hostname();
module.exports.hostEntryTemp = this.hostEntry + '.temp';
module.exports.hostEntryLoad = this.hostEntry + '.load';
module.exports.hostEntryUptime = this.hostEntry + '.uptime';
module.exports.hostEntryUpdates = this.hostEntry + '.updates';
