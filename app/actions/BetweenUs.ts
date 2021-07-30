import * as CONST from '../utils/Constants';

export default function BetweenUs(data) {
  return {
    type: CONST.BETWEEN_US,
    payload: data,
  };
}
export function BetweenUsFailure(error) {
  return {
    type: CONST.BETWEEN_US_FAILURE,
    payload: error,
  };
}

export function BetweenUsSuccess(data) {
  return {
    type: CONST.BETWEEN_US_SUCCESS,
    payload: data,
  };
}
