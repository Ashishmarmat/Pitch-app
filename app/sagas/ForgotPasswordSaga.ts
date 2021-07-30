import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  forgotPasswordFailure,
  forgotPasswordSuccess,
} from '../actions/ForgotPasswordActions';
import * as CONST from '../utils/Constants';
import {showAlert} from '../utils/AlertUtils';
import NavigationService from '../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import showToast from '../utils/ShowToast';

export function* forgotPasswordCall(action) {
  var formData = new FormData();
  formData.append('email', action.payload.email);
  try {
    const data = yield call(
      securePostAuthFormData,
      CONST.API_FORGOT_PASSWORD,
      formData,
      false,
    );
    // console.log('Forgot password data', data);
    if (data.status !== 0) {
      // console.log('Forgot password data', data);
      showAlert(data.message);
      yield AsyncStorage.setItem(CONST.USER_EMAIL, action.payload.email);
      yield AsyncStorage.setItem('RESETTOKEN', data.data.Authorization);
      yield put(forgotPasswordSuccess(data));
      NavigationService.navigate('EnterCode',{auth: data.data.Authorization}); //To navigate the user to the enter OTP screen.
    } else {
      showAlert(data.message);
      yield put(forgotPasswordFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(forgotPasswordFailure(error));
  }
}
