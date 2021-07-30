import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function LikeBadgesReducer(state = initialState, action) {
  // console.log("LikeBadgesReducer action@@@",action)
  switch (action.type) {
    case CONST.LIKE_BADGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.LIKE_BADGES_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.LIKE_BADGES:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
