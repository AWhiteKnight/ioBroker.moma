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
class Once {
	constructor() {
    }

    run(adapter, init) {
        adapter.log.debug('running Once');
        Interval.getStaticData(adapter, init);
    }
// end of class
}

module.exports = Once;