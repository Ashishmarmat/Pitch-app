import * as CONST from '../utils/Constants';

export default function suggestBadges(payload) {
  return {
    type: CONST.SUGGEST_BADGES,
    payload: payload,
  };
}
export function suggestBadgesFailure(error) {
  return {
    type: CONST.SUGGEST_BADGES_FAILURE,
    payload: error,
  };
}

export function suggestBadgesSuccess(data) {
  return {
    type: CONST.SUGGEST_BADGES_SUCCESS,
    payload: data,
  };
}
