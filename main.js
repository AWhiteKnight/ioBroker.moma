"use strict";
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
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
// const fs = require("fs");
// the moma lib
const moma = require(__dirname + '/lib/momalib');
// some variables to keep things under control
//  the timers
let timer0 = 0;
let timer1 = 0;
let timer2 = 0;
let timer3 = 0;
let timer4 = 0;

class Moma extends utils.Adapter {

	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "moma",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("objectChange", this.onObjectChange.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		// Initialize your adapter here
		// do some preparations
		this.log.debug('starting adapter');
		moma.init(this);
/*
		// Reset the connection indicator during startup
		this.setState("info.connection", false, true);

/*
		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:
		this.log.info("config option1: " + this.config.option1);
		this.log.info("config option2: " + this.config.option2);
		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/
/*		await this.setObjectAsync("testVariable", {
			type: "state",
			common: {
				name: "testVariable",
				type: "boolean",
				role: "indicator",
				read: true,
				write: true,
			},
			native: {},
		});

		// in this template all states changes inside the adapters namespace are subscribed
		this.subscribeStates("*");

		/*
		setState examples
		you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
		// the variable testVariable is set to true as command (ack=false)
/*		await this.setStateAsync("testVariable", true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system
		await this.setStateAsync("testVariable", { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)
		await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// examples for the checkPassword/checkGroup functions
		let result = await this.checkPasswordAsync("admin", "iobroker");
		this.log.info("check user admin pw ioboker: " + result);

		result = await this.checkGroupAsync("admin", "admin");
		this.log.info("check group user admin group admin: " + result);
*/
		// reading one time values
		this.log.debug('reading one time values');
	  
		// 'static' values due to need of restart for change of configuration
		moma.baseboard(true);
		moma.bios(true);
		moma.system(true);
		moma.cpu(true);
		moma.cpuFlags(true);
		moma.osInfo(true);
		moma.memLayout(true);
		moma.diskLayout(true);
	  
		// if checked run each interval once and then start it with interval timer
		this.log.debug('starting intervals');
		if(this.config.i0) {
			this.updateInterval_0(true);
			timer0 = setInterval(this.updateInterval_0, this.config.interval0*1000);
		}
		if(this.config.i1) {
			this.updateInterval_1(true);
			timer1 = setInterval(this.updateInterval_1, this.config.interval1*1000);
		}
		if(this.config.i2) {
			this.updateInterval_2(true);
			timer2 = setInterval(this.updateInterval_2, this.config.interval2*60*1000);
		}
		if(this.config.i3) {
			this.updateInterval_3(true);
			timer3 = setInterval(this.updateInterval_3, this.config.interval3*60*60*1000);
		}
		if(this.config.i4) {
			this.updateInterval_4(true);
			timer4 = setInterval(this.updateInterval_4, this.config.interval3*24*60*60*1000);
		}

	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// clean up the timer
			if(timer0) { clearInterval(timer0); }
			if(timer1) { clearInterval(timer1); }
			if(timer2) { clearInterval(timer2); }
			if(timer3) { clearInterval(timer3); }
			if(timer4) { clearInterval(timer4); }
			this.log.info("cleaned everything up...");
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

	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.message" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

	/*
	* call for updated states in interval_0 (default once per second)
	*/
	updateInterval_0(isInit = false) {
		// updating values
		moma.time(isInit);
		moma.cpuCurrentSpeed(isInit);
		moma.networkConnections(isInit);
		moma.currentLoad(isInit);
		moma.processes(isInit);
	}
	
	
	/*
	* call for updated states in interval_1 (default once per 10 sec)
	*/
	updateInterval_1(isInit = false) {
		// updating values
		moma.mem(isInit);
		moma.battery(isInit);
		moma.cpuTemperature(isInit);
		moma.networkStats(isInit);
		moma.fullLoad(isInit);
	}
	
	/*
	* call for updated states in interval_2 (default once per minute)
	*/
	updateInterval_2(isInit = false) {
		// updating values
		moma.users(isInit);
		moma.fsSize(isInit);
		moma.blockDevices(isInit);
		moma.fsStats(isInit);
		moma.disksIO(isInit);
		// displays do not change so often, but sometimes
		moma.graphics(isInit);
		// network does notchange often but sometimes
		moma.networkInterfaces(isInit);
		moma.networkInterfaceDefault(isInit);
	}

	/*
	* call for updated states in interval_3 (default once per hour)
	*/
	updateInterval_3(isInit = false) {
		// updating values
	
	}
	
	/*
	* call for updated states in interval_4 (default once per day)
	*/
	updateInterval_4(isInit = false) {
		// updating values
		moma.checkUpdates(isInit);
	}
}

if (module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Moma(options);
} else {
	// otherwise start the instance directly
	new Moma();
}