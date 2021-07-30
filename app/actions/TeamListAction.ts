import * as CONST from '../utils/Constants';

export default function GetTeamListApi() {
  return {
    type: CONST.GET_TEAM,
    payload: '',
  };
}
export function TeamListFailure(error) {
  return {
    type: CONST.GET_TEAM_FAILURE,
    payload: error,
  };
}

export function TeamListSuccess(data) {
  return {
    type: CONST.GET_TEAM_SUCCESS,
    payload: data,
  };
}
