import * as CONST from '../utils/Constants';

export default function changePass(data) {
  return {
    type: CONST.CHANGEPASS,
    payload: data,
  };
}
export function changePassFailure(error) {
  return {
    type: CONST.CHANGEPASS_FAILURE,
    payload: error,
  };
}

export function changePassSuccess(data) {
  return {
    type: CONST.CHANGEPASS_SUCCESS,
    payload: data,
  };
}
