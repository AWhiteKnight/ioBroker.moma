/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
'use strict';

// needs access to os information
const os = require('os');
// we read from file system
const fs = require('fs');

// callback for timer
function rebootCmdLinux() {
	// spawn reboot
	require('child_process').exec('sudo /sbin/reboot');
}

/**
 * Class Interval4 implements the logic used in interval 4 by moma
 *  (c) 2019 AWhiteKnight
 */
class Messages {
	constructor() {
	}

	/*
     * executes updates for the operating system
    */
	async doUpdates(adapter) {
		adapter.log.info('executing updates');
      
		// we want to spawn commands
		const cmd = require('child_process');
		const defs = require(__dirname + '/definitions');
		// delete values for updates - this prevents another start
		await adapter.setForeignStateChangedAsync(defs.hostEntryHasUpdates, {val: 0, ack: true});
		await adapter.setForeignStateChangedAsync(defs.hostEntryNeedsReboot, {val: false, ack: true});
		await adapter.setForeignStateChangedAsync(defs.hostEntryListOfUpdates, {val: '', ack: true});
		try {
			let result = null;
			switch(os.platform()) {
				case 'linux':
					// TODO implement for different package managers
					// TODO implement Auswertung von result
					// RedHat Package-Manager zypper
					if(fs.existsSync('/usr/bin/zypper')) {
						// opennsuse packages with zypper
						cmd.execSync('sudo zypper refresh');
						result = cmd.execSync('sudo zypper dup -y 2> /dev/null').toString();//.split('\n');
						adapter.log.info('upgrade result: ' + result);
						// TODO check for reboot: needs-restarting -r or zypper ps -s
						// Debian Package-Manager apt
					} else if (fs.existsSync('/usr/bin/apt')) {
						// debian packages with apt 
						// cmd.execSync('sudo apt update');
						result = cmd.execSync('sudo apt full-upgrade -y 2> /dev/null').toString();//.split('\n');
						adapter.log.info('upgrade result: ' + result);
						result = cmd.execSync('sudo apt autoremove -y 2> /dev/null').toString();//.split('\n');
						adapter.log.info('autoremove result: ' + result);
						// RedHat Package-Manager yum
					} else if (fs.existsSync('/usr/bin/yum')) {
						// TODO:redhat packages with yum / check for reboot: needs-restarting -r
						result = cmd.execSync('sudo yum update -y 2> /dev/null').toString();//.split('\n');
						adapter.log.info('upgrade result: ' + result);
						// unknown
					} else {
						adapter.log.debug('Package-Manager not initialized!');
						return;
					}
					break;
				case 'win32':
				case 'darwin':
				default:
					adapter.log.info('Update-Manager not implemented for ' + os.platform());
					break;
			}
			// update states
			const iv4 = require(__dirname + '/Interval4.js');
			new iv4().getListOfUpdates(adapter);
		} catch(err) {
			adapter.log.error('doUpdates: ' + err);
			// try to repair
			try {
				if(fs.existsSync('/usr/bin/apt')) {
					cmd.execSync('sudo dpkg --configure -a');
				}
			} catch(err2) {
				adapter.log.error('repair failed: ' + err2);
			}
		}
	}
    
	/*
     * schedules reboot for the operating system
    */
	async scheduleReboot(adapter) {
		adapter.log.info('scheduling reboot');
      
		const defs = require(__dirname + '/definitions');
		// delete values for updates - this prevents another start
		await adapter.setForeignStateChangedAsync(defs.hostEntryHasUpdates, {val: 0, ack: true});
		await adapter.setForeignStateChangedAsync(defs.hostEntryNeedsReboot, {val: false, ack: true});
		await adapter.setForeignStateChangedAsync(defs.hostEntryListOfUpdates, {val: '', ack: true});

		switch(os.platform()) {
			case 'linux':
				// reboot in 30 sec
				setTimeout(rebootCmdLinux, 30000); 
				break;
			case 'win32':
			case 'darwin':
			default:
				adapter.log.info('reboot not implemented for ' + os.platform());
				break;
		}
	}
      
