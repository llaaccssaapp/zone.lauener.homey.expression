# Expression
Run a simple java script expression with access to some Homey API functions.

## Functions
Access to the API.
```
this.getApi();
```

Access to other Apps.
```
this.getApp("id_of_the_app");
```

Access to Devices.
```
this.getDevices();
this.getDevice("id_of_the_device");

```

Set a Capability of a Device
```
this.setCapability('Name', 'capability', value);
```

## Example: Set a capability of a Device
```
await this.setCapability('Name', 'onoff', true);
await this.setCapability('Name', 'onoff', false);
});
```

## Example: how set the global expression token
The value of the token can be used from any other flow or card.
```
await this.setToken("Hello World");
```

## Example: how to access other apps
Example how to use better logic
```
let betterlogic = await this.getApp({id:"net.i-dev.betterlogic" });
var home_hum = await betterlogic.apiGet("variable");
console.log(variable.value);
```

## Example: how to store a result in a variable
The variable myObject can be used to share results between cards.
```
let animation = new this.Homey.LedringAnimationSystem('pulse');
myObject = await animation.register();
myObject.start();
```

```
myobject.stop();
```

