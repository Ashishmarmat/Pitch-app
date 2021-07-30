import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  userLogoutFailure,
  userLogoutSuccess,
} from '../actions/LoginActions';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import {Alert} from 'react-native';
import showToast from '../utils/ShowToast';

export function* LogoutSaga(action) {
  var formData = new FormData();
  formData.append('device_id', '');
  // console.log('formData data', formData);
  try {
    const data = yield call(
      securePostAuthFormData,
      'userDeviceIdUpdate',
      formData,
      false,
    );
    console.log('logout data', data);
    if (data.status != 0) {
    //   Alert.alert(data.message);
      yield put(userLogoutSuccess(data));
    } else {
      Alert.alert(data.message);
      yield put(userLogoutFailure(data.message));
    }
  } catch (error) {
    console.log('logout erorr');
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(userLogoutFailure(error));
  }
}
