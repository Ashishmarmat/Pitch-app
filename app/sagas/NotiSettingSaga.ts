import { put, call } from 'redux-saga/effects';
import { securePostAuthFormData } from '../utils/SendJSON';
import { NotiSettingFailure, NotiSettingSuccess } from '../actions/NotiSetting';
import { showAlert } from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* NotiSettingSaga(action) {
  console.log('NotiSettingSaga', action.payload);
  try {
    var formData = new FormData();
    formData.append('pushstatus', action.payload.pushstatus);
    formData.append('emailstatus', action.payload.emailstatus);
    const data = yield call(
      securePostAuthFormData,
      'pushnotificationupdate',
      formData,
      false,
    );
    console.log('pushnotificationupdate res', data);
    if (data.status !== 0) {
      yield put(NotiSettingSuccess(data));
      // showAlert(data.message);
      showAlert("Settings updated");
    } else {
      // showAlert(data.message);
      yield put(NotiSettingFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(NotiSettingFailure(error));
  }
}
