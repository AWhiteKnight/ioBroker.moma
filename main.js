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
const si = require('systeminformation');
const helper = require('./lib/helper');

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
  helper.createMomaEntries(adapter);
  helper.createMomaXEntries(adapter);
  // call main routine
  main();
});

/*
 * call for updated states in interval_1 (default once per minute)
 */
function updateInterval_1() {
  // values will expire 10 seconds after they should be renewed
  let exp = adapter.config.interval1 + 10;
  // updating values
  si.cpuCurrentspeed(function(data) {
    adapter.setState(defs.sysInfo.cpuspeed.average.id, {val: data.avg, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.min.id, {val: data.min, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.max.id, {val: data.max, ack: true});
    adapter.setState(defs.sysInfo.cpuspeed.cores.id, {val: data.cores, ack: true});
  });
  si.cpuTemperature(function(data) {
    adapter.setState(defs.sysInfo.cputemp.main.id, {val: data.main, ack: true});
    adapter.setState(defs.sysInfo.cputemp.cores.id, {val: data.cores, ack: true});
    adapter.setState(defs.sysInfo.cputemp.max.id, {val: data.max, ack: true});
  });
  si.mem(function(data) {
    adapter.setState(defs.sysInfo.mem.total.id, {val: data.total, ack: true});
    adapter.setState(defs.sysInfo.mem.free.id, {val: data.free, ack: true});
    adapter.setState(defs.sysInfo.mem.used.id, {val: data.used, ack: true});
    adapter.setState(defs.sysInfo.mem.active.id, {val: data.active, ack: true});
    adapter.setState(defs.sysInfo.mem.buffcache.id, {val: data.buffcache, ack: true});
    adapter.setState(defs.sysInfo.mem.available.id, {val: data.available, ack: true});
    adapter.setState(defs.sysInfo.mem.swaptotal.id, {val: data.swaptotal, ack: true});
    adapter.setState(defs.sysInfo.mem.swapused.id, {val: data.swapused, ack: true});
    adapter.setState(defs.sysInfo.mem.swapfree.id, {val: data.swapfree, ack: true});
  });
  //adapter.setForeignState(defs.hostEntryTemp, {val: moma.getTemp(), ack: true, expire: exp});
}

/*
 * call for updated states in interval_2 (default once per hour)
 */
function updateInterval_2() {
  // values will expire 20 seconds after they should be renewed
  let exp = adapter.config.interval2 * 60 + 20;
  // updating values
}

/*
 * call for updated states in interval_3 (default once per day)
 */
function updateInterval_3() {
  // values will expire 100 seconds after they should be renewed
  let exp = adapter.config.interval3 * 60 * 60 + 100;
  // updating values
  //adapter.setForeignState(defs.hostEntryUpdates, {val: moma.getNumUpdates(), ack: true, expire: exp});
}

function main() {
  adapter.log.debug('Started with main()');
  adapter.log.debug('Version systeminformation: ' + si.version());

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

  // set the instance in moma.x.<hostname>
  // TODO: ermitteln des Instanz-Schlüssels
  adapter.setForeignState(defs.hostEntryInstance, {val: 'moma.?', ack: true});

  // baseboard data
  si.baseboard(function(data) {
    adapter.setState(defs.sysInfo.baseboard.manufacturer.id, {val: data.manufacturer, ack: true});
    adapter.setState(defs.sysInfo.baseboard.model.id, {val: data.model, ack: true});
    adapter.setState(defs.sysInfo.baseboard.version.id, {val: data.version, ack: true});
    adapter.setState(defs.sysInfo.baseboard.serial.id, {val: data.serial, ack: true});
    adapter.setState(defs.sysInfo.baseboard.assetTag.id, {val: data.assetTag, ack: true});
  });
  // bios data
  si.bios(function(data) {
    adapter.setState(defs.sysInfo.bios.vendor.id, {val: data.vendor, ack: true});
    adapter.setState(defs.sysInfo.bios.version.id, {val: data.version, ack: true});
    adapter.setState(defs.sysInfo.bios.releaseDate.id, {val: data.releaseDate, ack: true});
    adapter.setState(defs.sysInfo.bios.revision.id, {val: data.revision, ack: true});
  });
  // system data
  si.system(function(data) {
    adapter.setState(defs.sysInfo.system.manufacturer.id, {val: data.manufacturer, ack: true});
    adapter.setState(defs.sysInfo.system.model.id, {val: data.model, ack: true});
    adapter.setState(defs.sysInfo.system.version.id, {val: data.version, ack: true});
    adapter.setState(defs.sysInfo.system.serial.id, {val: data.serial, ack: true});
    adapter.setState(defs.sysInfo.system.uuid.id, {val: data.uuid, ack: true});
    adapter.setState(defs.sysInfo.system.suk.id, {val: data.suk, ack: true});
  });
  // cpu data
  si.cpu(function(data) {
    adapter.setState(defs.sysInfo.cpu.manufacturer.id, {val: data.manufacturer, ack: true});
    adapter.setState(defs.sysInfo.cpu.brand.id, {val: data.brand, ack: true});
    adapter.setState(defs.sysInfo.cpu.speed.id, {val: data.speed, ack: true});
    adapter.setState(defs.sysInfo.cpu.speedmin.id, {val: data.speedmin, ack: true});
    adapter.setState(defs.sysInfo.cpu.speedmax.id, {val: data.speedmax, ack: true});
    adapter.setState(defs.sysInfo.cpu.cores.id, {val: data.cores, ack: true});
    adapter.setState(defs.sysInfo.cpu.vendor.id, {val: data.vendor, ack: true});
    adapter.setState(defs.sysInfo.cpu.family.id, {val: data.family, ack: true});
    adapter.setState(defs.sysInfo.cpu.model.id, {val: data.model, ack: true});
    adapter.setState(defs.sysInfo.cpu.stepping.id, {val: data.stepping, ack: true});
    adapter.setState(defs.sysInfo.cpu.revision.id, {val: data.revision, ack: true});
    adapter.setState(defs.sysInfo.cpu.voltage.id, {val: data.voltage, ack: true});
//    adapter.setState(defs.sysInfo.cpu.cache-l1d.id, {val: data.cache.l1d, ack: true});
//    adapter.setState(defs.sysInfo.cpu.cache-l1i.id, {val: data.cache.l1i, ack: true});
//    adapter.setState(defs.sysInfo.cpu.cache-l2.id, {val: data.cache.l2, ack: true});
//    adapter.setState(defs.sysInfo.cpu.cache-l3.id, {val: data.cache.l3, ack: true});
  });
  si.cpuFlags(function(data) {
    adapter.setState(defs.sysInfo.cpu.flags.id, {val: data, ack: true});
  });
  // os data
  si.osInfo(function(data) {
    adapter.setState(defs.sysInfo.osInfo.platform.id, {val: data.platform, ack: true});
    adapter.setState(defs.sysInfo.osInfo.distro.id, {val: data.distro, ack: true});
    adapter.setState(defs.sysInfo.osInfo.release.id, {val: data.release, ack: true});
    adapter.setState(defs.sysInfo.osInfo.codename.id, {val: data.codename, ack: true});
    adapter.setState(defs.sysInfo.osInfo.kernel.id, {val: data.kernel, ack: true});
    adapter.setState(defs.sysInfo.osInfo.arch.id, {val: data.arch, ack: true});
    adapter.setState(defs.sysInfo.osInfo.hostname.id, {val: data.hostname, ack: true});
    adapter.setState(defs.sysInfo.osInfo.logofile.id, {val: data.logofile, ack: true});
  });
  // memory layout
  si.memLayout(function(data) {
    let num = data.length;
    for(let i = 0; i < num; i++) {
      if(data[i].type !== 'Empty') {
        helper.createMomaArrayEntry(adapter, i, 'memLayout');
        adapter.setState(defs.sysTemplates.memLayout.size.id.replace('x', i), {val: data[i].size, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.bank.id.replace('x', i), {val: data[i].bank, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.type.id.replace('x', i), {val: data[i].type, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.clockSpeed.id.replace('x', i), {val: data[i].clockSpeed, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.formFactor.id.replace('x', i), {val: data[i].formFactor, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.manufacturer.id.replace('x', i), {val: data[i].manufacturer, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.partNum.id.replace('x', i), {val: data[i].partNum, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.serialNum.id.replace('x', i), {val: data[i].serialNum, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.voltageConfigured.id.replace('x', i), {val: data[i].voltageConfigured, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.voltageMin.id.replace('x', i), {val: data[i].voltageMin, ack: true});
        adapter.setState(defs.sysTemplates.memLayout.voltageMax.id.replace('x', i), {val: data[i].voltageMax, ack: true});
        }
    }
  });
  // disk layout


  // run every interval once and if checked then start each with timer
  adapter.log.debug('starting intervals');
  updateInterval_1();
  if(adapter.config.i1) {
    timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
  }
  updateInterval_2();
  if(adapter.config.i2) {
    timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
  }
  setTimeout(updateInterval_3, 10*1000); // run this once after 10 seconds
  if(adapter.config.i3) {
    timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
  }
} // end of main
