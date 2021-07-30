import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function FeedPostReducer(state = initialState, action) {
  // console.log("action", action)
  switch (action.type) {
    case CONST.FEED_POST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.FEED_POST_FAILED:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.FEED_POST:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
