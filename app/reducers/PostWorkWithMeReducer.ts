import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  showHideData: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Post Work with me action", action)
  switch (action.type) {
    case CONST.GET_SHOW_HIDE_ANS_SUCCESS:
      return {
        ...state,
        showHideData: action.payload,
        loader: false,
      };
    case CONST.GET_SHOW_HIDE_ANS_FAILURE:
      return {
        ...state,
        showHideData: action.data,
        loader: false,
      };
    case CONST.GET_SHOW_HIDE_ANS:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