	/*
     * update Adapter
     */
	async updateAdapter(adapter) {
		adapter.log.info('updating Adapter');

		const cmd = require('child_process');
		const defs = require(__dirname + '/definitions');
		// fetch list of adapters to be updated
		adapter.getForeignState(defs.hostEntryListOfAdapterUpdates, async (err, state) => {
			// adapter.log.debug('Adapter updates: ' + state.val);
			let command;
			const options = {};
			switch(os.platform()) {
				case 'linux':
				case 'darwin':
					options.cwd = '/opt/iobroker/';
					command = 'iobroker upgrade ';
					break;
				case 'win32':
					options.cwd ='C:\\iobroker';
					command = 'C:\\iobroker\\iob upgrade '
					break;
				default:
					adapter.log.info('update adapter not implemented for ' + os.platform());
					// bail out
					return;
			}

			try {
				const obj = state.val.split(',');
				// adapter.log.debug(JSON.stringify(obj));
				let updateMoma = null;
				for (let i = 0; i < obj.length; i++) {
					if(obj[i].length > 0) {
						// skip moma adapter and remember to do after all the others
						if(obj[i].includes('moma')) {
							updateMoma = obj[i];
						} else {
							adapter.log.debug('upgrading ' + obj[i]);
							cmd.execSync(command + obj[i], options);
						}
					}
				}
				// update moma if neccessary
				if(updateMoma) {
					adapter.log.debug('upgrading ' + updateMoma);
					cmd.execSync(command + updateMoma, options);
				}
				// update states
				await adapter.setForeignStateChangedAsync(defs.hostEntryListOfAdapterUpdates, {val: '', ack: true});
				const iv4 = require(__dirname + '/Interval4.js');
				new iv4().checkIoBroker(adapter);
			} catch (err) {
				adapter.log.error(err);
				// try to repair
				try {
					switch(os.platform()) {
						case 'linux':
							cmd.execSync('curl -sL https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/fix_installation.sh | bash -', {cwd:'/opt/iobroker'});
							break;
						case 'win32':
						case 'darwin':
						default:
							adapter.log.info('repair not implemented for ' + os.platform());
							break;
					}
				} catch (err) {
					adapter.log.error(err);
				}
			}
		});
	}

	/*
     * update JS-Controller
     */
	async updateJsController(adapter) {
		adapter.log.info('updating JS-Contoller');
    
		const cmd = require('child_process');
		const defs = require(__dirname + '/definitions');
		let command1;
		let command2 ;
		const options = {};
		switch(os.platform()) {
			case 'win32':
				options.cwd ='C:\\iobroker';
				command1 = 'C:\\iobroker\\iob ';
				break;
			default:
				options.cwd = '/opt/iobroker';
				command1 = 'iobroker ';
				break;
		}
		// delete values for updates - this prevents another start
		await adapter.setForeignStateChangedAsync(defs.hostEntryControllerUpdate, {val: '', ack: true});
		cmd.exec(command1 + 'update', options, async (err, stdout, stderr) => { 
			if(err) {
				adapter.log.error(err);
			} else {
				if(stderr) {
					adapter.log.error(stderr.trim());
				}
				const lines = stdout.toString().split('\n');
				// scan 'lines' for upgradeable js-controller
				for(let i = 0; i < lines.length; i++) {
					// adapter.log.debug(lines[i]);
					if(lines[i].search('Updateable') > 0) {
						const content = lines[i].split(':');
						const adapterName = content[0].split('"')[1];
						const newVersion = content[1].split(' ')[1].trim();
						if(adapterName == 'js-controller') {
							adapter.log.info('updating ' + adapterName + ' to ' + newVersion);
							// update controller
							command2 = `npm install iobroker.js-controller@${newVersion} --unsafe-perm --loglevel error --prefix "${options.cwd}"`
							adapter.log.info(command2);
						}
					}
				}
				if(command2) {
					const result = cmd.execSync(command2, options);
					adapter.log.debug(result);
					adapter.log.info('restarting iobroker');
					cmd.exec(command1 + 'restart', options);
				}
			}
		});		
	}
// end of class
}

module.exports = Messages;
