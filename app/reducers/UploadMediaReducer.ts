import * as CONST from '../utils/Constants';

const initialState = {
  isLoading: false,
  mediaResponse: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("action upload media", action)
  switch (action.type) {
    case CONST.UPLOAD_MEDIA_REQUEST:
      return {
        ...state,
        isLoading: true,
        mediaResponse: {},
      };
    case CONST.UPLOAD_MEDIA_SUCCESS:
      return {
        ...state,
        mediaResponse: action.payload.data,
        isLoading: false,
      };
    case CONST.UPLOAD_MEDIA_FAILURE:
      return {
        ...state,
        isLoading: false,
        mediaResponse: {},
      };

    default:
      return state;
  }
}
