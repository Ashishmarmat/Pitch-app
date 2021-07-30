import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function shareMomentsReducer(state = initialState, action) {
  // console.log("action",action)
  switch (action.type) {
    case CONST.GET_SHARE_MOMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.GET_SHARE_MOMENTS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_SHARE_MOMENTS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
