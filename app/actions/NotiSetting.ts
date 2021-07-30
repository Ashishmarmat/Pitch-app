import * as CONST from '../utils/Constants';

export default function NotiSetting(data) {
  return {
    type: CONST.NOTI_SETTING,
    payload: data,
  };
}
export function NotiSettingFailure(error) {
  return {
    type: CONST.NOTI_SETTING_FAILURE,
    payload: error,
  };
}

export function NotiSettingSuccess(data) {
  return {
    type: CONST.NOTI_SETTING_SUCCESS,
    payload: data,
  };
}
