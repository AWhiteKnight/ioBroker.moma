/* jshint -W119 */
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

/**
 * @param {number} milliseconds
 */
// const sleep = (milliseconds) => {
// 	return new Promise(resolve => setTimeout(resolve, milliseconds));
// };

// Load your modules here, e.g.:
/** @type {Moma} */
let adapter;
/** @type {NodeJS.Timeout} */
let timer;
/** @type {NodeJS.Timeout} */
let timer0;
/** @type {NodeJS.Timeout} */
let timer1;
/** @type {NodeJS.Timeout} */
let timer2;
/** @type {NodeJS.Timeout} */
let timer3;
/** @type {NodeJS.Timeout} */
let timer4;

const alive = require(__dirname + '/lib/definitions').hostEntryAlive;
const attention = require(__dirname + '/lib/definitions').hostEntryNeedsAttention;
const instance = require(__dirname + '/lib/definitions').hostEntryInstance;
// @ts-ignore
const aHostNeedsAttention = require(__dirname + '/lib/definitions').hostNeedsAttention;
const duration = 3000;

/*
 * call for update machine state
 */
async function updateIntervalAlive() {
	// await adapter.setStateChanged('info.connection', true, true);
	await adapter.setForeignStateChanged(alive, {val: true, ack: true, expire: duration + 150});
	// todo: implement check!
	await adapter.setForeignStateChanged(attention, {val: false, ack: true});
	await adapter.setForeignStateChanged(aHostNeedsAttention, {val: false, ack: true});
	// @ts-ignore
	timer = setTimeout(updateIntervalAlive, duration);
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
		this.setStateChanged('info.connection', true, true);

		try {
			this.log.debug('starting IntervalAlive');
			updateIntervalAlive();
	
			const helper = require(__dirname + '/lib/helper');
			// cleanup old stuff
			this.log.silly('preparation');
			helper.releasePreparation(this);
			// create Entries moma.meta.<hostname>.*
			helper.createMomaMetaEntries(this);
			// await sleep(500);
			// set the instance in moma.meta.<hostname>.instance
			this.setForeignStateChanged(instance, {val: this.namespace, ack: true});
			// create Entries moma.<instanceId>.*
			helper.createMomaInstanceEntries(this);
			// await sleep(500);
	
			// read 'static' values on restart for change of machine configuration
			this.log.silly('starting IntervalOnce');
			const Once = require(__dirname + '/lib/IntervalOnce.js');
			new Once().run(this, true);
		} catch(err) {
			this.setStateChanged('info.connection', false, true);
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
			if(timer4) { clearTimeout(timer4);}
			if(timer3) { clearTimeout(timer3);}
			if(timer2) { clearTimeout(timer2);}
			if(timer1) { clearTimeout(timer1);}
			if(timer0) { clearTimeout(timer0);}
			if(timer) { clearTimeout(timer);}
			this.log.info('cleaned everything up...');
			callback();
		} catch (e) {
			callback();
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
					const Messages = require(__dirname + '/lib/Messages.js');
					new Messages().doUpdates(this);
				} else if(obj.message == 'scheduleReboot') {
					const Messages = require(__dirname + '/lib/Messages.js');
					new Messages().scheduleReboot(this);
				} else if(obj.message == 'updateAdapter') {
					const Messages = require(__dirname + '/lib/Messages.js');
					new Messages().updateAdapter(this);
				} else if(obj.message == 'updateJSController') {
					const Messages = require(__dirname + '/lib/Messages.js');
					new Messages().updateJsController(this);
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