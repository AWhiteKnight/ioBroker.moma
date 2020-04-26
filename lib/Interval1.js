/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval1 implements the logic used in secondly interval 1 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval1 extends Interval {
	constructor() {
		super();
	}

	async run(adapter, init) {
		if(adapter.config.cpuTemperature) {
			await Interval.getSI().cpuTemperature()
				.then(data => this.showData(data, 'cpuTemperature', adapter, init))
				.catch(error => this.logError(adapter, error, '1.1'));
		}
		if(adapter.config.mem) {
			await Interval.getSI().mem()
				.then(data => this.showData(data, 'mem', adapter, init))
				.catch(error => this.logError(adapter, error, '1.2'));
		}
		if(adapter.config.networkStats) {
			await Interval.getSI().networkStats()
				.then(data => this.showData(data, 'networkStats', adapter, init))
				.catch(error => this.logError(adapter, error, '1.3'));
		}
		if(adapter.config.fullLoad) {
			await Interval.getSI().fullLoad()
				.then(data => this.showData(data, 'fullLoad', adapter, init))
				.catch(error => this.logError(adapter, error, '1.4'));
		}
	}
      
// end of class
}

module.exports = Interval1;