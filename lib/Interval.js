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
            } else if(tgtId == 'networkConnections') {
                await adapter.setStateChanged(tgtId, {val: Interval.createHTMLFromNetworkConnectionsList(src), ack: true});
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
        let tgt = '<table><thead><tr><th>pid</th><th>parentPid</th><th>name</th><th>pcpu</th><th>pcpuu</th><th>pcpus</th><th>pmem</th><th>priority</th><th>mem_vsz</th><th>mem_rss</th><th>nice</th><th>started</th><th>state</th><th>tty</th><th>user</th><th>command</th></tr></thead><tbody>';
        let el;
        for(const i in src) {
            el = src[i];
            tgt += '<tr>';
                tgt += '<td>' + el.pid + '</td>';
                tgt += '<td>' + el.parentPid + '</td>';
                tgt += '<td>' + el.name + '</td>';
                tgt += '<td>' + el.pcpu + '</td>';
                tgt += '<td>' + el.pcpuu + '</td>';
                tgt += '<td>' + el.pcpus + '</td>';
                tgt += '<td>' + el.pmem + '</td>';
                tgt += '<td>' + el.priority + '</td>';
                tgt += '<td>' + el.mem_vsz + '</td>';
                tgt += '<td>' +el.mem_rss + '</td>';
                tgt += '<td>' + el.nice + '</td>';
                tgt += '<td>' + el.started + '</td>';
                tgt += '<td>' + el.state + '</td>';
                tgt += '<td>' + el.tty + '</td>';
                tgt += '<td>' + el.user + '</td>';
                tgt += '<td>' + el.command + '</td>';
            tgt += '</tr>';
        }
        tgt += '</tbody></table>';
        return tgt;
    }

    /**
     * convert object networkConnections into html table
     * format of networkConnections:
     * 'networkConnections': [
     *      {
     *          'protocol':     {'type': 'string',  'role': 'text'},
     *          'localaddress': {'type': 'string',  'role': 'text'},
     *          'localport':    {'type': 'string',  'role': 'text'},
     *          'peeraddress':  {'type': 'string',  'role': 'text'},
     *          'peerport':     {'type': 'string',  'role': 'text'},
     *          'state':        {'type': 'string',  'role': 'text'}
     *      }
     *  ],
    */
    static createHTMLFromNetworkConnectionsList(src) {
        let tgt = '<table><thead><tr><th>protocol</th><th>localaddress</th><th>localport</th><th>peeraddress</th><th>peerport</th><th>state</th></tr></thead><tbody>';
        let el;
        for(const i in src) {
            el = src[i];
            tgt += '<tr>';
                tgt += '<td>' + el.protocol + '</td>';
                tgt += '<td>' + el.localaddress + '</td>';
                tgt += '<td>' + el.localport + '</td>';
                tgt += '<td>' + el.peeraddress + '</td>';
                tgt += '<td>' + el.peerport + '</td>';
                tgt += '<td>' + el.state + '</td>';
            tgt += '</tr>';
        }
        tgt += '</tbody></table>';
        return tgt;
    }

constructor() {
    }
}

module.exports = Interval;