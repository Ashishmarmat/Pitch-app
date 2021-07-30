import * as CONST from '../utils/Constants';
let tempArray = [];

export function workListApi() {
  return {
    type: CONST.WORK_LIST,
    payload: '',
  };
}
export function workListSuccess(data) {
  return {
    type: CONST.WORK_LIST_SUCCESS,
    payload: data,
  };
}
export function workListFailure(error) {
  return {
    type: CONST.WORK_LIST_FAILED,
    payload: error,
  };
}

export function addUserWork(userWorkData) {
  return {
    type: CONST.USER_WORK,
    payload: userWorkData,
  };
}
export function addUserWorkSuccess(data) {
  return {
    type: CONST.USER_WORK_SUCCESS,
    payload: data,
  };
}
export function addUserWorkFailure(error) {
  return {
    type: CONST.USER_WORK_FAILED,
    payload: error,
  };
}

export function updateUserWork(userWorkData) {
  return {
    type: CONST.UPDATE_USER_WORK,
    payload: userWorkData,
  };
}
export function updateUserWorkSuccess(data) {
  return {
    type: CONST.UPDATE_USER_WORK_SUCCESS,
    payload: data,
  };
}
export function updateUserWorkFailure(error) {
  return {
    type: CONST.UPDATE_USER_WORK_FAILED,
    payload: error,
  };
}
