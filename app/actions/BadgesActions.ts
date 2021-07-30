import * as CONST from '../utils/Constants';

export default function badgess() {
  return {
    type: CONST.GET_BADGES,
    payload: '',
  };
}
export function badgessFailure(error) {
  return {
    type: CONST.GET_BADGES_FAILURE,
    payload: error,
  };
}

export function badgessSuccess(data) {
  return {
    type: CONST.GET_BADGES_SUCCESS,
    payload: data,
  };
}
