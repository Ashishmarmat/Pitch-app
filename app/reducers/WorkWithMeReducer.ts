import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function WorkWithMeReducer(state = initialState, action) {
  // console.log("Work with me Actions", action)
  // console.log("Work with me type", action.type)
  switch (action.type) {
    case CONST.GET_WORK_WITH_ME_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.GET_WORK_WITH_ME_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_WORK_WITH_ME:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
