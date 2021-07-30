import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  updateUserQuestionFailure,
  updateUserQuestionSuccess,
} from '../actions/EditWorkWithMeAction';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* postWorkWithMe(action) {
  // console.log('postWorkWithMe action', action);
  var formData = new FormData();
  formData.append('question_id', action.payload.question_id);
  formData.append('ans_data', action.payload.ans_data);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_UPDATE_USER_QUESTION,
      formData,
      false,
    );
    // console.log('postWorkWithMe data', data);
    if (data.status != 0) {
      yield put(updateUserQuestionSuccess(data));
    } else {
      yield put(updateUserQuestionFailure(data.message));
    }
  } catch (error) {
    console.log('postWorkWithMe error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(updateUserQuestionFailure(error));
  }
}
