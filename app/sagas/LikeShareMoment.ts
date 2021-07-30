import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  likeShareMomentsFailure,
  likeShareMomentsSuccess,
} from '../actions/ShareMomentLike';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* LikeShareMoment(action) {
  try {
    var formData = new FormData();
    formData.append('post_id', action.payload.post_id);
    formData.append('sender_user_id', action.payload.sender_user_id);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_LIKE_SHARE_MOMENTS,
      formData,
      false,
    );
    console.log('like share moment data', data);
    if (data.status !== 0) {
      yield put(likeShareMomentsSuccess(data));
      // showAlert(data.message);
      // NavigationService.navigateAndReset('HomeScreen')
    } else {
      // showAlert(data.message);
      yield put(likeShareMomentsFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeShareMomentsFailure(error));
  }
}
