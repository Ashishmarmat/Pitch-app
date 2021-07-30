import { put, call } from 'redux-saga/effects';
import { getCountriesSuccess, getCountriesFailure, getStatesSuccess, getStatesFailure, getCitiesSuccess, getCitiesFailure } from '../actions/LocationActions';
import { securePost, secureGet } from '../utils/SendJSON';
import {showAlert} from '../utils/AlertUtils';
import showToast from '../utils/ShowToast';

export function* getCountries(action) {
  // console.log('getCountries', action);
  try {
    const data = yield call(
      secureGet,
      '/get_countries_new',
      action.payload,
      false,
    );
    // console.log('getCountries data', action);
    // console.log('getCountries data', data);
    yield put(getCountriesSuccess(data));
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getCountriesFailure(error));
  }
}

export function* getStates(action) {
  try {
    const path = 'get_states_new';
    // console.log('getStates data', action.payload);
    const data = yield call(securePost, path, action.payload, false);
    // console.log('getStates data', data);
    // alert(data.message);
    yield put(getStatesSuccess(data));
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getStatesFailure(error));
  }
}
export function* getCities(action) {
  try {
    const path = 'get_cities_new';
    const data = yield call(securePost, path, action.payload, false);
    // console.log('getCities data', data);
    yield put(getCitiesSuccess(data));
  } catch (error) {
    if (error.message === 'Network request failed') {
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(getCitiesFailure(error));
  }
}
