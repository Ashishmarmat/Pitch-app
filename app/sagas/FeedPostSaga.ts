import { put, call } from 'redux-saga/effects';
import { secureGetAuthFormData } from '../utils/SendJSON';
import { feedPostSuccess, feedPostFailure } from '../actions/FeedPostAction';
import { showAlert } from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* FeedPostSaga(action) {
  // console.log('FeedPost action', action);
  try {
    let params = action.payload;
    const data = yield call(secureGetAuthFormData, CONST.API_FEED_POSTS, false);
    // console.log("FeedPost res", data)
    if (data.status !== 0) {
      yield put(feedPostSuccess(data));
    } else {
      showAlert(data.message);
      yield put(feedPostFailure(data.message));
    }
  } catch (error) {
    // showAlert(error.toString());
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(feedPostFailure(error));
  }
}
