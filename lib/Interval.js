/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
'use strict';

const si = require('systeminformation');

/**
 * Class Interval implements the logic used in all interval classes (Daily, Hourly, ...)
 *  (c) 2019 AWhiteKnight
 */
class Interval {
	static getSI() {
		return si;
	}

	/**
     * 
     * @param {any} src 
     * @param {string} tgtId 
     */
	async showData(src, tgtId, adapter, init, level = 0) {
		// state
		if(typeof src !== 'object') {
			// adapter.log.debug('1: ' + level);
			// adapter.log.debug(JSON.stringify(src));
			await adapter.setStateChangedAsync(tgtId, {val: src, ack: true});
		// array
		} else if(src.length != undefined) {
			// adapter.log.debug('2: ' + level);
			// adapter.log.debug(JSON.stringify(src));
			let helper;
			if(init) {
				helper = require(__dirname + '/helper'); 
			}
			// each element
			for(let i = 0; i < src.length; i++) {
				if(src[i] != undefined) {
					if(init) {
						helper.createArrayEntry(adapter, tgtId, i);
					}
					await this.showData(src[i], tgtId+'.'+i, adapter, init, level+1);
				}
			}
		// object
		} else if(typeof src == 'object') {
			// adapter.log.debug('3: ' + level);
			// adapter.log.debug(JSON.stringify(src));
			if(level > 4) {
				adapter.log.error('run wild at ' + tgtId);
			} else {
				for (const key in src) {
					await this.showData(src[key], tgtId+'.'+key, adapter, init, level+1);
				}
			}
		} else {
			// adapter.log.debug('4: ' + level);
			// adapter.log.debug(JSON.stringify(src));
			adapter.log.error('should never happen');
		}
	}

	async logError(adapter, err, interval) {
		await adapter.setStateChangedAsync('info.connection', false, true);
		await adapter.setForeignStateChangedAsync('hostNeedsAttention', {val: true, ack: true});
		const state = await adapter.getForeignStateAsync('hostNeedsAttentionList');
		if (state) {
			await adapter.setForeignStateChangedAsync('hostNeedsAttentionList', {val: state.val + require('os').hostname, ack: true});
		}
		adapter.log.error('error in interval ' + interval + ' : ' + err);
	}

	constructor() {
	}
}

module.exports = Interval;
