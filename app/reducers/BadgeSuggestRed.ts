import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function badgesSuggestReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.SUGGEST_BADGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.SUGGEST_BADGES_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.SUGGEST_BADGES:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
