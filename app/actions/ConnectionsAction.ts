import * as CONST from '../utils/Constants';

// -----usersLinkconnectListMutual Api----- //
export function getConnectionMutualList() {
  return {
    type: CONST.GET_CONNECTION_MUTUAL_LIST,
    payload: '',
  };
}
export function getConnectionMutualListSuccess(data) {
  return {
    type: CONST.GET_CONNECTION_MUTUAL_LIST_SUCCESS,
    payload: data,
  };
}
export function getConnectionMutualListFailure(error) {
  return {
    type: CONST.GET_CONNECTION_MUTUAL_LIST_FAILED,
    payload: error,
  };
}

// -----inviteToPitchLinkconnectList Api----- //
export function getinviteToPitchLinkconnectList() {
  return {
    type: CONST.GET_INVITE_CONNECTION_LIST,
    payload: '',
  };
}
export function getinviteToPitchLinkconnectListuccess(data) {
  return {
    type: CONST.GET_INVITE_CONNECTION_LIST_SUCCESS,
    payload: data,
  };
}
export function inviteToPitchLinkconnectListFailure(error) {
  return {
    type: CONST.GET_INVITE_CONNECTION_LIST_FAILED,
    payload: error,
  };
}

// -----PeopleWithSharedInsights Api----- //
export function getPeopleWithSharedInsightsList() {
  return {
    type: CONST.GET_SHARED_INSIGHT_LIST,
    payload: '',
  };
}
export function getPeopleWithSharedInsightsListuccess(data) {
  return {
    type: CONST.GET_SHARED_INSIGHT_LIST_SUCCESS,
    payload: data,
  };
}
export function getPeopleWithSharedInsightsListFailure(error) {
  return {
    type: CONST.GET_SHARED_INSIGHT_LIST_FAILED,
    payload: error,
  };
}

// -----recommendedConnectionList Api----- //
export function getrecommendedConnectionList() {
  return {
    type: CONST.GET_RECOMMENDED_LIST,
    payload: '',
  };
}
export function getrecommendedConnectionListuccess(data) {
  return {
    type: CONST.GET_RECOMMENDED_LIST_SUCCESS,
    payload: data,
  };
}
export function getrecommendedConnectionListFailure(error) {
  return {
    type: CONST.GET_RECOMMENDED_LIST_FAILED,
    payload: error,
  };
}

// ----- post enduserLinkconnectListMutual Api----- //
export function postenduserLinkconnectList(addList) {
  return {
    type: CONST.POST_END_USER_CONNECTION_LINK,
    payload: addList,
  };
}
export function postenduserLinkconnectListSuccess(data) {
  return {
    type: CONST.POST_END_USER_CONNECTION_LINK_SUCCESS,
    payload: data,
  };
}
export function postenduserLinkconnectListFailure(error) {
  return {
    type: CONST.POST_END_USER_CONNECTION_LINK_FAILED,
    payload: error,
  };
}
