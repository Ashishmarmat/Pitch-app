import * as CONST from '../utils/Constants';

export default function editShareMoments(data) {
  return {
    type: CONST.EDIT_SHARE_MOMENTS,
    payload: data,
  };
}
export function editShareMomentsFailure(error) {
  return {
    type: CONST.EDIT_SHARE_MOMENTS_FAILURE,
    payload: error,
  };
}

export function editShareMomentsSuccess(data) {
  return {
    type: CONST.EDIT_SHARE_MOMENTS_SUCCESS,
    payload: data,
  };
}
