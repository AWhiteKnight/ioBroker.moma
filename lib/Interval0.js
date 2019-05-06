/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval0 implements the logic used in secondly interval 0 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval0 extends Interval {
	constructor() {
        super();
    }

    async run(adapter, init) {
        try {
            adapter.log.debug('running Interval0');
            await this.time(adapter, init);
            await this.cpuCurrentSpeed(adapter, init);
            await this.networkConnections(adapter, init);
            await this.currentLoad(adapter, init);
            await this.processes(adapter, init);
        } catch(err) {
			adapter.log.error('Error in interval 0: ' + err);
        }
    }
    
    time(adapter, init) {
        if(adapter.config.time) {
            let data = Interval.getSI().time();
            Interval.showData(data, 'time', adapter, init);
        }
    }
    
    cpuCurrentSpeed(adapter, init) {
        if(adapter.config.cpuCurrentSpeed) {
            Interval.getSI().cpuCurrentspeed(function(data) {
                Interval.showData(data, 'cpuCurrentSpeed', adapter, init);
            });
        }
    }
  
    networkConnections(adapter, init) {
        if(adapter.config.networkConnections) {
            Interval.getSI().networkStats(function(data) {
                Interval.showData(data, 'networkConnections', adapter, init);
            });
        }
    }  
      
    currentLoad(adapter, init) {
        if(adapter.config.currentLoad) {
            Interval.getSI().currentLoad(function(data) {
                Interval.showData(data, 'currentLoad', adapter, init);
            });
        }
    }

    processes(adapter, init) {
        if(adapter.config.processes) {
            Interval.getSI().processes(function(data) {
//              adapter.log.debug('Processes: ' + JSON.stringify(data));
                Interval.showData(data, 'processes', adapter, init);
            });
        }
    }
      
// end of class
}

module.exports = Interval0;