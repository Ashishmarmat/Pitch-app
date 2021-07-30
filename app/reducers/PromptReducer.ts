import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  error: '',
  loader: false,
};

// This reducer stores the status of forgot password related stuff.
export default function promptReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.SAVE_PRMPT_CALL:
      return {...state, loader: true};
    case CONST.SAVE_PRMPT_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: '',
        loader: false,
      };
    case CONST.SAVE_PRMPT_FAILURE:
      return {
        ...state,
        error: '',
        loader: false,
      };

    default:
      return state;
  }
}
