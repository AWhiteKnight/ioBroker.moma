/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Secondly2 implements the logic used in secondly interval 1 by moma
 *  (c) 2019 AWhiteKnight
 */
class Secondly2 extends Interval {
	constructor() {
        super();
    }

    run(adapter, init) {
        this.cpuTemperature(adapter, init);
        this.mem(adapter, init);
        this.battery(adapter, init);
        this.networkStats(adapter, init);
        this.fullLoad(adapter, init);
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
      
    battery(adapter, init) {
        if(adapter.config.battery) {
            Interval.getSI().battery(function(data) {
                Interval.showData(data, 'battery', adapter, init);
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

module.exports = Secondly2;