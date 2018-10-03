/**
 *
 * moma adapter - Monitoring and maintenance of the machine the adapter is runnin on
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
const moma = require('./lib/momalib');

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
// after first run of each function these should be set to false
let isInitMain = true;
let isInitI0 = true;
let isInitI1 = true;
let isInitI2 = true;
let isInitI3 = true;

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
  try {
    // clean up the timer
    if(timer0) { clearInterval(timer0); }
    if(timer1) { clearInterval(timer1); }
    if(timer2) { clearInterval(timer2); }
    if(timer3) { clearInterval(timer3); }
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
  // call main routine
  main();
});

/*
 * call for updated states in interval_0 (default once per second)
 */
function updateInterval_0() {
  // updating values
  moma.time(adapter, isInitI0);
  moma.cpuCurrentSpeed(adapter, isInitI0);
  moma.networkConnections(adapter, isInitI0);
  moma.currentLoad(adapter, isInitI0);
  moma.processes(adapter, isInitI0);

  // set to false after first run
  isInitI0 = false;
}


/*
 * call for updated states in interval_1 (default once per 30 sec)
 */
function updateInterval_1() {
  // updating values
  moma.mem(adapter, isInitI1);
  moma.battery(adapter, isInitI1);
  moma.cpuTemperature(adapter, isInitI1);
  moma.networkStats(adapter, isInitI1);
  moma.fullLoad(adapter, isInitI1);

  // set to false after first run
  isInitI1 = false;
}

/*
 * call for updated states in interval_2 (default once per hour)
 */
function updateInterval_2() {
  // updating values
  moma.users(adapter, isInitI2);
  moma.fsSize(adapter, isInitI2);
  moma.blockDevices(adapter, isInitI2);
  moma.fsStats(adapter, isInitI2);
  moma.disksIO(adapter, isInitI2);
  // displays do not change so often, but sometimes
  moma.graphics(adapter, isInitI2);
  // network does notchange often but sometimes
  moma.network(adapter, isInitI2);

  // set to false after first run
  isInitI2 = false;
}

/*
 * call for updated states in interval_3 (default once per day)
 */
function updateInterval_3() {
  // updating values

  // set to false after first run
  isInitI3 = false;
}

function main() {
  adapter.log.debug('Started with main()');

  // 'static' values due to need of restart for change of configuration
  moma.baseboard(adapter, isInitMain);
  moma.bios(adapter, isInitMain);
  moma.system(adapter, isInitMain);
  moma.cpu(adapter, isInitMain);
  moma.osInfo(adapter, isInitMain);
  moma.memLayout(adapter, isInitMain);
  moma.diskLayout(adapter, isInitMain);

  // if checked then run each interval once and start it with interval timer
  adapter.log.debug('starting intervals');
  if(adapter.config.i0) {
    updateInterval_0();
    timer1 = setInterval(updateInterval_0, adapter.config.interval0*1000);
  }
  if(adapter.config.i1) {
    updateInterval_1();
    timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
  }
  if(adapter.config.i2) {
    updateInterval_2();
    timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
  }
  if(adapter.config.i3) {
    updateInterval_3();
    timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
  }

  // initialization of main finished
  isInitMain = false;

} // end of main
