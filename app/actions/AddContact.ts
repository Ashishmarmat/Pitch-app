import * as CONST from '../utils/Constants';

export default function addContacts(data) {
  return {
    type: CONST.ADD_CONTACTS,
    payload: data,
  };
}
export function addContactsFailure(error) {
  return {
    type: CONST.ADD_CONTACTS_FAILURE,
    payload: error,
  };
}

export function addContactsSuccess(data) {
  return {
    type: CONST.ADD_CONTACTS_SUCCESS,
    payload: data,
  };
}
