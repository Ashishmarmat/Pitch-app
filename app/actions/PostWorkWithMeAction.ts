import * as CONST from '../utils/Constants';
let tempArray = [];

export default function postshowHideAns(postData) {
  return {
    type: CONST.GET_SHOW_HIDE_ANS,
    payload: postData,
  };
}
export function hideAnswerFailure(error) {
  return {
    type: CONST.GET_SHOW_HIDE_ANS_FAILURE,
    payload: error,
  };
}

export function hideAnswerSuccess(data) {
  return {
    type: CONST.GET_SHOW_HIDE_ANS_SUCCESS,
    payload: data,
  };
}
