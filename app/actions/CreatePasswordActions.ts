import * as CONST from '../utils/Constants';

export default function createPasswordAPI({
  new_password,
  token
}) {
  return {
    type: CONST.CREATE_PASSWORD_CALL,
    payload: {new_password, token},
  };
}
export function createPasswordFailure(error) {
  return {
    type: CONST.CREATE_PASSWORD_FAILURE,
    payload: error,
  };
}

export function createPasswordSuccess(data) {
  return {
    type: CONST.CREATE_PASSWORD_SUCCESS,
    payload: data,
  };
}
