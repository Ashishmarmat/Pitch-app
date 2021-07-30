import * as CONST from '../utils/Constants';

export function getLinkedTeamsApi() {
  return {
    type: CONST.GET_LINKED_TEAM,
    payload: '',
  };
}
export function getLinkedTeamSuccess(data) {
  return {
    type: CONST.GET_LINKED_TEAM_SUCCESS,
    payload: data,
  };
}
export function getLinkedTeamFailure(error) {
  return {
    type: CONST.GET_LINKED_TEAM_FAILED,
    payload: error,
  };
}

export function postUserFilterApi(filterData) {
  return {
    type: CONST.POST_USER_FILTER,
    payload: filterData,
  };
}
export function postUserFilterSuccess(data) {
  return {
    type: CONST.POST_USER_FILTER_SUCCESS,
    payload: data,
  };
}
export function postUserFilterFailure(error) {
  return {
    type: CONST.POST_USER_FILTER_FAILED,
    payload: error,
  };
}

export function postUserSuggestionApi(suggestData) {
  return {
    type: CONST.POST_USER_SUGGESTION,
    payload: suggestData,
  };
}
export function postUserSuggestionSuccess(data) {
  return {
    type: CONST.POST_USER_SUGGESTION_SUCCESS,
    payload: data,
  };
}
export function postUserSuggestionFailure(error) {
  return {
    type: CONST.POST_USER_SUGGESTION_FAILED,
    payload: error,
  };
}

export function sendUserLinkApi(linkData) {
  return {
    type: CONST.POST_SEND_LINK,
    payload: linkData,
  };
}
export function sendUserLinkSuccess(data) {
  return {
    type: CONST.POST_SEND_LINK_SUCCESS,
    payload: data,
  };
}
export function sendUserLinkFailure(error) {
  return {
    type: CONST.POST_SEND_LINK_FAILED,
    payload: error,
  };
}

export function postTeamSuggestionApi(teamSuggestData) {
  return {
    type: CONST.POST_TEAM_SUGGESTION,
    payload: teamSuggestData,
  };
}
export function postTeamSuggestionSuccess(data) {
  return {
    type: CONST.POST_TEAM_SUGGESTION_SUCCESS,
    payload: data,
  };
}
export function postTeamSuggestionFailure(error) {
  return {
    type: CONST.POST_TEAM_SUGGESTION_FAILED,
    payload: error,
  };
}

export function postAddUserTeamMemberApi(teamMember) {
  return {
    type: CONST.POST_ADD_USER_TEAM_MEMBER,
    payload: teamMember,
  };
}
export function postAddUserTeamMemberSuccess(data) {
  return {
    type: CONST.POST_ADD_USER_TEAM_MEMBER_SUCCESS,
    payload: data,
  };
}
export function postAddUserTeamMemberFailure(error) {
  return {
    type: CONST.POST_ADD_USER_TEAM_MEMBER_FAILED,
    payload: error,
  };
}
