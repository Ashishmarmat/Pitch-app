import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function deleteChatReducer(state = initialState, action) {
  // console.log("action@@@",action)
  switch (action.type) {
    case CONST.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.DELETE_CHAT_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.DELETE_CHAT:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
