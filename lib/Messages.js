/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
// @ts-nocheck
'use strict';

// needs access to os information
const os = require('os');
// we read from file system
const fs = require('fs');

// callback for timer
function rebootCmdLinux() {
    // we want to spawn a command
    require('child_process').execSync('sudo /sbin/reboot' /*2> /dev/null*/);
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
    doUpdates(adapter) {
        adapter.log.info('executing updates');
      
        // we want to spawn commands
        const cmd = require('child_process');
        const defs = require(__dirname + '/definitions');
        // delete values for updates - this prevents another start
        adapter.setForeignState(defs.hostEntryHasUpdates, {val: 0, ack: true});
        adapter.setForeignState(defs.hostEntryNeedsReboot, {val: false, ack: true});
        adapter.setForeignState(defs.hostEntryListOfUpdates, {val: '', ack: true});
        try {
            switch(os.platform()) {
                case 'linux':
                    let result = null;
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
                case 'darwin':
                case 'win32':
                default:
                    adapter.log.info('Update-Manager not implemented for ' + os.platform());
                    break;
            }
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
    scheduleReboot(adapter) {
        adapter.log.info('scheduling reboot');
      
        const defs = require(__dirname + '/definitions');
        // delete values for updates - this prevents another start
        adapter.setForeignState(defs.hostEntryHasUpdates, {val: 0, ack: true});
        adapter.setForeignState(defs.hostEntryNeedsReboot, {val: false, ack: true});
        adapter.setForeignState(defs.hostEntryListOfUpdates, {val: '', ack: true});

        switch(os.platform()) {
            case 'linux':
                // reboot in 30 sec
                setTimeout(rebootCmdLinux, 30000); 
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('reboot not implemented for ' + os.platform());
                break;
        }
    }
      
    /*
     * update Adapter
     */
    updateAdapter(adapter) {
        adapter.log.info('updating Adapter');

        const cmd = require('child_process');
        const defs = require(__dirname + '/definitions');
        // delete values for updates - this prevents another start
        adapter.setForeignState(defs.hostEntryHasUpdates, {val: 0, ack: true});
        adapter.setForeignState(defs.hostEntryNeedsReboot, {val: false, ack: true});
        adapter.setForeignState(defs.hostEntryListOfUpdates, {val: '', ack: true});

        switch(os.platform()) {
            case 'linux':
                // fetch list of adapters to be updated
                adapter.getForeignState(adapter.namespace.replace('moma', 'admin') + '.info.updatesJson', (err, state) => {
                    adapter.log.debug('Adapter updates: ' + state.val);
                    try {
                        let obj = JSON.parse(state.val);
                        for (var key in obj) {
                            adapter.log.debug('upgrading ' + key + '@' + obj[key].availableVersion);
                            cmd.execSync('iobroker upgrade ' + key + '@' + obj[key].availableVersion);
                        }
                        cmd.execSync('iobroker update');
                    } catch (err) {
                        adapter.log.error(err);
                    }
                });
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('update adapter not implemented for ' + os.platform());
                break;
        }
    }

    /*
     * update JS-Controller
    */
    updateJsController(adapter) {
        adapter.log.info('updating JS-Contoller');
    
        const cmd = require('child_process');
        const defs = require(__dirname + '/definitions');
        // delete values for updates - this prevents another start
        adapter.setForeignState(defs.hostEntryHasUpdates, {val: 0, ack: true});
        adapter.setForeignState(defs.hostEntryNeedsReboot, {val: false, ack: true});
        adapter.setForeignState(defs.hostEntryListOfUpdates, {val: '', ack: true});

        switch(os.platform()) {
            case 'linux':
                cmd.execSync('iobroker update');
                cmd.execSync('iobroker upgrade self');
                cmd.execSync('iobroker restart');
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('update js-controller not implemented for ' + os.platform());
                break;
        }
    }
// end of class
}

module.exports = Messages;