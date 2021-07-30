import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  newuserFeedListSuccess,
  newuserFeedListFailure,
} from '../actions/NewFeedListAction';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* newFeedList(action) {
  console.log('newFeedList action', action);
  var formData = new FormData();
  formData.append('offset', action.payload.offset);
  formData.append('limit', action.payload.limit);

  console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_NEW_FEED_POSTS,
      formData,
      false,
    );
    console.log('newFeedList data', data);
    if (data.status === 1) {
      yield put(newuserFeedListSuccess(data));
      //   Alert.alert(data.message)
    } else {
      Alert.alert(data.message);
      yield put(newuserFeedListFailure(data.message));
    }
  } catch (error) {
    console.log('newFeedList Api error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(newuserFeedListFailure(error));
  }
}
