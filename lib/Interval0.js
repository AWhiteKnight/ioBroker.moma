/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/**
 * Class Interval0 implements the logic used in secondly interval 0 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval0 extends Interval {
    constructor() {
        super();
    }

    run(adapter, init) {
        this.time(adapter, init);
        this.cpuCurrentSpeed(adapter, init);
        this.networkConnections(adapter, init);
        this.currentLoad(adapter, init);
        this.processes(adapter, init);
    }

    time(adapter, init) {
        if (adapter.config.time) {
            Interval.showData(Interval.getSI().time(), 'time', adapter, init);
        }
    }

    async cpuCurrentSpeed(adapter, init) {
        if (adapter.config.cpuCurrentSpeed) {
            await Interval.getSI().cpuCurrentspeed()
                .then(data => Interval.showData(data, 'cpuCurrentSpeed', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async networkConnections(adapter, init) {
        if (adapter.config.networkConnections) {
            await Interval.getSI().networkConnections()
                .then(data => Interval.showData(this.createHTMLFromNetworkConnectionsList(data), 'networkConnections', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    /**
     * convert object networkConnections into html table
     * format of networkConnections:
     * 'networkConnections': [{
     *          'protocol',
     *          'localaddress',
     *          'localport',
     *          'peeraddress',
     *          'peerport',
     *          'state'
     *      }]
    */
    createHTMLFromNetworkConnectionsList(src) {
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

    async currentLoad(adapter, init) {
        if (adapter.config.currentLoad) {
            await Interval.getSI().currentLoad()
                .then(data => Interval.showData(data, 'currentLoad', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    async processes(adapter, init) {
        if (adapter.config.processes) {
            await Interval.getSI().processes()
                .then(data => Interval.showData(this.createHTMLFromProcessList(data), 'processes', adapter, init))
                .catch(error => adapter.log.error(error));
        }
    }

    /**
     *  convert object processes.list into html table
     *  format of processes.list:
     *  [{
     *      'pid',
     *      'parentPid',
     *      'name',
     *      'pcpu',
     *      'pcpuu',
     *      'pcpus',
     *      'pmem',
     *      'priority',
     *      'mem_vsz',
     *      'mem_rss',
     *      'nice',
     *      'started',
     *      'state',
     *      'tty'  ,
     *      'user',
     *      'command'
     *  }]
    */
    createHTMLFromProcessList(src) {
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
// end of class
}

module.exports = Interval0;