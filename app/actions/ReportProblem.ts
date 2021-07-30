import * as CONST from '../utils/Constants';

export default function ReportProblem(data) {
  return {
    type: CONST.REPORT_PROBLEM,
    payload: data,
  };
}
export function ReportProblemFailure(error) {
  return {
    type: CONST.REPORT_PROBLEM_FAILURE,
    payload: error,
  };
}

export function ReportProblemSuccess(data) {
  return {
    type: CONST.REPORT_PROBLEM_SUCCESS,
    payload: data,
  };
}
