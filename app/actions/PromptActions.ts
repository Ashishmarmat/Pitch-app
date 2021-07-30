import * as CONST from '../utils/Constants';

export function savePrompts({data}) {
  return {
    type: CONST.SAVE_PRMPT_CALL,
    payload: {data},
  };
}
export function getPromptFailure(error) {
  return {
    type: CONST.SAVE_PRMPT_FAILURE,
    payload: error,
  };
}

export function getPromptSuccess(data) {
  return {
    type: CONST.SAVE_PRMPT_SUCCESS,
    payload: data,
  };
}
