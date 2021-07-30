import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  user: null,
  getNewFeedList: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Certificate action", action)
  switch (action.type) {
    case CONST.NEW_USER_FEEDLIST_SUCCESS:
      return {
        ...state,
        getNewFeedList: action.payload,
        loader: false,
      };
    case CONST.NEW_USER_FEEDLIST_FAILED:
      return {
        ...state,
        getNewFeedList: action.data,
        loader: false,
      };
    case CONST.NEW_USER_FEEDLIST:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
