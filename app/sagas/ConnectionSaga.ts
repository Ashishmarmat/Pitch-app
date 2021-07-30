import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, secureUploadProfile} from '../utils/SendJSON';
import {
  getConnectionMutualListSuccess,
  getConnectionMutualListFailure,
  getinviteToPitchLinkconnectListuccess,
  inviteToPitchLinkconnectListFailure,
  getPeopleWithSharedInsightsListuccess,
  getPeopleWithSharedInsightsListFailure,
  postenduserLinkconnectListSuccess,
  postenduserLinkconnectListFailure,
  getrecommendedConnectionListuccess,
  getrecommendedConnectionListFailure,
} from '../actions/ConnectionsAction';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

// -----get ConnectionMutualApi Call----- //
export function* getConnectionMutualApi(action) {
  try {
    let params = action.payload;
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_CONNECTIONMUTUAL_LIST,
      false,
    );
    console.log('getConnectionMutualApi res', data);
    if (data.status !== 0) {
      yield put(getConnectionMutualListSuccess(data));
    } else {
      yield put(getConnectionMutualListFailure(data.message));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getConnectionMutualListFailure(error));
  }
}

// -----get inviteToPitchLinkconnectList Call----- //
export function* getInviteToPitchConnectionApi(action) {
  try {
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_INVITECONNECTION_LIST,
      false,
    );
    console.log('getInviteToPitchConnectionApi res', data);
    if (data.status !== 0) {
      yield put(getinviteToPitchLinkconnectListuccess(data));
    } else {
      yield put(getinviteToPitchLinkconnectListuccess(data));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(inviteToPitchLinkconnectListFailure(error));
  }
}

// -----get PeopleWithSharedInsights Call----- //
export function* getSharedInsightListApi(action) {
  try {
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_PEOPLE_SHAREDINSIGHT_LIST,
      false,
    );
    console.log('getSharedInsightListApi res', data);
    if (data.status !== 0) {
      yield put(getPeopleWithSharedInsightsListuccess(data));
    } else {
      yield put(getPeopleWithSharedInsightsListuccess(data));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getPeopleWithSharedInsightsListFailure(error));
  }
}

// -----get recommendedConnectionList Call----- //
export function* getRecommendedListApi(action) {
  console.log('getRecommendedListApi Called');
  try {
    const data = yield call(
      secureGetAuthFormData,
      CONST.API_GET_RECOMMENDED_LIST,
      false,
    );
    console.log('getRecommendedListApi res.......', data);
    if (data.status !== 0) {
      yield put(getrecommendedConnectionListuccess(data));
    } else {
      yield put(getrecommendedConnectionListuccess(data));
    }
  } catch (error) {
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getrecommendedConnectionListFailure(error));
  }
}

// -----Post enduserLinkconnectListMutual----- //

export function* enduserLinkconnectListMutualApi(action) {
  console.log('enduserLinkconnectListMutualApi action', action);
  var formData = new FormData();
  formData.append('user_id', action.payload.user_id);

  console.log('formData', formData);
  try {
    const data = yield call(
      secureUploadProfile,
      CONST.API_POST_END_USER_LINK_MUTUAL,
      formData,
      false,
    );
    console.log('enduserLinkconnectListMutualApi data', data);
    if (data.status != 0) {
      yield put(postenduserLinkconnectListSuccess(data));
      //   Alert.alert(data.message)
    } else {
      // Alert.alert(data.message);
      yield put(postenduserLinkconnectListFailure(data.message));
    }
  } catch (error) {
    console.log('postenduserLinkconnectListFailure error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(postenduserLinkconnectListFailure(error));
  }
}
