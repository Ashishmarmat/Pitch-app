import {put, call} from 'redux-saga/effects';
import {
  uploadMediaSuccess,
  uploadMediaFailure,
} from '../actions/UploadMediaActions';
import {secureUploadProfile} from '../utils/SendJSON';
import {Alert} from 'react-native';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* uploadMedia(action) {
  // console.log('uploadMedia demo data111', action.payload);
  try {
    const data = yield call(
      secureUploadProfile,
      'upload_profile_photo',
      action.payload,
      false,
    );
    // console.log('uploadMedia demo data', action.payload);
    // console.log('uploadMedia data', data);
    // Alert.alert('Alert', data.message);
    yield put(uploadMediaSuccess(data));
  } catch (error) {
    console.log('userSignUp error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(uploadMediaFailure(error));
  }
}
