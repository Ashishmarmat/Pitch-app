import * as CONST from '../utils/Constants';

export default function ContactUs(data) {
  return {
    type: CONST.CONTACTUS,
    payload: data,
  };
}
export function ContactUsFailure(error) {
  return {
    type: CONST.CONTACTUS_FAILURE,
    payload: error,
  };
}

export function ContactUsSuccess(data) {
  return {
    type: CONST.CONTACTUS_SUCCESS,
    payload: data,
  };
}
