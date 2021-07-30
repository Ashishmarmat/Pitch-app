import * as CONST from '../utils/Constants';

export function feedPost() {
  return {
    type: CONST.FEED_POST,
    payload: '',
  };
}
export function feedPostSuccess(data) {
  return {
    type: CONST.FEED_POST_SUCCESS,
    payload: data,
  };
}
export function feedPostFailure(error) {
  return {
    type: CONST.FEED_POST_FAILED,
    payload: error,
  };
}
