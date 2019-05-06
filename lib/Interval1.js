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

    async run(adapter, init) {
        try {
            adapter.log.debug('running Interval1');
            await this.cpuTemperature(adapter, init);
            await this.mem(adapter, init);
            await this.networkStats(adapter, init);
            await this.fullLoad(adapter, init);
        } catch(err) {
			adapter.log.error('Error in interval 1: ' + err);
        }
    }
    
    cpuTemperature(adapter, init) {
        if(adapter.config.cpuTemperature) {
            Interval.getSI().cpuTemperature(function(data) {
                Interval.showData(data, 'cpuTemperature', adapter, init);
            });
        }
      }
      
    mem(adapter, init) {
        if(adapter.config.mem) {
            Interval.getSI().mem(function(data) {
                Interval.showData(data, 'mem', adapter, init);
            });
        }
    }
      
    networkStats(adapter, init) {
        if(adapter.config.networkStats) {
            Interval.getSI().networkStats(function(data) {
                Interval.showData(data, 'networkStats', adapter, init);
            });
        }
    }
      
    fullLoad(adapter, init) {
        if(adapter.config.fullLoad) {
            Interval.getSI().fullLoad(function(data) {
                Interval.showData(data, 'fullLoad', adapter, init);
            });
        }
    }
      
// end of class
}

module.exports = Interval1;