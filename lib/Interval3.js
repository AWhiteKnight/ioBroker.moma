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

    run(adapter, init) {
        this.graphics(adapter, init);
        this.networkInterfaces(adapter, init);
        this.networkInterfaceDefault(adapter, init);
        this.inetLatency(adapter, init);
    }
    
    async graphics(adapter, init) {
        if(adapter.config.graphics) {
            await Interval.getSI().graphics()
                .then(data => Interval.showData(data, 'graphics', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async networkInterfaces(adapter, init) {
        if(adapter.config.networkInterfaces) {
            await Interval.getSI().networkInterfaces()
                .then(data => Interval.showData(data, 'networkInterfaces', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }  
      
    async networkInterfaceDefault(adapter, init) {
        if(adapter.config.networkInterfaceDefault) {
            await Interval.getSI().networkInterfaceDefault()
                .then(data => Interval.showData(data, 'networkInterfaceDefault', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }  
      
    async inetLatency(adapter, init) {
        if(adapter.config.networkInterfaceDefault) {
            await Interval.getSI().inetLatency()
                .then(data => Interval.showData(data, 'inetLatency', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }  
// end of class
}

module.exports = Interval3;