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
 * Created with @iobroker/create-adapter v1.10.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
// const fs = require('fs');

class Moma extends utils.Adapter {

	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: 'moma',
		});
		// store references to the timers
		let timer0 = null;
		let timer1 = null;
		let timer2 = null;
		let timer3 = null;
		let timer4 = null;
		this.on('ready', this.onReady.bind(this));
		this.on('objectChange', this.onObjectChange.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		// this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 * So we do our initializations here and start the recurrent updates via timer events.
	 */
	async onReady() {
		// Reset the connection indicator during startup
		//this.setState('info.connection', false, true);

		// Initializiation of adapter
		this.log.debug('starting adapter');
		const helper  = require(__dirname + '/lib/helper');
		// create Entries moma.meta.<hostname>.*
		helper.createMomaMetaEntries(this);
		// create Entries moma.<instanceId>.*
		helper.createMomaInstanceEntries(this);
		// set the instance in moma.meta.<hostname>.instance
		this.setForeignState(require(__dirname + '/lib/definitions').hostEntryInstance, {val: this.namespace, ack: true});
	  
		// all states changes inside the adapters namespace moma.<instance> are subscribed
		// not those of moma.meta
		//this.subscribeStates('*');

		// reading one time values
		this.log.debug('reading one time values');
	  
		// read 'static' values on restart for change of machine configuration
		try {
			const Once = require(__dirname + '/lib/Once.js');
			new Once().run(this, true);
		} catch (error) {
			this.log.error('Error in once: ' + error);
		}

		// start the recurrent updates pf values
		// if checked run each interval once and then start it with interval timer
		this.log.debug('starting intervals');
		if(this.config.i0 && this.config.interval0) {
			this.updateInterval_0(true);
			this.timer0 = setInterval(this.updateInterval_0, this.config.interval0*1000);
		}
		if(this.config.i1 && this.config.interval1) {
			this.updateInterval_1(true);
			this.timer1 = setInterval(this.updateInterval_1, this.config.interval1*1000);
		}
		if(this.config.i2 && this.config.interval2) {
			this.updateInterval_2(true);
			this.timer2 = setInterval(this.updateInterval_2, this.config.interval2*60*1000);
		}
		if(this.config.i3 && this.config.interval3) {
			this.updateInterval_3(true);
			this.timer3 = setInterval(this.updateInterval_3, this.config.interval3*60*60*1000);
		}
		if(this.config.i4 && this.config.interval4) {
			this.updateInterval_4(true);
			this.timer4 = setInterval(this.updateInterval_4, this.config.interval4*24*60*60*1000);
		}

		// Set the connection indicator after startup
		this.setState('info.connection', true, true);
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// clean up the timer
			if(this.timer0) { clearInterval(this.timer0); }
			if(this.timer1) { clearInterval(this.timer1); }
			if(this.timer2) { clearInterval(this.timer2); }
			if(this.timer3) { clearInterval(this.timer3); }
			if(this.timer4) { clearInterval(this.timer4); }
			this.log.info('cleaned everything up...');
			callback();
		} catch (e) {
			callback();
		}
// termination of adapter needed?
//	this.terminate ? this.terminate() : process.exit();
	}

	/**
	 * Is called if a subscribed object changes
	 * @param {string} id
	 * @param {ioBroker.Object | null | undefined} obj
	 */
	onObjectChange(id, obj) {
		if (obj) {
			// The object was changed
			this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
		} else {
			// The object was deleted
			this.log.info(`object ${id} deleted`);
		}
	}

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}

	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires 'common.message' property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === 'object' && obj.message) {
	// 		if (obj.command === 'send') {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info('send command');

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
	// 		}
	// 	}
	// }

	/*
	* call for updated states in interval_0 (default once per second)
	*/
	updateInterval_0(isInit = false) {
		// updating values
		try {
			const Secondly1 = require(__dirname + '/lib/Secondly1.js');
			new Secondly1().run(this, isInit);
		} catch (error) {
			this.log.error('Error in interval 0: ' + error);
		}
	}
	
	
	/*
	* call for updated states in interval_1 (default once per 10 sec)
	*/
	updateInterval_1(isInit = false) {
		// updating values
		try {
			const Secondly2 = require(__dirname + '/lib/Secondly2.js');
			new Secondly2().run(this, isInit);
		} catch (error) {
			this.log.error('Error in interval 1: ' + error);
		}
	}
	
	/*
	* call for updated states in interval_2 (default once per minute)
	*/
	updateInterval_2(isInit = false) {
		// updating values
		try {
			const Minutely = require(__dirname + '/lib/Minutely.js');
			new Minutely().run(this, isInit);
		} catch (error) {
			this.log.error('Error in interval 2: ' + error);
		}
	}

	/*
	* call for updated states in interval_3 (default once per hour)
	*/
	updateInterval_3(isInit = false) {
		// updating values
		try {
			const Hourly = require(__dirname + '/lib/Hourly.js');
			new Hourly().run(this, isInit);
		} catch (error) {
			this.log.error('Error in interval 3: ' + error);
		}
	}
	
	/*
	* call for updated states in interval_4 (default once per day)
	*/
	updateInterval_4(isInit = false) {
		// updating values
		try {
			const Daily = require(__dirname + '/lib/Daily.js');
			new Daily().run(this, isInit);
		} catch (error) {
			this.log.error('Error in interval 4: ' + error);
		}
	}
}

// @ts-ignore
if (module && module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Moma(options);
} else {
	// otherwise start the instance directly
	new Moma();
}