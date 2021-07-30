import * as CONST from '../utils/Constants';
let tempArray = [];

export function userSignUpAct(userSignUpData) {
  return {
    type: CONST.USER_SIGNUP,
    payload: userSignUpData,
  };
}
export function signUpSuccess(data) {
  return {
    type: CONST.USER_SIGNUP_SUCCESS,
    payload: data,
  };
}
export function signUpFailure(error) {
  return {
    type: CONST.USER_SIGNUP_FAILED,
    payload: error,
  };
}

export function checkEmailApi(emailData) {
  return {
    type: CONST.USER_EMAIL_CHECK,
    payload: emailData,
  };
}
export function emailcheckSuccess(data) {
  return {
    type: CONST.USER_EMAIL_CHECK_SUCCESS,
    payload: data,
  };
}
export function emailcheckFailure(error) {
  return {
    type: CONST.USER_EMAIL_CHECK_FAILED,
    payload: error,
  };
}

export function checkPhoneExistApi(emailData) {
  return {
    type: CONST.USER_PHONE_CHECK,
    payload: emailData,
  };
}
export function checkPhoneExistSuccess(data) {
  return {
    type: CONST.USER_PHONE_CHECK_SUCCESS,
    payload: data,
  };
}
export function checkPhoneExistFailure(error) {
  return {
    type: CONST.USER_PHONE_CHECK_FAILED,
    payload: error,
  };
}

export default function changeStatusBAdges(bagesData) {
  console.log('bagesData', bagesData);
  return {
    type: CONST.GET_STATUS_BADGES,
    payload: bagesData,
  };
}
export function badgesStatusSuccess(data) {
  return {
    type: CONST.GET_STATUS_BADGES_SUCCESS,
    payload: data,
  };
}

export function badgesStatusFailure(error) {
  return {
    type: CONST.GET_STATUS_BADGES_FAILURE,
    payload: error,
  };
}

export function updateProfile(userEditprofile) {
  return {
    type: CONST.UPDATE_PROFILE,
    payload: userEditprofile,
  };
}
export function updateProfileSuccess(data) {
  return {
    type: CONST.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
}
export function updateProfileFailure(error) {
  return {
    type: CONST.UPDATE_PROFILE_FAILED,
    payload: error,
  };
}

export function verifyOtpAct(data) {
  return {
    type: CONST.VERIFY_OTP,
    payload: data,
  };
}
export function verifyOtpSuccess(data) {
  return {
    type: CONST.VERIFY_OTP_SUCCESS,
    payload: data,
  };
}
export function verifyOtpFailure(error) {
  return {
    type: CONST.VERIFY_OTP_FAILED,
    payload: error,
  };
}
export function resendOtpAct(mobile) {
  return {
    type: CONST.RESEND_OTP,
    payload: {type: 'mobile', source: mobile},
  };
}
export function resendOtpSuccess(data) {
  return {
    type: CONST.RESEND_OTP_SUCCESS,
    payload: data,
  };
}
export function resendOtpFailure(error) {
  return {
    type: CONST.RESEND_OTP_FAILED,
    payload: error,
  };
}

export function socialLogin(data) {
  return {
    type: CONST.SOCIAL_LOGIN,
    payload: data,
  };
}
export function socialLoginSuccess(data) {
  return {
    type: CONST.SOCIAL_LOGIN_SUCCESS,
    payload: data,
  };
}
export function socialLoginFailure(error) {
  return {
    type: CONST.SOCIAL_LOGIN_FAILED,
    payload: error,
  };
}

export function appleLoginApi(data) {
  return {
    type: CONST.APPLE_LOGIN,
    payload: data,
  };
}
export function appleLoginSuccess(data) {
  return {
    type: CONST.APPLE_LOGIN_SUCCESS,
    payload: data,
  };
}
export function appleLoginFailure(error) {
  return {
    type: CONST.APPLE_LOGIN_FAILED,
    payload: error,
  };
}
