// @ts-nocheck
/* jshint -W097 */
/* jshint -W030 */
/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';
/**
 *
 * moma adapter - monitoring and maintenance of the machine the adapter is running on
 *  (c) 2018 AWhiteKnight
 *  @author: AWhiteKnight <awhiteknight@unity-mail.de>
 *  @license: MIT
 *
 */

 // you have to require the utils module and call adapter function
const utils =    require(__dirname + '/lib/utils'); // Get common adapter utils

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.moma.0
const adapter = new utils.Adapter('moma');

/** @type {number | undefined} */
let timer0 = undefined;
/** @type {number | undefined} */
let timer1 = undefined;
/** @type {number | undefined} */
let timer2 = undefined;
/** @type {number | undefined} */
let timer3 = undefined;
/** @type {number | undefined} */
let timer4 = undefined;

/*
 * call for updated states in interval_0 (default once per second)
 */
function updateInterval_0(isInit = false) {
	// updating values
	const Interval0 = require(__dirname + '/lib/Interval0.js');
	new Interval0().run(adapter, isInit);
}

	
/*
 * call for updated states in interval_1 (default once per 10 sec)
 */
function updateInterval_1(isInit = false) {
	// updating values
	const Interval1 = require(__dirname + '/lib/Interval1.js');
	new Interval1().run(adapter, isInit);
}
	
/*
 * call for updated states in interval_2 (default once per minute)
 */
function updateInterval_2(isInit = false) {
	// updating values
	const Interval2 = require(__dirname + '/lib/Interval2.js');
	new Interval2().run(adapter, isInit);
}


/*
 * call for updated states in interval_3 (default once per hour)
 */
function updateInterval_3(isInit = false) {
	// updating values
	const Interval3 = require(__dirname + '/lib/Interval3.js');
	new Interval3().run(adapter, isInit);
}
	
/*
 * call for updated states in interval_4 (default once per day)
 */
function updateInterval_4(isInit = false) {
	// updating values
	const Interval4 = require(__dirname + '/lib/Interval4.js');
	new Interval4().run(adapter, isInit);
}

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
	const message = 'cleaned everything up...';
	try {
		// clean up the timer
		if(timer0) { clearInterval(timer0); timer0 = undefined; }
		if(timer1) { clearInterval(timer1); timer1 = undefined; }
		if(timer2) { clearInterval(timer2); timer2 = undefined; }
		if(timer3) { clearInterval(timer3); timer3 = undefined; }
		if(timer4) { clearInterval(timer4); timer4 = undefined; }
		adapter.log.info(message);
		callback();
	} catch (e) {
		adapter.log.error(message);
		callback();
	}
});
  
// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
	if (obj) {
		// The object was changed
		adapter.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	} else {
		// The object was deleted
		adapter.log.info(`object ${id} deleted`);
	}
});

// is called if a subscribed state changes
adapter.on('stateChange', function (id, state) {
	if (state) {
		// The state was changed
		adapter.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
	} else {
		// The state was deleted
		adapter.log.info(`state ${id} deleted`);
	}
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
	if (typeof obj === 'object' && obj.message) {
		adapter.log.debug(JSON.stringify(obj));
		if (obj.command === 'send') {
			 // e.g. send email or pushover or whatever
			adapter.log.info('send command ' + obj.message);
			if(obj.message == 'doUpdates') {
				const Interval4 = require(__dirname + '/lib/Interval4.js');
				new Interval4().doUpdates(adapter);
			} else if(obj.message == 'scheduleReboot') {
				const Interval4 = require(__dirname + '/lib/Interval4.js');
				new Interval4().scheduleReboot(adapter);
			}

			 // Send response in callback if required
			 if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
		}
	}
});
  
// is called when databases are connected and adapter received configuration.
adapter.on('ready', function () {
	// do some preparations
	adapter.log.debug('starting adapter');
	// call main routine
	main();
});
  
function main() {
	// Initializiation of adapter
	adapter.log.debug('starting adapter');
	//this.log.debug('config: ' + JSON.stringify(this.config));
	// Reset the connection indicator during startup
	adapter.setState('info.connection', false, true);

	try {
		const helper  = require(__dirname + '/lib/helper');
		// create Entries moma.meta.<hostname>.*
		helper.createMomaMetaEntries(adapter);
		// create Entries moma.<instanceId>.*
		helper.createMomaInstanceEntries(adapter);
		// set the instance in moma.meta.<hostname>.instance
		adapter.setForeignState(require(__dirname + '/lib/definitions').hostEntryInstance, {val: adapter.namespace, ack: true});
		
		// with this codeline all states changes inside the adapters namespace moma.<instance> are subscribed
		// not those of moma.meta
		//this.subscribeStates('*');

		// read 'static' values on restart for change of machine configuration
		const Once = require(__dirname + '/lib/Once.js');
		new Once().run(adapter, true);
	} catch(err) {
		adapter.log.error('Error on startup: ' + err);
	}

	// start the recurrent updates pf values
	// if checked run each interval once and then start it with interval timer
	if(adapter.config.i0 && adapter.config.interval0) {
		updateInterval_0(true);
		timer0 = setInterval(updateInterval_0, adapter.config.interval0*1000);
	}
	if(adapter.config.i1 && adapter.config.interval1) {
		updateInterval_1(true);
		timer1 = setInterval(updateInterval_1, adapter.config.interval1*1000);
	}
	if(adapter.config.i2 && adapter.config.interval2) {
		updateInterval_2(true);
		timer2 = setInterval(updateInterval_2, adapter.config.interval2*60*1000);
	}
	if(adapter.config.i3 && adapter.config.interval3) {
		updateInterval_3(true);
		timer3 = setInterval(updateInterval_3, adapter.config.interval3*60*60*1000);
	}
	if(adapter.config.i4 && adapter.config.interval4) {
		updateInterval_4(true);
		timer4 = setInterval(updateInterval_4, adapter.config.interval4*24*60*60*1000);
	}

	// Set the connection indicator after startup
	adapter.setState('info.connection', true, true);
} // end of main
