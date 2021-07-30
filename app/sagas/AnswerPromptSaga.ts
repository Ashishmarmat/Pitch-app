import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  getAnswerPromptSuccess,
  getAnswerPromptFailure,
  getAllquestionAwnserlistSuccess,
  getAllquestionAwnserlistFailure,
} from '../actions/AnswerPrompt';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* getAnswerPromptListApi(action) {
  try {
    let params = action.payload;
    const data = yield call(secureGetAuthFormData, 'getAnswerPrompt', false);
    if (data.status !== 0) {
      yield put(getAnswerPromptSuccess(data));
    } else {
      yield put(getAnswerPromptFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getAnswerPromptFailure(error));
  }
}

export function* getQuestionAnswerApi(action) {
  try {
    const data = yield call(
      secureGetAuthFormData,
      'getAllquestionAwnserlist',
      false,
    );
    if (data.status !== 0) {
      yield put(getAllquestionAwnserlistSuccess(data));
    } else {
      yield put(getAllquestionAwnserlistFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getAllquestionAwnserlistFailure(error));
  }
}
