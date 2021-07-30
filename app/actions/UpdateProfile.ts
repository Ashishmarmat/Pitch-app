import * as CONST from '../utils/Constants';

export default function updateProfile(payload) {
  return {
    type: CONST.PROFILE_UPDATE,
    payload: payload,
  };
}
export function updateProfileFailure(error) {
  return {
    type: CONST.PROFILE_UPDATE_FAILURE,
    payload: error,
  };
}

export function updateProfileSuccess(data) {
  return {
    type: CONST.PROFILE_UPDATE_SUCCESS,
    payload: data,
  };
}
