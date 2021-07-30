import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function badgesReducer(state = initialState, action) {
  // console.log("Badges Actions", action)
  // console.log("Badges type", action.type)
  switch (action.type) {
    case CONST.GET_BADGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.GET_BADGES_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_BADGES:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
