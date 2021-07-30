import * as CONST from '../utils/Constants';

export function getQuestions() {
  return {
    type: CONST.GET_QUESTIONS_CALL,
  };
}
export function getQuestionsFailure(error) {
  return {
    type: CONST.GET_QUESTIONS_FAILURE,
    payload: error,
  };
}

export function getQuestionsSuccess(data) {
  return {
    type: CONST.GET_QUESTIONS_SUCCESS,
    payload: data,
  };
}

export function onItemSelect({position, answer}) {
  console.log('position', position);
  console.log('answer', answer);
  return {
    type: CONST.ON_ANSER_SELECT,
    payload: {
      position,
      answer,
    },
  };
}

export function sendQuestions({data, promptResponse}) {
  return {
    type: CONST.SEND_QUESTIONS_CALL,
    payload: {data, promptResponse},
  };
}
export function sendQuestionsFailure(error) {
  return {
    type: CONST.SEND_QUESTIONS_FAILURE,
    payload: error,
  };
}

export function sendQuestionsSuccess(data) {
  return {
    type: CONST.SEND_QUESTIONS_SUCCESS,
    payload: data,
  };
}
