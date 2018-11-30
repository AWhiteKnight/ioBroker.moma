/**
 *
 * moma adapter - Monitoring and maintenance of the machine the adapter is running on
 *  (c) 2018 AWhiteKnight
 *  @author: AWhiteKnight <awhiteknight@unity-mail.de>
 *  @license: MIT
 */

 /* jshint -W097 */
 /* jshint strict:false */
 /* jslint node: true */
 'use strict';

 // you have to require the utils module and call adapter function
const utils =    require(__dirname + '/lib/utils'); // Get common adapter utils
// the moma lib
const moma = require(__dirname + '/lib/momalib');

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.moma.0
const adapter = new utils.Adapter('moma');

// some global variables to keep things under control
//  the timers
let timer0 = null;
let timer1 = null;
let timer2 = null;
let timer3 = null;
let timer4 = null;

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
  try {
    // clean up the timer
    if(timer0) { clearInterval(timer0); }
    if(timer1) { clearInterval(timer1); }
    if(timer2) { clearInterval(timer2); }
    if(timer3) { clearInterval(timer3); }
    if(timer4) { clearInterval(timer4); }
    adapter.log.info('cleaned everything up...');
    callback();
  } catch (e) {
    callback();
  }
});

// is called when databases are connected and adapter received configuration.
adapter.on('ready', function () {
  // do some preparations
  adapter.log.debug('starting adapter');
  moma.init(adapter);
  // wait a few ticks before calling main routine
  setTimeout(main, 50);
});

/*
 * call for updated states in interval_0 (default once per second)
 */
function updateInterval_0(isInitI0 = 'false') {
  // updating values
  moma.time(isInitI0);
  moma.cpuCurrentSpeed(isInitI0);
  moma.networkConnections(isInitI0);
  moma.currentLoad(isInitI0);
  moma.processes(isInitI0);
}


/*
 * call for updated states in interval_1 (default once per 10 sec)
 */
function updateInterval_1(isInitI1 = 'false') {
  // updating values
  moma.mem(isInitI1);
  moma.battery(isInitI1);
  moma.cpuTemperature(isInitI1);
  moma.networkStats(isInitI1);
  moma.fullLoad(isInitI1);
}

/*
 * call for updated states in interval_2 (default once per minute)
 */
function updateInterval_2(isInitI2 = 'false') {
  // updating values
  moma.users(isInitI2);
  moma.fsSize(isInitI2);
  moma.blockDevices(isInitI2);
  moma.fsStats(isInitI2);
  moma.disksIO(isInitI2);
  // displays do not change so often, but sometimes
  moma.graphics(isInitI2);
  // network does notchange often but sometimes
  moma.networkInterfaces(isInitI2);
  moma.networkInterfaceDefault(isInitI2);
}

/*
 * call for updated states in interval_3 (default once per hour)
 */
function updateInterval_3(isInitI3 = 'false') {
  // updating values

}

/*
 * call for updated states in interval_4 (default once per day)
 */
function updateInterval_4(isInitI4 = 'false') {
  // updating values
  moma.checkUpdates(isInitI4);
}

function main() {
  adapter.log.debug('Started with main()');

  // 'static' values due to need of restart for change of configuration
    moma.baseboard(true);
    moma.bios(true);
    moma.system(true);
    moma.cpu(true);
    moma.cpuFlags(true);
    moma.osInfo(true);
    moma.memLayout(true);
    moma.diskLayout(true);

  // run each interval once and if checked then start it with interval timer
  adapter.log.debug('starting intervals');
  if(adapter.config.i0) {
    updateInterval_0(true);
    timer1 = setInterval(updateInterval_0, adapter.config.interval0*1000);
  }
  if(adapter.config.i1) {
    updateInterval_1(true);
    timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
  }
  if(adapter.config.i2) {
    updateInterval_2(true);
    timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
  }
  if(adapter.config.i3) {
    updateInterval_3(true);
    timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
  }
  if(adapter.config.i4) {
    updateInterval_4(true);
    timer4 = setInterval(updateInterval_4, adapter.config.interval3*24*60*60*1000);
  }
} // end of main
