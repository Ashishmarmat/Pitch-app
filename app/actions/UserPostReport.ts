import * as CONST from '../utils/Constants';

export default function userPostReport(data) {
  return {
    type: CONST.USER_POST_REPORT,
    payload: data,
  };
}
export function userPostReportFailure(error) {
  return {
    type: CONST.USER_POST_REPORT_FAILURE,
    payload: error,
  };
}

export function userPostReportSuccess(data) {
  return {
    type: CONST.USER_POST_REPORT_SUCCESS,
    payload: data,
  };
}
