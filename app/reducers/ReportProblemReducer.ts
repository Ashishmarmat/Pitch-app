import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function ReportProblemReducer(state = initialState, action) {
  // console.log("action@@@",action)
  switch (action.type) {
    case CONST.REPORT_PROBLEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.REPORT_PROBLEM_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.REPORT_PROBLEM:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
