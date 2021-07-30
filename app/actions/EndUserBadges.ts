import * as CONST from '../utils/Constants';

export default function EndUserBadges(sendData) {
  return {
    type: CONST.GET_USER_BADGES,
    payload: sendData,
  };
}
export function EndUserBadgesFailure(error) {
  return {
    type: CONST.GET_USER_BADGES_FAILURE,
    payload: error,
  };
}

export function EndUserBadgesSuccess(data) {
  return {
    type: CONST.GET_USER_BADGES_SUCCESS,
    payload: data,
  };
}
