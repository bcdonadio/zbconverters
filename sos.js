const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require("zigbee-herdsman-converters/lib/tuya");

const definition = {
    fingerprint: [{modelID: 'TS0215A', manufacturerName: '_TZ3000_ydpmn1m1'}],
    model: 'TS0215A_sos',
    vendor: 'Tuya',
    whiteLabel: [{vendor: 'EKAZA', model: 'EKVZ-T1014'}],
    description: 'SOS Button',
    fromZigbee: [fz.command_emergency, fz.battery, fz.ias_enroll, fz.identify],
    toZigbee: [],
    onEvent: tuya.onEventSetTime,
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic', 'genPowerCfg', 'genIdentify', 'ssIasAce', 'ssIasZone', 'genTime', 'genOta']);
        try {
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryVoltage(endpoint);
        } catch (error) {}
    },
    exposes: [e.action(['emergency']), e.battery(), e.battery_voltage()],
};

module.exports = definition;
