import {put, call} from 'redux-saga/effects';
import {securePost} from '../utils/SendJSON';
import {getPromptFailure, getPromptSuccess} from '../actions/PromptActions';
import * as CONST from '../utils/Constants';
import {showAlert} from '../utils/AlertUtils';
import {addKeyValue} from '../utils/JsonUtils';
import strings from '../theme/strings';
import showToast from '../utils/ShowToast';

export function* savePromptCall(action) {
  console.log('action', action);
  let answers = action.payload.data;
  let params = {};
  addKeyValue(params, 'user_response', answers);
  addKeyValue(params, 'type', 'prompt');
  const data = yield call(securePost, CONST.API_SAVE_QUESTIONS, params, false);
  try {
    if (data.status !== 0) {
      showAlert(strings.MSG_APP_IS_IN_DEVELOPMENT);
      yield put(getPromptSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(getPromptFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getPromptFailure(error));
  }
}
