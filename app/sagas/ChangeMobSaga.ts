import {put, call} from 'redux-saga/effects';
import {secureUploadProfile} from '../utils/SendJSON';
import {changeMobSuccess, changeMobFailure} from '../actions/ChangeMobile';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* ChangeMobSaga(action) {
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('mobile', params.mobile);

    const data = yield call(
      secureUploadProfile,
      'userMobileUpdate',
      formData,
      false,
    );
    // console.log('changemobile data', data);
    if (data.status !== 0) {
      yield put(changeMobSuccess(data));
      yield put(changeMobFailure(data.message));
      showAlert(data.message);
    } else {
      yield put(changeMobFailure(data.message));
      showAlert(data.message);
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(changeMobFailure(error));
  }
}
