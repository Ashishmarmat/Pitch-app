import * as CONST from '../utils/Constants';

export default function forgotPassword({email}) {
  return {
    type: CONST.FORGET_PASSWORD_CALL,
    payload: {email},
  };
}
export function forgotPasswordFailure(error) {
  return {
    type: CONST.FORGET_PASSWORD_FAILURE,
    payload: error,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    type: CONST.FORGET_PASSWORD_SUCCESS,
    payload: data,
  };
}
