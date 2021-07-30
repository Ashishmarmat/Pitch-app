import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  logoutMessage: '',
  user: null,
  getLinkedTeamList: {},
  postUserFilterList: {},
  postSuggestionList: {},
  postsendLink: {},
  teamSuggestionData: {},
  postAddTeamMember: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Linked Reducer action", action)
  switch (action.type) {
    case CONST.GET_LINKED_TEAM_SUCCESS:
      return {
        ...state,
        getLinkedTeamList: action.payload,
        loader: false,
      };
    case CONST.GET_LINKED_TEAM_FAILED:
      return {
        ...state,
        getLinkedTeamList: action.payload,
        loader: false,
      };
    case CONST.GET_LINKED_TEAM:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_USER_FILTER_SUCCESS:
      return {
        ...state,
        postUserFilterList: action.payload,
        loader: false,
      };
    case CONST.POST_USER_FILTER_FAILED:
      return {
        ...state,
        postUserFilterList: action.payload,
        loader: false,
      };
    case CONST.POST_USER_FILTER:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_USER_SUGGESTION_SUCCESS:
      return {
        ...state,
        postSuggestionList: action.payload,
        loader: false,
      };
    case CONST.POST_USER_SUGGESTION_FAILED:
      return {
        ...state,
        postSuggestionList: action.payload,
        loader: false,
      };
    case CONST.POST_USER_SUGGESTION:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_SEND_LINK_SUCCESS:
      return {
        ...state,
        postsendLink: action.payload,
        loader: false,
      };
    case CONST.POST_SEND_LINK_FAILED:
      return {
        ...state,
        postsendLink: action.payload,
        loader: false,
      };
    case CONST.POST_SEND_LINK:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_TEAM_SUGGESTION_SUCCESS:
      return {
        ...state,
        teamSuggestionData: action.payload,
        loader: false,
      };
    case CONST.POST_TEAM_SUGGESTION_FAILED:
      return {
        ...state,
        teamSuggestionData: action.payload,
        loader: false,
      };
    case CONST.POST_TEAM_SUGGESTION:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_ADD_USER_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        postAddTeamMember: action.payload,
        loader: false,
      };
    case CONST.POST_ADD_USER_TEAM_MEMBER_FAILED:
      return {
        ...state,
        postAddTeamMember: action.payload,
        loader: false,
      };
    case CONST.POST_ADD_USER_TEAM_MEMBER:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
