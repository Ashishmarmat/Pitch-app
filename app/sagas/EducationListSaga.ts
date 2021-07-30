import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  getEducationListFailure,
  getEducationListSuccess,
  addUserEducationSuccess,
  addUserEducationFailure,
  EditUserEducationSuccess,
  EditUserEducationFailure,
} from '../actions/EducationActions';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* getEducationListApi(action) {
  try {
    let params = action.payload;
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_EDUCATION_LIST,
      false,
    );
    // console.log('API_GET_EDUCATION_LIST data', data);
    if (data.status !== 0) {
      yield put(getEducationListSuccess(data));
    } else {
      // showAlert(data.message);
      yield put(getEducationListFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getEducationListFailure(error));
  }
}

export function* AddUserEducationApi(action) {
  // console.log('postAddWorkApi action', action);
  var formData = new FormData();
  formData.append('school_name', action.payload.school_name);
  formData.append('degree', action.payload.degree);
  formData.append('filed_of_study', action.payload.filed_of_study);
  formData.append('startyear', action.payload.startyear);
  formData.append('endyear', action.payload.endyear);
  formData.append('activities', action.payload.activities);
  formData.append('description', action.payload.description);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_ADD_USER_EDUCATION,
      formData,
      false,
    );
    // console.log('AddUserEducationApi data', data);
    if (data.status != 0) {
      yield put(addUserEducationSuccess(data));
      //   Alert.alert(data.message)
    } else {
      Alert.alert(data.message);
      yield put(addUserEducationFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    // Alert.alert("Something went wrong");
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(addUserEducationFailure(error));
  }
}

export function* editEducationApi(action) {
  // console.log('editEducationApi action', action);
  var formData = new FormData();
  formData.append('school_name', action.payload.school_name);
  formData.append('degree', action.payload.degree);
  formData.append('filed_of_study', action.payload.filed_of_study);
  formData.append('startyear', action.payload.startyear);
  formData.append('endyear', action.payload.endyear);
  formData.append('activities', action.payload.activities);
  formData.append('description', action.payload.description);
  formData.append('id', action.payload.id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_EDIT_USER_EDUCATION,
      formData,
      false,
    );
    // console.log('AddUserEducationApi data', data);
    if (data.status != 0) {
      yield put(EditUserEducationSuccess(data));
      // Alert.alert(data.message)
    } else {
      // Alert.alert("Something went wrong");
      Alert.alert(data.message);
      yield put(EditUserEducationFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(EditUserEducationFailure(error));
  }
}
