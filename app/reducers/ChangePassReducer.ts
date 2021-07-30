import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function ChangePassReducer(state = initialState, action) {
  // console.log("LikeBadgesReducer action@@@",action)
  switch (action.type) {
    case CONST.CHANGEPASS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.CHANGEPASS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.CHANGEPASS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
