/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval3 implements the logic used in interval 3 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval3 extends Interval {
	constructor() {
        super();
    }

    async run(adapter, init) {
        try {
            adapter.log.debug('running Interval3');
            await this.graphics(adapter, init);
            await this.networkInterfaces(adapter, init);
            await this.networkInterfaceDefault(adapter, init);
        } catch(err) {
			adapter.log.error('Error in interval 3: ' + err);
        }
    }
    
    graphics(adapter, init) {
        if(adapter.config.graphics) {
            Interval.getSI().graphics(function(data) {
                Interval.showData(data, 'graphics', adapter, init);
            });
        }
    }

    networkInterfaces(adapter, init) {
        if(adapter.config.networkInterfaces) {
            Interval.getSI().networkInterfaces(function(data) {
                Interval.showData(data, 'networkInterfaces', adapter, init);
            });
        }
    }  
      
    networkInterfaceDefault(adapter, init) {
        if(adapter.config.networkInterfaceDefault) {
            Interval.getSI().networkInterfaceDefault(function(data) {
                Interval.showData(data, 'networkInterfaceDefault', adapter, init);
            });
        }
    }  
      
// end of class
}

module.exports = Interval3;