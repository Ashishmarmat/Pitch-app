import React, {createRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images, Fonts} from '../../theme';
import NavigationService from '../../services/NavigationService';
import {useFocusEffect} from '@react-navigation/native';
import {
  postUserSuggestionSuccess,
  postUserFilterSuccess,
  getLinkedTeamSuccess,
} from '../../actions/UserLinkedActions';
import {getLinkedTeamsApi} from '../../actions/UserLinkedActions';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import LazyLoader from '../../components/atoms/LazyLoader';
import {
  getConnectionMutualList,
  getPeopleWithSharedInsightsList,
  getinviteToPitchLinkconnectList,
  getrecommendedConnectionList,
} from '../../actions/ConnectionsAction';
import {
  sendUserLinkApi,
  sendUserLinkSuccess,
} from '../../actions/UserLinkedActions';
import Contacts from 'react-native-contacts';
import Share from 'react-native-share';
import addContacts from '../../actions/AddContact';
import Video from 'react-native-video';
import {
  createRoomApi,
  createRoomSuccess,
  chatHistorySuccess,
} from '../../actions/MessagesAction';
import {
  postEndUserProfile,
  postEndUserProfileSuccess,
} from '../../actions/EndUserProfileAction';
import moment from 'moment';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ConnectionTab = props => {
  const dispatch = useDispatch();

  const userLinkedTeamRes = useSelector(
    state => state.UserLinkedReducer.getLinkedTeamList,
  );
  const getCurrentMutualListRes = useSelector(
    state => state.ConnectionReducer.getCurrentMutualList,
  );
  const getSharedInsightRes = useSelector(
    state => state.ConnectionReducer.getSharedInsightList,
  );
  console.log("getSharedInsightRes.........",getSharedInsightRes);
  const getrecommendedListRes = useSelector(
    state => state.ConnectionReducer.getRecommendedList,
  );
  const getinviteToPitchRes = useSelector(
    state => state.ConnectionReducer.getInviteConnectList,
  );
  const linkSendRes = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );
  const charRoomResData = useSelector(
    state => state.MessagesReducer.createRoomData,
  );
  // console.log("charRoomResData", charRoomResData);

  const [uiRender, setUirender] = useState(false);
  const [currentConnectionArray, setCurrentConnectionArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [sharedInsightArray, setSharedInsightArray] = useState([]);
  const [inviteToPitchArray, setInviteToPitchArray] = useState([]);
  const [recommendedListArray, setRecommendedListArray] = useState([]);
  const [contactArray, setContactArray] = useState([]);
  const [isModelInv, setModelInvite] = useState(false);
  const [token, setToken] = useState('');
  const [showMsgData, setShowMsgData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [UserId, setUserId] = useState('');


  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
  };

  useEffect(() => {
    dispatch(getConnectionMutualList());
    dispatch(getPeopleWithSharedInsightsList());
    dispatch(getinviteToPitchLinkconnectList());
    dispatch(getrecommendedConnectionList());
    AlertFunction();
    userIDfunc();
  }, []);

  const AlertFunction = async () => {
    const tokenGet = await AsyncStorage.getItem('Authorization');
    setToken(tokenGet);
    const CheckValidate = await AsyncStorage.getItem('AllowContact');
    if (CheckValidate != 'Yes') {
      inviteModalFunc();
    }
  };

  // -----Called UseEffect when get connection list----- //
  useEffect(() => {
    if (
      getCurrentMutualListRes != undefined &&
      getCurrentMutualListRes.data != undefined
    ) {
      if (getCurrentMutualListRes.data.length > 0) {
        setCurrentConnectionArray(getCurrentMutualListRes.data[0].matuallist);
      }
    }
  }, [getCurrentMutualListRes]);

  // -----Called UseEffect when get connection list----- //
  useEffect(() => {
    if (
      getSharedInsightRes != undefined &&
      getSharedInsightRes.data != undefined
    ) {
        setSharedInsightArray(getSharedInsightRes.data);
      }
  }, [getSharedInsightRes]);

  useEffect(() => {
    if (
      getinviteToPitchRes != undefined &&
      getinviteToPitchRes.data != undefined
    ) {
        setInviteToPitchArray(getinviteToPitchRes.data);
    }
  }, [getinviteToPitchRes]);

  useEffect(() => {
    if (
      getrecommendedListRes != undefined &&
      getrecommendedListRes.data != undefined
    ) {
        setRecommendedListArray(getrecommendedListRes.data);
    }
  }, [getrecommendedListRes]);
  
  useEffect(() => {
    if (charRoomResData != undefined && charRoomResData.data != undefined) {
      dispatch(chatHistorySuccess());
      console.log('showMsgData',showMsgData);
      NavigationService.navigate('MessageChatScreen', {
        roomId: charRoomResData.data.room_id,
        selectItem: {
          user_id: UserId,
          receiver_id: showMsgData.receiver_id,
          full_name: showMsgData.full_name,
          profile_file: showMsgData.profile_file,
          image_type: showMsgData.imagetype,
        },
      });
      setTimeout(() => {
        dispatch(createRoomSuccess());
      }, 1000);
    }
  }, [charRoomResData]);
  // -----Called UseEffect when link api called----- //
  useEffect(() => {
    if (linkSendRes != undefined) {
      if (linkSendRes.response_code === 200) {
        dispatch(getConnectionMutualList());
        dispatch(getPeopleWithSharedInsightsList());
        dispatch(getrecommendedConnectionList());
        dispatch(sendUserLinkSuccess());
      }
    }
    setUirender(!uiRender);
  }, [linkSendRes]);

  // -----Link btn function call----- //
  const sendLinkInvite = id => {
    dispatch(sendUserLinkApi(id));
  };

  useEffect(() => {
    Contacts.getAll().then(contacts => {
      setContactArray(contacts);
    });
  }, []);

  const goToEndUser = async listItem => {
    AsyncStorage.setItem('EndUSerId', listItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };

  const SheredInsightgoToEndUser = async listItem => {
    AsyncStorage.setItem('EndUSerId', listItem.id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };
  const RecommendConectionGoToEndUser = async listItem => {
    AsyncStorage.setItem('EndUSerId', listItem.id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };

  const inviteModalFunc = () => {
    setModalVisible(false);
    callMethod();
  };

  const callMethod = () => {
    setModelInvite(!isModelInv);
  };

  const allowConFunc = async () => {
    AsyncStorage.setItem('AllowContact', 'Yes');
    const sendData = {
      res: contactArray,
    };
    dispatch(addContacts(sendData));
  };

  const openShare = () => {
    const options = {
      title: 'iOS 14 kit for Figma',
      url: 'https://www.pitch-app.com/',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const chatRoomApiCall = mutualItem => {
    setShowMsgData(mutualItem);
    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    const sendData = {
      userTo: mutualItem.receiver_id,
      userBy: mutualItem.user_id,
      time: time,
      date: date2[0],
      createrId: mutualItem.user_id,
    };
    dispatch(createRoomApi({sendData, token}));
  };

  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoading(true);
  };
  const onLoad = () => {
    // console.log("load")
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        <View style={{}}>
          <View style={styles.headerMainView}>
            <View style={{flex: 1}}></View>
            {/* <Image source={Images.HomeLeftHeader} style={styles.leftHeaderImage} /> */}
            <TouchableOpacity onPress={() => openShare()}>
              <Image
                source={Images.HomeRightHeader}
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
        <ScrollView>
          <View>
            <View
              style={{
                height: 50,
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#252020',
                  fontSize: 17,
                  lineHeight: 17,
                  fontWeight: '600',
                }}>
                Connections
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#252020',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Current Connections
            </Text>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => NavigationService.navigate('MutualAllList')}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#252020',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 1,
            }}
          />
          {currentConnectionArray.length > 0 ? (
            <View>
              {currentConnectionArray
                .slice(0, 3)
                .map((mutualItem, mutualIndex) => (
                  <View key={mutualIndex}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: 'rgba(118, 118, 128, 0.12)',
                      }}>
                      <TouchableOpacity
                        onPress={() => goToEndUser(mutualItem)}
                        style={{
                          flexDirection: 'row',
                          marginTop: 5,
                          alignItems: 'center',
                        }}>
                        {mutualItem.profile_file != 'undefined' ? (
                          <View>
                            {mutualItem.imagetype === 1 ? (
                              <LazyLoader
                                uriImg={mutualItem.profile_file}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            ) : (
                              <View>
                                {isLoading ? (
                                  <ActivityIndicator
                                    animating
                                    size="small"
                                    color="gray"
                                    style={{
                                      position: 'absolute',
                                      alignSelf: 'center',
                                      top: '25%',
                                    }}
                                  />
                                ) : null}
                                <Video
                                  source={{uri: mutualItem.profile_file}}
                                  style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 50,
                                  }}
                                  paused={true}
                                  disableFullscreen={true}
                                  seekColor="transparent"
                                  disableSeekbar
                                  controls={true}
                                  muted={true}
                                  onLoadStart={onLoadStart}
                                  onLoad={onLoad}
                                />
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

                        <View style={{marginLeft: 10, width: 200}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#141414',
                              fontWeight: '600',
                              fontFamily: Fonts.fontName.GibsonBold,
                              lineHeight: 15,
                            }}>
                            {mutualItem.first_name}{' '}
                            {mutualItem.last_name != null &&
                            mutualItem.last_name != ''
                              ? mutualItem.last_name
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#9A9A9A',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                              lineHeight: 14,
                            }}>
                            {mutualItem.job_title}
                          </Text>
                          <Text
                            style={{
                              color: '#C2C2C2',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                              lineHeight: 14,
                            }}>
                            {mutualItem.city}, {mutualItem.state},{' '}
                            {mutualItem.country}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => chatRoomApiCall(mutualItem)}
                        style={{
                          alignSelf: 'center',
                          width: width / 4,
                          height: 35,
                          borderRadius: 8,
                          backgroundColor: '#4A20E4',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#4A20E4',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '600',
                          }}>
                          Message
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          ) : (
            <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
              <Text
                style={{
                  color: '#141414',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 15,
                }}>
                No current connections
              </Text>
              <Text
                style={{
                  color: '#9A9A9A',
                  fontSize: 12,
                  lineHeight: 14,
                  marginTop: 3,
                }}>
                Pitch is better with connections, use the search bar to {'\n'}
                find new people to connect with
              </Text>
            </View>
          )}

          {/* -----Shared Insight Array map start-----*/}
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 2,
            }}
          />
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(118, 118, 128, 0.12)',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#252020',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              People with shared insights
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SharedInsightScreen')}
              style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#252020',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {sharedInsightArray.length > 0 ? (
            <View>
              {sharedInsightArray.slice(0, 3).map((sharedItem, sharedIndex) => (
                <View key={sharedIndex}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: 'rgba(118, 118, 128, 0.12)',
                      backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity
                      onPress={() => SheredInsightgoToEndUser(sharedItem)}
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        alignItems: 'center',
                      }}>
                      {sharedItem.profile_file != 'undefined' ? (
                        <View>
                          {sharedItem.imagetype === 1 ? (
                            <LazyLoader
                              uriImg={sharedItem.profile_file}
                              style={{
                                height: 45,
                                width: 45,
                                resizeMode: 'cover',
                                borderRadius: 50,
                              }}
                            />
                          ) : (
                            <View>
                              {isLoading ? (
                                <ActivityIndicator
                                  animating
                                  size="small"
                                  color="gray"
                                  style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    top: '25%',
                                  }}
                                />
                              ) : null}
                              <Video
                                source={{uri: sharedItem.profile_file}}
                                style={{
                                  height: 45,
                                  width: 45,
                                  borderRadius: 50,
                                }}
                                disableFullscreen={true}
                                seekColor="transparent"
                                disableSeekbar
                                controls={true}
                                muted={true}
                                onLoadStart={onLoadStart}
                                onLoad={onLoad}
                                paused={true}
                              />
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
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#141414',
                            fontWeight: '600',
                            fontFamily: Fonts.fontName.GibsonBold,
                            lineHeight: 15,
                          }}>
                          {sharedItem.first_name}{' '}
                          {sharedItem.last_name != null &&
                          sharedItem.last_name != ''
                            ? sharedItem.last_name
                            : null}
                        </Text>
                        <Text
                          style={{
                            color: '#9A9A9A',
                            fontSize: 10,
                            fontFamily: Fonts.fontName.nunitoRegular,
                            lineHeight: 14,
                          }}>
                          {sharedItem.job_title}
                        </Text>
                        <Text
                          style={{
                            color: '#C2C2C2',
                            fontSize: 10,
                            fontFamily: Fonts.fontName.nunitoRegular,
                            lineHeight: 14,
                            textDecorationLine: 'underline',
                          }}>
                          {sharedItem.totalcount} shared insights
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => sendLinkInvite(sharedItem.id)}
                      style={{
                        alignSelf: 'center',
                        width: width / 4,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: '#4A20E4',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        Link +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                height: 80,
                alignItems: 'center',
              }}>
              <Text style={{color: '#141414', fontSize: 14, lineHeight: 15}}>
                No data available
              </Text>
            </View>
          )}
          {/* -----Shared Insight Array map end-----*/}

          {/* -----Invite to pitch Array map start-----*/}
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 2,
            }}
          />
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(118, 118, 128, 0.12)',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#252020',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Invite to Pitch
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('InviteToPichScreen')}
              style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#252020',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {inviteToPitchArray.slice(0, 3).map((inviteItem, inviteIndex) => (
              <View key={inviteIndex}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(118, 118, 128, 0.12)',
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      alignItems: 'center',
                    }}>
                    {inviteItem.thumbnailPath != undefined &&
                    inviteItem.thumbnailPath === '' ? (
                      <Image
                        source={require('../../../assets/images/Group1674.png')}
                        style={{
                          height: 45,
                          width: 45,
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    ) : (
                      <LazyLoader
                        uriImg={inviteItem.thumbnailPath}
                        style={{
                          height: 45,
                          width: 45,
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    )}
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#141414',
                          fontWeight: '600',
                          fontFamily: Fonts.fontName.GibsonBold,
                          lineHeight: 15,
                        }}>
                        {inviteItem.familyName}{' '}
                        {inviteItem.givenName != null &&
                        inviteItem.givenName != ''
                          ? inviteItem.givenName
                          : null}
                      </Text>
                      <Text
                        style={{
                          color: '#9A9A9A',
                          fontSize: 10,
                          lineHeight: 15,
                        }}>
                        Phone contact
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openShare()}
                    style={{
                      alignSelf: 'center',
                      width: width / 4,
                      height: 35,
                      borderRadius: 8,
                      backgroundColor: '#4A20E4',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 15, fontWeight: '600'}}>
                      Invite
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          {/* -----Invite to pitch Array map end-----*/}

          {/* -----Recommended Connections Array map start-----*/}
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 2,
            }}
          />
          <View
            style={{
              height: 55,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: 'rgba(118, 118, 128, 0.12)',
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#252020',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Recommended Connections
            </Text>
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('RecommendedConnection')
              }
              style={{justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#252020',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          {recommendedListArray.length > 0 ? (
            <View>
              {recommendedListArray
                .slice(0, 3)
                .map((recommendedItem, recommendedIndex) => (
                  <View key={recommendedIndex}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderColor: 'rgba(118, 118, 128, 0.12)',
                        backgroundColor: '#fff',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          RecommendConectionGoToEndUser(recommendedItem)
                        }
                        style={{
                          flexDirection: 'row',
                          marginTop: 5,
                          alignItems: 'center',
                        }}>
                        {recommendedItem.profile_file != 'undefined' ? (
                          <View>
                            {recommendedItem.imagetype === 1 ? (
                              <LazyLoader
                                uriImg={recommendedItem.profile_file}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            ) : (
                              <View>
                                {isLoading ? (
                                  <ActivityIndicator
                                    animating
                                    size="small"
                                    color="gray"
                                    style={{
                                      position: 'absolute',
                                      alignSelf: 'center',
                                      top: '25%',
                                    }}
                                  />
                                ) : null}
                                <Video
                                  source={{uri: recommendedItem.profile_file}}
                                  style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 50,
                                  }}
                                  paused={true}
                                  disableFullscreen={true}
                                  seekColor="transparent"
                                  disableSeekbar
                                  controls={true}
                                  muted={true}
                                  onLoadStart={onLoadStart}
                                  onLoad={onLoad}
                                />
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
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#141414',
                              fontWeight: '600',
                              fontFamily: Fonts.fontName.GibsonBold,
                              lineHeight: 15,
                            }}>
                            {recommendedItem.first_name}{' '}
                            {recommendedItem.last_name != null &&
                            recommendedItem.last_name != ''
                              ? recommendedItem.last_name
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#9A9A9A',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                              lineHeight: 14,
                            }}>
                            {recommendedItem.job_title}
                          </Text>
                          <Text
                            style={{
                              width: 180,
                              color: '#C2C2C2',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                              lineHeight: 14,
                              textDecorationLine: 'underline',
                            }}>
                            {recommendedItem.city}, {recommendedItem.state},{' '}
                            {recommendedItem.country}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => sendLinkInvite(recommendedItem.id)}
                        style={{
                          alignSelf: 'center',
                          width: width / 4,
                          height: 35,
                          borderRadius: 8,
                          backgroundColor: '#4A20E4',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 15,
                            fontWeight: '600',
                          }}>
                          Link +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                height: 80,
                alignItems: 'center',
              }}>
              <Text style={{color: '#141414', fontSize: 14, lineHeight: 15}}>
                No data available
              </Text>
            </View>
          )}
          {/* -----Recommended Connections Array map end-----*/}
          <View style={{height: 130}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("mnfhvhvstate", state)
  return {};
};

export default connect(mapStateToProps, {})(ConnectionTab);

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
