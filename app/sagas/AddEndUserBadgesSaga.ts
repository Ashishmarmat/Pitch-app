import {put, call} from 'redux-saga/effects';
import {secureUploadProfile} from '../utils/SendJSON';
import { AddEndUserBadgesSuccess, AddEndUserBadgesFailure } from '../actions/AddEndUserBadges';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* AddEndUserBadgesSaga(action) {
  var formData = new FormData();
  formData.append('sender_user_id', action.payload.sender_user_id);
  formData.append('badge_id', action.payload.badge_id);
  formData.append('status', action.payload.status);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_ADD_END_USER_BADGES,
      formData,
      false,
    );
    // console.log('End User Profile res', data);
    if (data.status !== 0) {
      yield put(AddEndUserBadgesSuccess(data));
    } else {
      yield put(AddEndUserBadgesFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(AddEndUserBadgesFailure(error));
  }
}
