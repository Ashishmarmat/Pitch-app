import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {badgessFailure, badgessSuccess} from '../actions/BadgesActions';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* BadgesGet(action) {
  try {
    let params = action.payload;
    const data = yield call(secureGetAuthFormData, CONST.API_GET_BADGES, false);
    if (data.status !== 0) {
      yield put(badgessSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(badgessFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(badgessFailure(error));
  }
}
