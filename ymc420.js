const {lock, battery} = require('zigbee-herdsman-converters/lib/modernExtend');
const reporting = require('zigbee-herdsman-converters/lib/reporting');

module.exports = {
  zigbeeModel: ['YMC420'],
  model: 'YMC420-W-PFF',
  vendor: "Yale",
  description: "Door handle with pin code and fingerprint unlock",
  extend: [lock({"pinCodeCount":250}), battery()],
  configure: async (device, coordinatorEndpoint) => {
    const endpoint = device.getEndpoint(1);
    await reporting.bind(endpoint, coordinatorEndpoint, ['closuresDoorLock', 'genPowerCfg']);
    await reporting.lockState(endpoint);
    await reporting.batteryPercentageRemaining(endpoint);
  },
};