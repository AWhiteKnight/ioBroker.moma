/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const si = require('systeminformation');
let adapter;
let isInit = true;
let isInitDone = false;

/**
 * Class Systeminfo implements the logic to use 'systeminfo' library
 *  (c) 2019 AWhiteKnight
 */
class Systeminfo {
    static init(theAdapter) {
        adapter = theAdapter;
        isInit = !isInitDone;
        Systeminfo.getData(5);
        isInitDone = true;
    }

    static getData(interval) {
        si.getAllData()
        .then(data => {
            switch (interval) {
                case 5:
                    adapter.log.debug('running 5');
                    // if(isInit) {
                    //     for(const key in data) {
                    //         adapter.log.debug(key);
                    //         adapter.log.debug(JSON.stringify(data[key]));
                    //     }
                    // }
                    Systeminfo.showData(data.version, 'version', adapter, isInit);
                    Systeminfo.showData(data.node, 'node', adapter, isInit);
                    Systeminfo.showData(data.v8, 'v8', adapter, isInit);
                    if(adapter.config.system) {
                        Systeminfo.showData(data.system, 'system', adapter, isInit);
                    }
                    if(adapter.config.bios) {
                        Systeminfo.showData(data.bios, 'bios', adapter, isInit);
                    }
                    if(adapter.config.baseboard) {
                        Systeminfo.showData(data.baseboard, 'baseboard', adapter, isInit);
                    }
                    if(adapter.config.chassis) {
                        Systeminfo.showData(data.chassis, 'chassis', adapter, isInit);
                    }
                    if(adapter.config.cpu) {
                        Systeminfo.showData(data.cpu, 'cpu', adapter, isInit);
                    }
                    if(adapter.config.net) {
                        Systeminfo.showData(data.net, 'net', adapter, isInit);
                    }
                    if(adapter.config.memLayout) {
                        Systeminfo.showData(data.memLayout, 'memLayout', adapter, isInit);
                    }
                    if(adapter.config.diskLayout) {
                        Systeminfo.showData(data.diskLayout, 'diskLayout', adapter, isInit);
                    }
                case 4:
                    adapter.log.debug('running 4');
                    if(adapter.config.os) {
                        Systeminfo.showData(data.os, 'os', adapter, isInit);
                    }
                    if(adapter.config.uuid) {
                        Systeminfo.showData(data.uuuid, 'uuid', adapter, isInit);
                    }
                    if(adapter.config.versions) {
                        Systeminfo.showData(data.versions, 'versions', adapter, isInit);
                    }
                case 3:
                    adapter.log.debug('running 3');
                    if(adapter.config.graphics) {
                        Systeminfo.showData(data.graphics, 'graphics', adapter, isInit);
                    }
                    if(adapter.config.net) {
                         Systeminfo.showData(data.net, 'net', adapter, isInit);
                    }
                case 2:
                    adapter.log.debug('running 2');
                    if(adapter.config.battery) {
                        Systeminfo.showData(data.battery, 'battery', adapter, isInit);
                    }
                    if(adapter.config.users) {
                        Systeminfo.showData(data.users, 'users', adapter, isInit);
                    }
                    if(adapter.config.fsSize) {
                        Systeminfo.showData(data.fsSize, 'fsSize', adapter, isInit);
                    }
                    if(adapter.config.fsStats) {
                        Systeminfo.showData(data.fsStats, 'fsStats', adapter, isInit);
                    }
                    if(adapter.config.disksIO) {
                        Systeminfo.showData(data.disksIO, 'disksIO', adapter, isInit);
                    }
                case 1:
                    adapter.log.debug('running 1');
                    if(adapter.config.temp) {
                        Systeminfo.showData(data.temp, 'temp', adapter, isInit);
                    }
                    if(adapter.config.cpuTemperature) {
                         Systeminfo.showData(data.temp, 'temp', adapter, isInit);
                    }
                    if(adapter.config.mem) {
                        Systeminfo.showData(data.mem, 'mem', adapter, isInit);
                    }
                    if(adapter.config.networkStats) {
                        Systeminfo.showData(data.networkStats, 'networkStats', adapter, isInit);
                    }
                case 0:
                    adapter.log.debug('running 0');
                    if(adapter.config.time) {
                        Systeminfo.showData(data.time, 'time', adapter, isInit);
                    }
                    if(adapter.config.cpuCurrentSpeed) {
                        Systeminfo.showData(data.cpuCurrentSpeed, 'cpuCurrentSpeed', adapter, isInit);
                    }
                    if(adapter.config.networkConnections) {
                        Systeminfo.showData(data.networkConnections, 'networkConnections', adapter, isInit);
                    }
                    if(adapter.config.currentLoad) {
                        Systeminfo.showData(data.currentLoad, 'currentLoad', adapter, isInit);
                    }
                    if(adapter.config.processes) {
                    //  adapter.log.debug('Processes: ' + JSON.stringify(data));
                        Systeminfo.showData(data.processes, 'processes', adapter, isInit);
                    }
            }
        })
        .catch(error => adapter.log.error(error));
    }

    /**
     * 
     * @param {string} src 
     * @param {string} tgtId 
     */
    static async showData(src, tgtId, adapter, isInit) {
        // state
        if(typeof src !== 'object') {
            // await adapter.getState(adapter.namespace+'.'+tgtId, async (err, res) => {
                // if(res) {
                    // let oldVal = res['val'];
                    // if(oldVal != src)
                        await adapter.setState(tgtId, {val: src, ack: true});
                // } else if(err) {
                    // await adapter.log.error(err);
                // }
            // });
        // array
        } else if(src.length != undefined) {
            if(tgtId == 'processes.list') {
                await adapter.setState(tgtId, {val: Systeminfo.createHTMLFromProcessList(src), ack: true});
            } else {
                for(let i = 0; i < src.length; i++) {
                    const element = src[i];
                    if(element != undefined) {
                        if(isInit) {
                            require(__dirname + '/helper').createArrayEntry(adapter, tgtId, i);
                        }
                        Systeminfo.showData(element, tgtId+'.'+i, adapter, isInit);
                    }
                }
            }
        // object
        } else {
          for (const key in src) {
            const element = src[key];
            Systeminfo.showData(element, tgtId+'.'+key, adapter, isInit);
          }
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

module.exports = Systeminfo;