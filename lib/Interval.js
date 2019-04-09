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
	constructor() {
        const si = require('systeminformation');
    }

    /**
     * 
     * @param {string} src 
     * @param {string} tgtId 
     */
    showData(src, tgtId, adapter) {
        // state
        if(typeof src !== 'object') {
          adapter.setState(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            for(let i = 0; i < src.length; i++) {
                const element = src[i];
                if(element != undefined) {
                    if(init) {
                        helper.createArrayEntry(adapter, tgtId, i);
                    }
                    showData(element, tgtId+'.'+i);
                }
            }
        // object
        } else {
          for (const key in src) {
            const element = src[key];
            showData(element, tgtId+'.'+key);
          }
        }
    }
}

module.exports = Interval;