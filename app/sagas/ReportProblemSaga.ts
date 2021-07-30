import {put, call} from 'redux-saga/effects';
import {securePostAuthFormData} from '../utils/SendJSON';
import {
  ReportProblemFailure,
  ReportProblemSuccess,
} from '../actions/ReportProblem';
import {showAlert} from '../utils/AlertUtils';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* ReportProblemSaga(action) {
  // console.log('data111', action.payload);
  try {
    let params = action.payload;
    var formData = new FormData();
    formData.append('report', params.report);
    const data = yield call(
      securePostAuthFormData,
      'userAppReport',
      formData,
      false,
    );
    // console.log('ReportProblem data', data);
    if (data.status !== 0) {
      showAlert(data.message);
      yield put(ReportProblemSuccess(data));
    } else {
      showAlert(data.message);
      yield put(ReportProblemFailure(data.message));
    }
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      showAlert(error.toString());
    }
    yield put(ReportProblemFailure(error));
  }
}
