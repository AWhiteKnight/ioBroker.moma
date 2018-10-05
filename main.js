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
let timer4 = null;
// after first run of each function these should be set to false
let isInitMain = true;
let isInitI0 = true;
let isInitI1 = true;
let isInitI2 = true;
let isInitI3 = true;
let isInitI4 = true;

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
  moma.time(isInitI0);
  moma.cpuCurrentSpeed(isInitI0);
  moma.networkConnections(isInitI0);
  moma.currentLoad(isInitI0);
  moma.processes(isInitI0);

  // set to false after first run
  isInitI0 = false;
}


/*
 * call for updated states in interval_1 (default once per 10 sec)
 */
function updateInterval_1() {
  // updating values
  moma.mem(isInitI1);
  moma.battery(isInitI1);
  moma.cpuTemperature(isInitI1);
  moma.networkStats(isInitI1);
  moma.fullLoad(isInitI1);

  // set to false after first run
  isInitI1 = false;
}

/*
 * call for updated states in interval_2 (default once per minute)
 */
function updateInterval_2() {
  // updating values
  moma.users(isInitI2);
  moma.fsSize(isInitI2);
  moma.blockDevices(isInitI2);
  moma.fsStats(isInitI2);
  moma.disksIO(isInitI2);
  // displays do not change so often, but sometimes
  moma.graphics(isInitI2);
  // network does notchange often but sometimes
  moma.network(isInitI2);

  // set to false after first run
  isInitI2 = false;
}

/*
 * call for updated states in interval_3 (default once per hour)
 */
function updateInterval_3() {
  // updating values

  // set to false after first run
  isInitI3 = false;
}

/*
 * call for updated states in interval_4 (default once per day)
 */
function updateInterval_4() {
  // updating values
  moma.checkUpdates();

  // set to false after first run
  isInitI4 = false;
}

function main() {
  adapter.log.debug('Started with main()');

  // 'static' values due to need of restart for change of configuration
    moma.baseboard(isInitMain);
    moma.bios(isInitMain);
    moma.system(isInitMain);
    moma.cpu(isInitMain);
    moma.osInfo(isInitMain);
    moma.memLayout(isInitMain);
    moma.diskLayout(isInitMain);

  // run each interval once and if checked then start it with interval timer
  adapter.log.debug('starting intervals');
  updateInterval_0();
  if(adapter.config.i0) {
    timer1 = setInterval(updateInterval_0, adapter.config.interval0*1000);
  }
  updateInterval_1();
  if(adapter.config.i1) {
    timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
  }
  updateInterval_2();
  if(adapter.config.i2) {
    timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
  }
  updateInterval_3();
  if(adapter.config.i3) {
    timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
  }
  // first run of interval 4 after 5 minutes
  setTimeout(updateInterval_4, 5*60*1000);
  if(adapter.config.i4) {
    timer4 = setInterval(updateInterval_4, adapter.config.interval3*24*60*60*1000);
  }

  // initialization of main finished
  isInitMain = false;

} // end of main
