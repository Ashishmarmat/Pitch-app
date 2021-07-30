import { put, call } from 'redux-saga/effects';
import { secureUploadProfile } from '../utils/SendJSON';
import { changePassSuccess, changePassFailure } from '../actions/ChangePass';
import { showAlert } from '../utils/AlertUtils';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* ChangePassSaga(action) {
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('old_password', params.old_password);
    formData.append('new_password', params.new_password);
    formData.append('confirm_password', params.confirm_password);

    const data = yield call(
      secureUploadProfile,
      'changepassword_new',
      formData,
      false,
    );
    // console.log('changePass formData', formData);
    // console.log('changePass data', data);
    if (data.status !== 0) {
      yield put(changePassSuccess(data));
      yield put(changePassFailure(data.message));
      NavigationService.navigateAndReset('AccountScreen');
      showAlert(data.message);

    } else {
      yield put(changePassFailure(data.message));
      showAlert(data.message);
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(changePassFailure(error));
  }
}
