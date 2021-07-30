import {put, call} from 'redux-saga/effects';
import {secureGet, securePost} from '../utils/SendJSON';
import { getQuestionsFailure, getQuestionsSuccess, sendQuestionsFailure, sendQuestionsSuccess } from '../actions/QuestionsActions';
import * as CONST from '../utils/Constants';
import {showAlert} from '../utils/AlertUtils';
import {log} from '../utils/CommonUtils';
import {addKeyValue} from '../utils/JsonUtils';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* getQuestionsCall(action) {
  try {
    const data = yield call(secureGet, CONST.API_GET_QUESTIONS, false);
    if (data.status !== 0) {
      // log('Questions data', data);
      yield put(getQuestionsSuccess(data));
    } else {
      showAlert(data.message);
      yield put(getQuestionsFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(getQuestionsFailure(error));
  }
}

export function* saveQuestionsCall(action) {
  try {
    let params = {
      res: action.payload.data,
    };
    // console.log('Request data saveQuestionsCall====++', params);
    const data = yield call(
      securePost,
      CONST.API_SAVE_QUESTIONS,
      params,
      false,
    );
    // log('Send question response', data);
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(sendQuestionsFailure(error));
  }
}
