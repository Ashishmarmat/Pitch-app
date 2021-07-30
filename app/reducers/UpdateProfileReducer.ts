import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function updateProfileReducer(state = initialState, action) {
  // console.log("action",action)
  switch (action.type) {
    case CONST.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.PROFILE_UPDATE:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
