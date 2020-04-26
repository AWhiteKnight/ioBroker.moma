/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval2 implements the logic used in interval 2 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval2 extends Interval {
	constructor() {
		super();
	}

	async run(adapter, init) {
		if(adapter.config.battery) {
			await Interval.getSI().battery()
				.then(data => this.showData(data, 'battery', adapter, init))
				.catch(error => this.logError(adapter, error, '2.1'));
		}
		if(adapter.config.users) {
			await Interval.getSI().users()
				.then(data => this.showData(data, 'users', adapter, init))
				.catch(error => this.logError(adapter, error, '2.2'));
		}
		if(adapter.config.fsSize) {
			await Interval.getSI().fsSize()
				.then(data => this.showData(data, 'fsSize', adapter, init))
				.catch(error => this.logError(adapter, error, '2.3'));
		}
		if(adapter.config.blockDevices) {
			await Interval.getSI().blockDevices()
				.then(data => this.showData(data, 'blockDevices', adapter, init))
				.catch(error => this.logError(adapter, error, '2.4'));
		}
		if(adapter.config.fsStats) {
			await Interval.getSI().fsStats()
				.then(data => this.showData(data, 'fsStats', adapter, init))
				.catch(error => this.logError(adapter, error, '2.5'));
		}
		if(adapter.config.disksIO) {
			await Interval.getSI().disksIO()
				.then(data => this.showData(data, 'disksIO', adapter, init))
				.catch(error => this.logError(adapter, error, '2.6'));
		}
	}
    
// end of class
}

module.exports = Interval2;