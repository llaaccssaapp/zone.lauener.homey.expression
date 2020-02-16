'use strict';

const Homey = require('homey');
const { HomeyAPI  } = require('athom-api')
var _ = require("underscore");

class Expression extends Homey.App {
	
	get Homey() {
		return Homey;
	}

	get HomeyAPI() {
		return HomeyAPI;
	}

	getApi() {
		if (!this.api) {
			this.api = HomeyAPI.forCurrentHomey();
		}
		return this.api;
	}

	async getDevices() {
		const api = await this.getApi();
		return await api.devices.getDevices();
	}


	async setCapability(name, capability, value) {
		const api = await this.getApi();
		let devices = await api.devices.getDevices({ filter: {name: name} });
		
		_.forEach(devices, async device => {
			console.log(`Set ${capability} of ${device.name} to ${value}`);
			await device.setCapabilityValue(capability, value);
		});
	}

	async getApp(id) {
		const api = await this.getApi();
		return await api.apps.getApp({id: id});
	}
	
	async setToken(value) {
		await this.expressionToken.setValue(value);
	}
	
	get myObject() {
		return this.myObject;
	}
	
	set myObject(value) {
		this.myObject = value;
	}
	
	async onInit() {
		this.log('Expression App is running...');

		this.registerAction('execute_expression');

		let expressionToken = new Homey.FlowToken( 'expression_token', {
			type: 'string',
			title: 'Expression Result'
		});
		
		this.expressionToken = await expressionToken.register();
		await this.expressionToken.setValue("undef");
	}
	
	registerAction(name) {
		return new Homey.FlowCardAction(name)
			.register()
			.registerRunListener(this.handleAction.bind(this, name));
	}
	
	async handleAction(name, args, state) {
		this.log(`[${ name }] execute expression event with args`, args.expression);
		var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
		var func = new AsyncFunction(args.expression).bind(this);
		await func();
		return true;
	}
}

module.exports = Expression;