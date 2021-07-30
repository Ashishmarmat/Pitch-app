import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: null,
        loader: false,
      };
    case CONST.FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.FORGET_PASSWORD_CALL:
      return {
        ...state,
        loader: true,
      };
    case CONST.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.OTP_VERIFY_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.OTP_VERIFY_CALL:
      return {
        ...state,
        loader: true,
      };
////
      case CONST.EMAIL_OTP_VERIFY_SUCCESS:
        return {
          ...state,
          data: action.data,
          loader: false,
        };
      case CONST.EMAIL_OTP_VERIFY_FAILURE:
        return {
          ...state,
          data: action.data,
          loader: false,
        };
      case CONST.EMAIL_OTP_VERIFY_CALL:
        return {
          ...state,
          loader: true,
        };

///
    case CONST.CREATE_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.CREATE_PASSWORD_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.CREATE_PASSWORD_CALL:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
