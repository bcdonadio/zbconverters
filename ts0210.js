const {battery, iasZoneAlarm} = require('zigbee-herdsman-converters/lib/modernExtend');
const exposes = require('zigbee-herdsman-converters/lib/exposes');                                                                                                                                                                                            
const e = exposes.presets;                                                                                                                                                                                                                                    

const definition = {
  zigbeeModel: ['TS0210'],
  model: 'TS0210',
  vendor: '_TZ3210_kjafhwd2',
  description: 'Vibration sensor',
  extend: [
    battery(),
    iasZoneAlarm({
      "zoneType":"vibration",
      "zoneAttributes":[
        "vibration",
        "alarm_1",
        "battery_low",
      ],
    }),
  ],
  exposes: [e.vibration(), e.battery_low(), e.battery()],
};

module.exports = definition;
