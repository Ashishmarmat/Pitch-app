import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  editShareMomentsFailure,
  editShareMomentsSuccess,
} from '../actions/EditSharedMoments';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* editShareMoments(action) {
  // console.log('data111', action.payload);
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('id', params.id);
    formData.append('tags', params.tags);
    const data = yield call(
      securePostAuthFormData,
      CONST.API_EDIT_SHARE_MOMENTS,
      formData,
      false,
    );
    // console.log('editShareMomentsSuccess data', data);
    if (data.status !== 0) {
      yield put(editShareMomentsSuccess(data));
      NavigationService.navigate('HomeScreen');
    } else {
      showAlert(data.message);
      yield put(editShareMomentsFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(editShareMomentsFailure(error));
  }
}
