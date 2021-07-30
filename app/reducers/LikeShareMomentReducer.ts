import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function LikeShareMomentReducer(state = initialState, action) {
  // console.log("LikeShareMomentReducer action@@@",action)
  switch (action.type) {
    case CONST.LIKE_SHARE_MOMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.LIKE_SHARE_MOMENTS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.LIKE_SHARE_MOMENTS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
