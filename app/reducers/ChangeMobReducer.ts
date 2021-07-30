import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function ChangeMobReducer(state = initialState, action) {
  // console.log("LikeBadgesReducer action@@@",action)
  switch (action.type) {
    case CONST.CHANGEMOB_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.CHANGEMOB_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.CHANGEMOB:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
