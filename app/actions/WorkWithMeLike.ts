import * as CONST from '../utils/Constants';

export default function likeWorkWithMe(data) {
  return {
    type: CONST.LIKE_WORK_WITH_ME,
    payload: data,
  };
}
export function likeWorkWithMeFailure(error) {
  return {
    type: CONST.LIKE_WORK_WITH_ME_FAILURE,
    payload: error,
  };
}

export function likeWorkWithMeSuccess(data) {
  return {
    type: CONST.LIKE_WORK_WITH_ME_SUCCESS,
    payload: data,
  };
}
