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
  moma.cpuCurrentSpeed(adapter, false);
  moma.cpuTemperature(adapter, false);
  moma.mem(adapter, false);
  moma.battery(adapter, false);
}

/*
 * call for updated states in interval_2 (default once per hour)
 */
function updateInterval_2() {
  // updating values
  moma.users(adapter, false);
  moma.fsSize(adapter, false);
  moma.blockDevices(adapter, false);
}

/*
 * call for updated states in interval_3 (default once per day)
 */
function updateInterval_3() {
  // values will expire 100 seconds after they should be renewed
  // let exp = adapter.config.interval3 * 60 * 60 + 100;
  // updating values
  //adapter.setForeignState(defs.hostEntryUpdates, {val: moma.getNumUpdates(), ack: true, expire: exp});
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

  // baseboard data
  moma.baseboard(adapter, true);
  // bios data
  moma.bios(adapter, true);
  // system data
  moma.system(adapter, true);
  // cpu data
  moma.cpu(adapter, true);
  // os data
  moma.osInfo(adapter, true);
  // memory layout
  moma.memLayout(adapter, true);
  // disk layout
  moma.diskLayout(adapter, true);
  // graphiccontroller & display layout
  moma.graphics(adapter, true);
  // user
  moma.users(adapter, true);
  // file system
  moma.fsSize(adapter, true);
  // block devices
  moma.blockDevices(adapter, true);
  // cpu values
  moma.cpuCurrentSpeed(adapter, true);
  moma.cpuTemperature(adapter, true);
  // memory values
  moma.mem(adapter, true);
  // battery values
  moma.battery(adapter, true);


  // if checked then start each interval with timer
  adapter.log.debug('starting intervals');
  if(adapter.config.i1) {
    timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
  }
  if(adapter.config.i2) {
    timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
  }
  if(adapter.config.i3) {
    timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
  }
} // end of main
