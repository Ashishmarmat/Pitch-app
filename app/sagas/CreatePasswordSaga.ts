import {put, call} from 'redux-saga/effects';
import {securePost,securePostForget} from '../utils/SendJSON';
import {
  createPasswordSuccess,
  createPasswordFailure,
} from '../actions/CreatePasswordActions';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import showToast from '../utils/ShowToast';

export function* CreatePasswordCall(action) {
  // console.log('action', action);
  var formData = new FormData();
  formData.append('password', action.payload.new_password);
  try {
    const data = yield call(securePostForget, CONST.API_CREATE_PASSWORD, action.payload.token ,formData, false);
    if (data.status !== 0) {
      yield put(createPasswordSuccess(data));
      yield AsyncStorage.setItem('AutoLogin', '');
      NavigationService.navigateAndReset('LandingScreen');
    } else {
      yield put(createPasswordFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(createPasswordFailure(error));
  }
}
