import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function editShareMomentsReducer(state = initialState, action) {
  // console.log("action@@@",action)
  switch (action.type) {
    case CONST.EDIT_SHARE_MOMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.EDIT_SHARE_MOMENTS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.EDIT_SHARE_MOMENTS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
