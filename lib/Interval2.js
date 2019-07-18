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
 * Class Interval2 implements the logic used in interval 2 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval2 extends Interval {
	constructor() {
		super();
	}

	async run(adapter, init) {
		try {
			if(adapter.config.battery) {
				adapter.log.silly('battery');
				await Interval.getSI().battery()
					.then(data => Interval.showData(data, 'battery', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.users) {
				adapter.log.silly('users');
				await Interval.getSI().users()
					.then(data => Interval.showData(data, 'users', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.fsSize) {
				adapter.log.silly('fsSize');
				await Interval.getSI().fsSize()
					.then(data => Interval.showData(data, 'fsSize', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.blockDevices) {
				adapter.log.silly('blockDevices');
				await Interval.getSI().blockDevices()
					.then(data => Interval.showData(data, 'blockDevices', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.fsStats) {
				adapter.log.silly('fsStats');
				await Interval.getSI().fsStats()
					.then(data => Interval.showData(data, 'fsStats', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.disksIO) {
				adapter.log.silly('disksIO');
				await Interval.getSI().disksIO()
					.then(data => Interval.showData(data, 'disksIO', adapter, init))
					.catch(error => adapter.log.error(error));
			}
		} catch(err) {
			adapter.log.error('error in interval 2: ' + err);
		}
	}
    
// end of class
}

module.exports = Interval2;