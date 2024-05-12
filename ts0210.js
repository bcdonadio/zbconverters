const {battery, iasZoneAlarm} = require('zigbee-herdsman-converters/lib/modernExtend');

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
      "alarmTimeout": 90,
    }),
  ],
  meta: {},
};

module.exports = definition;
