import * as CONST from '../utils/Constants';

export default function deleteShareMoments(data) {
  return {
    type: CONST.DELETE_SHARE_MOMENTS,
    payload: data,
  };
}
export function deleteShareMomentsFailure(error) {
  return {
    type: CONST.DELETE_SHARE_MOMENTS_FAILURE,
    payload: error,
  };
}

export function deleteShareMomentsSuccess(data) {
  return {
    type: CONST.DELETE_SHARE_MOMENTS_SUCCESS,
    payload: data,
  };
}
