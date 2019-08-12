/* jshint -W119 */
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

	async run(adapter, init) {
		try {
			if (adapter.config.time) {
				adapter.log.silly('time');
				Interval.showData(Interval.getSI().time(), 'time', adapter, init);
			}
			if (adapter.config.cpuCurrentSpeed) {
				adapter.log.silly('cpuCurrentSpeed');
				await Interval.getSI().cpuCurrentspeed()
					.then(data => Interval.showData(data, 'cpuCurrentSpeed', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if (adapter.config.networkConnections) {
				adapter.log.silly('networkConnections');
				await Interval.getSI().networkConnections()
					.then(data => Interval.showData(this.createHTMLFromNetworkConnectionsList(data), 'networkConnections', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if (adapter.config.currentLoad) {
				adapter.log.silly('currentLoad');
				await Interval.getSI().currentLoad()
					.then(data => Interval.showData(data, 'currentLoad', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if (adapter.config.processes) {
				adapter.log.silly('processes');
				await Interval.getSI().processes()
					.then(data => Interval.showData(this.createHTMLFromProcessList(data), 'processes', adapter, init))
					.catch(error => adapter.log.error(error));
			}
		} catch(err) {
			adapter.setStateChanged('info.connection', false, true);
			adapter.setForeignState('hostNeedsAttention', {val: true, ack: true});
			adapter.getForeignState('hostNeedsAttentionList', (err, state) => {
				if(state) {
					adapter.setForeignState('hostNeedsAttentionList', {val: state.val + require('os').hostname, ack: true});
				}
			});
			adapter.log.error('error in interval 0: ' + err);
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
			tgt += '<tr><td>';
			tgt += el.protocol + '</td><td>';
			tgt += el.localaddress + '</td><td>';
			tgt += el.localport + '</td><td>';
			tgt += el.peeraddress + '</td><td>';
			tgt += el.peerport + '</td><td>';
			tgt += el.state + '</td></tr>';
		}
		tgt += '</tbody></table>';
		return tgt;
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
		for(const i in src.list) {
			el = src.list[i];
			tgt += '<tr><td>';
			tgt +=  el.pid + '</td><td>';
			tgt +=  el.parentPid + '</td><td>';
			tgt +=  el.name + '</td><td>';
			tgt +=  el.pcpu + '</td><td>';
			tgt +=  el.pcpuu + '</td><td>';
			tgt +=  el.pcpus + '</td><td>';
			tgt +=  el.pmem + '</td><td>';
			tgt +=  el.priority + '</td><td>';
			tgt +=  el.mem_vsz + '</td><td>';
			tgt +=  el.mem_rss + '</td><td>';
			tgt +=  el.nice + '</td><td>';
			tgt +=  el.started + '</td><td>';
			tgt +=  el.state + '</td><td>';
			tgt +=  el.tty + '</td><td>';
			tgt +=  el.user + '</td><td>';
			tgt +=  el.command + '</td></tr>';
		}
		tgt += '</tbody></table>';
		src.list = tgt;
		return src;
	}
// end of class
}

module.exports = Interval0;