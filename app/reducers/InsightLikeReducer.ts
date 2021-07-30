import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function InsightLikeReducer(state = initialState, action) {
  // console.log("InsightLikeReducer action@@@",action)
  switch (action.type) {
    case CONST.INSIGHT_LIKE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.INSIGHT_LIKE_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.INSIGHT_LIKE:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
