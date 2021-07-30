import { put, call } from 'redux-saga/effects';
import { securePostAuthFormData, secureUploadProfile } from '../utils/SendJSON';
import {
  getLinkedTeamFailure,
  getLinkedTeamSuccess,
  postUserFilterFailure,
  postUserFilterSuccess,
  postUserSuggestionSuccess,
  postUserSuggestionFailure,
  sendUserLinkSuccess,
  sendUserLinkFailure,
  postTeamSuggestionSuccess,
  postTeamSuggestionFailure,
  postAddUserTeamMemberSuccess,
  postAddUserTeamMemberFailure,
} from '../actions/UserLinkedActions';
import { Alert } from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import { showAlert } from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* getUserLinkedList(action) {
  try {
    const data = yield call(
      securePostAuthFormData,
      CONST.API_GET_LINKED_TEAM_LIST,
      false,
    );
    // console.log('API_GET_LINKED_TEAM_LIST data', data);
    if (data.status !== 0) {
      yield put(getLinkedTeamSuccess(data));
    } else {
      // Alert.alert(data.message);
      yield put(getLinkedTeamFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getLinkedTeamFailure(error));
  }
}

export function* postUserProfileFilterApi(action) {
  // console.log('postUserProfileFilterApi action', action);
  var formData = new FormData();
  formData.append('username', action.payload.username);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_POST_USER_PROFILE_FILTER,
      formData,
      false,
    );
    // console.log('postUserProfileFilterApi data', data);
    if (data.status != 0) {
      yield put(postUserFilterSuccess(data));
      //   Alert.alert(data.message)
    } else {
      Alert.alert(data.message);
      yield put(postUserFilterFailure(data.message));
    }
  } catch (error) {
    console.log('postUserProfileFilterApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postUserFilterFailure(error));
  }
}

export function* postSuggestionApi(action) {
  // console.log('postSuggestionApi action', action);
  var formData = new FormData();
  formData.append('username', action.payload);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_POST_USER_SUGGESTION,
      formData,
      false,
    );
    // console.log('postSuggestionApi data', data);
    if (data.status != 0) {
      yield put(postUserSuggestionSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert("Something went wrong");
      yield put(postUserSuggestionFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postUserSuggestionFailure(error));
  }
}

export function* linkSendApi(action) {
  // console.log('linkSendApi action', action);
  var formData = new FormData();
  formData.append('user_id', action.payload);
  // formData.append('status', action.payload.status)
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_POST_SEND_LINK,
      formData,
      false,
    );
    // console.log('linkSendApi data', data);
    // console.log('linkSendApi formdata', formData);
    if (data.status != 0) {
      yield put(sendUserLinkSuccess(data));
      // Alert.alert(data.message)
    } else {
      Alert.alert('Something went wrong');
      yield put(sendUserLinkFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(sendUserLinkFailure(error));
  }
}

export function* postTeamSuggetion(action) {
  // console.log('postTeamSuggetion action', action);
  var formData = new FormData();
  formData.append('username', action.payload);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'usersTeamMemberSuggest',
      formData,
      false,
    );
    // console.log('postTeamSuggetion data', data);
    if (data.status != 0) {
      yield put(postTeamSuggestionSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert("Something went wrong");
      yield put(postTeamSuggestionFailure(data));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postTeamSuggestionFailure(error));
  }
}

export function* postAddUserTeamMember(action) {
  // console.log('postAddUserTeamMember action', action);
  var formData = new FormData();
  formData.append('linkuser_id', action.payload.linkuser_id);
  formData.append('team_status', action.payload.team_status);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'AddUserTeammember',
      formData,
      false,
    );
    // console.log('postAddUserTeamMember data', data);
    if (data.status != 0) {
      yield put(postAddUserTeamMemberSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert("Something went wrong");
      yield put(postAddUserTeamMemberFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('AddUserEducationApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postAddUserTeamMemberFailure(error));
  }
}
