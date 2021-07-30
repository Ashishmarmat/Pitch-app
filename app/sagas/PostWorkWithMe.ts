import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  hideAnswerFailure,
  hideAnswerSuccess,
} from '../actions/PostWorkWithMeAction';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import { showAlert } from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* hideShowAnsAPi(action) {
  // console.log('hideShowAnsAPi action', action);
  var formData = new FormData();
  formData.append('status', action.payload.status);
  formData.append('question_id', action.payload.question_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_HIDE_SHOW_ANS,
      formData,
      false,
    );
    // console.log('hideShowAnsAPi data', data);
    if (data.status != 0) {
      yield put(hideAnswerSuccess(data));
      Alert.alert(data.message);
    } else {
      // Alert.alert(data.message);
      yield put(hideAnswerFailure(data.message));
    }
  } catch (error) {
    console.log('hideShowAnsAPi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(hideAnswerFailure(error));
  }
}
