import * as CONST from '../utils/Constants';

export default function deleteChat(data) {
  return {
    type: CONST.DELETE_CHAT,
    payload: data,
  };
}
export function deleteChatFailure(error) {
  return {
    type: CONST.DELETE_CHAT_FAILURE,
    payload: error,
  };
}

export function deleteChatSuccess(data) {
  return {
    type: CONST.DELETE_CHAT_SUCCESS,
    payload: data,
  };
}
