import {put, call} from 'redux-saga/effects';
import {securePost, tokenAuth} from '../utils/SendJSON';
import {userLoginFailure, userLoginSuccess} from '../actions/LoginActions';
import * as CONST from '../utils/Constants';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {log} from '../utils/CommonUtils';
import NavigationService from '../services/NavigationService';
import getProfileSuccess from '../actions/ProfileActions';
import shareMomentsSuccess from '../actions/ShareMoments';
import badgessSuccess from '../actions/BadgesActions';
import {
  getEducationListSuccess,
  addUserEducationSuccess,
} from '../actions/EducationActions';
import {workListSuccess} from '../actions/WorkList';
import {TeamListSuccess} from '../actions/TeamListAction';
import {feedPostSuccess} from '../actions/FeedPostAction';
import {workWithMeSuccess} from '../actions/WorkWithMeAction';
import {chatlistSuccess, chatHistorySuccess} from '../actions/MessagesAction';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* userLogin(action) {
  let params = {
    email: action.payload.email,
    password: action.payload.password,
    device_id: action.payload.fcmToken,
  };
  // Alert.alert(action.payload.fcmToken);
  // log('userLogin data', params);
  try {
    const data = yield call(securePost, CONST.API_LOGIN, params, false);
    if (data.status !== 0) {
      // log('userLogin data', data);
      Alert.alert(data.message);
      // console.log('mmmmssggg', data.message);
      tokenAuth(data.data.Authorization);
      yield AsyncStorage.setItem(CONST.AUTHORIZATION, data.data.Authorization);
      yield AsyncStorage.setItem(CONST.USER_EMAIL, data.data.email);
      yield AsyncStorage.setItem(CONST.USER_FIRSTNAME, data.data.first_name);
      yield AsyncStorage.setItem(CONST.USER_LASTNAME, data.data.last_name);
      yield AsyncStorage.setItem(CONST.USER_ID, data.data.user_id);

      // yield put(getProfileSuccess());
      yield AsyncStorage.setItem('AutoLogin', '1');
      NavigationService.navigateAndReset('HomeScreen');
      yield put(userLoginSuccess(data));
      yield put(getProfileSuccess());
      yield put(shareMomentsSuccess());
      yield put(badgessSuccess());
      yield put(getEducationListSuccess());
      yield put(addUserEducationSuccess());
      yield put(workListSuccess());
      yield put(TeamListSuccess());
      yield put(feedPostSuccess());
      yield put(workWithMeSuccess());
      yield put(chatlistSuccess());
      yield put(chatHistorySuccess());
    } else {
      Alert.alert(data.message);
      yield put(userLoginFailure(data.message));
    }
  } catch (error) {
    console.log('userLogin error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(userLoginFailure(error));
  }
}
