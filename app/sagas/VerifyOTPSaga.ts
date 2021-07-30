import {put, call} from 'redux-saga/effects';
import {securePost,securePostAuthFormData, securePostForget} from '../utils/SendJSON';
import {verifyOTPFailure, verifyOTPSuccess,EmailverifyOTPFailure,EmailverifyOTPSuccess} from '../actions/VerifyOTPActions';
import {showAlert} from '../utils/AlertUtils';
import NavigationService from '../services/NavigationService';
import * as CONST from '../utils/Constants';
import showToast from '../utils/ShowToast';

export function* VerifyOTPCall(action) {
  console.log('action', action);
  let params = {
    source: action.payload.email,
    otp: action.payload.otp,
    type: 'mobile',
  };
  try {
    const data = yield call(securePost, CONST.API_VERIFY_OTP, params, false);
    if (data.status !== 0) {
      yield put(verifyOTPSuccess(data));
      NavigationService.navigateAndReset('CreatePasswordScreen');
    } else {
      // showAlert(data.message);
      yield put(verifyOTPFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(verifyOTPFailure(error));
  }
}


export function* EmailVerifyOTPCall(action) {
  console.log('action', action);
  var formData = new FormData();
  formData.append('otp', action.payload.otp);
  try {
    const data = yield call(securePostForget, CONST.EMAIL_API_VERIFY_OTP, action.payload.token ,formData, false);
    if (data.status !== 0) {
      yield put(EmailverifyOTPSuccess(data));
      NavigationService.navigate('CreatePasswordScreen');
    } else {
      showAlert(data.message);
      yield put(EmailverifyOTPFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(EmailverifyOTPFailure(error));
  }
}
