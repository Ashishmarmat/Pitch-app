import * as CONST from '../utils/Constants';

export default function insightLike(data) {
  return {
    type: CONST.INSIGHT_LIKE,
    payload: data,
  };
}
export function insightLikeFailure(error) {
  return {
    type: CONST.INSIGHT_LIKE_FAILURE,
    payload: error,
  };
}

export function insightLikeSuccess(data) {
  return {
    type: CONST.INSIGHT_LIKE_SUCCESS,
    payload: data,
  };
}
