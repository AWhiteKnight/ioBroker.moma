/* jshint -W119 */
/* jshint -W097 */
/* jshint -W083 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

const Interval = require(__dirname + '/Interval.js');

/*
 * structure containing all Info of this machine
 */
const machine = {
	//  aix,darwin,freebsd,linux,openbsd,sunos,win32
	platform: '',
	// packageManager on Linux
	pkgMgr: '',
	// amount of updates: maintained by coding call function getListOfUpdates(false|true)
	numUpdates: 0,
	// flag whether machine needs reboot: maintained by coding call function getListOfUpdates(false|true)
	needsReboot: false,
	hostname: ''
};

/**
 * Class Interval4 implements the logic used in interval 4 by moma
 *  (c) 2019 AWhiteKnight
 */
class Interval4 extends Interval {
	constructor() {
		super();
		// needs access to os information
		const os = require('os');
		// we read from file system
		const fs = require('fs');
      
		// init variables
		machine.platform =  os.platform();
		machine.hostname = os.hostname();
      
		switch(machine.platform) {
			case 'linux':
				// RedHat Package-Manager zypper
				if(fs.existsSync('/usr/bin/zypper')) {
					machine.pkgMgr = 'zypper';
					// Debian Package-Manager apt
				} else if (fs.existsSync('/usr/bin/apt')) {
					machine.pkgMgr = 'apt';
					// RedHat Package-Manager yum
				} else if (fs.existsSync('/usr/bin/yum')) {
					machine.pkgMgr = 'yum';
					// unknown
				} else {
					machine.pkgMgr = '';
				}
				break;
			case 'darwin':
			case 'win32':
			default:
				machine.pkgMgr = '';
				break;
		}
	}

	async run(adapter, init) {
		try {
			if(adapter.config.updates) {
				this.getListOfUpdates(adapter);
			}
			if(adapter.config.checkIob) {
				this.checkIoBroker(adapter);
			}
			if(adapter.config.checkBatteries) {
				this.doCheckBatteries(adapter);
			}
		} catch(err) {
			this.logError(adapter, err, 4);
		}

		if(adapter.config.osInfo) {
			await Interval.getSI().osInfo()
				.then(data => this.showData(data, 'osInfo', adapter, init))
				.catch(error => this.logError(adapter, error, 4));
		}
		if(adapter.config.uuid) {
			await Interval.getSI().uuid()
				.then(data => this.showData(data, 'uuid', adapter, init))
				.catch(error => this.logError(adapter, error, 4));
		}
		if(adapter.config.shell) {
			await Interval.getSI().shell()
				.then(data => this.showData(data, 'shell', adapter, init))
				.catch(error => this.logError(adapter, error, 4));
		}
		if(adapter.config.versions) {
			await Interval.getSI().versions()
				.then(data => this.showData(data, 'versions', adapter, init))
				.catch(error => this.logError(adapter, error, 4));
		}
	}
      
