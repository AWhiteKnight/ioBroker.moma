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
    static getStaticData(adapter, init) {
        si.getStaticData()
        .then(data => {
            // if(init) {
            //     for(const key in data) {
            //         adapter.log.debug(key);
            //     }
            // }
            Interval.showData(data.version, 'version', adapter, init);
            if(adapter.config.system) {
                Interval.showData(data.system, 'system', adapter, init);
            }
            if(adapter.config.bios) {
                Interval.showData(data.bios, 'bios', adapter, init);
            }
            if(adapter.config.baseboard) {
                Interval.showData(data.baseboard, 'baseboard', adapter, init);
            }
            if(adapter.config.chassis) {
                Interval.showData(data.chassis, 'chassis', adapter, init);
            }
            if(adapter.config.os) {
                Interval.showData(data.os, 'os', adapter, init);
            }
            if(adapter.config.uuid) {
                Interval.showData(data.uuid, 'uuid', adapter, init);
            }
            if(adapter.config.versions) {
                Interval.showData(data.versions, 'versions', adapter, init);
            }
            if(adapter.config.cpu) {
                Interval.showData(data.cpu, 'cpu', adapter, init);
            }
            if(adapter.config.graphics) {
                Interval.showData(data.graphics, 'graphics', adapter, init);
            }
            if(adapter.config.net) {
                Interval.showData(data.net, 'net', adapter, init);
            }
            if(adapter.config.memLayout) {
                Interval.showData(data.memLayout, 'memLayout', adapter, init);
            }
            if(adapter.config.diskLayout) {
                Interval.showData(data.diskLayout, 'diskLayout', adapter, init);
            }
        })
        .catch(error => adapter.log.error(error));
    }

    static getDynamicData(adapter, interval, init) {
        si.getDynamicData()
        .then(data => {
            // if(init) {
            //     for(const key in data) {
            //         adapter.log.debug(key);
            //     }
            // }
            switch (interval) {
                case 4:
                adapter.log.debug('running Interval4');
                if(adapter.config.osInfo) {
                        Interval.showData(data.osInfo, 'osInfo', adapter, init);
                    }
                    if(adapter.config.uuid) {
                        Interval.showData(data.uuuid, 'uuid', adapter, init);
                    }
                    if(adapter.config.shell) {
                        Interval.showData(data.shell, 'shell', adapter, init);
                    }
                    if(adapter.config.versions) {
                        Interval.showData(data.versions, 'versions', adapter, init);
                    }
                case 3:
                    adapter.log.debug('running Interval3');
                    if(adapter.config.graphics) {
                        Interval.showData(data.graphics, 'graphics', adapter, init);
                    }
                    if(adapter.config.networkInterfaces) {
                        Interval.showData(data.networkInterfaces, 'networkInterfaces', adapter, init);
                    }
                    if(adapter.config.networkInterfaceDefault) {
                        Interval.showData(data.networkInterfaceDefault, 'networkInterfaceDefault', adapter, init);
                    }
                case 2:
                    adapter.log.debug('running Interval2');
                    if(adapter.config.battery) {
                        Interval.showData(data.battery, 'battery', adapter, init);
                    }
                    if(adapter.config.users) {
                        Interval.showData(data.users, 'users', adapter, init);
                    }
                    if(adapter.config.fsSize) {
                        Interval.showData(data.fsSize, 'fsSize', adapter, init);
                    }
                    if(adapter.config.blockDevices) {
                        Interval.showData(data.blockDevices, 'blockDevices', adapter, init);
                    }
                    if(adapter.config.fsStats) {
                        Interval.showData(data.fsStats, 'fsStats', adapter, init);
                    }
                    if(adapter.config.disksIO) {
                            Interval.showData(data.disksIO, 'disksIO', adapter, init);
                    }
                case 1:
                    adapter.log.debug('running Interval1');
                    if(adapter.config.cpuTemperature) {
                        Interval.showData(data.cpuTemperature, 'cpuTemperature', adapter, init);
                    }
                    if(adapter.config.mem) {
                        Interval.showData(data.mem, 'mem', adapter, init);
                    }
                    if(adapter.config.networkStats) {
                        Interval.showData(data.networkStats, 'networkStats', adapter, init);
                    }
                    if(adapter.config.fullLoad) {
                        Interval.showData(data.fullLoad, 'fullLoad', adapter, init);
                    }
                case 0:
                    adapter.log.debug('running Interval0');
                    if(adapter.config.time) {
                        // let data = Interval.getSI().time();
                        Interval.showData(data.time, 'time', adapter, init);
                    }
                    if(adapter.config.cpuCurrentSpeed) {
                        Interval.showData(data.cpuCurrentSpeed, 'cpuCurrentSpeed', adapter, init);
                    }
                    if(adapter.config.networkConnections) {
                        Interval.showData(data.networkConnections, 'networkConnections', adapter, init);
                    }
                    if(adapter.config.currentLoad) {
                        Interval.showData(data.currentLoad, 'currentLoad', adapter, init);
                    }
                    if(adapter.config.processes) {
                    //  adapter.log.debug('Processes: ' + JSON.stringify(data));
                        Interval.showData(data.processes, 'processes', adapter, init);
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
    static async showData(src, tgtId, adapter, init) {
        // state
        if(typeof src !== 'object') {
          await adapter.setState(tgtId, {val: src, ack: true});
        // array
        } else if(src.length != undefined) {
            if(tgtId == 'processes.list') {
                await adapter.setState(tgtId, {val: Interval.createHTMLFromProcessList(src), ack: true});
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

module.exports = Interval;