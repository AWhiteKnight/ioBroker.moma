/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Minutely implements the logic used in minutly interval by moma
 *  (c) 2019 AWhiteKnight
 */
class Minutely extends Interval {
	constructor() {
        super();
    }

    run(adapter, init) {
        try {
            adapter.log.debug('running Minutely');
            this.users(adapter, init);
            this.fsSize(adapter, init);
            this.blockDevices(adapter, init);
            this.fsStats(adapter, init);
            this.disksIO(adapter, init);
        } catch(err) {
			adapter.log.error('Error in interval 2: ' + err);
        }
    }
    
    users(adapter, init) {
        if(adapter.config.users) {
            Interval.getSI().users(function(data) {
                Interval.showData(data, 'users', adapter, init);
            });
        }
      }
      
    fsSize(adapter, init) {
        if(adapter.config.fsSize) {
            Interval.getSI().fsSize(function(data) {
                Interval.showData(data, 'fsSize', adapter, init);
            });
        }
    }
      
    blockDevices(adapter, init) {
        if(adapter.config.blockDevices) {
            Interval.getSI().blockDevices(function(data) {
                Interval.showData(data, 'blockDevices', adapter, init);
            });
        }
    }
      
    fsStats(adapter, init) {
        if(adapter.config.fsStats) {
            Interval.getSI().fsStats(function(data) {
                Interval.showData(data, 'fsStats', adapter, init);
            });
        }
    }
      
    disksIO(adapter, init) {
        if(adapter.config.disksIO) {
            Interval.getSI().disksIO(function(data) {
                Interval.showData(data, 'disksIO', adapter, init);
            });
        }
    }
            
// end of class
}

module.exports = Minutely;