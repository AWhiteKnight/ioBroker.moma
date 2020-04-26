/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
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
		const v = Interval.getSI().version();
		await adapter.log.info('library systeminformation version ' + v);
		this.showData(v, 'version', adapter, init);
		if(adapter.config.baseboard) {
			await Interval.getSI().baseboard()
				.then(data => this.showData(data, 'baseboard', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.1'));
		}
		if(adapter.config.chassis) {
			await Interval.getSI().chassis()
				.then(data => this.showData(data, 'chassis', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.2'));
		}
		if(adapter.config.bios) {
			await Interval.getSI().bios()
				.then(data => this.showData(data, 'bios', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.3'));
		}
		if(adapter.config.system) {
			await Interval.getSI().system()
				.then(data => this.showData(data, 'system', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.4'));
		}
		if(adapter.config.cpu) {
			await Interval.getSI().cpu()
				.then(data => this.showData(data, 'cpu', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.5'));
		}
		if(adapter.config.cpuFlags) {
			await Interval.getSI().cpuFlags()
				.then(data => this.showData(data, 'cpuFlags', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.6'));
		}
		if(adapter.config.memLayout) {
			await Interval.getSI().memLayout()
				.then(data => this.showData(data, 'memLayout', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.7'));
		}
		if(adapter.config.diskLayout) {
			await Interval.getSI().diskLayout()
				.then(data => this.showData(data, 'diskLayout', adapter, init))
				.catch(error => this.logError(adapter, error, 'Once.8'));
		}
	}

// end of class
}

module.exports = IntervalOnce;