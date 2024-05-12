const {lock, lock_action, pincode, battery} = require('zigbee-herdsman-converters/lib/modernExtend');
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
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
  description: "YMC420",
  fromZigbee: [
    fzLocal.action_source_user,
    fzLocal.action_source_name,
    fz.lock, fz.battery,
    fz.lock_operation_event,
    fz.lock_programming_event,
    fz.lock_pin_code_response,
    fz.lock_user_status_response
  ],
  toZigbee: [
    tz.lock,
    tz.pincode_lock,
    tz.lock_userstatus
  ],
  meta: {pinCodeCount: 250, ...meta},
  exposes: [
    lock(), 
    lock_action(), 
    battery(), 
    pincode(),
  ],
  configure: async (device, coordinatorEndpoint) => {
    const endpoint = device.getEndpoint(1);
    await reporting.bind(endpoint, coordinatorEndpoint, ['closuresDoorLock', 'genPowerCfg']);
    await reporting.lockState(endpoint);
    await reporting.batteryPercentageRemaining(endpoint);
  },
};
