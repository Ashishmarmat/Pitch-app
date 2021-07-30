import * as CONST from '../utils/Constants';
let tempArray = [];

export function getEducation() {
  return {
    type: CONST.GET_EDUCATION,
    payload: '',
  };
}
export function getEducationListSuccess(data) {
  return {
    type: CONST.GET_EDUCATION_LIST_SUCCESS,
    payload: data,
  };
}
export function getEducationListFailure(error) {
  return {
    type: CONST.GET_EDUCATION_LIST_FAILED,
    payload: error,
  };
}

export function AddUserEduApi(addEduData) {
  return {
    type: CONST.ADD_USER_EDUCATION,
    payload: addEduData,
  };
}
export function addUserEducationSuccess(data) {
  return {
    type: CONST.ADD_USER_EDUCATION_SUCCESS,
    payload: data,
  };
}
export function addUserEducationFailure(error) {
  return {
    type: CONST.ADD_USER_EDUCATION_FAILED,
    payload: error,
  };
}

export function EditUserEduApi(addEduData) {
  return {
    type: CONST.EDIT_USER_EDUCATION,
    payload: addEduData,
  };
}
export function EditUserEducationSuccess(data) {
  return {
    type: CONST.EDIT_USER_EDUCATION_SUCCESS,
    payload: data,
  };
}
export function EditUserEducationFailure(error) {
  return {
    type: CONST.EDIT_USER_EDUCATION_FAILED,
    payload: error,
  };
}
