import * as CONST from '../utils/Constants';

const initialState = {
  data: '',
  loader: false,
};

export default function AddEndUserBadgesReducer(state = initialState, action) {
  // console.log("action", action)
  switch (action.type) {
    case CONST.ADD_USER_BADGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.ADD_USER_BADGES_FAILED:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.ADD_USER_BADGES:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
