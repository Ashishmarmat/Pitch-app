import * as CONST from '../utils/Constants';
let tempArray = [];

export function getAnswerPrompt() {
  return {
    type: CONST.GET_ANSWER_PROMPT,
    payload: '',
  };
}
export function getAnswerPromptSuccess(data) {
  return {
    type: CONST.GET_ANSWER_PROMPT_SUCCESS,
    payload: data,
  };
}
export function getAnswerPromptFailure(error) {
  return {
    type: CONST.GET_ANSWER_PROMPT_FAILED,
    payload: error,
  };
}

export function getAllquestionAwnserlist() {
  return {
    type: CONST.GET_ALL_QUEST_ANSWER,
    payload: '',
  };
}
export function getAllquestionAwnserlistSuccess(data) {
  return {
    type: CONST.GET_ALL_QUEST_ANSWER_SUCCESS,
    payload: data,
  };
}
export function getAllquestionAwnserlistFailure(error) {
  return {
    type: CONST.GET_ALL_QUEST_ANSWER_FAILED,
    payload: error,
  };
}
