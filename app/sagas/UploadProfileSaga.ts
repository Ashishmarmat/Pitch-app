import {put, call} from 'redux-saga/effects';
import {
  updateProfileFailure,
  updateProfileSuccess,
} from '../actions/UpdateProfile';
import {securePostAuthFormData} from '../utils/SendJSON';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';
// import {Alert} from 'react-native';

export function* updateProfile(action) {
  // console.log(' data111', action.payload);
  // console.log(' action', action);
  var formData = new FormData();
  formData.append('full_name', action.payload.full_name);
  formData.append('email', action.payload.email);
  formData.append('password', action.payload.password);
  formData.append('phone', action.payload.phone);
  formData.append('dob', action.payload.dob);
  formData.append('pronoun', action.payload.pronoun);
  formData.append('work', action.payload.work);
  formData.append('job_title', action.payload.job_title);
  formData.append('last_school', '');
  formData.append('city', action.payload.city);
  formData.append('state', action.payload.state);
  formData.append('country', action.payload.country);
  formData.append('mobile_verify', 'Yes');
  formData.append('profile_pic', action.payload.profile_file);
  formData.append('tagline_id', action.payload.tagline_id);
  formData.append('tagline_data', action.payload.tagline_data);

  // console.log('update profile formData', formData);
  try {
    const data = yield call(
      securePostAuthFormData,
      'profile_update_new',
      formData,
      false,
    );
    // console.log('profile_update_new demo data', action.payload);
    // console.log('profile_update_new data', data);
    // Alert.alert(data.message);
    yield put(updateProfileSuccess(data));
  } catch (error) {
    console.log('profile_update_new error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(updateProfileFailure(error));
  }
}
