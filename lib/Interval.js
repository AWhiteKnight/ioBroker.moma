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
    static async showData(src, tgtId, adapter, init) {
        // state
        if(typeof src !== 'object') {
            await adapter.setStateChanged(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            if(tgtId == 'processes.list') {
                await adapter.setStateChanged(tgtId, {val: Interval.createHTMLFromProcessList(src), ack: true});
            } else {
                for(let i = 0; i < src.length; i++) {
                    if(src[i] != undefined) {
                        if(init) {
                            require(__dirname + '/helper').createArrayEntry(adapter, tgtId, i);
                        }
                        await Interval.showData(src[i], tgtId+'.'+i, adapter, init);
                    }
                }
            }
        // object
        } else if(typeof src == 'object') {
            for (const key in src) {
                await Interval.showData(src[key], tgtId+'.'+key, adapter, init);
            }
        } else {
            adapter.log.error('showData: ' + src);
        }
    }

    /**
     *  convert object processes.list into html table
     *  format of processes.list:
     *  [{
     *      'pid':      {'type': 'number',  'role': ''},
     *      'parentPid':{'type': 'number',  'role': ''},
     *      'name':     {'type': 'string',  'role': ''},
     *      'pcpu':     {'type': 'number',  'role': ''},
     *      'pcpuu':    {'type': 'number',  'role': ''},
     *      'pcpus':    {'type': 'number',  'role': ''},
     *      'pmem':     {'type': 'number',  'role': ''},
     *      'priority': {'type': 'number',  'role': ''},
     *      'mem_vsz':  {'type': 'number',  'role': ''},
     *      'mem_rss':  {'type': 'number',  'role': ''},
     *      'nice':     {'type': 'number',  'role': ''},
     *      'started':  {'type': 'string',  'role': ''},
     *      'state':    {'type': 'string',  'role': ''},
     *      'tty':      {'type': 'string',  'role': ''},
     *      'user':     {'type': 'string',  'role': ''},
     *      'command':  {'type': 'string',  'role': ''}
     *  }]
    */
    static createHTMLFromProcessList(src) {
        let tgt = '<table>';
        let el;
        for(const i in src) {
            el = src[i];
            tgt += '<tr>';
                tgt += '<td>pid: ' + el.pid + '</td>';
                tgt += '<td>parentPid: ' + el.parentPid + '</td>';
                tgt += '<td>name: ' + el.name + '</td>';
                tgt += '<td>pcpu: ' + el.pcpu + '</td>';
                tgt += '<td>pcpuu: ' + el.pcpuu + '</td>';
                tgt += '<td>pcpus: ' + el.pcpus + '</td>';
                tgt += '<td>pmem: ' + el.pmem + '</td>';
                tgt += '<td>priority: ' + el.priority + '</td>';
                tgt += '<td>mem_vsz: ' + el.mem_vsz + '</td>';
                tgt += '<td>mem_rss: ' +el.mem_rss + '</td>';
                tgt += '<td>nice: ' + el.nice + '</td>';
                tgt += '<td>started: ' + el.started + '</td>';
                tgt += '<td>state: ' + el.state + '</td>';
                tgt += '<td>tty: ' + el.tty + '</td>';
                tgt += '<td>user: ' + el.user + '</td>';
                tgt += '<td>command: ' + el.command + '</td>';
            tgt += '</tr>';
        }
        tgt += '</table>';
        return tgt;
    }

    constructor() {
    }
}

module.exports = Interval;