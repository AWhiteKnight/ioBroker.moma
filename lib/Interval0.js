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

    run(adapter, init) {
        this.time(adapter, init);
        this.cpuCurrentSpeed(adapter, init);
        this.networkConnections(adapter, init);
        this.currentLoad(adapter, init);
        this.processes(adapter, init);
    }

    time(adapter, init) {
        if (adapter.config.time) {
            Interval.showData(Interval.getSI().time(), 'time', adapter, init);
        }
    }

    async cpuCurrentSpeed(adapter, init) {
        if (adapter.config.cpuCurrentSpeed) {
            await Interval.getSI().cpuCurrentspeed()
                .then(data => Interval.showData(data, 'cpuCurrentSpeed', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async networkConnections(adapter, init) {
        if (adapter.config.networkConnections) {
            await Interval.getSI().networkConnections()
                .then(data => Interval.showData(data, 'networkConnections', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async currentLoad(adapter, init) {
        if (adapter.config.currentLoad) {
            await Interval.getSI().currentLoad()
                .then(data => Interval.showData(data, 'currentLoad', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async processes(adapter, init) {
        if (adapter.config.processes) {
            await Interval.getSI().processes()
                .then(data => Interval.showData(data, 'processes', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    // end of class
}

module.exports = Interval0;