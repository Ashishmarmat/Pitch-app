import {put, call} from 'redux-saga/effects';
import {
  signUpSuccess,
  signUpFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  resendOtpSuccess,
  resendOtpFailure,
  updateProfileSuccess,
  updateProfileFailure,
  emailcheckSuccess,
  emailcheckFailure,
  checkPhoneExistSuccess,
  checkPhoneExistFailure,
  badgesStatusSuccess,
  badgesStatusFailure,
} from '../actions/SignUpAction';
import {
  securePostFormData,
  securePost,
  tokenAuth,
  secureUploadProfile,
  secureFcmFormData,
} from '../utils/SendJSON';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as CONST from '../utils/Constants';
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
import showToast from '../utils/ShowToast';
import {showAlert} from '../utils/AlertUtils';
// import Loader from '../components/atoms/Loader';

export function* userSignUp(action) {
  // console.log('userSignUp demo data111', action.payload);
  // console.log('userSignUp action', action);
  var formData = new FormData();
  formData.append('full_name', action.payload.full_name);
  formData.append('email', action.payload.email);
  formData.append('password', action.payload.password);
  formData.append('phone', action.payload.phone);
  formData.append('dob', action.payload.dob);
  formData.append('pronoun', action.payload.pronoun);
  formData.append('work', action.payload.work);
  formData.append('job_title', action.payload.job_title);
  formData.append('last_school', action.payload.last_school);
  formData.append('city', action.payload.city.id);
  formData.append('state', action.payload.state.id);
  formData.append('country', action.payload.country.id);
  formData.append('mobile_verify', 'Yes');
  formData.append('profile_pic', '');
  formData.append('signup_type', action.payload.signup_type);
  formData.append('apple_user_id', action.payload.apple_user_id);
  formData.append('device_id', action.payload.device_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureFcmFormData,
      'register_new_user',
      action.payload.device_id,
      formData,
      false,
    );
    // console.log('userSignUp demo data', action.payload);
    // console.log('userSignUp data', data);
    if (data.status != 0) {
      tokenAuth(data.data.Authorization);
      yield AsyncStorage.setItem(CONST.AUTHORIZATION, data.data.Authorization);
      yield AsyncStorage.setItem(CONST.USER_FIRSTNAME, data.data.first_name);
      yield AsyncStorage.setItem(CONST.USER_LASTNAME, data.data.last_name);
      yield AsyncStorage.setItem(CONST.USER_ID, data.data.id);
      yield AsyncStorage.setItem('AutoLogin', '1');
      yield put(signUpSuccess(data));
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

    //  NavigationService.navigateAndReset('MakeYourPitchScreen');
    } else {
      Alert.alert(data.message);
      yield put(signUpFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('userSignUp error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(signUpFailure(error));
  }
}

export function* verifyOtp(action) {
  try {
    const path = 'verify_otp';
    // console.log('verifyOtp data', action.payload);
    const data = yield call(securePost, path, action.payload, false);
    // console.log('verifyOtp data', data);
    // Alert.alert(data.message);
    yield put(verifyOtpSuccess(data));
  } catch (error) {
    console.log('verifyOtp error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(verifyOtpFailure(error));
  }
}

export function* resendOtp(action) {
  try {
    const path = 'send_otp';
    let params = {
      type: action.payload.type,
      source: action.payload.source,
    };

    const data = yield call(securePost, path, params, false);
    // console.log('resendOtp data', data);
    yield put(resendOtpSuccess(data));
    // Alert.alert(data.message);
  } catch (error) {
    console.log('resendOtp error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(resendOtpFailure(error));
  }
}

export function* updateProfile(action) {
  // console.log('updateProfile demo data', action.payload);
  // console.log('updateProfile action', action);
  var formData = new FormData();
  formData.append('full_name', action.payload.full_name);
  formData.append('phone', action.payload.phone);
  formData.append('dob', action.payload.dob);
  formData.append('pronoun', action.payload.pronoun);
  formData.append('work', action.payload.work);
  formData.append('job_title', action.payload.job_title);
  formData.append('last_school', action.payload.last_school);
  formData.append('city_id', action.payload.city);
  formData.append('state_id', action.payload.state);
  formData.append('country_id', action.payload.country);
  formData.append('profile_pic', action.payload.profile_pic);
  formData.append('user_cover_img', action.payload.user_cover_img);
  formData.append('tagline_id', action.payload.tagline_id);
  formData.append('tagline_data', action.payload.tagline_data);
  formData.append('device_id', action.payload.device_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'profile_update_new',
      formData,
      false,
    );
    // console.log('updateProfile demo data', action.payload);
    // console.log('updateProfile data', data);
    if (data.status != 0) {
      yield put(updateProfileSuccess(data));
      Alert.alert(data.message);
    } else {
      Alert.alert('Something went wrong');
      yield put(updateProfileFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('updateProfile error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(updateProfileFailure(error));
  }
}

export function* checkEmailApi(getData) {
  // console.log('checkEmailApi action', getData);
  const email = getData.payload.email;
  const name = getData.payload.name;
  const signup_type = getData.payload.signup_type;
  var formData = new FormData();
  formData.append('email', getData.payload.email);

  // console.log('checkEmailApi formData', formData);
  try {
    const data = yield call(
      securePostFormData,
      'userEmailExits',
      formData,
      false,
    );
    console.log('checkEmailApi data', data);
    if (data.response_code === 200) {
      yield put(emailcheckSuccess(data));
      NavigationService.navigate('CreateSignupPassword', {
        email,
        name,
        signup_type,
      });
    } else {
      Alert.alert(data.message);
      yield put(emailcheckFailure(data.message));
    }
  } catch (error) {
    console.log('checkEmailApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(emailcheckFailure(error));
  }
}

export function* checkPhoneExistApi(getData) {
  // console.log('checkPhoneExistApi action', getData);
  const number = Number(getData.payload);
  console.log('Number', number);
  var formData = new FormData();
  formData.append('phone', number);

  // console.log('checkPhoneExistApi formData', formData);
  try {
    const data = yield call(
      securePostFormData,
      'userPhoneExits',
      formData,
      false,
    );
    // console.log('checkPhoneExistApi data', data);
    if (data.response_code === 200) {
      yield put(checkPhoneExistSuccess(data));
    } else {
      Alert.alert(data.message);
      // yield put(checkPhoneExistFailure(data.message));
    }
  } catch (error) {
    console.log('checkEmailApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(checkPhoneExistFailure(error));
  }
}

export function* changeBadgestatusApi(action) {
  // console.log('changeBadgestatus demo data', action);
  // console.log('updateProfile action', action);
  var formData = new FormData();
  formData.append('status', action.payload.status);
  formData.append('bid', action.payload.bid);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_GET_BADGES_STATUS,
      formData,
      false,
    );
    // console.log('updateProfile demo data', action.payload);
    // console.log('changeBadgestatusApi data', data);
    if (data.status != 0) {
      yield put(badgesStatusSuccess(data));
      Alert.alert(data.message);
    } else {
      Alert.alert('Something went wrong');
      yield put(badgesStatusFailure('Something went wrong'));
    }
  } catch (error) {
    console.log('updateProfile error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(badgesStatusFailure(error));
  }
}

export function* socialLoginApi(action) {
  // console.log('socialLoginApi data', action);
  // console.log('updateProfile action', action);
  var formData = new FormData();
  formData.append('email', action.payload.email);
  formData.append('signup_type', action.payload.signup_type);
  formData.append('device_id', action.payload.device_id);
  console.log('formData', formData);

  try {
    const data = yield call(
      secureUploadProfile,
      'userSociallogin',
      formData,
      false,
    );
    // console.log('updateProfile demo data', action.payload);
    // console.log('socialLoginApi data', data);
    if (data.response_code === 200) {
      tokenAuth(data.data.Authorization);
      yield AsyncStorage.setItem(CONST.AUTHORIZATION, data.data.Authorization);
      yield AsyncStorage.setItem(CONST.USER_EMAIL, data.data.email);
      yield AsyncStorage.setItem(CONST.USER_FIRSTNAME, data.data.first_name);
      yield AsyncStorage.setItem(CONST.USER_LASTNAME, data.data.last_name);
      yield AsyncStorage.setItem(CONST.USER_ID, data.data.user_id);
      yield AsyncStorage.setItem('AutoLogin', '1');

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
      NavigationService.navigateAndReset('HomeScreen');
    } else if (data.response_code === 401) {
      NavigationService.navigate('AddPhoneScreen', {
        email: action.payload.email,
        name: action.payload.name,
        password: '',
        signup_type: action.payload.signup_type,
      });
    }
  } catch (error) {
    console.log('socialLoginApi error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(badgesStatusFailure(error));
  }
}

export function* appleLogin(action) {
  // console.log('appleLogin data', action);
  // console.log('updateProfile action', action);
  var formData = new FormData();
  formData.append('apple_user_id', action.payload.apple_user_id);
  formData.append('signup_type', action.payload.signup_type);
  formData.append('device_id', action.payload.device_id);
  // console.log('formData', formData);

  try {
    const data = yield call(
      secureUploadProfile,
      'userSocialloginApple',
      formData,
      false,
    );
    // console.log('updateProfile demo data', action.payload);
    // console.log('appleLogin data', data);
    if (data.response_code === 200) {
      tokenAuth(data.data.Authorization);
      yield AsyncStorage.setItem(CONST.AUTHORIZATION, data.data.Authorization);
      yield AsyncStorage.setItem(CONST.USER_EMAIL, data.data.email);
      yield AsyncStorage.setItem(CONST.USER_FIRSTNAME, data.data.first_name);
      yield AsyncStorage.setItem(CONST.USER_LASTNAME, data.data.last_name);
      yield AsyncStorage.setItem('AutoLogin', '1');

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
      NavigationService.navigateAndReset('HomeScreen');
    } 
    else if (data.response_code === 401) {
      NavigationService.navigate('AddPhoneScreen', {
        email: action.payload.email,
        name: action.payload.name,
        password: '',
        signup_type: action.payload.signup_type,
        apple_user_id: action.payload.apple_user_id,
      });
    }
  } catch (error) {
    console.log('appleLogin error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(badgesStatusFailure(error));
  }
}
