import React, {createRef, useEffect, useState} from 'react';
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
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import {
  chatHistoryApi,
  chatHistorySuccess,
  chatlistApi,
  createRoomSuccess,
  ActiveState
} from '../../../actions/MessagesAction';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import LazyLoader from '../../../components/atoms/LazyLoader';
import {postEndUserProfileSuccess} from '../../../actions/EndUserProfileAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
let allMessages = [];
const flatListRef = createRef();
var messageList = true;
var ws = null;
let isValid = false;

const MessageChatScreen = props => {

  const isScreenFocused = props.navigation.isFocused();
  const dispatch = useDispatch();

  const chatHistoryRes = useSelector(
    state => state.MessagesReducer.chatHistoryData,
  );
  console.log('chatHistoryRes', chatHistoryRes);

  const [chatHistoryArray, setChatHistoryArray] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectRoomId, setSelectRoomId] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [uiRender, setUiRender] = useState(false);
  const [value, setValue] = useState('');
  const [EndUserName, setEndUserName] = useState('');
  console.log('selectRoomId', selectRoomId);

  useEffect(() => {
    // dispatch(getLinkedTeamsApi())
    ws = SocketIOClient('http://3.140.234.233:4000', {
      transports: ['websocket'],
      jsonp: false,
    });
    console.log('ws', ws);
    dispatch(createRoomSuccess(''));
    isValid=false;
  }, []);

  useEffect(() => {
    console.log("isScreenFocused",isScreenFocused)
    if(isScreenFocused){
    dispatch(ActiveState(true))
    }
  }, [isScreenFocused])

  useEffect(() => {
    console.log('props.......', props);
    if (props.navigation) {
      if (props.navigation.state.params) {
        if (props.navigation.state.params) {
          if (
            props.navigation.state.params.roomId &&
            props.navigation.state.params.selectItem
          ) {
            if (
              props.navigation.state.params.roomId &&
              props.navigation.state.params.selectItem.full_name != '' && isValid != true
            ) {
              fetchRoomId(
                props.navigation.state.params.roomId,
                props.navigation.state.params.selectItem.user_id,
              );
              setSelectRoomId(props.navigation.state.params.roomId);
              setSelectedUser(props.navigation.state.params.selectItem);
              setEndUserName(
                props.navigation.state.params.selectItem.full_name,
              );
            }
          }
        }
      }
    }
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
    dispatch(chatHistorySuccess());
    setUiRender(!uiRender);
  }, [props]);

  const asdf = (stateActive) => {
    console.log('asdffunc',stateActive);
    if(stateActive === true){
      dispatch(ActiveState(stateActive))
    }
    dispatch(ActiveState(false))
    
  }


  async function fetchRoomId(roomId, user_Id) {
    const sendData = {
      room_id: roomId,
      userId: Number(user_Id),
    };
    console.log('sendData', sendData);
    dispatch(chatHistoryApi(sendData));
    isValid = true;
  }

  useEffect(() => {
    if (chatHistoryRes != undefined && chatHistoryRes.data != undefined) {
      if (chatHistoryRes.data.length > 0) {
        setChatHistoryArray(chatHistoryRes.data);
        for (let item of chatHistoryRes.data) {
          allMessages.push(item);
        }
        setUiRender(!uiRender);
        flatListRef.current?.scrollToOffset({animated: true, offset: 0});
      }
    }
  }, [chatHistoryRes]);

  useEffect(() => {
    ws.on('message', msg => {
      console.log('onMessage', msg);
      console.log('messageList', messageList);
      console.log('onMessage inside if');
      messageList = false;
      setUiRender(!uiRender);
      chatHistoryArray.unshift(msg.message);
      // setChatHistoryArray(chatHistoryArray.unshift(msg.message))
      console.log('allMessages', chatHistoryArray);
      setUiRender(!uiRender);
      setTimeout(() => {
        setUiRender(!uiRender);
        flatListRef.current?.scrollToOffset({animated: true, offset: 0});
        messageList = true;
        // fetchRoomId(chatHistoryArray[0].room_id,chatHistoryArray[0].sender_id);
      }, 200);
      setUiRender(!uiRender);
    });
  }, [chatHistoryArray]);

  console.log('chatHistoryArray', chatHistoryArray);

  const sendMessageFunc = () => {
    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    if (value == '') {
      // Alert.alert('please enter message');
    } else {
      const sendMessageRequest = {
        message: value,
        room_id: selectRoomId,
        receiver_id: selectedUser.receiver_id,
        sender_id: Number(selectedUser.user_id),
        date: date2[0],
        time: time,
        fileType: 0,
      };
      console.log('sendMessageRequest', sendMessageRequest);
      messageList = true;
      ws.emit('message', sendMessageRequest);
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({animated: true, offset: 0});
      }, 200);
      setValue('');
    }
  };

  console.log('chatHistoryArray', chatHistoryArray);

  const removeSecond = time => {
    if (time != '' && time != null && time != undefined) {
      const convertTime = moment(time, 'hh:mm:ss A').format('hh:mm a');
      return convertTime;
    }
  };

  const keyExtractor = item => item.message_id.toString();

  const renderItem = ({item, index}) => {
    const userId = selectedUser ? selectedUser.user_id : '';
    const time = moment(item.created_At).calendar(null, {
      sameDay: `[Today]`,
      lastDay: `[Yesterday]`,
      nextDay: `[Tomorrow]`,
      lastWeek: `[Last] dddd`,
      nextWeek: 'dddd',
      sameElse: 'DD/MM/YYYY',
    });
    const disabledDay =
      chatHistoryArray[index + 1] &&
      moment(item.created_At).isSameOrBefore(
        chatHistoryArray[index + 1].created_At,
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
            <Text style={{textAlign: 'center', color: '#141414', fontSize: 12}}>
              {time}
            </Text>
          </View>
        )}
        <View
          style={{
            marginHorizontal: 14,
            marginTop: 10,
            marginBottom: 15,
            alignSelf: userId != item.sender_id ? 'flex-start' : 'flex-end',
          }}>
          {item.fileType == 0 && (
            <>
              <View>
                {userId != item.sender_id ? (
                  <View style={{flexDirection: 'row'}}>
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
                        {alignSelf: 'center', marginLeft: 6},
                      ]}>
                      {removeSecond(item.time)}
                    </Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.itemTimeSender,
                        {alignSelf: 'center', marginRight: 6},
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

  const goToEndUser = async listItem => {
    console.log('listItem', listItem);
    AsyncStorage.setItem('EndUSerId', listItem.receiver_id.toString());
    dispatch(postEndUserProfileSuccess())
    NavigationService.navigate('OtherUserProfileScreen');
  };


  const goBackfunc = () => {
    NavigationService.goBack();

    const newData = {
      room_id: selectRoomId,
      userId: Number(selectedUser.user_id),
    };
    dispatch(chatHistoryApi(newData));

    const sendData = {
      userId: Number(selectedUser.user_id),
    };
    dispatch(chatlistApi(sendData));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{flex: 1, backgroundColor: '#000'}}>
        {/* <View > */}
        <View style={{flex: 1}}>
          <View
            style={{
              flex: isFocused ? 1 : 0.6,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => goBackfunc()}
                style={{justifyContent: 'center'}}>
                <Image
                  source={require('../../../../assets/images/ic_back_arrow.png')}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 3}}>
              {selectedUser != undefined &&
                selectedUser.full_name != undefined && (
                  <Text
                    style={{
                      color: '#252020',
                      fontSize: 17,
                      fontWeight: '600',
                      fontFamily: Fonts.fontName.GibsonBold,
                    }}>
                    {selectedUser.full_name}
                  </Text>
                )}
            </View>
            <View style={{justifyContent: 'center', flex: 0.5}}>
              {selectedUser != undefined &&
              selectedUser.profile_file != 'undefined' ? (
                <TouchableOpacity onPress={() => goToEndUser(selectedUser)}>
                  {selectedUser.image_type == 1 ? (
                    // <Image source={{ uri: selectedUser.profile_file }}
                    <LazyLoader
                      uriImg={selectedUser.profile_file}
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'cover',
                        borderRadius: 30,
                      }}
                    />
                  ) : (
                    <View>
                      <Video
                        source={{uri: selectedUser.profile_file}}
                        style={{height: 40, width: 40, borderRadius: 30}}
                        paused={true}
                        disableFullscreen={true}
                        seekColor="transparent"
                        disableSeekbar
                        controls={true}
                        muted={true}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          left: '6%',
                          right: 0,
                          top: '7%',
                        }}>
                        <Image
                          source={require('../../../../assets/images/play-button.png')}
                          style={{height: 35, width: 35, resizeMode: 'contain'}}
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => goToEndUser(selectedUser)}>
                  <Image
                    source={Images.profile2}
                    style={{
                      height: 45,
                      width: 45,
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* <ScrollView> */}
          <View style={{flex: 6, backgroundColor: '#E5E5E5'}}>
            <FlatList
              ref={flatListRef}
              data={chatHistoryArray}
              style={{marginTop: 10}}
              showsVerticalScrollIndicator={false}
              // keyExtractor={keyExtractor}
              renderItem={renderItem}
              extraData={uiRender}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToOffset({animated: true, offset: 0})
              }
              onLayout={() =>
                flatListRef.current?.scrollToOffset({animated: true, offset: 0})
              }
              inverted
            />
          </View>
          {/* </ScrollView> */}

          <View
            style={{
              flex: isFocused ? 0.8 : 0.7,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: 'rgba(118, 118, 128, 0.12)',
            }}>
            <TextInput
              placeholder={'Message ' + EndUserName + '...'}
              style={{
                height: 35,
                width: width / 2 + 140,
                backgroundColor: '#fff',
                paddingHorizontal: 10,
              }}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              onChangeText={text => setValue(text)}
            />
            <TouchableOpacity
              onPress={() => sendMessageFunc()}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../../../assets/images/SendBtn.png')}
                style={{height: 35, width: 35, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {chatHistoryRes === undefined &&
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 50,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
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
  }
        {/* </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("MessageChatScreen state", state)
  return {};
};

export default connect(mapStateToProps, {})(MessageChatScreen);

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
  senderMessage: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 0.8,
    borderColor: 'lightgray',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    paddingLeft: 12,
    paddingBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  myMessage: {
    flexDirection: 'row',
    backgroundColor: '#386BD4',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingLeft: 12,
    paddingBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  itemTimeMessageSender: {
    fontSize: 15,
    color: '#000',
    paddingRight: 8,
  },
  itemTimeMy: {
    fontSize: 15,
    color: '#000',
    paddingRight: 8,
  },
  itemTimeSender: {
    fontSize: 10,
    color: '#000',
    paddingTop: 2,
  },
});
