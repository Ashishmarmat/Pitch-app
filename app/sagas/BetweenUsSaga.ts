import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {BetweenUsFailure, BetweenUsSuccess} from '../actions/BetweenUs';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import showToast from '../utils/ShowToast';

export function* BetweenUsSaga(action) {
  // console.log('data111', action.payload);
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('enduserid', action.payload.enduserid);
    const data = yield call(
      securePostAuthFormData,
      'betweenUsList',
      formData,
      false,
    );
    // console.log('BetweenUsSuccess data', data);
    if (data.status !== 0) {
      yield put(BetweenUsSuccess(data));
    } else {
      yield put(BetweenUsFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(BetweenUsFailure(error));
  }
}
