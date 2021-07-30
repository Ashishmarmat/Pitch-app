import * as CONST from '../utils/Constants';

export function updateUserQuestionApi(addEduData) {
  return {
    type: CONST.UPDATE_USER_QUESTION,
    payload: addEduData,
  };
}
export function updateUserQuestionSuccess(data) {
  return {
    type: CONST.UPDATE_USER_QUESTION_SUCCESS,
    payload: data,
  };
}
export function updateUserQuestionFailure(error) {
  return {
    type: CONST.UPDATE_USER_QUESTION_FAILED,
    payload: error,
  };
}
