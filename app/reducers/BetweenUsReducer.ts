import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function BetweenUsReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.BETWEEN_US_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.BETWEEN_US_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.BETWEEN_US:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
