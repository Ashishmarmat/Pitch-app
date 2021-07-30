import * as CONST from '../utils/Constants';

const initialState = {
  data: '',
  loader: false,
};

export default function EndUserProfileReducer(state = initialState, action) {
  // console.log("action", action)
  switch (action.type) {
    case CONST.POST_END_USER_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.POST_END_USER_PROFILE_FAILED:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.POST_END_USER_PROFILE:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
