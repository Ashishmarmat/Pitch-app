import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  user: null,
  getcertificateList: {},
  addCertificateData: {},
  updateCertificateData: {},
  forgetResData: {}
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Certificate action", action)
  switch (action.type) {
    case CONST.GET_CERTIFICATE_LIST_SUCCESS:
      return {
        ...state,
        getcertificateList: action.payload,
        loader: false,
      };
    case CONST.GET_CERTIFICATE_LIST_FAILED:
      return {
        ...state,
        getcertificateList: action.data,
        loader: false,
      };
    case CONST.GET_CERTIFICATE:
      return {
        ...state,
        loader: true,
      };

    case CONST.ADD_USER_CERTIFICATE_SUCCESS:
      return {
        ...state,
        addCertificateData: action.payload,
        loader: false,
      };
    case CONST.ADD_USER_CERTIFICATE_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.ADD_USER_CERTIFICATE:
      return {
        ...state,
        loader: true,
      };

    case CONST.UPDATE_USER_CERTIFICATE_SUCCESS:
      return {
        ...state,
        updateCertificateData: action.payload,
        loader: false,
      };
    case CONST.UPDATE_USER_CERTIFICATE_FAILED:
      return {
        ...state,
        updateCertificateData: action.data,
        loader: false,
      };
    case CONST.UPDATE_USER_CERTIFICATE:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
