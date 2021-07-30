import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  updateUserQuestion: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("updateUserQuestion action", action)
  switch (action.type) {
    case CONST.UPDATE_USER_QUESTION_SUCCESS:
      return {
        ...state,
        updateUserQuestion: action.payload,
        loader: false,
      };
    case CONST.UPDATE_USER_QUESTION_FAILED:
      return {
        ...state,
        updateUserQuestion: action.data,
        loader: false,
      };
    case CONST.UPDATE_USER_QUESTION:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
