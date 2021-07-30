import * as CONST from '../utils/Constants';

export function verifyOTP({email, otp}) {
  return {
    type: CONST.OTP_VERIFY_CALL,
    payload: {email, otp},
  };
}
export function verifyOTPFailure(error) {
  return {
    type: CONST.OTP_VERIFY_FAILURE,
    payload: error,
  };
}

export function verifyOTPSuccess(data) {
  return {
    type: CONST.OTP_VERIFY_SUCCESS,
    payload: data,
  };
}



export function EmailverifyOTP(otpData) {
  return {
    type: CONST.EMAIL_OTP_VERIFY_CALL,
    payload: otpData,
  };
}
export function EmailverifyOTPFailure(error) {
  return {
    type: CONST.EMAIL_OTP_VERIFY_FAILURE,
    payload: error,
  };
}

export function EmailverifyOTPSuccess(data) {
  return {
    type: CONST.EMAIL_OTP_VERIFY_SUCCESS,
    payload: data,
  };
}