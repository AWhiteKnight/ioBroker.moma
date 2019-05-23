/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const si = require('systeminformation');

/**
 * Class Interval implements the logic used in all interval classes (Daily, Hourly, ...)
 *  (c) 2019 AWhiteKnight
 */
class Interval {
    static getSI() {
        return si;
    }

    /**
     * 
     * @param {string} src 
     * @param {string} tgtId 
     */
    static showData(src, tgtId, adapter, init) {
        // state
        if(typeof src !== 'object') {
            adapter.setStateChanged(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            let helper;
            if(init) {
                helper = require(__dirname + '/helper'); 
            }
            // each element
            for(let i = 0; i < src.length; i++) {
                if(src[i] != undefined) {
                    if(init) {
                        helper.createArrayEntry(adapter, tgtId, i);
                    }
                    Interval.showData(src[i], tgtId+'.'+i, adapter, init);
                }
            }
        // object
        } else {
            for (const key in src) {
                Interval.showData(src[key], tgtId+'.'+key, adapter, init);
            }
        }
    }

    constructor() {
    }
}

module.exports = Interval;