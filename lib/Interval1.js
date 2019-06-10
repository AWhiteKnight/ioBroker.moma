/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval1 implements the logic used in secondly interval 1 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval1 extends Interval {
	constructor() {
        super();
    }

    async run(adapter, init) {
        if(adapter.config.cpuTemperature) {
            adapter.log.silly('cpuTemperature');
            await Interval.getSI().cpuTemperature()
                .then(data => Interval.showData(data, 'cpuTemperature', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.mem) {
            adapter.log.silly('mem');
            await Interval.getSI().mem()
                .then(data => Interval.showData(data, 'mem', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.networkStats) {
            adapter.log.silly('networkStats');
            await Interval.getSI().networkStats()
                .then(data => Interval.showData(data, 'networkStats', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.fullLoad) {
            adapter.log.silly('fullLoad');
            await Interval.getSI().fullLoad()
                .then(data => Interval.showData(data, 'fullLoad', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }
      
// end of class
}

module.exports = Interval1;