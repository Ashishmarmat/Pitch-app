import * as CONST from '../utils/Constants';

export function postEndUserProfile(data) {
  return {
    type: CONST.POST_END_USER_PROFILE,
    payload: data,
  };
}
export function postEndUserProfileSuccess(data) {
  return {
    type: CONST.POST_END_USER_PROFILE_SUCCESS,
    payload: data,
  };
}
export function postEndUserProfileFailure(error) {
  return {
    type: CONST.POST_END_USER_PROFILE_FAILED,
    payload: error,
  };
}
