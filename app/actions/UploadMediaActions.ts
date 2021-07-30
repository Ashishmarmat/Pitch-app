import * as CONST from '../utils/Constants';

export function uploadMedia(data) {
  console.log('data', data);
  let body = new FormData();
  body.append('profile_file', {
    uri: data.uri,
    name: data.name,
    filename: data.filename,
    type: data.type,
  });
  return {
    type: CONST.UPLOAD_MEDIA_REQUEST,
    payload: body,
  };
}
export function uploadMediaSuccess(data) {
  return {
    type: CONST.UPLOAD_MEDIA_SUCCESS,
    payload: data,
  };
}
export function uploadMediaFailure(error) {
  return {
    type: CONST.UPLOAD_MEDIA_FAILURE,
    payload: error,
  };
}
