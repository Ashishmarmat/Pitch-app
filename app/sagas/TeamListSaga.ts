import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData} from '../utils/SendJSON';
import {TeamListFailure, TeamListSuccess} from '../actions/TeamListAction';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* TeamListGet(action) {
  try {
    let params = action.payload;
    const data = yield call(secureGetAuthFormData, CONST.API_GET_TEAM, false);
    console.log('Team data', data);
    if (data.status !== 0) {
      yield put(TeamListSuccess(data));
    } else {
      // showAlert(data.message);
      // yield put(TeamListFailure(data.message));
      yield put(TeamListSuccess(data));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(TeamListFailure(error));
  }
}
