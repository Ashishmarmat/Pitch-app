import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function UserPostReportReducer(state = initialState, action) {
  // console.log("action@@@",action)
  switch (action.type) {
    case CONST.USER_POST_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.USER_POST_REPORT_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.USER_POST_REPORT:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
