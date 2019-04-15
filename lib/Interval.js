/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

/**
 * Class Interval implements the logic used in all interval classes (Daily, Hourly, ...)
 *  (c) 2019 AWhiteKnight
 */
class Interval {
    static getSI() {
        return require('systeminformation');
    }

    /**
     * 
     * @param {string} src 
     * @param {string} tgtId 
     */
    static showData(src, tgtId, adapter, init) {
        // state
        if(typeof src !== 'object') {
          adapter.setState(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            for(let i = 0; i < src.length; i++) {
                const element = src[i];
                if(element != undefined) {
                    if(init) {
                        require(__dirname + '/helper').createArrayEntry(adapter, tgtId, i);
                    }
                    Interval.showData(element, tgtId+'.'+i, adapter, init);
                }
            }
        // object
        } else {
          for (const key in src) {
            const element = src[key];
            Interval.showData(element, tgtId+'.'+key, adapter, init);
          }
        }
    }

    constructor() {
    }

}

module.exports = Interval;