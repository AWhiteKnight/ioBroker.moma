/* jshint -W119 */
/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Once implements the logic used in once executed calls by moma
 *  (c) 2019 AWhiteKnight
 */
class IntervalOnce extends Interval {
	constructor() {
		super();
	}

	async run(adapter, init) {
		try {
			const v = Interval.getSI().version();
			adapter.log.info('library systeminformation version ' + v);
			Interval.showData(v, 'version', adapter, init);
			if(adapter.config.baseboard) {
				adapter.log.silly('baseboard');
				await Interval.getSI().baseboard()
					.then(data => Interval.showData(data, 'baseboard', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.chassis) {
				adapter.log.silly('chassis');
				await Interval.getSI().chassis()
					.then(data => Interval.showData(data, 'chassis', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.bios) {
				adapter.log.silly('bios');
				await Interval.getSI().bios()
					.then(data => Interval.showData(data, 'bios', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.system) {
				adapter.log.silly('system');
				await Interval.getSI().system()
					.then(data => Interval.showData(data, 'system', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.cpu) {
				adapter.log.silly('cpu');
				await Interval.getSI().cpu()
					.then(data => Interval.showData(data, 'cpu', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.cpuFlags) {
				adapter.log.silly('cpuFlags');
				await Interval.getSI().cpuFlags()
					.then(data => Interval.showData(data, 'cpuFlags', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.memLayout) {
				adapter.log.silly('memLayout');
				await Interval.getSI().memLayout()
					.then(data => Interval.showData(data, 'memLayout', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.diskLayout) {
				adapter.log.silly('diskLayout');
				await Interval.getSI().diskLayout()
					.then(data => Interval.showData(data, 'diskLayout', adapter, init))
					.catch(error => adapter.log.error(error));
			}
		} catch(err) {
			adapter.log.error('error in interval Once: ' + err);
		}
	}

// end of class
}

module.exports = IntervalOnce;