import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import {useFocusEffect} from '@react-navigation/native';
import NavigationService from '../../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import LazyLoader from '../../../components/atoms/LazyLoader';
import {getConnectionMutualList} from '../../../actions/ConnectionsAction';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import moment from 'moment';
import {
  createRoomApi,
  createRoomSuccess,
  chatHistorySuccess,
} from '../../../actions/MessagesAction';
import {postEndUserProfileSuccess} from '../../../actions/EndUserProfileAction';
import Share from 'react-native-share';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MutualAllList = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const charRoomResData = useSelector(
    state => state.MessagesReducer.createRoomData,
  );
  const getCurrentMutualListRes = useSelector(
    state => state.ConnectionReducer.getCurrentMutualList,
  );
  const [token, setToken] = useState('');
  const [showMsgData, setShowMsgData] = useState({});
  const [uiRender, setUirender] = useState(false);
  const [mutualArray, setMutualArray] = useState([]);

  useEffect(() => {
    dispatch(getConnectionMutualList());
    AlertFunction();
  }, []);

  const AlertFunction = async () => {
    const tokenGet = await AsyncStorage.getItem('Authorization');
    setToken(tokenGet);
  };
  useEffect(() => {
    if (
      getCurrentMutualListRes != undefined &&
      getCurrentMutualListRes.data != undefined
    ) {
      if (getCurrentMutualListRes.data.length > 0) {
        setMutualArray(getCurrentMutualListRes.data[0].matuallist);
      }
    }
  }, [getCurrentMutualListRes]);

  const goToEndUser = async listItem => {
    // console.log("listItem", listItem)
    AsyncStorage.setItem('EndUSerId', listItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };
  console.log('showMsgData',showMsgData);

  useEffect(() => {
    if (charRoomResData != undefined && charRoomResData.data != undefined) {
      // console.log("charRoomResData.data", charRoomResData.data)
      dispatch(chatHistorySuccess());
      NavigationService.navigate('MessageChatScreen', {
        roomId: charRoomResData.data.room_id,
        selectItem: {
          user_id: showMsgData.receiver_id,
          receiver_id: showMsgData.user_id,
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

  const chatRoomApiCall = mutualItem => {
    setShowMsgData(mutualItem);
    // console.log("mutualItem", mutualItem)
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.headerMainView}>
        <View></View>
        {/* <Image source={Images.HomeLeftHeader} style={styles.leftHeaderImage} /> */}
        <TouchableOpacity onPress={() => openShare()}>
              <Image
                source={Images.HomeRightHeader}
                style={styles.rightHeaderImage}
              />
            </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.searchBarMainView}>
                <View style={styles.searchIconImageView}>
                    <Image source={Images.SearchImg} style={styles.searchIconStyle} />
                </View>
                <Text style={{ alignSelf: 'center', color: 'rgba(60, 60, 67, 0.6)', fontSize: 17 }}>Search</Text>
            </TouchableOpacity> */}
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
      <ScrollView>
        <View>
          <View>
            <View
              style={{
                height: 50,
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 12,
              }}>
              <TouchableOpacity onPress={() => NavigationService.goBack()}>
                <Image
                  source={Images.back_button}
                  style={styles.backImgStyle}
                />
              </TouchableOpacity>
              <Text style={{color: '#252020', fontSize: 17, fontWeight: '600'}}>
                {mutualArray.length} Connections
              </Text>
              <Text
                style={{
                  color: '#252020',
                  fontSize: 17,
                  fontWeight: '600',
                }}></Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 1,
            }}
          />
          {mutualArray.length > 0 ? (
            <View>
              {mutualArray.map((mutualItem, mutualIndex) => (
                <View key={mutualIndex}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
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
                              <View
                                style={{
                                  position: 'absolute',
                                  left: '6%',
                                  right: 0,
                                  top: '6%',
                                }}>
                                <Image
                                  source={require('../../../../assets/images/play-button.png')}
                                  style={{
                                    height: 40,
                                    width: 40,
                                    resizeMode: 'contain',
                                  }}
                                />
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

                      {/* <LazyLoader uriImg={mutualItem.profile_file} style={{ height: 45, width: 45, resizeMode: 'cover', borderRadius: 50 }} /> */}
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
                            width: width / 2,
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
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                height: 200,
                alignItems: 'center',
              }}>
              <Text style={{color: '#141414', fontSize: 14, lineHeight: 15}}>
                No data available
              </Text>
            </View>
          )}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("ConnectionMutualList state",state)
  return {};
};

export default connect(mapStateToProps, {})(MutualAllList);

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
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
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
    height: height * 0.023,
    width: height * 0.023,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 50,
    width: width - 70,
    alignSelf: 'center',
  },
});
