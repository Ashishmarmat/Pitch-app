import * as CONST from '../utils/Constants';

export function AddEndUserBadges(data) {
  return {
    type: CONST.ADD_USER_BADGES,
    payload: data,
  };
}
export function AddEndUserBadgesSuccess(data) {
  return {
    type: CONST.ADD_USER_BADGES_SUCCESS,
    payload: data,
  };
}
export function AddEndUserBadgesFailure(error) {
  return {
    type: CONST.ADD_USER_BADGES_FAILED,
    payload: error,
  };
}
