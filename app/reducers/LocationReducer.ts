import * as CONST from '../utils/Constants';

const initialState = {
  isCountryResponseLoading: false,
  isStatesResponseLoading: false,
  isCitiesResponseLoading: false,
  countriesResponse: {},
  statesResponse: {},
  citiesResponse: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  switch (action.type) {
    case CONST.GET_COUNTRIES_REQUEST:
      return {
        ...state,
        isCountryResponseLoading: true,
      };
    case CONST.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countriesResponse: action.payload.data,
        isCountryResponseLoading: false,
      };
    case CONST.GET_COUNTRIES_FAILED:
      return {
        ...state,
        isCountryResponseLoading: false,
      };
    case CONST.GET_STATES_REQUEST:
      return {
        ...state,
        isStatesResponseLoading: true,
      };
    case CONST.GET_STATES_SUCCESS:
      return {
        ...state,
        isStatesResponseLoading: false,
        statesResponse: action.payload.data,
      };
    case CONST.GET_STATES_FAILED:
      return {
        ...state,
        isStatesResponseLoading: false,
      };
    case CONST.GET_CITIES_REQUEST:
      return {
        ...state,
        isCitiesResponseLoading: true,
      };
    case CONST.GET_CITIES_SUCCESS:
      return {
        ...state,
        isCitiesResponseLoading: false,
        citiesResponse: action.payload.data,
      };
    case CONST.GET_CITIES_FAILED:
      return {
        ...state,
        isCitiesResponseLoading: false,
      };

    default:
      return state;
  }
}
