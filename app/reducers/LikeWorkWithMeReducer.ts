import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function LikeWorkWithMeReducer(state = initialState, action) {
  // console.log("LikeShareMomentReducer action@@@",action)
  switch (action.type) {
    case CONST.LIKE_WORK_WITH_ME_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.LIKE_WORK_WITH_ME_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.LIKE_WORK_WITH_ME:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
