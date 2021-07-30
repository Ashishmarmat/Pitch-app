import * as CONST from '../utils/Constants';

export default function changeMob(data) {
  return {
    type: CONST.CHANGEMOB,
    payload: data,
  };
}
export function changeMobFailure(error) {
  return {
    type: CONST.CHANGEMOB_FAILURE,
    payload: error,
  };
}

export function changeMobSuccess(data) {
  return {
    type: CONST.CHANGEMOB_SUCCESS,
    payload: data,
  };
}
