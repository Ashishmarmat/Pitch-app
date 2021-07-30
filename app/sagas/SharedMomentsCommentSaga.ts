import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  getSharedMomentsCommentSuccess,
  getSharedMomentsCommentFailure,
  postSharedCommentsSuccess,
  postSharedCommentsFailure,
  postWorkingWithmeCommentsSuccess,
  postWorkingWithmeCommentsFailure,
  getworkwithmeCommentsSuccess,
  getworkwithmeCommentsFailure,
  likeOnSharedCommentsSuccess,
  likeOnSharedCommentsFailure,
  likeWorkingwithmeCommentsSuccess,
  likeWorkingwithmeCommentsFailure,
  getInsightPitchCommentFailure,
  getInsightPitchCommentSuccess,
  postInsightCommentFailure,
  postInsightCommentSuccess,
  likeInsightCommentsApiSuccess,
  likeInsightCommentsApiFailure,
  getBadgesCommentFailure,
  getBadgesCommentSuccess,
  postBadgesCommentFailure,
  postBadgesCommentSuccess,
  likeBadgesCommentsApiSuccess,
  likeBadgesCommentsApiFailure,
} from '../actions/SharedMomentsComments';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* getSharedMomentsCommentsCall(action) {
  // console.log('getSharedMomentsCommentsCall action', action);
  var formData = new FormData();
  formData.append('post_id', action.payload.post_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'getSharemomentComments',
      formData,
      false,
    );
    // console.log('getSharedMomentsCommentsCall data', data);
    if (data.status != 0) {
      yield put(getSharedMomentsCommentSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(getSharedMomentsCommentFailure(data.message));
    }
  } catch (error) {
    console.log('getSharedMomentsCommentFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getSharedMomentsCommentFailure(error));
  }
}

export function* postSharedComment(action) {
  // console.log('postSharedComment action', action);
  var formData = new FormData();
  formData.append('post_id', action.payload.post_id);
  formData.append('comment', action.payload.comment);
  formData.append('sender_user_id', action.payload.sender_user_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'dosharedmomentcomments',
      formData,
      false,
    );
    // console.log('dosharedmomentcomments data', formData);
    if (data.status != 0) {
      yield put(postSharedCommentsSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(postSharedCommentsFailure(data.message));
    }
  } catch (error) {
    console.log('getSharedMomentsCommentFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postSharedCommentsFailure(error));
  }
}

export function* getWorkWithMeCommentsData(action) {
  // console.log('getWorkWithMeCommentsData action', action);
  var formData = new FormData();
  formData.append('question_id', action.payload.question_id);
  formData.append('user_id', action.payload.user_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'getworkwithmeComments',
      formData,
      false,
    );
    // console.log('getWorkWithMeCommentsData data', data);
    if (data.status != 0) {
      yield put(getworkwithmeCommentsSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(getworkwithmeCommentsFailure(data.message));
    }
  } catch (error) {
    console.log('getworkwithmeCommentsFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getworkwithmeCommentsFailure(error));
  }
}

export function* postWorkingWithMeComments(action) {
  // console.log('postWorkingWithMeComments action', action);
  var formData = new FormData();
  formData.append('question_id', action.payload.question_id);
  formData.append('question_user_id', action.payload.question_user_id);
  formData.append('comment', action.payload.comment);

  // console.log('formData', formData);
  try {
    const data = yield call(secureUploadProfile, 'docomments', formData, false);
    // console.log('postWorkingWithMeComments data', data);
    if (data.status != 0) {
      yield put(postWorkingWithmeCommentsSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(postWorkingWithmeCommentsFailure(data.message));
    }
  } catch (error) {
    console.log('postWorkingWithmeCommentsFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postWorkingWithmeCommentsFailure(error));
  }
}

export function* likeOnSharedComments(action) {
  // console.log('likeOnSharedComments action', action);
  var formData = new FormData();
  formData.append('comment_id', action.payload.comment_id);

  // console.log('comment_id formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'sharedmomentlikecomments',
      formData,
      false,
    );
    // console.log('likeOnSharedComments data', data);
    if (data.status != 0) {
      yield put(likeOnSharedCommentsSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(likeOnSharedCommentsFailure(data.message));
    }
  } catch (error) {
    console.log('likeOnSharedCommentsFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeOnSharedCommentsFailure(error));
  }
}

export function* likeWorkingWithmeComments(action) {
  // console.log('likeWorkingWithmeComments action', action);
  var formData = new FormData();
  formData.append('comment_id', action.payload.comment_id);

  // console.log('likeWorkingWithmeComments formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'workWithmelikecomments',
      formData,
      false,
    );
    // console.log('likeWorkingWithmeComments data', data);
    if (data.status != 0) {
      yield put(likeWorkingwithmeCommentsSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(likeWorkingwithmeCommentsFailure(data.message));
    }
  } catch (error) {
    console.log('likeWorkingwithmeCommentsFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeWorkingwithmeCommentsFailure(error));
  }
}
/////////////////////

export function* getInsightCommentsSaga(action) {
  // console.log('getInsightCommentsSaga action', action);
  var formData = new FormData();
  formData.append('post_id', action.payload.post_id);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'getinsightpostComments',
      formData,
      false,
    );
    // console.log('getInsightCommentsSaga data', data);
    if (data.status != 0) {
      yield put(getInsightPitchCommentSuccess(data));
      // Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(getInsightPitchCommentFailure(data.message));
    }
  } catch (error) {
    console.log('getInsightPitchCommentFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getInsightPitchCommentFailure(error));
  }
}

export function* postInsightCommentSaga(action) {
  // console.log('postSharedComment action', action);
  var formData = new FormData();
  formData.append('post_id', action.payload.post_id);
  formData.append('comment', action.payload.comment);

  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'doinsightpostcomments',
      formData,
      false,
    );
    // console.log('doinsightpostcomments data', data);
    if (data.status != 0) {
      yield put(postInsightCommentSuccess(data));
      // Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(postInsightCommentFailure(data.message));
    }
  } catch (error) {
    console.log('postInsightCommentFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postInsightCommentFailure(error));
  }
}

export function* likeInsightComments(action) {
  // console.log('likeInsightComments action', action);
  var formData = new FormData();
  formData.append('comment_id', action.payload.comment_id);

  // console.log('likeInsightComments formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'insightpostlikecomments',
      formData,
      false,
    );
    // console.log('likeInsightComments data', data);
    if (data.status != 0) {
      yield put(likeInsightCommentsApiSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(likeInsightCommentsApiFailure(data.message));
    }
  } catch (error) {
    console.log('likeInsightCommentsApiFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeInsightCommentsApiFailure(error));
  }
}

/////////badges//////

export function* getBadgesCommentsSaga(action) {
  // console.log('getInsightCommentsSaga action', action);
  var formData = new FormData();
  formData.append('badges_id', action.payload.badges_id);
  formData.append('user_id', action.payload.user_id);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'getbadgesComments',
      formData,
      false,
    );
    // console.log('getBadgesCommentsSaga data', data);
    if (data.status != 0) {
      yield put(getBadgesCommentSuccess(data));
      // Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(getBadgesCommentFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getBadgesCommentFailure(error));
  }
}

export function* postBadgesCommentSaga(action) {
  // console.log('postBadgesCommentSaga action', action);
  var formData = new FormData();
  formData.append('badges_id', action.payload.badges_id);
  formData.append('user_id', action.payload.user_id);
  formData.append('comment', action.payload.comment);
  // console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'docommentsbadges',
      formData,
      false,
    );
    // console.log('postBadgesCommentSaga formData', formData);
    // console.log('postBadgesCommentSaga data', data);
    if (data.status != 0) {
      yield put(postBadgesCommentSuccess(data));
      // Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(postBadgesCommentFailure(data.message));
    }
  } catch (error) {
    // console.log('postBadgesCommentFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postBadgesCommentFailure(error));
  }
}

export function* likeBadgesComments(action) {
  // console.log('likeInsightComments action', action);
  var formData = new FormData();
  formData.append('comment_id', action.payload.comment_id);

  // console.log('likecommentsbadges formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      'likecommentsbadges',
      formData,
      false,
    );
    // console.log('likecommentsbadges data', data);
    if (data.status != 0) {
      yield put(likeBadgesCommentsApiSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(likeBadgesCommentsApiFailure(data.message));
    }
  } catch (error) {
    console.log('likeBadgesCommentsApiFailure error', error);
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(likeBadgesCommentsApiFailure(error));
  }
}
