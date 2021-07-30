import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {ContactUsFailure, ContactUsSuccess} from '../actions/ContactUs';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* ContactUsSaga(action) {
  // console.log('data111', action.payload);

  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('email', params.email);
    formData.append('message', params.message);
    const data = yield call(
      securePostAuthFormData,
      'contactUs',
      formData,
      false,
    );
    // console.log('ContactUs data', data);
    if (data.status !== 0) {
      showAlert(data.message);
      yield put(ContactUsSuccess(data));
    } else {
      showAlert(data.message);
      yield put(ContactUsFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(ContactUsFailure(error));
  }
}
