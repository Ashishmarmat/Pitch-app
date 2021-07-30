import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  likeWorkWithMeFailure,
  likeWorkWithMeSuccess,
} from '../actions/WorkWithMeLike';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* LikeWorkWithMe(action) {
  // console.log('LikeWorkWithMe', action.payload);
  try {
    var formData = new FormData();
    formData.append('question_id', action.payload.question_id);
    formData.append('question_user_id', action.payload.question_user_id);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_LIKE_WORK_WITH_ME,
      formData,
      false,
    );
    // console.log('LikeWorkWithMe data', data);
    if (data.status !== 0) {
      yield put(likeWorkWithMeSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(likeWorkWithMeFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeWorkWithMeFailure(error));
  }
}
