import * as CONST from '../utils/Constants';

export default function likeBadges(data) {
  return {
    type: CONST.LIKE_BADGES,
    payload: data,
  };
}
export function likeBadgesFailure(error) {
  return {
    type: CONST.LIKE_BADGES_FAILURE,
    payload: error,
  };
}

export function likeBadgesSuccess(data) {
  return {
    type: CONST.LIKE_BADGES_SUCCESS,
    payload: data,
  };
}
