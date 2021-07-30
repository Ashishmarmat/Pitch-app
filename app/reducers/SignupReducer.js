import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  user: null,
  user_confirmed: false,
  userSignUpInfo: {},
  userSignupSuccess: false,
  otpVerified: false,
  socialLoginSuccess: {},
  appleLoginSuccess: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("signup action", action)
  switch (action.type) {
    case CONST.USER_SIGNUP:
      return {
        ...state,
        userSignupSuccess: false,
        otpVerified: false,
      };
    case CONST.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userSignUpInfo: action.payload,
        userSignupSuccess: true,
      };
    case CONST.USER_SIGNUP_FAILED:
      return {
        ...state,
        userSignupSuccess: false,
      };
    case CONST.PROFILE_UPDATE:
      return {
        ...state,
        userUpdateProfile: false,
      };
    case CONST.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdateInfo: action.payload,
        userUpdateSuccess: true,
      };
    case CONST.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
      };

    case CONST.USER_PHONE_CHECK:
      return {
        ...state,
      };
    case CONST.USER_PHONE_CHECK_SUCCESS:
      return {
        ...state,
        userEmailCheck: action.payload,
      };
    case CONST.USER_PHONE_CHECK_FAILED:
      return {
        ...state,
      };

    case CONST.GET_STATUS_BADGES_SUCCESS:
      return {
        ...state,
        badgesStatusRes: action.payload,
        loader: false,
      };
    case CONST.GET_STATUS_BADGES_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_STATUS_BADGES:
      return {
        ...state,
        loader: true,
      };

    case CONST.VERIFY_OTP:
      return {
        ...state,
      };
    case CONST.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyData: action.payload,
      };

    case CONST.VERIFY_OTP_FAILED:
      return {
        ...state,
      };

    case CONST.SOCIAL_LOGIN:
      return {
        ...state,
      };
    case CONST.SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        socialLoginSuccess: action.payload,
      };

    case CONST.SOCIAL_LOGIN_FAILED:
      return {
        ...state,
        socialLoginSuccess: action.payload,
      };

    case CONST.APPLE_LOGIN:
      return {
        ...state,
      };
    case CONST.APPLE_LOGIN_SUCCESS:
      return {
        ...state,
        appleLoginSuccess: action.payload,
      };

    case CONST.APPLE_LOGIN_FAILED:
      return {
        ...state,
        appleLoginSuccess: action.payload,
      };

    case CONST.RESEND_OTP:
    case CONST.RESEND_OTP_SUCCESS:
      return {
        otpData: action.payload,
      };
    case CONST.RESEND_OTP_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
