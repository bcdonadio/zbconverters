const {battery, iasZoneAlarm, commandsOnOff} = require('zigbee-herdsman-converters/lib/modernExtend');

const definition = {
    zigbeeModel: ['TS0210'],
    model: 'TS0210',
    vendor: '_TZ3210_kjafhwd2',
    description: 'Vibration sensor',
    extend: [battery(), iasZoneAlarm({"zoneType":"generic","zoneAttributes":["alarm_1","tamper","battery_low"]}), commandsOnOff()],
    meta: {},
};

module.exports = definition;
