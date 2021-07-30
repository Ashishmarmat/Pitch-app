import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  EndUserBadgesFailure,
  EndUserBadgesSuccess,
} from '../actions/EndUserBadges';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* EndUserBadgesSaga(action) {
  var formData = new FormData();
  formData.append('user_id', action.payload.user_id);

  // console.log('formData', formData);
  try {
    let params = action.payload;
    const data = yield call(
      secureUploadProfile,
      CONST.API_GET_USER_BADGES,
      formData,
      false,
    );
    // console.log('Badgesdata', data);
    if (data.status !== 0) {
      yield put(EndUserBadgesSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(EndUserBadgesFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(EndUserBadgesFailure(error));
  }
}
