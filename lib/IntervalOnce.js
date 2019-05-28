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
class IntervalOnce extends Interval {
	constructor() {
        super();
    }

    async run(adapter, init) {
        Interval.showData(Interval.getSI().version(), 'version', adapter, init);
        if(adapter.config.baseboard) {
            await Interval.getSI().baseboard()
                .then(data => Interval.showData(data, 'baseboard', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.chassis) {
            await Interval.getSI().chassis()
                .then(data => Interval.showData(data, 'chassis', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.bios) {
            await Interval.getSI().bios()
                .then(data => Interval.showData(data, 'bios', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.system) {
            await Interval.getSI().system()
                .then(data => Interval.showData(data, 'system', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.cpu) {
            await Interval.getSI().cpu()
                .then(data => Interval.showData(data, 'cpu', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.cpuFlags) {
            await Interval.getSI().cpuFlags()
                .then(data => Interval.showData(data, 'cpuFlags', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.memLayout) {
            await Interval.getSI().memLayout()
                .then(data => Interval.showData(data, 'memLayout', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.diskLayout) {
            await Interval.getSI().diskLayout()
                .then(data => Interval.showData(data, 'diskLayout', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

// end of class
}

module.exports = IntervalOnce;