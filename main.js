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
let timer1 = null;
let timer2 = null;
let timer3 = null;
// after first run of each function these should be set to false
let isInitMain = true;
let isInitI1 = true;
let isInitI2 = true;
let isInitI3 = true;

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
  try {
    // clean up the timer
    if(timer1) { clearInterval(timer1); }
    if(timer2) { clearInterval(timer2); }
    if(timer3) { clearInterval(timer3); }
    adapter.log.info('cleaned everything up...');
    callback();
  } catch (e) {
    callback();
  }
});

/*
// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
  // Warning, obj can be null if it was deleted
  adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

// is called if a subscribed state changes
adapter.on('stateChange', function (id, state) {
  // Warning, state can be null if it was deleted
  adapter.log.debug('stateChange ' + id + ' ' + JSON.stringify(state));

  // you can use the ack flag to detect if it is status (true) or command (false)
  if (state && !state.ack) {
      adapter.log.debug('ack is not set!');
  }
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
  if (typeof obj === 'object' && obj.message) {
    if (obj.command === 'send') {
      // e.g. send email or pushover or whatever
      console.log('send command');
      adapter.log.info('send command ' + id + ' ' + JSON.stringify(state));

      // Send response in callback if required
      if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
    }
  }
});
/**/

// is called when databases are connected and adapter received configuration.
adapter.on('ready', function () {
  // do some preparations
  adapter.log.debug('starting adapter');
  moma.init(adapter);
  // call main routine
  main();
});

/*
 * call for updated states in interval_1 (default once per 30 sec)
 */
function updateInterval_1() {
  // updating values
  moma.cpuCurrentSpeed(adapter, isInitI1);
  moma.cpuTemperature(adapter, isInitI1);
  moma.mem(adapter, isInitI1);
  moma.battery(adapter, isInitI1);
  moma.networkStats(adapter, isInitI1);
  moma.networkConnections(adapter, isInitI1);

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
  // values will expire 100 seconds after they should be renewed
  // updating values
  moma.diskLayout(adapter, isInitI3);
  // let exp = adapter.config.interval3 * 60 * 60 + 100;
  //adapter.setForeignState(defs.hostEntryUpdates, {val: moma.getNumUpdates(), ack: true, expire: exp});

  // set to false after first run
  isInitI3 = false;
}

function main() {
  adapter.log.debug('Started with main()');

  adapter.log.debug('interval active: interval1=' + adapter.config.i1 +
                                    ' interval2=' + adapter.config.i2 +
                                    ' interval3=' + adapter.config.i3);
  adapter.log.debug('interval values: interval1=' + adapter.config.interval1 +
                                    ' interval2=' + adapter.config.interval2 +
                                    ' interval3=' + adapter.config.interval3);

  // register instance states
  //  adapter.subscribeStates('*');

/*
  // register global
  adapter.subscribeForeignStates(regBase + '.*');
  adapter.subscribeForeignObjects(regBase + '.*');
*/

  // 'static' values due to need of restart for change
  moma.baseboard(adapter, isInitMain);
  moma.bios(adapter, isInitMain);
  moma.system(adapter, isInitMain);
  moma.cpu(adapter, isInitMain);
  moma.osInfo(adapter, isInitMain);
  moma.memLayout(adapter, isInitMain);


  // if checked then run each interval once and start it with interval timer
  adapter.log.debug('starting intervals');
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
