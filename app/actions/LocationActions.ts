import * as CONST from '../utils/Constants';

export function getCountriesRequest(data) {
  return {
    type: CONST.GET_COUNTRIES_REQUEST,
    payload: data,
  };
}
export function getCountriesSuccess(data) {
  return {
    type: CONST.GET_COUNTRIES_SUCCESS,
    payload: data,
  };
}
export function getCountriesFailure(error) {
  return {
    type: CONST.GET_COUNTRIES_FAILED,
    payload: error,
  };
}

export function getStatesRequest(payload) {
  return {
    type: CONST.GET_STATES_REQUEST,
    payload,
  };
}
export function getStatesSuccess(data) {
  return {
    type: CONST.GET_STATES_SUCCESS,
    payload: data,
  };
}
export function getStatesFailure(error) {
  return {
    type: CONST.GET_STATES_FAILED,
    payload: error,
  };
}

export function getCitiesRequest(payload) {
  return {
    type: CONST.GET_CITIES_REQUEST,
    payload,
  };
}
export function getCitiesSuccess(data) {
  return {
    type: CONST.GET_CITIES_SUCCESS,
    payload: data,
  };
}
export function getCitiesFailure(error) {
  return {
    type: CONST.GET_CITIES_FAILED,
    payload: error,
  };
}
