import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {insightLikeFailure, insightLikeSuccess} from '../actions/InsightLike';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* InsightLikeSaga(action) {
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('post_id', params);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_INSIGHT_LIKE,
      formData,
      false,
    );
    // console.log('InsightLikeSaga data', data);
    if (data.status !== 0) {
      yield put(insightLikeSuccess(data));
      // showAlert(data.message);
    } else {
      // showAlert(data.message);
      yield put(insightLikeFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(insightLikeFailure(error));
  }
}
