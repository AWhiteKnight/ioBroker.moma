/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Secondly1 implements the logic used in secondly interval 0 by moma
 *  (c) 2019 AWhiteKnight
 */
class Secondly1 extends Interval {
	constructor() {
        super();
    }

    run(adapter, init) {
        this.time(adapter, init);
        this.cpuCurrentSpeed(adapter, init);
        this.networkConnections(adapter, init);
        this.currentLoad(adapter, init);
        this.processes(adapter, init);
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

module.exports = Secondly1;