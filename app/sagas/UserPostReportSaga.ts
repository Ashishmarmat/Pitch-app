import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  userPostReportFailure,
  userPostReportSuccess,
} from '../actions/UserPostReport';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* UserPostReportSaga(action) {
  console.log('data111', action.payload);

  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('post_id', params.post_id);
    formData.append('post_type', params.post_type);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_USER_POST_REPORT,
      formData,
      false,
    );
    console.log('UserPostReport data', data);
    if (data.status !== 0) {
      // showAlert(data.message);
      showAlert('Reported Successfully');
      yield put(userPostReportSuccess(data));
    } else {
      showAlert(data.message);
      yield put(userPostReportFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(userPostReportFailure(error));
  }
}
