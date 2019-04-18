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
        adapter.log.silly('src: ' + src + ' tgt: ' + tgtId);
        // state
        if(typeof src !== 'object') {
          adapter.setState(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            if(tgtId == 'processes.list') {
                adapter.setState(tgtId, {val: Interval.createHTMLFromProcessList(src), ack: true});
            } else {
                for(let i = 0; i < src.length; i++) {
                    const element = src[i];
                    if(element != undefined) {
                        if(init) {
                            require(__dirname + '/helper').createArrayEntry(adapter, tgtId, i);
                        }
                        Interval.showData(element, tgtId+'.'+i, adapter, init);
                    }
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

    /**
     *  convert object processes.list into html table
     *  format of src:
     *  [
     *      {
     *          'pid':      {'type': 'number',  'role': ''},
     *          'parentPid':{'type': 'number',  'role': ''},
     *          'name':     {'type': 'string',  'role': ''},
     *          'pcpu':     {'type': 'number',  'role': ''},
     *          'pcpuu':    {'type': 'number',  'role': ''},
     *          'pcpus':    {'type': 'number',  'role': ''},
     *          'pmem':     {'type': 'number',  'role': ''},
     *          'priority': {'type': 'number',  'role': ''},
     *          'mem_vsz':  {'type': 'number',  'role': ''},
     *          'mem_rss':  {'type': 'number',  'role': ''},
     *          'nice':     {'type': 'number',  'role': ''},
     *          'started':  {'type': 'string',  'role': ''},
     *          'state':    {'type': 'string',  'role': ''},
     *          'tty':      {'type': 'string',  'role': ''},
     *          'user':     {'type': 'string',  'role': ''},
     *          'command':  {'type': 'string',  'role': ''}
     *      }
     *  ]
    */
    static createHTMLFromProcessList(src) {
        let tgt = '<table>';
        for(const i in src) {
            tgt += '<tr>';
                tgt += '<td>pid: ' + src[i].pid + '</td>';
                tgt += '<td>parentPid: ' + src[i].parentPid + '</td>';
                tgt += '<td>name: ' + src[i].name + '</td>';
                tgt += '<td>pcpu: ' + src[i].pcpu + '</td>';
                tgt += '<td>pcpuu: ' + src[i].pcpuu + '</td>';
                tgt += '<td>pcpus: ' + src[i].pcpus + '</td>';
                tgt += '<td>pmem: ' + src[i].pmem + '</td>';
                tgt += '<td>priority: ' + src[i].priority + '</td>';
                tgt += '<td>mem_vsz: ' + src[i].mem_vsz + '</td>';
                tgt += '<td>mem_rss: ' + src[i].mem_rss + '</td>';
                tgt += '<td>nice: ' + src[i].nice + '</td>';
                tgt += '<td>started: ' + src[i].started + '</td>';
                tgt += '<td>state: ' + src[i].state + '</td>';
                tgt += '<td>tty: ' + src[i].tty + '</td>';
                tgt += '<td>user: ' + src[i].user + '</td>';
                tgt += '<td>command: ' + src[i].command + '</td>';
            tgt += '</tr>';
        }
        tgt += '</table>';
        return tgt;
    }

    constructor() {
    }

}

module.exports = Interval;