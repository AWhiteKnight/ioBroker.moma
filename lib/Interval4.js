/* jshint -W097 */
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
let machine = {
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

    // callback for timer
function rebootCmdLinux() {
    // we want to spawn a command
    require('child_process').execSync('sudo /sbin/reboot' /*2> /dev/null*/);
}

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
            adapter.log.silly('checkUpdates');
            if(adapter.config.updates) {
                this.getListOfUpdates(adapter);
            }
            adapter.log.silly('checkBatteries');
            if(adapter.config.checkBatteries) {
                this.doCheckBatteries(adapter);
            }
        } catch(err) {
            adapter.log.error('Error in interval 4: ' + err);
        }
        if(adapter.config.osInfo) {
            adapter.log.silly('osInfo');
            await Interval.getSI().osInfo()
                .then(data => Interval.showData(data, 'osInfo', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.uuid) {
            adapter.log.silly('uuid');
            await Interval.getSI().uuid()
                .then(data => Interval.showData(data, 'uuid', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.shell) {
            adapter.log.silly('shell');
            await Interval.getSI().shell()
                .then(data => Interval.showData(data, 'shell', adapter, init))
                .catch(error => adapter.log.error(error));
        }
        if(adapter.config.versions) {
            adapter.log.silly('versions');
            await Interval.getSI().versions()
                .then(data => Interval.showData(data, 'versions', adapter, init))
                .catch(error => adapter.log.error(error));
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
            let hostNeedsReboot = machine.needsReboot;
            let hostNeedsRebootList = '';
            if(machine.needsReboot == true) {
                hostNeedsRebootList = machine.hostname + ' ';
            }
            let hostNeedsUpdate = (machine.numUpdates > 0);
            let hostNeedsUpdateList = '';
            if(machine.numUpdates > 0) {
                hostNeedsUpdateList = machine.hostname + ' ';
            }
            adapter.getForeignObjects(defs.hostsList + '.*', 'state', (err, states) => {
                if(err) {
                    adapter.log.error(err);
                } else {
                    for (let j in states) {
                        let arr = states[j]._id.split('.');
                        let stateid = arr.pop();
                        let instance = arr.pop();
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
            adapter.log.error('Error maintaining states / ' + error);
        }
    }

    /*
     * fetches the list of updates available for the machine
     * parameter: long - if set to true, the full information will be returned, otherweise only package name
     * format: [package-info|package-info|...]
    */
    getListOfUpdates(adapter) {
      
        if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
            adapter.log.debug('Package-Manager not initialized!');
            return;
        }
      
        // we want to spawn commands
        const cmd = require('child_process');
      
        let list = [];
        switch(machine.platform) {
          case 'linux':
            // TODO implement for different package managers
            if(machine.pkgMgr === 'apt') {
              // debian packages with apt 
              cmd.execSync('sudo apt update 2> /dev/null');
              let lines = cmd.execSync('sudo apt list --upgradeable 2> /dev/null').toString().split('\n');
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
              let lines = cmd.execSync('sudo yum check-update 2> /dev/null').toString().split('\n');
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
              let lines = cmd.execSync('sudo zypper list-updates 2> /dev/null').toString().split('\n');
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
     * executes updates for the machine
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
      
        switch(machine.platform) {
          case 'linux':
                if(machine.pkgMgr === undefined || machine.pkgMgr === null) {
                adapter.log.debug('Package-Manager not initialized!');
                return;
                }
                // TODO implement for different package managers
                // TODO implement Auswertung von result
                let result = null;
                if(machine.pkgMgr === 'apt') {
                // debian packages with apt 
                cmd.execSync('sudo apt update');
                result = cmd.execSync('sudo apt full-upgrade -y 2> /dev/null').toString().split('\n');
                } else if(machine.pkgMgr === 'yum') {
                // TODO:redhat packages with yum / check for reboot: needs-restarting -r
                result = cmd.execSync('sudo yum update -y 2> /dev/null').toString().split('\n');
                } else if(machine.pkgMgr === 'zypper') {
                // opennsuse packages with zypper
                cmd.execSync('sudo zypper refresh');
                result = cmd.execSync('sudo zypper dup -y 2> /dev/null').toString().split('\n');
                // TODO check for reboot: needs-restarting -r or zypper ps -s
                }
                adapter.log.debug('update result: ' + result);
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('Update-Manager not implemented for ' + machine.platform);
                break;
        }
        // maintain machine state
        machine.numUpdates = 0;
        this.maintainStates([], adapter);
        adapter.setForeignState(defs.hostEntryLastUpdate, {val: Date.now(), ack: true});
    }
    
    /*
     * schedules reboot for the machine
    */
    scheduleReboot(adapter) {
        adapter.log.info('scheduling reboot');
      
        const defs = require(__dirname + '/definitions');
        // delete values for updates - this prevents another start
        adapter.setForeignState(defs.hostEntryHasUpdates, {val: 0, ack: true});
        adapter.setForeignState(defs.hostEntryNeedsReboot, {val: false, ack: true});
        adapter.setForeignState(defs.hostEntryListOfUpdates, {val: '', ack: true});

        switch(machine.platform) {
            case 'linux':
                // reboot in 30 sec
                setTimeout(rebootCmdLinux, 30000); 
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('reboot not implemented for ' + machine.platform);
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

        switch(machine.platform) {
            case 'linux':
                let res = cmd.execSync('iobroker update');
                res = cmd.execSync('iobroker upgrade self');
                res = cmd.execSync('iobroker restart');
                break;
            case 'darwin':
            case 'win32':
            default:
                adapter.log.info('reboot not implemented for ' + machine.platform);
                break;
        }
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
      
        adapter.getForeignObjects('*.SDS_P1', 'state', function(err, stateslist) {
            if(err) {
                adapter.log.error(err);
            } else {
                for (let j in stateslist) {
                    let stateid = stateslist[j]._id.split('.').pop();
                    if(stateid == 'LOWBAT' || stateid == 'LOW_BAT') {
                        adapter.getForeignState(stateslist[j]._id, function(err, state) {
                            if(err) {
                                adapter.log.error(err);
                            } else {
                                if(state.val == true) {
                                    isDevice = true;
                                    deviceList += stateslist[j]._id;
                                }
                            }
                        });
                    }
                }
            }
        });
        adapter.setForeignState(defs.deviceNeedsBatteryChange, {val: isDevice, ack: true});
        adapter.setForeignState(defs.deviceNeedsBatteryChangeList, {val: deviceList, ack: true});
    }

// end of class
}

module.exports = Interval4;