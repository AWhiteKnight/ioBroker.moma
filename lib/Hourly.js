/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Hourly implements the logic used in hourly interval by moma
 *  (c) 2019 AWhiteKnight
 */
class Hourly extends Interval {
	constructor() {
        super();
    }

    run(adapter) {
//        this.graphics(adapter);
//        this.networkInterfaces(adapter);
//        this.networkInterfaceDefault(adapter);
    }
    
    graphics(adapter) {
        if(adapter.config.graphics) {
            this.si.graphics(function(data) {
                this.showData(data, 'graphics', adapter);
            });
        }
    }

    networkInterfaces(adapter) {
        if(adapter.config.networkInterfaces) {
            this.si.networkInterfaces(function(data) {
                this.showData(data, 'networkInterfaces', adapter);
            });
        }
    }  
      
    networkInterfaceDefault(adapter) {
        if(adapter.config.networkInterfaceDefault) {
            this.si.networkInterfaceDefault(function(data) {
                this.showData(data, 'networkInterfaceDefault', adapter);
            });
        }
    }  
      
// end of class
}

module.exports = Hourly;