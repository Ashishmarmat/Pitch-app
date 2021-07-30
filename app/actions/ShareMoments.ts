import * as CONST from '../utils/Constants';

export default function shareMoments() {
  return {
    type: CONST.GET_SHARE_MOMENTS,
    payload: '',
  };
}
export function shareMomentsFailure(error) {
  return {
    type: CONST.GET_SHARE_MOMENTS_FAILURE,
    payload: error,
  };
}

export function shareMomentsSuccess(data) {
  console.log('data@@', data);

  return {
    type: CONST.GET_SHARE_MOMENTS_SUCCESS,
    payload: data,
  };
}
