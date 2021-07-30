import * as CONST from '../utils/Constants';

const initialState = {
  createRoomData: {},
  chatHistoryData: {},
  chatListData: {},
  messageCountRes: '',
  notifyDeleteRes: {},
  ActiveStateRes:''
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Messages action", action)
  switch (action.type) {
    case CONST.POST_CREATE_ROOM_SUCCESS:
      return {
        ...state,
        createRoomData: action.payload,
        loader: false,
      };
    case CONST.POST_CREATE_ROOM_FAILED:
      return {
        ...state,
        createRoomData: action.data,
        loader: false,
      };
    case CONST.POST_CREATE_ROOM:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        chatHistoryData: action.payload,
        loader: false,
      };
    case CONST.POST_CHAT_HISTORY_FAILED:
      return {
        ...state,
        chatHistoryData: action.data,
        loader: false,
      };
    case CONST.POST_CHAT_HISTORY:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatListData: action.payload,
        loader: false,
      };
    case CONST.POST_CHAT_LIST_FAILED:
      return {
        ...state,
        chatListData: action.data,
        loader: false,
      };
    case CONST.POST_CHAT_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.MESSAGE_COUNT:
      return {
        ...state,
        loader: false,
        messageCountRes: action.payload,
      };

    case CONST.POST_DELETE_NOTIFY_SUCCESS:
      return {
        ...state,
        notifyDeleteRes: action.payload,
        loader: false,
      };
    case CONST.POST_DELETE_NOTIFY_FAILED:
      return {
        ...state,
        notifyDeleteRes: action.data,
        loader: false,
      };
    case CONST.POST_DELETE_NOTIFY:
      return {
        ...state,
        loader: true,
      };

      case CONST.ACTIVESTATE:
      return {
        ...state,
        ActiveStateRes: action.payload,
        loader: false,
      };
    default:
      return state;
  }
}
