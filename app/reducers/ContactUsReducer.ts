import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function ContactUsReducer(state = initialState, action) {
  // console.log("action@@@",action)
  switch (action.type) {
    case CONST.CONTACTUS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.CONTACTUS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.CONTACTUS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
