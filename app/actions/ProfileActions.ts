import * as CONST from '../utils/Constants';

export default function getProfile() {
  return {
    type: CONST.GET_PROFILE,
    payload: '',
  };
}
export function getProfileFailure(error) {
  return {
    type: CONST.GET_PROFILE_FAILURE,
    payload: error,
  };
}

export function getProfileSuccess(data) {
  return {
    type: CONST.GET_PROFILE_SUCCESS,
    payload: data,
  };
}
