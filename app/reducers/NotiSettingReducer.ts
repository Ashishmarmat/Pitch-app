import * as CONST from '../utils/Constants';

const initialState = {
  data: null,
  loader: false,
};

export default function NotiSettingReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.NOTI_SETTING_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loader: false,
      };
    case CONST.NOTI_SETTING_FAILURE:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case CONST.NOTI_SETTING:
      return {
        ...state,
        loader: true,
      };
    default:
      return state;
  }
}
