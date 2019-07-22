// @ts-nocheck

// helper values
module.exports.base = 'moma.meta';
module.exports.hostsList = this.base + '.hosts';
module.exports.hostNeedsAttention = this.base + '.hostNeedsAttention';
module.exports.hostNeedsAttentionList = this.base + '.hostNeedsAttentionList';
module.exports.hostNeedsUpdate = this.base + '.hostNeedsUpdate';
module.exports.hostNeedsUpdateList = this.base + '.hostNeedsUpdateList';
module.exports.hostNeedsReboot = this.base + '.hostNeedsReboot';
module.exports.hostNeedsRebootList = this.base + '.hostNeedsRebootList';
module.exports.deviceNeedsBatteryChange = this.base + '.deviceNeedsBatteryChange';
module.exports.deviceNeedsBatteryChangeList = this.base + '.deviceNeedsBatteryChangeList';
module.exports.hostListEntry = this.hostsList + '.' + require('os').hostname();
module.exports.hostEntryAlive = this.hostListEntry + '.momaAlive';
module.exports.hostEntryInstance = this.hostListEntry + '.instance';
module.exports.hostEntryHasUpdates = this.hostListEntry + '.numUpdates';
module.exports.hostEntryNeedsReboot = this.hostListEntry + '.needsReboot';
module.exports.hostEntryListOfUpdates = this.hostListEntry + '.updates';
module.exports.hostEntryListOfAdapterUpdates = this.hostListEntry + '.adapterUpdates';
module.exports.hostEntryControllerUpdate = this.hostListEntry + '.controllerUpdate';
module.exports.hostEntryLastUpdate = this.hostListEntry + '.lastUpdate';
module.exports.hostEntryNeedsAttention = this.hostListEntry + '.needsAttention';