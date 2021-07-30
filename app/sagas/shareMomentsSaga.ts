import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData} from '../utils/SendJSON';
import {
  shareMomentsFailure,
  shareMomentsSuccess,
} from '../actions/ShareMoments';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* shareMomentsGet(action) {
  try {
    let params = action.payload;
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_SHARE_MOMENTS,
      false,
    );
    console.log('shareMomentsGet data', data);
    if (data.status !== 0) {
      yield put(shareMomentsSuccess(data));
    } else {
      showAlert(data.message);
      yield put(shareMomentsFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(shareMomentsFailure(error));
  }
}
