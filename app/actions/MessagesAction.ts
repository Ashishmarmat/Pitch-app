import * as CONST from '../utils/Constants';

export function createRoomApi(roomData) {
  return {
    type: CONST.POST_CREATE_ROOM,
    payload: roomData,
  };
}
export function createRoomSuccess(data) {
  return {
    type: CONST.POST_CREATE_ROOM_SUCCESS,
    payload: data,
  };
}
export function createRoomFailure(error) {
  return {
    type: CONST.POST_CREATE_ROOM_FAILED,
    payload: error,
  };
}

export function chatHistoryApi(historyData) {
  return {
    type: CONST.POST_CHAT_HISTORY,
    payload: historyData,
  };
}
export function chatHistorySuccess(data) {
  return {
    type: CONST.POST_CHAT_HISTORY_SUCCESS,
    payload: data,
  };
}
export function chatHistoryFailure(error) {
  return {
    type: CONST.POST_CHAT_HISTORY_FAILED,
    payload: error,
  };
}

export function chatlistApi(listData) {
  return {
    type: CONST.POST_CHAT_LIST,
    payload: listData,
  };
}
export function chatlistSuccess(data) {
  return {
    type: CONST.POST_CHAT_LIST_SUCCESS,
    payload: data,
  };
}
export function chatlistFailure(error) {
  return {
    type: CONST.POST_CHAT_LIST_FAILED,
    payload: error,
  };
}

export function messageCount(messageData) {
  return {
    type: CONST.MESSAGE_COUNT,
    payload: messageData,
  };
}

export function deleteNotify(listData) {
  return {
    type: CONST.POST_DELETE_NOTIFY,
    payload: listData,
  };
}
export function deleteNotifySuccess(data) {
  return {
    type: CONST.POST_DELETE_NOTIFY_SUCCESS,
    payload: data,
  };
}
export function deleteNotifyFailure(error) {
  return {
    type: CONST.POST_DELETE_NOTIFY_FAILED,
    payload: error,
  };
}

export function ActiveState(data) {
  console.log("data..........",data)
  return {
    type: CONST.ACTIVESTATE,
    payload: data,
  };
}