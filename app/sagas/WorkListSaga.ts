import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  workListFailure,
  workListSuccess,
  addUserWorkSuccess,
  addUserWorkFailure,
  updateUserWorkFailure,
  updateUserWorkSuccess,
} from '../actions/WorkList';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* getWorkList(action) {
  try {
    let params = action.payload;
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_WORK_LIST,
      false,
    );
    // console.log('getWorkList data', data);
    if (data.status !== 0) {
      yield put(workListSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(workListFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(workListFailure(error));
  }
}

export function* postAddWorkApi(action) {
  // console.log('postAddWorkApi action', action);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_ADD_WORK_LIST,
      JSON.stringify(action.payload),
      false,
    );
    // console.log('updateProfile demo data', action.payload);
    // console.log('changeBadgestatusApi data', data);
    if (data.status != 0) {
      yield put(addUserWorkSuccess(data));
      // Alert.alert(data.message)
    } else {
      Alert.alert(data.message);
      yield put(addUserWorkFailure(data.message));
    }
  } catch (error) {
    console.log('updateProfile error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(addUserWorkFailure(error));
  }
}

export function* updateWorkDataApi(action) {
  // console.log('updateWorkDataApi action', action);
  // console.log('updateWorkDataApi action.payload', action.payload);
  var formData = new FormData();
  formData.append('title', action.payload.title);
  formData.append('company_name', action.payload.company_name);
  formData.append('currently_working', action.payload.currently_working);
  formData.append('startyear', action.payload.startyear);
  formData.append('endyear', action.payload.endyear);
  formData.append('describtion', action.payload.describtion);
  formData.append('teammmembers', action.payload.teammmembers);
  formData.append('work_highlight', action.payload.work_highlight);
  formData.append('id', action.payload.id);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_UPDATE_USER_WORK,
      JSON.stringify(action.payload),
      false,
    );
    // console.log('updateWorkDataApi data', data);
    if (data.status != 0) {
      yield put(updateUserWorkSuccess(data));
      // Alert.alert(data.message)
    } else {
      Alert.alert('Something went wrong');
      yield put(updateUserWorkFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('updateWorkDataApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(updateUserWorkFailure(error));
  }
}
