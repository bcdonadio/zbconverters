const {lock, battery} = require('zigbee-herdsman-converters/lib/modernExtend');
const reporting = require('zigbee-herdsman-converters/lib/reporting');

const fzLocal = {
  action_source_name: {
    cluster: "closuresDoorLock",
    type: "raw",
    convert: (model, msg, publish, options, meta) => {
      const lookup = {
        0: 'password_unlock',
        1: 'unlock',
        2: 'auto_lock',
        3: 'RFID_unlock',
        4: 'fingerprint_unlock',
        5: 'unlock_failure_invalid_pin_or_id',
        6: 'unlock_failure_invalid_schedule',
        7: 'one_touch_lock',
        8: 'key_lock',
        9: 'key_unlock',
        10: 'auto_lock',
        11: 'schedule_lock',
        12: 'schedule_unlock',
        13: 'manual_lock',
        14: 'manual_unlock',
        15: 'non_access_user_operational_event',
      };
      const value = lookup[msg.data[3]];
      return { action_source_name: value }
    },
  },
  action_source_user: {
    cluster: "closuresDoorLock",
    type: "raw",
    convert: (model, msg, publish, options, meta) => {
    return { action_source_user: msg.data[5] };
    },
  },
};

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
