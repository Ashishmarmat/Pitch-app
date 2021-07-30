import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loaderValue: false,
};

// This reducer stores the status of email verification.
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.USER_LOGIN_FAILED:
      return {
        ...state,
        data: action.payload,
        loaderValue: false,
      };
    case CONST.USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loaderValue: false,
      };
    case CONST.USER_LOGIN:
      return {
        ...state,
        loaderValue: true,
      };

      case CONST.USER_LOGOUT_FAILED:
      return {
        ...state,
        data: action.payload,
        loaderValue: false,
      };
    case CONST.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loaderValue: false,
      };
    case CONST.USER_LOGOUT:
      return {
        ...state,
        loaderValue: true,
      };

    default:
      return state;
  }
}