	/**
     * @param {string[] | never[]} list
    */
	maintainStates(list, adapter) {
		// needs access to state definitions
		const defs = require(__dirname + '/definitions');

		try {
			machine.needsReboot = false;
			machine.numUpdates = list.length;
			if(machine.pkgMgr === 'apt') {
				// check whether /var/run/reboot-required existiert
				if(require('fs').existsSync('/var/run/reboot-required')) {
					machine.needsReboot = true;
				}
			} else {
				adapter.log.info('Package-Manager not initialized!');
			}

			// maintain states of this machine
			adapter.setForeignState(defs.hostEntryHasUpdates, {val: machine.numUpdates, ack: true});
			adapter.setForeignState(defs.hostEntryNeedsReboot, {val: machine.needsReboot, ack: true});
			adapter.setForeignState(defs.hostEntryListOfUpdates, {val: list.join(', '), ack: true});

			// maintain global states hostNeedsReboot / hostNeedsUpdate properly regarding other machines
			adapter.setForeignState(defs.hostNeedsUpdate, {val: false, ack: true});
			adapter.setForeignState(defs.hostNeedsReboot, {val: false, ack: true});
			adapter.setForeignState(defs.hostNeedsUpdateList, {val: '', ack: true});
			adapter.setForeignState(defs.hostNeedsRebootList, {val: '', ack: true});

			// initialize variables
			let hostNeedsReboot = false;
			let hostNeedsRebootList = '';
			let hostNeedsUpdate = false;
			let hostNeedsUpdateList = '';

			adapter.getForeignObjects(defs.hostsList + '.*', 'state', (err, states) => {
				if(err) {
					adapter.log.error(err);
				} else {
					for (const j in states) {
						const arr = states[j]._id.split('.');
						const stateid = arr.pop();
						const instance = arr.pop();
						if(stateid == 'needsReboot') {
							adapter.getForeignState(states[j]._id, (err, state) => {
								if(err) {
									adapter.log.error(err);
								} else if(state) {
									if(state.val == true) {
										hostNeedsReboot = true;
										hostNeedsRebootList += instance + ' ';
										// set values
										adapter.setForeignState(defs.hostNeedsReboot, {val: hostNeedsReboot, ack: true});
										adapter.setForeignState(defs.hostNeedsRebootList, {val: hostNeedsRebootList, ack: true});
									}
								}
							});
						} else if(stateid == 'numUpdates') {
							adapter.getForeignState(states[j]._id, (err, state) => {
								if(err) {
									adapter.log.error(err);
								} else if(state) {
									if(state.val > 0) {
										hostNeedsUpdate = true;
										hostNeedsUpdateList += instance + ' ';
										// set values
										adapter.setForeignState(defs.hostNeedsUpdate, {val: hostNeedsUpdate, ack: true});
										adapter.setForeignState(defs.hostNeedsUpdateList, {val: hostNeedsUpdateList, ack: true});
									}
								}
							});
						}
					}
				}
			});
		} catch (error) {
			adapter.log.error('Error maintaining states: ' + error);
		}
	}

	/*
     * fetches the list of updates available for the machine
     * format: [package-info|package-info|...]
    */
	getListOfUpdates(adapter) {
      
		if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
			adapter.log.debug('Package-Manager not initialized!');
			return;
		}
      
		// we want to spawn commands
		const cmd = require('child_process');
      
