import {put, call} from 'redux-saga/effects';
import {secureGet} from '../utils/SendJSON';
import {getProfileFailure, getProfileSuccess} from '../actions/ProfileActions';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* ProfileGet(action) {
  try {
    let params = action.payload;
    const data = yield call(secureGet, CONST.API_GET_PROFILE, false);
    console.log('Profile get res', data);
    if (data.status !== 0) {
      yield put(getProfileSuccess(data));
    } else {
      showAlert(data.message);
      yield put(getProfileFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getProfileFailure(error));
  }
}
