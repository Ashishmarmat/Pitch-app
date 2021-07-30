import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile, securePostForget} from '../utils/SendJSON';
import {
  getCertificateListFailure,
  getCertificateListSuccess,
  addUserCertificateSuccess,
  addUserCertificateFailure,
  UpdateUserCertificateSuccess,
  UpdateUserCertificateFailure,
  EmailverifyOTPFailure,
  EmailverifyOTPSuccess
} from '../actions/CertificateAction';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* getCertificateListApi(action) {
  try {
    let params = action.payload;
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_CERTIFICATEAPI_LIST,
      false,
    );
    // console.log('getCertificateListApi data', data);
    if (data.status !== 0) {
      yield put(getCertificateListSuccess(data));
    } else {
      yield put(getCertificateListFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getCertificateListFailure(error));
  }
}

export function* AddUserCertificate(action) {
  // console.log('postAddWorkApi action', action);
  var formData = new FormData();
  formData.append('certificate', action.payload.certificate);
  formData.append('organization', action.payload.organization);
  formData.append('year_issued', action.payload.year_issued);
  formData.append('expiration_year', action.payload.expiration_year);
  formData.append('description', action.payload.description);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_ADD_USER_CERTIFICATE,
      formData,
      false,
    );
    // console.log('AddUserCertificateApi data', data);
    if (data.status != 0) {
      yield put(addUserCertificateSuccess(data));
    } else {
      Alert.alert(data.message);
      yield put(addUserCertificateFailure(data.message));
    }
  } catch (error) {
    // console.log('AddUserCertificateApi error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(addUserCertificateFailure(error));
  }
}

export function* editCertificateApi(action) {
  // console.log('editCertificateApi action', action);
  var formData = new FormData();
  formData.append('certificate', action.payload.certificate);
  formData.append('organization', action.payload.organization);
  formData.append('year_issued', action.payload.year_issued);
  formData.append('expiration_year', action.payload.expiration_year);
  formData.append('description', action.payload.description);
  formData.append('id', action.payload.id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_UPDATE_USER_CERTIFICATE,
      formData,
      false,
    );
    // console.log('editCertificateApi data', data);
    if (data.status != 0) {
      yield put(UpdateUserCertificateSuccess(data));
      //   Alert.alert(data.message)
    } else {
      Alert.alert(data.message);
      yield put(UpdateUserCertificateFailure(data.message));
    }
  } catch (error) {
    // console.log('editCertificateApi error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(UpdateUserCertificateFailure(error));
  }
}


export function* EmailVerifyOTPCall(action) {
  // console.log('action', action);
  var formData = new FormData();
  formData.append('otp', action.payload.otp);
  try {
    const data = yield call(securePostForget, CONST.EMAIL_API_VERIFY_OTP, formData, false);
    if (data.status !== 0) {
      yield put(EmailverifyOTPSuccess(data));
      NavigationService.navigateAndReset('CreatePasswordScreen'); //To navigate the user to the enter CreatePassword screen.
    } else {
      // showAlert(data.message);
      yield put(EmailverifyOTPFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(EmailverifyOTPFailure(error));
  }
}
