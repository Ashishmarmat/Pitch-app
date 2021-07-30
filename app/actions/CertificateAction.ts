import * as CONST from '../utils/Constants';
let tempArray = [];

export function getCertificate() {
  return {
    type: CONST.GET_CERTIFICATE,
    payload: '',
  };
}
export function getCertificateListSuccess(data) {
  return {
    type: CONST.GET_CERTIFICATE_LIST_SUCCESS,
    payload: data,
  };
}
export function getCertificateListFailure(error) {
  return {
    type: CONST.GET_CERTIFICATE_LIST_FAILED,
    payload: error,
  };
}

export function AddUserCertificateApi(addCertData) {
  return {
    type: CONST.ADD_USER_CERTIFICATE,
    payload: addCertData,
  };
}
export function addUserCertificateSuccess(data) {
  return {
    type: CONST.ADD_USER_CERTIFICATE_SUCCESS,
    payload: data,
  };
}
export function addUserCertificateFailure(error) {
  return {
    type: CONST.ADD_USER_CERTIFICATE_FAILED,
    payload: error,
  };
}

export function UpdateUserCertificateApi(updateCertData) {
  return {
    type: CONST.UPDATE_USER_CERTIFICATE,
    payload: updateCertData,
  };
}
export function UpdateUserCertificateSuccess(data) {
  return {
    type: CONST.UPDATE_USER_CERTIFICATE_SUCCESS,
    payload: data,
  };
}
export function UpdateUserCertificateFailure(error) {
  return {
    type: CONST.UPDATE_USER_CERTIFICATE_FAILED,
    payload: error,
  };
}
