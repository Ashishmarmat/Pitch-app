import * as CONST from '../utils/Constants';

const initialState = {
  getCurrentMutualList: {},
  getInviteConnectList: {},
  getSharedInsightList: {},
  getRecommendedList: {},
  postUserLinkedList: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Certificate action", action)
  switch (action.type) {
    case CONST.GET_CONNECTION_MUTUAL_LIST_SUCCESS:
      return {
        ...state,
        getCurrentMutualList: action.payload,
        loader: false,
      };
    case CONST.GET_CONNECTION_MUTUAL_LIST_FAILED:
      return {
        ...state,
        getCurrentMutualList: action.data,
        loader: false,
      };
    case CONST.GET_CONNECTION_MUTUAL_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_INVITE_CONNECTION_LIST_SUCCESS:
      return {
        ...state,
        getInviteConnectList: action.payload,
        loader: false,
      };
    case CONST.GET_INVITE_CONNECTION_LIST_FAILED:
      return {
        ...state,
        getInviteConnectList: action.data,
        loader: false,
      };
    case CONST.GET_INVITE_CONNECTION_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_SHARED_INSIGHT_LIST_SUCCESS:
      return {
        ...state,
        getSharedInsightList: action.payload,
        loader: false,
      };
    case CONST.GET_SHARED_INSIGHT_LIST_FAILED:
      return {
        ...state,
        getSharedInsightList: action.data,
        loader: false,
      };
    case CONST.GET_SHARED_INSIGHT_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_RECOMMENDED_LIST_SUCCESS:
      return {
        ...state,
        getRecommendedList: action.payload,
        loader: false,
      };
    case CONST.GET_RECOMMENDED_LIST_FAILED:
      return {
        ...state,
        getRecommendedList: action.data,
        loader: false,
      };
    case CONST.GET_RECOMMENDED_LIST:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_END_USER_CONNECTION_LINK_SUCCESS:
      return {
        ...state,
        postUserLinkedList: action.payload,
        loader: false,
      };
    case CONST.POST_END_USER_CONNECTION_LINK_FAILED:
      return {
        ...state,
        postUserLinkedList: action.data,
        loader: false,
      };
    case CONST.POST_END_USER_CONNECTION_LINK:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
