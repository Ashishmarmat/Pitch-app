import * as CONST from '../utils/Constants';

export default function login({email, password, fcmToken}) {
  return {
    type: CONST.USER_LOGIN,
    payload: {email, password, fcmToken},
  };
}
export function userLoginFailure(error) {
  return {
    type: CONST.USER_LOGIN_FAILED,
    payload: error,
  };
}
export function userLoginSuccess(data) {
  return {
    type: CONST.USER_LOGIN_SUCCESS,
    payload: data,
  };
}

export function userLogoutAct(userData) {
  return {
    type: CONST.USER_LOGOUT,
    userData: userData,
  };
}
export function userLogoutFailure(error) {
  return {
    type: CONST.USER_LOGOUT_FAILED,
    payload: error,
  };
}
export function userLogoutSuccess(data) {
  return {
    type: CONST.USER_LOGOUT_SUCCESS,
    payload: data,
  };
}
