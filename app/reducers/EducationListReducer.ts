import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  user: null,
  geteducationList: {},
  addEducationData: {},
  editEducationData: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Education action", action)
  switch (action.type) {
    case CONST.GET_EDUCATION_LIST_SUCCESS:
      return {
        ...state,
        geteducationList: action.payload,
        loader: false,
      };
    case CONST.GET_EDUCATION_LIST_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_EDUCATION:
      return {
        ...state,
        loader: true,
      };

    case CONST.ADD_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        addEducationData: action.payload,
        loader: false,
      };
    case CONST.ADD_USER_EDUCATION_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.ADD_USER_EDUCATION:
      return {
        ...state,
        loader: true,
      };

    case CONST.EDIT_USER_EDUCATION_SUCCESS:
      return {
        ...state,
        editEducationData: action.payload,
        loader: false,
      };
    case CONST.EDIT_USER_EDUCATION_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.EDIT_USER_EDUCATION:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
