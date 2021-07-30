import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  deleteShareMomentsFailure,
  deleteShareMomentsSuccess,
} from '../actions/DeleteShareMoment';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* deleteShareMoments(action) {
  // console.log('data111', action.payload);
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('id', params);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_DELETE_SHARE_MOMENTS,
      formData,
      false,
    );
    // console.log('deleteShareMomentsGet data', data);
    if (data.status !== 0) {
      // showAlert(data.message);
      yield put(deleteShareMomentsSuccess(data));
      // NavigationService.navigateAndReset('HomeScreen')
    } else {
      // showAlert(data.message);
      yield put(deleteShareMomentsFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(deleteShareMomentsFailure(error));
  }
}
