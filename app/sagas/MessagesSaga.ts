import {put, call} from 'redux-saga/effects';
import {secureGetAuthFormData, SecuremessagePost} from '../utils/SendJSON';
import {
  createRoomFailure,
  createRoomSuccess,
  chatHistoryFailure,
  chatHistorySuccess,
  chatlistFailure,
  chatlistSuccess,
  deleteNotifySuccess,
  deleteNotifyFailure,
} from '../actions/MessagesAction';
import {showAlert} from '../utils/AlertUtils';
import {Alert} from 'react-native';
import * as CONST from '../utils/Constants';
import NavigationService from '../services/NavigationService';
import showToast from '../utils/ShowToast';

export function* postCreateRoom(action) {
  // console.log('postCreateRoom action', action);
  try {
    const data = yield call(
      SecuremessagePost,
      'createRoom',
      JSON.stringify(action.payload.sendData),
      false,
    );
    // console.log('postCreateRoom data', data);
    if (data.success === true) {
      yield put(createRoomSuccess(data));
    } else {
      yield put(createRoomSuccess(data));
    }
  } catch (error) {
    console.log('postCreateRoom error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(createRoomFailure(error));
  }
}

export function* postChatHistory(action) {
  // console.log('postChatHistory action', action);
  try {
    const data = yield call(
      SecuremessagePost,
      'chatHistory',
      JSON.stringify(action.payload),
      false,
    );
    // console.log('postChatHistory data', data);
    if (data.success === true) {
      yield put(chatHistorySuccess(data));
    } else {
      yield put(chatHistorySuccess(data));
    }
  } catch (error) {
    console.log('postChatHistory error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(chatHistoryFailure(error));
  }
}

export function* postChatList(action) {
  // console.log('postChatList action', action);
  try {
    const data = yield call(
      SecuremessagePost,
      'chatlist',
      JSON.stringify(action.payload),
      false,
    );
    // console.log('postChatList data', data);
    if (data.success === true) {
      yield put(chatlistSuccess(data));
    } else {
      yield put(chatlistSuccess(data));
    }
  } catch (error) {
    console.log('postChatList error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    yield put(chatlistFailure(error));
  }
}

export function* postDeleteNotification(action) {
  // console.log('postDeleteNotification action', action);
  try {
    const data = yield call(
      SecuremessagePost,
      'chatNotificationUpdate',
      JSON.stringify(action.payload),
      false,
    );
    // console.log('postDeleteNotification data', data);
    if (data.success === true) {
      yield put(deleteNotifySuccess(data));
    }
  } catch (error) {
    console.log('postChatList error', error);
    if(error.message === 'Network request failed'){
      showToast('No Internet Connection');
    } else {
      // showAlert(error.toString());
    }
    // yield put(deleteNotifyFailure(error));
  }
}
