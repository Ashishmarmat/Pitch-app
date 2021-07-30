import {put, call} from 'redux-saga/effects';
import {SecuremessagePost} from '../utils/SendJSON';
import {
  deleteChatFailure,
  deleteChatSuccess,
} from '../actions/DeleteChatAction';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* deleteChat(action) {
  console.log('data111', action.payload);

  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('id', params);
    const data = yield call(
      SecuremessagePost,
      'chatDeleteMessage',
      JSON.stringify(action.payload),
      false,
    );
    // console.log('deleteShareMomentsGet data', data);
    if (data.status !== 0) {
      // showAlert(data.message);
      yield put(deleteChatSuccess(data));
      // NavigationService.navigateAndReset('HomeScreen')
    } else {
      // showAlert(data.message);
      yield put(deleteChatFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(deleteChatFailure(error));
  }
}
