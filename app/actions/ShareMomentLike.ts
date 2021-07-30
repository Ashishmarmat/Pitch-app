import * as CONST from '../utils/Constants';

export default function likeShareMoments(data) {
  return {
    type: CONST.LIKE_SHARE_MOMENTS,
    payload: data,
  };
}
export function likeShareMomentsFailure(error) {
  return {
    type: CONST.LIKE_SHARE_MOMENTS_FAILURE,
    payload: error,
  };
}

export function likeShareMomentsSuccess(data) {
  return {
    type: CONST.LIKE_SHARE_MOMENTS_SUCCESS,
    payload: data,
  };
}
