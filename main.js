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
/** @type {Moma | undefined} */
let adapter = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer0 = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer1 = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer2 = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer3 = undefined;
/** @type {NodeJS.Timeout | undefined} */
let timer4 = undefined;

let alive = require(__dirname + '/lib/definitions').hostEntryAlive;
let attention = require(__dirname + '/lib/definitions').hostEntryNeedsAttention;
let instance = require(__dirname + '/lib/definitions').hostEntryInstance;
// @ts-ignore
// let aHostNeedsAttention = require(__dirname + '/lib/definitions').hostNeedsAttention;

let duration = 3000;
/*
 * call for update machine state
 */
function updateIntervalAlive() {
	// @ts-ignore
	adapter.setForeignStateChanged(alive, {val: true, ack: true, expire: duration + 50});
	// todo: implement check!
	// @ts-ignore
	// adapter.setForeignStateChanged(attention, {val: false, ack: true});
	// @ts-ignore
	// adapter.setForeignStateChanged(aHostNeedsAttention, {val: false, ack: true});
}

/*
 * call for updated states in interval_0 (default once per second)
 */
function updateInterval0(isInit = false) {
	// updating values
	const Interval0 = require(__dirname + '/lib/Interval0.js');
	new Interval0().run(adapter, isInit);
	// @ts-ignore
	timer0 = setTimeout(updateInterval0, adapter.config.interval0*1000);

}

	
/*
 * call for updated states in interval_1 (default once per 10 sec)
 */
function updateInterval1(isInit = false) {
	// updating values
	const Interval1 = require(__dirname + '/lib/Interval1.js');
	new Interval1().run(adapter, isInit);
	// @ts-ignore
	timer1 = setTimeout(updateInterval1, adapter.config.interval1*1000);
}
	
/*
 * call for updated states in interval_2 (default once per minute)
 */
function updateInterval2(isInit = false) {
	// updating values
	const Interval2 = require(__dirname + '/lib/Interval2.js');
	new Interval2().run(adapter, isInit);
	// @ts-ignore
	timer2 = setTimeout(updateInterval2, adapter.config.interval2*60000);
}

/*
 * call for updated states in interval_3 (default once per hour)
 */
function updateInterval3(isInit = false) {
	// updating values
	const Interval3 = require(__dirname + '/lib/Interval3.js');
	new Interval3().run(adapter, isInit);
	// @ts-ignore
	timer3 = setTimeout(updateInterval3, adapter.config.interval3*3600000);
}
	
/*
 * call for updated states in interval_4 (default once per day)
 */
function updateInterval4(isInit = false) {
	// updating values
	const Interval4 = require(__dirname + '/lib/Interval4.js');
	new Interval4().run(adapter, isInit);
	// @ts-ignore
	timer4 = setTimeout(updateInterval4, adapter.config.interval4*24*3600000);
}

/**
 * @param {number} milliseconds
 */
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * 
 */
class Moma extends utils.Adapter {

	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: 'moma',
		});
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
	async onReady() {
		// Initializiation of adapter
		this.log.debug('starting adapter');
		// Reset the connection indicator during startup
		this.setStateChanged('info.connection', false, true);
		this.setForeignStateChanged(alive, {val: true, ack: true, expire: duration + 50});
		this.setForeignStateChanged(attention, {val: true, ack: true});

		try {
			let helper = require(__dirname + '/lib/helper');
			// cleanup old stuff
			this.log.silly('preparation');
			helper.releasePreparation(this);
			// create Entries moma.meta.<hostname>.*
			helper.createMomaMetaEntries(this);
			// wait a few seconds to give the broker a chance to finish creation
			await sleep(500);
			// set the instance in moma.meta.<hostname>.instance
			this.setForeignStateChanged(instance, {val: this.namespace, ack: true});
			// create Entries moma.<instanceId>.*
			helper.createMomaInstanceEntries(this);
			// wait a few seconds to give the broker a chance to finish creation
			await sleep(1000);
		  
			// with this codeline all states changes inside the adapters namespace moma.<instance> are subscribed
			// not those of moma.meta
			//this.subscribeStates('*');
	
			// read 'static' values on restart for change of machine configuration
			this.log.silly('starting IntervalOnce');
			const Once = require(__dirname + '/lib/IntervalOnce.js');
			new Once().run(this, true);
		} catch(err) {
			this.log.error('Error on startup: ' + err);
		}

		// start the recurrent updates of values
		// if checked run each interval once and then start it with interval timer
		// start with the longest interval
		if(this.config.i4 && this.config.interval4) {
			this.log.silly('starting Interval4');
			updateInterval4(true);
		}

		if(this.config.i3 && this.config.interval3) {
			this.log.silly('starting Interval3');
			updateInterval3(true);
		}

		if(this.config.i2 && this.config.interval2) {
			this.log.silly('starting Interval2');
			updateInterval2(true);
		}

		if(this.config.i1 && this.config.interval1) {
			this.log.silly('starting Interval1');
			updateInterval1(true);
		}

		if(this.config.i0 && this.config.interval0) {
			this.log.silly('starting Interval0');
			updateInterval0(true);
		}

		// init is done
		this.log.silly('starting IntervalAlive');
		timer = setInterval(updateIntervalAlive, duration);

		this.setForeignStateChanged(attention, {val: false, ack: true});
		// Set the connection indicator after startup
		this.setStateChanged('info.connection', true, true);
		this.log.silly('up and running');
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			this.setForeignState(alive, {val: false, ack: true});
			// clean up the timer
			if(timer4) { clearInterval(timer4); timer4 = undefined; }
			if(timer3) { clearInterval(timer3); timer3 = undefined; }
			if(timer2) { clearInterval(timer2); timer2 = undefined; }
			if(timer1) { clearInterval(timer1); timer1 = undefined; }
			if(timer0) { clearInterval(timer0); timer0 = undefined; }
			if(timer) { clearInterval(timer); timer = undefined; }
			this.log.info('cleaned everything up...');
			callback();
		} catch (e) {
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
			// this.log.debug(JSON.stringify(obj));
	 		if (obj.command === 'execute') {
	 			// e.g. send email or pushover or whatever
				this.log.info('send command ' + obj.message);
				if(obj.message == 'doUpdates') {
					const Interval4 = require(__dirname + '/lib/Interval4.js');
					new Interval4().doUpdates(this);
				} else if(obj.message == 'scheduleReboot') {
					const Interval4 = require(__dirname + '/lib/Interval4.js');
					new Interval4().scheduleReboot(this);
				} else if(obj.message == 'updateJSController') {
					const Interval4 = require(__dirname + '/lib/Interval4.js');
					new Interval4().updateJsController(this);
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