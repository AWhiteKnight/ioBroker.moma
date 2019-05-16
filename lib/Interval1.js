/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
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

    run(adapter, init) {
        this.cpuTemperature(adapter, init);
        this.mem(adapter, init);
        this.networkStats(adapter, init);
        this.fullLoad(adapter, init);
    }
    
    async cpuTemperature(adapter, init) {
        if(adapter.config.cpuTemperature) {
            await Interval.getSI().cpuTemperature()
                .then(data => Interval.showData(data, 'cpuTemperature', adapter, init))
                .catch(error => adapter.log.error(error));
        }
      }
      
    async mem(adapter, init) {
        if(adapter.config.mem) {
            await Interval.getSI().mem()
                .then(data => Interval.showData(data, 'mem', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async networkStats(adapter, init) {
        if(adapter.config.networkStats) {
            await Interval.getSI().networkStats()
                .then(data => Interval.showData(data, 'networkStats', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
    async fullLoad(adapter, init) {
        if(adapter.config.fullLoad) {
            await Interval.getSI().fullLoad()
                .then(data => Interval.showData(data, 'cpuCurrentfullLoadSpeed', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
// end of class
}

module.exports = Interval1;