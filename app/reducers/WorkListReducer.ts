import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  addUserWork: {},
  updateWorkData: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("signup action", action)
  switch (action.type) {
    case CONST.WORK_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.WORK_LIST_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.WORK_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.USER_WORK_SUCCESS:
      return {
        ...state,
        addUserWork: action.payload,
        loader: false,
      };
    case CONST.USER_WORK_FAILED:
      return {
        ...state,
        addUserWork: action.data,
        loader: false,
      };
    case CONST.USER_WORK:
      return {
        ...state,
        loader: true,
      };

    case CONST.UPDATE_USER_WORK_SUCCESS:
      return {
        ...state,
        updateWorkData: action.payload,
        loader: false,
      };
    case CONST.UPDATE_USER_WORK_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.UPDATE_USER_WORK:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
