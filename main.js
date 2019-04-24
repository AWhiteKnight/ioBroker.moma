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
 * Created with help of @iobroker/create-adapter v1.10.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
// const fs = require('fs');

/** @type {Moma | undefined} */
let adapter = undefined;
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
		adapter = this;
		this.on('ready', this.onReady.bind(this));
		this.on('objectChange', this.onObjectChange.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 * So we do our initializations here and start the recurrent updates via timer events.
	 */
	onReady() {
		// Initializiation of adapter
		this.log.debug('starting adapter');
		//this.log.debug('config: ' + JSON.stringify(this.config));
		// Reset the connection indicator during startup
		this.setState('info.connection', false, true);

		try {
			const helper  = require(__dirname + '/lib/helper');
			// create Entries moma.meta.<hostname>.*
			helper.createMomaMetaEntries(this);
			// create Entries moma.<instanceId>.*
			helper.createMomaInstanceEntries(this);
			// set the instance in moma.meta.<hostname>.instance
			this.setForeignState(require(__dirname + '/lib/definitions').hostEntryInstance, {val: this.namespace, ack: true});
		  
			// with this codeline all states changes inside the adapters namespace moma.<instance> are subscribed
			// not those of moma.meta
			//this.subscribeStates('*');
	
			// read 'static' values on restart for change of machine configuration
			const Once = require(__dirname + '/lib/Once.js');
			new Once().run(this, true);
		} catch(err) {
			this.log.error('Error on startup: ' + err);
		}

		// start the recurrent updates pf values
		// if checked run each interval once and then start it with interval timer
		if(this.config.i0 && this.config.interval0) {
			updateInterval_0(true);
			timer0 = setInterval(updateInterval_0, this.config.interval0*1000);
		}
		if(this.config.i1 && this.config.interval1) {
			updateInterval_1(true);
			timer1 = setInterval(updateInterval_1, this.config.interval1*1000);
		}
		if(this.config.i2 && this.config.interval2) {
			updateInterval_2(true);
			timer2 = setInterval(updateInterval_2, this.config.interval2*60*1000);
		}
		if(this.config.i3 && this.config.interval3) {
			updateInterval_3(true);
			timer3 = setInterval(updateInterval_3, this.config.interval3*60*60*1000);
		}
		if(this.config.i4 && this.config.interval4) {
			updateInterval_4(true);
			timer4 = setInterval(updateInterval_4, this.config.interval4*24*60*60*1000);
		}

		// Set the connection indicator after startup
		this.setState('info.connection', true, true);
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		const message = 'cleaned everything up...';
		try {
			// clean up the timer
			if(timer0) { clearInterval(timer0); timer0 = undefined; }
			if(timer1) { clearInterval(timer1); timer1 = undefined; }
			if(timer2) { clearInterval(timer2); timer2 = undefined; }
			if(timer3) { clearInterval(timer3); timer3 = undefined; }
			if(timer4) { clearInterval(timer4); timer4 = undefined; }
			this.log.info(message);
			callback();
		} catch (e) {
			this.log.error(message);
			callback();
		}
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

	/**
	 * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	 * Using this method requires 'common.messagebox' property to be set to true in io-package.json
	 * @param {ioBroker.Message} obj
	 */
	onMessage(obj) {
		if (typeof obj === 'object' && obj.message) {
			this.log.debug(JSON.stringify(obj));
	 		if (obj.command === 'send') {
	 			// e.g. send email or pushover or whatever
				this.log.info('send command ' + obj.message);
				if(obj.message == 'doUpdates') {
					const Interval4 = require(__dirname + '/lib/Interval4.js');
					new Interval4().doUpdates(this);
				} else if(obj.message == 'scheduleReboot') {
					const Interval4 = require(__dirname + '/lib/Interval4.js');
					new Interval4().scheduleReboot(this);
				}

	 			// Send response in callback if required
	 			if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
	 		}
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