		const list = [];
		switch(machine.platform) {
			case 'linux':
				// TODO implement for different package managers
				if(machine.pkgMgr === 'apt') {
					// debian packages with apt 
					cmd.execSync('sudo apt update 2> /dev/null');
					const lines = cmd.execSync('sudo apt list --upgradeable 2> /dev/null').toString().split('\n');
					let k = 0;
					let pkg;
					for(let i = 0; i < lines.length; i++) {
						if(lines[i].length > 16) {
							pkg = lines[i].toString().split('/');
							if(pkg != undefined && pkg[0] != undefined) {
								list[k++] = pkg[0].trim();
							}
						}
					}
				} else if(machine.pkgMgr === 'yum') {
					const lines = cmd.execSync('sudo yum check-update 2> /dev/null').toString().split('\n');
					let k = 0;
					// TODO: wie arbeitet yum
					let pkg;
					for(let i = 0; i < lines.length; i++) {
						pkg = lines[i].toString().split('|');
						if(pkg != undefined && pkg[1] != undefined) {
							list[k++] = pkg[1].trim();
						}
					}
				} else if(machine.pkgMgr === 'zypper') {
					// redhat packages with zypper
					cmd.execSync('sudo zypper refresh');
					const lines = cmd.execSync('sudo zypper list-updates 2> /dev/null').toString().split('\n');
					let k = 0;
					let pkg;
					for(let i = 5; i < lines.length; i++) {
						pkg = lines[i].toString().split('|');
						if(pkg != undefined && pkg[2] != undefined) {
							list[k++] = pkg[2].trim();
						}
					}
				}
				break;
			case 'darwin':
			case 'win32':
			default:
				adapter.log.info('Update-Manager not implemented for ' + machine.platform);
				break;
		}
		// maintain machine state
		this.maintainStates(list, adapter);
	}

	/*
     * Function checks battery state for all devices in every adapter
     * Currently implemented:
     *  + boolean values
     *    - LOWBAT / LOWBAT_ALARM     (e.g. Homematic classic and CUXD)
     *    - LOW_BAT / LOW_BAT_ALARM   (e.g. Homematic IP)
     */
	doCheckBatteries(adapter) {
		// needs access to state definitions
		const defs = require(__dirname + '/definitions');

		//let batteryStates = ['LOWBAT', 'LOW_BAT'];
		//let alarmStates = ['LOWBAT_ALARM', 'LOW_BAT_ALARM'];
        
		let deviceList = '';
		let isDevice = false;

		adapter.setForeignState(defs.deviceNeedsBatteryChange, {val: isDevice, ack: true});
		adapter.setForeignState(defs.deviceNeedsBatteryChangeList, {val: deviceList, ack: true});

		adapter.getForeignObjects('*.SDS_P1', 'state', function(err, stateslist) {
			if(err) {
				adapter.log.error(err);
			} else {
				for (const j in stateslist) {
					const stateid = stateslist[j]._id.split('.').pop();
					if(stateid == 'LOWBAT' || stateid == 'LOW_BAT') {
						adapter.getForeignState(stateslist[j]._id, function(err, state) {
							if(err) {
								adapter.log.error(err);
							} else {
								if(state && state.val == true) {
									isDevice = true;
									deviceList += stateslist[j]._id;
									adapter.setForeignState(defs.deviceNeedsBatteryChange, {val: isDevice, ack: true});
									adapter.setForeignState(defs.deviceNeedsBatteryChangeList, {val: deviceList, ack: true});
								}
							}
						});
					}
				}
			}
		});
	}

	/*
	 * Function checks updates on iobroker adapter and controller
	 * Examples of output lines:
	 * Adapter "asuswrt" : 1.0.1
	 * Adapter "history" : 1.8.6 , installed 1.8.6
	 * Controller "js-controller" : 1.5.13 , installed 1.5.12 [Updateable]
	 * 
     */
	checkIoBroker(adapter) {
		// needs access to state definitions
		const defs = require(__dirname + '/definitions');
		// we want to spawn commands
		const cmd = require('child_process');
		let newController = '';
		let newAdapter = '';
		let lines = [];
		switch(machine.platform) {
			case 'linux':
				lines = cmd.execSync('iobroker update 2> /dev/null',[],{cwd:'/opt/iobroker'}).toString().split('\n');
				break;
			case 'win32':
				lines = cmd.execSync('iobroker update 2> /dev/null',[],{cwd:'C:\\iobroker'}).toString().split('\n');
				break;
			case 'darwin':
			default:
				adapter.log.info('Update-Manager not implemented for ' + machine.platform);
				break;
		}
		for(let i = 0; i < lines.length; i++) {
			// adapter.log.debug(lines[i]);
			if(lines[i].search('Updateable') > 0) {
				const content = lines[i].split(':');
				const adapterName = content[0].split('"')[1];
				const newVersion = content[1].split(' ')[1].trim();
				// adapter.log.debug(adapterName);
				if(adapterName == 'js-controller') {
					newController = adapterName + '@' + newVersion;
				} else { // Adapter
					newAdapter = newAdapter + (adapterName + '@' + newVersion + ',');
				}
			}
		}
		// adapter.log.debug(newController + '/' + newAdapter);
		adapter.setForeignState(defs.hostEntryListOfAdapterUpdates, {val: newAdapter, ack: true});
		adapter.setForeignState(defs.hostEntryControllerUpdate, {val: newController, ack: true});
	}

// end of class
}

module.exports = Interval4;