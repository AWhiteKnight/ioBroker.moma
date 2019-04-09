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
class Once extends Interval {
	constructor() {
        super();
    }

    run(adapter) {
//        this.baseboard(adapter);
//        this.chassis(adapter);
//        this.bios(adapter);
//        this.system(adapter);
//        this.cpu(adapter);
//        this.cpuFlags(adapter);
//        this.memLayout(adapter);
//        this.diskLayout(adapter);
    }

    baseboard(adapter) {
        if(adapter.config.baseboard) {
            this.si.baseboard(function(data) {
                this.showData(data, 'baseboard', adapter);
            });
        }
    }

    chassis(adapter) {
        if(adapter.config.chassis) {
            this.si.chassis(function(data) {
                this.showData(data, 'chassis', adapter);
            });
        }
    }

    bios(adapter) {
        if(adapter.config.bios) {
            this.si.bios(function(data) {
                this.showData(data, 'bios', adapter);
            });
        }
    }
      
    system(adapter) {
        if(adapter.config.system) {
            this.si.system(function(data) {
                this.showData(data, 'system', adapter);
            });
        }
    }
      
    cpu(adapter) {
        if(adapter.config.cpu) {
            this.si.cpu(function(data) {
                this.showData(data, 'cpu', adapter);
            });
        }
    }
      
    cpuFlags(adapter) {
        if(adapter.config.cpuFlags) {
            this.si.cpuFlags(function(data) {
                this.showData(data, 'cpuFlags', adapter);
            });
        }
    }

    memLayout(adapter) {
        if(adapter.config.memLayout) {
            this.si.memLayout(function(data) {
                this.showData(data, 'memLayout', adapter);
            });
        }
    }
      
    diskLayout(adapter) {
        if(adapter.config.diskLayout) {
            this.si.diskLayout(function(data) {
                this.showData(data, 'diskLayout', adapter);
            });
        }
    }

    // end of class
}

module.exports = Once;