import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {likeBadgesSuccess, likeBadgesFailure} from '../actions/BadgesLike';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* LikeBadgesSaga(action) {
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('badges_id', params.badges_id);
    formData.append('user_id', params.user_id);
    const data = yield call(
      securePostAuthFormData,
      'dolikebadges',
      formData,
      false,
    );
    console.log('likeBadges data', data);
    if (data.status !== 0) {
      yield put(likeBadgesSuccess(data));
    } else {
      yield put(likeBadgesFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeBadgesFailure(error));
  }
}
