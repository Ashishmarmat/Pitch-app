import {put, call} from 'redux-saga/effects';
import {secureUploadProfile} from '../utils/SendJSON';
import {
  postEndUserProfileSuccess,
  postEndUserProfileFailure,
} from '../actions/EndUserProfileAction';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* EndUserProfileSaga(action) {
  // console.log('End User Profile action', action);
  var formData = new FormData();
  formData.append('user_id', action.payload.user_id);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_POST_END_USER_PROFILE,
      formData,
      false,
    );
    // console.log('End User Profile res', data);
    if (data.status !== 0) {
      yield put(postEndUserProfileSuccess(data));
    } else {
      showAlert(data.message);
      yield put(postEndUserProfileFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postEndUserProfileFailure(error));
  }
}
