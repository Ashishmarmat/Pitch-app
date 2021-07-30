import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  suggestBadgesFailure,
  suggestBadgesSuccess,
} from '../actions/BadgeSuggestAction';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import {Alert} from 'react-native';
import showToast from '../utils/ShowToast';

export function* suggestBadges(action) {
  // console.log('22action', action.payload);
  var formData = new FormData();
  formData.append('badge_suggest_name', action.payload.suggestedBadge);
  // console.log('formData data', formData);
  try {
    const data = yield call(
      securePostAuthFormData,
      CONST.API_SUGGEST_BADGES,
      formData,
      false,
    );
    // console.log('suggestBadges data', data);
    if (data.status != 0) {
      Alert.alert(data.message);
      yield put(suggestBadgesSuccess(data));
    } else {
      Alert.alert(data.message);
      yield put(suggestBadgesFailure(data.message));
    }
  } catch (error) {
    // console.log('suggestBadges erorr');
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(suggestBadgesFailure(error));
  }
}
