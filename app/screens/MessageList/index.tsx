import React, { createRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  TextInput,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images, Fonts } from '../../theme';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {
  chatlistApi,
  chatHistorySuccess,
  createRoomApi,
  createRoomSuccess,
  deleteNotify,
  deleteNotifySuccess,
  ActiveState
} from '../../actions/MessagesAction';
import moment from 'moment';
import Video from 'react-native-video';
import {
  postTeamSuggestionApi,
  postTeamSuggestionSuccess,
} from '../../actions/UserLinkedActions';
import SocketIOClient from 'socket.io-client';
import LazyLoader from '../../components/atoms/LazyLoader';
import { SwipeListView } from 'react-native-swipe-list-view';
import deleteChat from '../../actions/DeleteChatAction';
import axios from 'axios';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let allMessages = [];
const flatListRef = createRef();
var messageList = true;
var ws = null;

const MessageList = props => {
  const dispatch = useDispatch();

  const chatListRes = useSelector(state => state.MessagesReducer.chatListData);
  const suggestionRes = useSelector(
    state => state.UserLinkedReducer.teamSuggestionData,
  );
  const charRoomResData = useSelector(
    state => state.MessagesReducer.createRoomData,
  );
  const notifyDeleteData = useSelector(
    state => state.MessagesReducer.notifyDeleteRes,
  );
  const ChatDeleteRes = useSelector(state => state.deleteChatReducer.data);

  const [uiRender, setUirender] = useState(false);
  const [chatListArray, setChatListArray] = useState([]);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [renderHeight, setRenderHeight] = useState(false);
  const [User_Id, setUser_Id] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userListName, setUserListName] = useState('');
  const [UserProfilePic, setUserProfilePic] = useState('');
  const [UserProfilePicType, setUserProfilePicType] = useState('');
  const [suggestionListArray, setSuggestionListArray] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [receiverId, setReceiverId] = useState('');
  const [token, setToken] = useState('');
  const [value, setValue] = useState('');
  const [showMessage, setShowMessage] = useState([]);
  const [roomId, setroomID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // dispatch(getLinkedTeamsApi())
    getToken();
    ws = SocketIOClient('http://3.140.234.233:4000', {
      transports: ['websocket'],
      jsonp: false,
    });
    console.log('ws', ws);
  }, []);

  const onLoadStart = () => {
    console.log('loadstart');
    setIsLoading(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoading(false);
  };

  const getToken = async () => {
    const user_Id = await AsyncStorage.getItem('USER_ID');
    const tokenGet = await AsyncStorage.getItem('Authorization');
    console.log('user_Id', user_Id);
    setToken(tokenGet);
    setUser_Id(user_Id);
    const sendData = {
      userId: Number(user_Id),
    };
    dispatch(chatlistApi(sendData));
    dispatch(deleteNotifySuccess(''));
  };

  useEffect(() => {
    if (ChatDeleteRes && ChatDeleteRes != undefined) {
      if (ChatDeleteRes.success == true) {
        setIsLoading(false);
        getToken();
      }
    }
  }, [ChatDeleteRes]);

  useEffect(() => {
    if (notifyDeleteData && notifyDeleteData != undefined) {
      if (notifyDeleteData.success == true) {
        setIsLoading(false);
        getToken();
      }
    }
  }, [notifyDeleteData]);

  useEffect(() => {
    let tempData = [];
    if (suggestionRes && suggestionRes != undefined) {
      if (suggestionRes.data != undefined && suggestionRes.data.length > 0) {
        setSuggestionListArray(suggestionRes.data);
        setUirender(!uiRender);
      }
    }
  }, [suggestionRes]);

  const closeComentModal = () => {
    setIsCommentModal(!isCommentModal);
    dispatch(createRoomSuccess());
    setShowMessage([]);
    setSuggestionListArray([]);
    getToken();
  };

  useEffect(() => {
    let tempArray = [];
    if (chatListRes != undefined && chatListRes.data != undefined) {
      if (chatListRes.data.length > 0) {
        for (let i = 0; i < chatListRes.data.length; i++) {
          chatListRes.data[i].key = i;
        }
        for (let item of chatListRes.data) {
          if (item.last_message != "") {
            tempArray.push(item)
          }
        }
        setChatListArray(tempArray);
        setUirender(!uiRender);
        //dispatch(ActiveState(false))
      }
    }
  }, [chatListRes]);

  // console.log('chatListArray', chatListArray);

  useEffect(() => {
    if (charRoomResData != undefined && charRoomResData.data != undefined) {
      console.log('charRoomResData.data', charRoomResData.data);
      const date1 = moment().format();
      const date2 = date1.split('T');
      const time = moment().format('HH:mm');
      if (value == '') {
        // Alert.alert('please enter message');
      } else {
        const sendMessageRequest = {
          message: value,
          room_id: charRoomResData.data.room_id,
          receiver_id: receiverId,
          sender_id: Number(User_Id),
          date: date2[0],
          time: time,
          fileType: 0,
        };
        console.log('sendMessageRequest', sendMessageRequest);
        messageList = true;
        ws.emit('message', sendMessageRequest);
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        }, 200);
      }
      if (
        charRoomResData.data != undefined &&
        charRoomResData.data.room_id != undefined
      ) {
        setroomID(charRoomResData.data.room_id);
        setTimeout(() => {
          NavigationService.navigate('MessageChatScreen', {
            roomId: charRoomResData.data.room_id,
            selectItem: {
              user_id: User_Id,
              receiver_id: receiverId,
              full_name: userListName,
              profile_file: UserProfilePic,
              image_type: UserProfilePicType,
            },
          });
        }, 100);
      }
    }
  }, [charRoomResData]);

  useEffect(() => {
    ws.on('message', msg => {
      console.log('onMessage', msg);
      console.log('messageList', messageList);
      console.log('onMessage inside if');
      messageList = false;
      setUirender(!uiRender);
      showMessage.unshift(msg.message);
      console.log('allMessages', showMessage);
      setUirender(!uiRender);
      setTimeout(() => {
        setUirender(!uiRender);
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
        messageList = true;
      }, 200);
      setUirender(!uiRender);
      setValue('');
    });
  }, [showMessage]);

  // console.log('allMessages outside', showMessage)

  const goToChatScreen = chatItem => {
    console.log('chatItem', chatItem);

    dispatch(chatHistorySuccess());
    setTimeout(() => {
      NavigationService.navigate('MessageChatScreen', {
        roomId: chatItem.roomm_id,
        selectItem: {
          user_id: User_Id,
          receiver_id: chatItem.userId,
          full_name: chatItem.full_name,
          profile_file: chatItem.profile_file,
          image_type: chatItem.image_type,
        },
      });
    }, 100);
  };

  const onRefresh = React.useCallback(() => {
    setTimeout(() => {
      getToken();
      setRefreshing(false);
    }, 1000);
  }, []);

  const getMesssageTime = (previous, msgDate) => {
    console.log('msgDate',msgDate);
    console.log('previous',previous);
    let lastTimeText = '';
    var lstMsgDate = '';
    var lstMsgMonth = '';
    var lstMsgYear = '';
    var lstMsgHour = '';
    var lstMsgMin = '';
    var lstMsgSec = '';
    if (msgDate && previous) {
      const convertTime = moment(previous, 'hh:mm:ss A').format('HH:mm:ss');
      const lastMessageDate = msgDate.split('-');
      const lastMessageTime = convertTime.split(' ');
      const lastMessageSplitTime = lastMessageTime[0].split(':');

      lstMsgDate = lastMessageDate[2];
      lstMsgMonth = lastMessageDate[1];
      lstMsgYear = lastMessageDate[0];
      lstMsgHour = lastMessageSplitTime[0];
      lstMsgMin = lastMessageSplitTime[1];
      lstMsgSec = lastMessageSplitTime[2];

      var currentDate = new Date();
      var previousDate = new Date(
        lstMsgYear,
        lstMsgMonth - 1,
        lstMsgDate,
        lstMsgHour,
        lstMsgMin,
        lstMsgSec,
      );

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = currentDate - previousDate;

      if (elapsed < msPerMinute) {
        lastTimeText = 'Just now';
      } else if (elapsed < msPerHour) {
        lastTimeText = Math.round(elapsed / msPerMinute) + ' minutes ago';
      } else if (elapsed < msPerDay) {
        lastTimeText = Math.round(elapsed / msPerHour) + ' hours ago';
      } else if (elapsed < msPerMonth) {
        lastTimeText = Math.round(elapsed / msPerDay) + ' days ago';
      } else if (elapsed < msPerYear) {
        lastTimeText = Math.round(elapsed / msPerMonth) + ' months ago';
      } else {
        lastTimeText = Math.round(elapsed / msPerYear) + ' years ago';
      }
      return lastTimeText;
    }
  };

  const suggestFunc = text => {
    console.log('text', text);
    setUserListName(text);
    setShowSuggest(true);
    dispatch(postTeamSuggestionApi(text));
  };

  const selectedNameFunc = item => {
    console.log('item', item.full_name);
    setUserListName(item.full_name);
    setUserProfilePic(item.profile_file);
    setUserProfilePicType(item.imagetype);
    dispatch(postTeamSuggestionSuccess());
    setShowSuggest(false);
    setUirender(!uiRender);
    setIsEditable(false);
    setReceiverId(item.receiver_id);

    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    const sendData = {
      userTo: Number(item.receiver_id),
      userBy: Number(User_Id),
      time: time,
      date: date2[0],
      createrId: User_Id,
    };
    dispatch(createRoomApi({ sendData, token }));

    closeComentModal();
    dispatch(chatHistorySuccess());
  };

  const openChatModal = () => {
    setIsEditable(true);
    setUserListName('');
    setIsCommentModal(true);
    setValue('');
    setShowMessage([]);
  };

  const chatRoomApiCall = () => {
    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    const sendData = {
      userTo: receiverId,
      userBy: User_Id,
      time: time,
      date: date2[0],
      createrId: User_Id,
    };
    dispatch(createRoomApi({ sendData, token }));
  };

  const removeSecond = time => {
    if (time != '' && time != null && time != undefined) {
      const convertTime = moment(time, 'hh:mm:ss A').format('hh:mm a');
      return convertTime;
    }
  };

  const keyExtractor = item => item.message_id.toString();

  const renderItem = ({ item, index }) => {
    const userId = User_Id ? User_Id : '';
    const time = moment(item.created_At).calendar(null, {
      sameDay: `[Today]`,
      lastDay: `[Yesterday]`,
      nextDay: `[Tomorrow]`,
      lastWeek: `[Last] dddd`,
      nextWeek: 'dddd',
      sameElse: 'DD/MM/YYYY',
    });
    const disabledDay =
      showMessage[index + 1] &&
      moment(item.created_At).isSameOrBefore(
        showMessage[index + 1].created_At,
        'day',
      );

    return (
      <View>
        {!disabledDay && (
          <View>
            <View
              style={{
                width: width,
                backgroundColor: '#fff',
                height: 1,
                marginBottom: 6,
              }}
            />
            <Text style={{ textAlign: 'center', color: '#141414', fontSize: 12 }}>
              {time}
            </Text>
          </View>
        )}
        <View
          style={{
            marginHorizontal: 14,
            marginTop: 10,
            marginBottom: 10,
            alignSelf: userId != item.sender_id ? 'flex-start' : 'flex-end',
          }}>
          {item.fileType == 0 && (
            <>
              <View>
                {userId != item.sender_id ? (
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        padding: 8,
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        minWidth: 50,
                        maxWidth: 270,
                      }}>
                      {Boolean(item.message.length) && (
                        <Text
                          style={
                            userId != item.sender_id
                              ? styles.itemTimeMessageSender
                              : styles.itemTimeMy
                          }>
                          {item.message}
                        </Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.itemTimeSender,
                        { alignSelf: 'center', marginLeft: 6 },
                      ]}>
                      {removeSecond(item.time)}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        styles.itemTimeSender,
                        { alignSelf: 'center', marginRight: 6 },
                      ]}>
                      {removeSecond(item.time)}
                    </Text>
                    <View
                      style={{
                        padding: 8,
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        minWidth: 50,
                        maxWidth: 270,
                      }}>
                      {Boolean(item.message.length) && (
                        <Text
                          style={
                            userId != item.sender_id
                              ? styles.itemTimeMessageSender
                              : styles.itemTimeMy
                          }>
                          {item.message}
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  const closeRow = (rowMap, rowKey, item) => {
    console.log('item', item);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }

    if (item.posttype === 'Message') {
      const sendData = {
        room_id: item.roomm_id, //us ki roomid
        userIdTo: item.userId, //jito delete kiya ja rha he
        userIdBy: User_Id, //jo delete kar rha he
      };
      console.log('sendData', sendData);
      dispatch(deleteChat(sendData));
    } else {
      const sendData = {
        postType: item.posttype, //us ki roomid
        postId: item.idd, //jito delete kiya ja rha
      };
      console.log('sendData not message', sendData);
      dispatch(deleteNotify(sendData));
    }
    setIsLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <View style={styles.headerMainView}>
            <View></View>
            {/* <Image source={Images.HomeLeftHeader} style={styles.leftHeaderImage} /> */}
            <TouchableOpacity onPress={() => openChatModal()}>
              <Image
                source={require('../../../assets/images/NewMessage.png')}
                style={styles.rightHeaderImage}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('SearchScreen')}
            style={styles.searchBarMainView}>
            <View style={styles.searchIconImageView}>
              <Image source={Images.SearchImg} style={styles.searchIconStyle} />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                color: 'rgba(60, 60, 67, 0.6)',
                fontSize: 17,
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              backgroundColor: '#F0F0F0',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#252020',
                fontSize: 17,
                fontWeight: '600',
                fontFamily: Fonts.fontName.GibsonBold,
              }}>
              Messages
            </Text>
          </View>
          <View>
            {chatListArray && chatListArray.length > 0 ? (
              <View>
                <SwipeListView
                  data={chatListArray}
                  renderItem={(data, rowMap) => (
                    <View>
                      {data.item.posttype === 'Message' ? (
                        <TouchableOpacity
                          disabled={true}
                          style={{
                            height: 70,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderColor: 'lightgrey',
                          }}>
                          {data.item.userId != 157 ? (
                            <TouchableOpacity
                              onPress={() => goToChatScreen(data.item)}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {data.item.profile_file != 'undefined' ? (
                                <View>
                                  {data.item.image_type === 1 ? (
                                    <LazyLoader
                                      uriImg={data.item.profile_file}
                                      style={{
                                        height: 48,
                                        width: 48,
                                        borderRadius: 48 / 2,
                                        resizeMode: 'cover',
                                      }}
                                    />
                                  ) : (
                                    <View>
                                      <View pointerEvents="none" style={{}}>
                                        {isLoading ? (
                                          <ActivityIndicator
                                            animating
                                            size="large"
                                            color="gray"
                                            style={{
                                              position: 'absolute',
                                              left: '12%',
                                              right: 0,
                                              top: '12%',
                                            }}
                                          />
                                        ) : null}
                                        <Video
                                          source={{ uri: data.item.profile_file }}
                                          style={{
                                            height: 45,
                                            width: 45,
                                            borderRadius: 50,
                                          }}
                                          paused={true}
                                          // resizeMode={'cover'}
                                          disableFullscreen={true}
                                          seekColor="transparent"
                                          disableSeekbar
                                          controls={true}
                                          muted={true}
                                          onLoadStart={onLoadStart}
                                          onLoad={onLoad}
                                        />
                                        <View
                                          style={{
                                            position: 'absolute',
                                            left: '12%',
                                            right: 0,
                                            top: '12%',
                                          }}>
                                          <Image
                                            source={require('../../../assets/images/play-button.png')}
                                            style={{
                                              height: 35,
                                              width: 35,
                                              resizeMode: 'contain',
                                            }}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              ) : (
                                <Image
                                  source={Images.profile2}
                                  style={{
                                    height: 45,
                                    width: 45,
                                    resizeMode: 'cover',
                                    borderRadius: 50,
                                  }}
                                />
                              )}

                              <View style={{ width: width / 2 + 40 }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    style={{
                                      marginLeft: 10,
                                      color: '#141414',
                                      fontWeight: '600',
                                      fontSize: 12,
                                      fontFamily: Fonts.fontName.GibsonRegular,
                                    }}>
                                    {data.item.full_name}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#BABABA',
                                      marginLeft: 7,
                                      fontSize: 10,
                                      alignSelf: 'center',
                                    }}>
                                    {data.item.job_title}
                                  </Text>
                                </View>
                                {data.item.unread_count != 0 ? (
                                  <View>
                                    {data.item.unread_count == 1 ? (
                                      <Text
                                        style={{
                                          color: '#3A3643',
                                          fontSize: 11,
                                          fontWeight: 'bold',
                                          marginLeft: 10,
                                          marginTop: 5,
                                        }}>
                                        {data.item.unread_count} new message
                                      </Text>
                                    ) : (
                                      <Text
                                        style={{
                                          color: '#3A3643',
                                          fontSize: 11,
                                          fontWeight: 'bold',
                                          marginLeft: 10,
                                          marginTop: 5,
                                        }}>
                                        {data.item.unread_count} new messages
                                      </Text>
                                    )}
                                  </View>
                                ) : (
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      color: '#3A3643',
                                      fontSize: 11,
                                      fontWeight: 'normal',
                                      marginLeft: 10,
                                      marginTop: 5,
                                    }}>
                                    {data.item.last_message}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={require('../../../assets/images/pitchImg.png')}
                                style={{
                                  height: 45,
                                  width: 45,
                                  borderRadius: 48 / 2,
                                  resizeMode: 'cover',
                                }}
                              />
                              <View style={{ width: width / 2 + 40 }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    style={{
                                      marginLeft: 10,
                                      color: '#141414',
                                      fontWeight: '600',
                                      fontSize: 12,
                                      fontFamily: Fonts.fontName.GibsonRegular,
                                    }}>
                                    {data.item.full_name}
                                  </Text>
                                </View>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: '#3A3643',
                                    fontSize: 11,
                                    fontWeight: 'normal',
                                    marginLeft: 10,
                                    marginTop: 5,
                                  }}>
                                  {data.item.last_message}
                                </Text>
                              </View>
                            </View>
                          )}
                          <View style={{ justifyContent: 'center' }}>
                            <Text
                              style={{
                                color: '#3A3643',
                                fontSize: 11,
                                fontWeight: 'normal',
                              }}>
                              {getMesssageTime(
                                data.item.lastMessage_Time,
                                data.item.lastMessage_Date,
                              )}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View
                          style={{
                            height: 70,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderColor: 'lightgrey',
                          }}>
                          <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={require('../../../assets/images/pitchImg.png')}
                              style={{
                                height: 45,
                                width: 45,
                                borderRadius: 48 / 2,
                                resizeMode: 'cover',
                              }}
                            />
                            <View style={{ width: width / 2 + 40, marginLeft: 10 }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    color: '#141414',
                                    fontWeight: '600',
                                    fontSize: 12,
                                    fontFamily: Fonts.fontName.GibsonRegular,
                                  }}>
                                  Pitch Insight
                                </Text>
                              </View>
                              <Text
                                style={{
                                  color: '#3A3643',
                                  fontSize: 11,
                                  fontWeight: 'normal',
                                  marginTop: 5,
                                }}>
                                {data.item.full_name} {data.item.lastmessage}
                              </Text>
                            </View>
                          </View>
                          <View style={{ justifyContent: 'center' }}>
                            <Text
                              style={{
                                color: '#3A3643',
                                fontSize: 11,
                                fontWeight: 'normal',
                              }}>
                              {getMesssageTime(
                                data.item.lastMessage_Time,
                                data.item.lastMessage_Date,
                              )}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                  renderHiddenItem={(data, rowMap) => (
                    <View
                      style={{
                        alignItems: 'center',
                        backgroundColor: '#DDD',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 15,
                      }}>
                      <Text>Left</Text>
                      <TouchableOpacity>
                        <Text>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          closeRow(rowMap, data.item.key, data.item)
                        }>
                        <Text style={{ marginRight: 10, color: 'red' }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  disableRightSwipe={true}
                />
                {/* ) : null} */}
              </View>
            ) : (
              <View
                style={{
                  height: 200,
                  width: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>No Messages</Text>
              </View>
            )}
          </View>

        </ScrollView>
      </View>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000050',
            // flex: 1 
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        </View>
      ) : null}
      <Modal
        isVisible={isCommentModal}
        animationIn="slideInUp"
        onBackdropPress={() => closeComentModal()}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-600}>
          <View
            style={{
              height: height,
              backgroundColor: '#EBEBEB',
              marginTop: '30%',
              width: width,
              alignSelf: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <TouchableOpacity onPress={() => closeComentModal()}>
                <Image
                  source={require('../../../assets/images/crossImage.png')}
                  style={{
                    height: 16,
                    width: 16,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <Text style={{ color: '#000', fontWeight: '600' }}>
                New Message
              </Text>
              <TouchableOpacity>
                {/* <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>Done</Text> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#898A8D',
                height: 1,
                width: width,
                alignSelf: 'center',
              }}
            />
            <View
              style={{
                height: renderHeight ? 385 : height / 2 + 200,
                backgroundColor: '#EBEBEB',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ alignSelf: 'center' }}>To:</Text>
                <TextInput
                  style={{ width: width / 2 + 135, height: 40, marginLeft: 10 }}
                  value={userListName}
                  editable={isEditable}
                  onChangeText={text => suggestFunc(text)}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#898A8D',
                  height: 1,
                  width: width,
                  alignSelf: 'center',
                }}
              />
              {showSuggest ? (
                <View>
                  {suggestionListArray && suggestionListArray.length > 0 ? (
                    <View style={{ height: 100 }}>
                      <ScrollView>
                        {suggestionListArray.map(
                          (suggestItem, suggestIndex) => (
                            <TouchableOpacity
                              onPress={() => selectedNameFunc(suggestItem)}
                              key={suggestIndex}
                              style={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                              }}>
                              <Text>{suggestItem.full_name}</Text>
                            </TouchableOpacity>
                          ),
                        )}
                      </ScrollView>
                    </View>
                  ) : null}
                </View>
              ) : null}
              <View style={{ flex: 6 }}>
                <FlatList
                  ref={flatListRef}
                  data={showMessage}
                  style={{ marginTop: 10 }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  extraData={uiRender}
                  onContentSizeChange={() =>
                    flatListRef.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    })
                  }
                  onLayout={() =>
                    flatListRef.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    })
                  }
                  inverted
                />
              </View>
            </View>
            {/* <Text>jhgjh</Text> */}
            {/* <View style={{ flex: 1 }}>
                            <View style={{ height: 40, width: width - 20, flexDirection: 'row', backgroundColor: '#d9d9d9' }}>
                                <TextInput
                                    style={{ height: 40, width: width - 60, paddingHorizontal: 8 }}
                                    placeholder="Enter text here..."
                                    placeholderTextColor='#c4c4c4'
                                    value={value}
                                    onFocus={() => setRenderHeight(true)}
                                    onBlur={() => setRenderHeight(false)}
                                    onChangeText={(text) => setValue(text)}
                                />
                                <TouchableOpacity
                                    onPress={() => chatRoomApiCall()}
                                    style={{ alignItems: 'center', justifyContent: 'center', }}>
                                    <Image source={require('../../../assets/images/SendBtn.png')} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                        </View> */}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('MessageList state', state);
  return {};
};

export default connect(mapStateToProps, {})(MessageList);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  leftHeaderImage: {
    height: height * 0.05,
    width: height * 0.05,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rightHeaderImage: {
    height: height * 0.06,
    width: height * 0.06,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchBarMainView: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
    marginTop: 8,
  },
  searchIconImageView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconStyle: {
    height: height * 0.032,
    width: height * 0.032,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 50,
    width: width - 70,
    alignSelf: 'center',
  },
});
