import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function profileReducer(state = initialState, action) {
  // console.log("Profile action",action)
  switch (action.type) {
    case CONST.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.GET_PROFILE_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_PROFILE:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
