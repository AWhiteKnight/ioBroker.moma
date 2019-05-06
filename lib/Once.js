/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Once implements the logic used in once executed calls by moma
 *  (c) 2019 AWhiteKnight
 */
class Once extends Interval {
	constructor() {
        super();
    }

    async run(adapter, init) {
        try {
            adapter.log.debug('running Once');
            await this.baseboard(adapter, init);
            await this.chassis(adapter, init);
            await this.bios(adapter, init);
            await this.system(adapter, init);
            await this.cpu(adapter, init);
            await this.cpuFlags(adapter, init);
            await this.memLayout(adapter, init);
            await this.diskLayout(adapter, init);
        } catch(err) {
			adapter.log.error('Error in once: ' + err);
        }
    }

    baseboard(adapter, init) {
        if(adapter.config.baseboard) {
            Interval.getSI().baseboard(function(data) {
                Interval.showData(data, 'baseboard', adapter, init);
            });
        }
    }

    chassis(adapter, init) {
        if(adapter.config.chassis) {
            Interval.getSI().chassis(function(data) {
                Interval.showData(data, 'chassis', adapter, init);
            });
        }
    }

    bios(adapter, init) {
        if(adapter.config.bios) {
            Interval.getSI().bios(function(data) {
                Interval.showData(data, 'bios', adapter, init);
            });
        }
    }
      
    system(adapter, init) {
        if(adapter.config.system) {
            Interval.getSI().system(function(data) {
                Interval.showData(data, 'system', adapter, init);
            });
        }
    }
      
    cpu(adapter, init) {
        if(adapter.config.cpu) {
            Interval.getSI().cpu(function(data) {
                Interval.showData(data, 'cpu', adapter, init);
            });
        }
    }
      
    cpuFlags(adapter, init) {
        if(adapter.config.cpuFlags) {
            Interval.getSI().cpuFlags(function(data) {
                Interval.showData(data, 'cpuFlags', adapter, init);
            });
        }
    }

    memLayout(adapter, init) {
        if(adapter.config.memLayout) {
            Interval.getSI().memLayout(function(data) {
                Interval.showData(data, 'memLayout', adapter, init);
            });
        }
    }
      
    diskLayout(adapter, init) {
        if(adapter.config.diskLayout) {
            Interval.getSI().diskLayout(function(data) {
                Interval.showData(data, 'diskLayout', adapter, init);
            });
        }
    }

// end of class
}

module.exports = Once;