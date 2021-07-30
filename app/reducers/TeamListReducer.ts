import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function TeamListReducer(state = initialState, action) {
  // console.log("TeamList Actions", action)
  // console.log("TeamList type", action.type)
  switch (action.type) {
    case CONST.GET_TEAM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.GET_TEAM_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.GET_TEAM:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
