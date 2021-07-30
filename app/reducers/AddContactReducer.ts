import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function AddContactReducer(state = initialState, action) {
  // console.log("AddContactReducer action@@@",action)
  switch (action.type) {
    case CONST.ADD_CONTACTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.ADD_CONTACTS_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.ADD_CONTACTS:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
