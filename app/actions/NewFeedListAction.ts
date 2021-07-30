import * as CONST from '../utils/Constants';

export function newuserFeedListApi(feedData) {
  return {
    type: CONST.NEW_USER_FEEDLIST,
    payload: feedData,
  };
}
export function newuserFeedListSuccess(data) {
  return {
    type: CONST.NEW_USER_FEEDLIST_SUCCESS,
    payload: data,
  };
}
export function newuserFeedListFailure(error) {
  return {
    type: CONST.NEW_USER_FEEDLIST_FAILED,
    payload: error,
  };
}
