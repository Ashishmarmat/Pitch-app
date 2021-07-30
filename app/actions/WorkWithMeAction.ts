import * as CONST from '../utils/Constants';

export default function getWorkWithMeAPi() {
  return {
    type: CONST.GET_WORK_WITH_ME,
    payload: '',
  };
}
export function workWithMeFailure(error) {
  return {
    type: CONST.GET_WORK_WITH_ME_FAILURE,
    payload: error,
  };
}

export function workWithMeSuccess(data) {
  return {
    type: CONST.GET_WORK_WITH_ME_SUCCESS,
    payload: data,
  };
}
