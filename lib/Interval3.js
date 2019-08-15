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
 * Class Interval3 implements the logic used in interval 3 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval3 extends Interval {
	constructor() {
		super();
	}

	async run(adapter, init) {
		try {
			if(adapter.config.graphics) {
				adapter.log.silly('graphics');
				await Interval.getSI().graphics()
					.then(data => this.showData(data, 'graphics', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.networkInterfaces) {
				adapter.log.silly('networkInterfaces');
				await Interval.getSI().networkInterfaces()
					.then(data => this.showData(data, 'networkInterfaces', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.networkInterfaceDefault) {
				adapter.log.silly('networkInterfaceDefault');
				await Interval.getSI().networkInterfaceDefault()
					.then(data => this.showData(data, 'networkInterfaceDefault', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.networkInterfaceDefault) {
				adapter.log.silly('inetLatency');
				await Interval.getSI().inetLatency()
					.then(data => this.showData(data, 'inetLatency', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.dockerInfo) {
				adapter.log.silly('dockerInfo');
				await Interval.getSI().dockerInfo()
					.then(data => this.showData(data, 'dockerInfo', adapter, init))
					.catch(error => adapter.log.error(error));
			}
			if(adapter.config.dockerContainers) {
				adapter.log.silly('dockerContainers');
				await Interval.getSI().dockerContainers()
					.then(data => this.showData(this.createHtmlFromDockerContainers(data), 'dockerContainers', adapter, init))
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
			adapter.log.error('error in interval 3: ' + err);
		}
	}
    
	/**
     * convert object dockerContainers into html table
     * format of dockerContainers:
     * 'dockerContainers': [{
     *          'id',
     *          'name',
     *          'image',
     *          'imageID',
     *          'command',
     *          'created', not displayed
     *          'started', not displayed
     *          'finished', not displayed
     *          'createdAt',
     *          'startedAt',
     *          'finishedAt',
     *          'state',
     *          'restartCount',
     *          'platform',
     *          'driver',
     *          'ports[]',
     *          'mounts[]'
     *      }]
    */
	createHtmlFromDockerContainers(src) {
		let tgt = '<table><thead><tr><th>name</th><th>state</th><th>image</th><th>command</th><th>created</th><th>started</th><th>finished</th><th>restartCount</th><th>platform</th><th>driver</th><th>ports</th><th>mounts</th><th>id</th><th>imageID</th></tr></thead><tbody>';
		let el;
		for(const i in src) {
			el = src[i];
			tgt += '<tr>';
			tgt += '<td>' + el.name + '</td>';
			tgt += '<td>' + el.state + '</td>';
			tgt += '<td>' + el.image + '</td>';
			tgt += '<td>' + el.command + '</td>';
			tgt += '<td>' + el.createdAt + '</td>';
			tgt += '<td>' + el.startedAt + '</td>';
			tgt += '<td>' + el.finishedAt + '</td>';
			tgt += '<td>' + el.restartCount + '</td>';
			tgt += '<td>' + el.platform + '</td>';
			tgt += '<td>' + el.driver + '</td>';
			tgt += '<td>' + JSON.stringify(el.ports) + '</td>';
			tgt += '<td>' + JSON.stringify(el.mounts) + '</td>';
			tgt += '<td>' + el.id + '</td>';
			tgt += '<td>' + el.imageID + '</td>';
			tgt += '</tr>';
		}
		tgt += '</tbody></table>';
		return tgt;
	}
// end of class
}

module.exports = Interval3;