import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData} from '../utils/SendJSON';
import {
  workWithMeFailure,
  workWithMeSuccess,
} from '../actions/WorkWithMeAction';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* WorkWithMeGet(action) {
  try {
    let params = action.payload;
    const data = yield call(secureGetAuthFormData, 'getworkingWithMe', false);
    console.log('WorkWithMeGet', data);
    if (data.status !== 0) {
      yield put(workWithMeSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(workWithMeFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(workWithMeFailure(error));
  }
}
