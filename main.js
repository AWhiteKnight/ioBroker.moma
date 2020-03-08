/* jshint strict:true */
/* jslint node: true */
/* jslint esversion: 9 */
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

// @ts-ignore
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

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

const hostname = require('os').hostname;
const alive = require(__dirname + '/lib/definitions').hostEntryAlive;
const attention = require(__dirname + '/lib/definitions').hostEntryNeedsAttention;
// @ts-ignore
const aHostNeedsAttention = require(__dirname + '/lib/definitions').hostNeedsAttention;
const duration = 3000;

function checkMachineErrors() {
	// todo: implement check!
	return false;
}

/*
 * call for update machine state
 */
async function watchdog() {
	await adapter.setForeignStateChanged(alive, {val: true, ack: true, expire: duration + 150});
	await adapter.getForeignState(attention, async (err, state) => {
		if(state) {
			const errors = checkMachineErrors();
			if(errors != state.val) {
				await adapter.setForeignState(attention, {val: errors, ack: true});
				// maintain list
				await adapter.getForeignState('hostNeedsAttentionList', async (err2, state2) => {
					if(state2) {
						let flag = false;
						let value = state2.val;
						if(errors) {
							// add host to list
							value += ',' + hostname;
						} else {
							// remove host from list
							value = value.replace(hostname, '');
							value = value.replace(',,', ',');
						}
						await adapter.setForeignState('hostNeedsAttentionList', {val: value, ack: true});
						if(value != '') {
							flag = true;
						}
						await adapter.setForeignState(aHostNeedsAttention, {val: flag, ack: true});
					} else if (err2) {
						adapter.log.error(err2);			
					}
				});
			}
		} else if(err) {
			adapter.log.error(err);			
		}
	});
	// @ts-ignore
	timer = wait(duration).then(() => watchdog()).catch(() => watchdog());
}

/*
 * call for updated states in interval_0 (default once per second)
 */
async function updateInterval0(isInit = false) {
	// updating values
	const Interval0 = require(__dirname + '/lib/Interval0.js');
	await new Interval0().run(adapter, isInit);
	// @ts-ignore
	timer0 = wait(adapter.config.interval0*1000).then(() => updateInterval0()).catch(() => updateInterval0());
}

/*
 * call for updated states in interval_1 (default once per 10 sec)
 */
async function updateInterval1(isInit = false) {
	// updating values
	const Interval1 = require(__dirname + '/lib/Interval1.js');
	await new Interval1().run(adapter, isInit);
	// @ts-ignore
	timer1 = wait(adapter.config.interval1*1000).then(() => updateInterval1()).catch(() => updateInterval1());
}
	
/*
 * call for updated states in interval_2 (default once per minute)
 */
async function updateInterval2(isInit = false) {
	// updating values
	const Interval2 = require(__dirname + '/lib/Interval2.js');
	await new Interval2().run(adapter, isInit);
	// @ts-ignore
	timer2 = wait(adapter.config.interval2*60000).then(() => updateInterval2()).catch(() => updateInterval2());
}

/*
 * call for updated states in interval_3 (default once per hour)
 */
async function updateInterval3(isInit = false) {
	// updating values
	const Interval3 = require(__dirname + '/lib/Interval3.js');
	await new Interval3().run(adapter, isInit);
	// @ts-ignore
	timer3 = wait(adapter.config.interval3*3600000).then(() => updateInterval3()).catch(() => updateInterval3());
}
	
/*
 * call for updated states in interval_4 (default once per day)
 */
async function updateInterval4(isInit = false) {
	// updating values
	const Interval4 = require(__dirname + '/lib/Interval4.js');
	await new Interval4().run(adapter, isInit);
	// @ts-ignore
	timer4 = wait(adapter.config.interval4*24*3600000).then(() => updateInterval4()).catch(() => updateInterval4());
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
		// Set the connection indicator during startup to yellow
		this.setState('info.connection', false, true, async () => {
			await this.log.debug('starting adapter');
			await require(__dirname + '/lib/helper').init(this);

			// read 'static' values on restart for change of machine configuration
			const once = require(__dirname + '/lib/IntervalOnce.js');
			await new once().run(this, true);

			// start the recurrent updates of values
			await this.log.debug('starting intervals');
			// if checked run each interval once and then start it with interval timer
			// start with the longest interval
			if(this.config.i4 && this.config.interval4) {
				await updateInterval4(true);
			}

			if(this.config.i3 && this.config.interval3) {
				await updateInterval3(true);
			}

			if(this.config.i2 && this.config.interval2) {
				await updateInterval2(true);
			}

			if(this.config.i1 && this.config.interval1) {
				await updateInterval1(true);
			}

			if(this.config.i0 && this.config.interval0) {
				await updateInterval0(true);
			}

			// init is done
			await this.setState('info.connection', true, true);
			await this.log.debug('up and running');

			// start watchdog
			await this.log.debug('starting watchdog');
			await watchdog();
		});
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
			const Messages = require(__dirname + '/lib/Messages.js');
			const message = new Messages();
			// this.log.debug(JSON.stringify(obj));
			if (obj.command === 'execute') {
				// e.g. send email or pushover or whatever
				this.log.info('send command ' + obj.message);
				if(obj.message == 'doUpdates') {
					message.doUpdates(this);
				} else if(obj.message == 'scheduleReboot') {
					message.scheduleReboot(this);
				} else if(obj.message == 'updateAdapter') {
					message.updateAdapter(this);
				} else if(obj.message == 'updateJSController') {
					message.updateJsController(this);
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
