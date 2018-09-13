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

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.moma.0
const adapter = new utils.Adapter('moma');

// some information the moma adapter needs
const defs = require('./lib/definitions');
const moma = require('./lib/momalib');
moma.init();

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
  // helper is only required temporarily
  let helper = require('./lib/helper');
  helper.createListEntry(adapter);
  // call main routine
  main();
});

/*
 * call for updated states in interval_2 (default once per minute)
 */
function updateInterval_1() {
  adapter.log.debug('running interval 1');

  // values will expire 2 seconds after they should be renewed
  let exp = adapter.config.interval1 + 2;
  // updating values
  adapter.setForeignState(defs.hostEntryTemp, {val: moma.getTemp(), ack: true, expire: exp});
  adapter.setForeignState(defs.hostEntryLoad, {val: moma.getLoad(), ack: true, expire: exp});
  adapter.setForeignState(defs.hostEntryUptime, {val: moma.getUptime(), ack: true, expire: exp});
}

/*
 * call for updated states in interval_2 (default once per hour)
 */
function updateInterval_2() {
  adapter.log.debug('running interval 2');

  // values will expire 10 seconds after they should be renewed
  let exp = adapter.config.interval2 * 60 + 10;
  // updating values
}

/*
 * call for updated states in interval_3 (default once per day)
 */
function updateInterval_3() {
  adapter.log.debug('running interval 3');

  // reinitialize moma
  moma.reload();
  // values will expire 100 seconds after they should be renewed
  let exp = adapter.config.interval3 * 60 * 60 + 100;
  // updating values
  adapter.setForeignState(defs.hostEntryUpdates, {val: moma.getNumUpdates(), ack: true, expire: exp});
}

function main() {
  adapter.log.debug('started with main()');

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
    // start the three timer if checked
    adapter.log.debug('starting intervals');
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
} // end of main
