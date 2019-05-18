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

    run(adapter, init) {
        this.battery(adapter, init);
        this.users(adapter, init);
        this.fsSize(adapter, init);
        this.blockDevices(adapter, init);
        this.fsStats(adapter, init);
        this.disksIO(adapter, init);
    }
    
    async battery(adapter, init) {
        if(adapter.config.battery) {
            await Interval.getSI().battery()
                .then(data => Interval.showData(data, 'battery', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async users(adapter, init) {
        if(adapter.config.users) {
            await Interval.getSI().users()
                .then(data => Interval.showData(data, 'users', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async fsSize(adapter, init) {
        if(adapter.config.fsSize) {
            await Interval.getSI().fsSize()
                .then(data => Interval.showData(data, 'fsSize', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async blockDevices(adapter, init) {
        if(adapter.config.blockDevices) {
            await Interval.getSI().blockDevices()
                .then(data => Interval.showData(data, 'blockDevices', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async fsStats(adapter, init) {
        if(adapter.config.fsStats) {
            await Interval.getSI().fsStats()
                .then(data => Interval.showData(data, 'fsStats', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async disksIO(adapter, init) {
        if(adapter.config.disksIO) {
            await Interval.getSI().disksIO()
                .then(data => Interval.showData(data, 'disksIO', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
            
// end of class
}

module.exports = Interval2;