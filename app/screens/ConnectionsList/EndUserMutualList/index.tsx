import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import LazyLoader from '../../../components/atoms/LazyLoader';
import {postenduserLinkconnectList} from '../../../actions/ConnectionsAction';
import {ScrollView} from 'react-native-gesture-handler';
import {
  sendUserLinkApi,
  sendUserLinkSuccess,
} from '../../../actions/UserLinkedActions';
import {postEndUserProfile} from '../../../actions/EndUserProfileAction';
import Video from 'react-native-video';
import {postEndUserProfileSuccess} from '../../../actions/EndUserProfileAction';
import Share from 'react-native-share';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EndUserMutualList = props => {
  const dispatch = useDispatch();

  const getCurrentMutualListRes = useSelector(
    state => state.ConnectionReducer.postUserLinkedList,
  );
  const linkSendRes = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );
  // console.log("getCurrentMutualListRes.................",getCurrentMutualListRes)

  const [uiRender, setUirender] = useState(false);
  const [mutualArray, setMutualArray] = useState([]);
  const [connectionArray, setConnectionArray] = useState([]);
  const [totalCount, setTotalCount] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // -----Called UseEffect on Page load----- //
  useEffect(() => {
    // console.log("props",props)
    if (props != undefined && props.navigation.state != undefined) {
      if (props.navigation.state.params != undefined) {
        setUserId(props.navigation.state.params.user_id);
        const sendData = {
          user_id: props.navigation.state.params.user_id,
        };
        dispatch(postenduserLinkconnectList(sendData));
      }
    }
  }, []);

  // -----Called UseEffect when get connection list----- //
  useEffect(() => {
    if (
      getCurrentMutualListRes != undefined &&
      getCurrentMutualListRes.data != undefined
    ) {
      if (getCurrentMutualListRes.data.length > 0) {
        setMutualArray(getCurrentMutualListRes.data[0].matuallist);
        setConnectionArray(getCurrentMutualListRes.data[0].connectionlist);
        setTotalCount(getCurrentMutualListRes.data[0].totalcount);
      }
    }
  }, [getCurrentMutualListRes]);

  // -----Called UseEffect when link api called----- //
  // useEffect(() => {
  //     if (linkSendRes != undefined) {
  //         if (linkSendRes.response_code === 200) {
  //             dispatch(getConnectionMutualList())
  //             dispatch(sendUserLinkSuccess())
  //         }
  //     }
  //     setUirender(!uiRender)
  // }, [linkSendRes]);

  const goToEndUser = async listItem => {
    AsyncStorage.setItem('EndUSerId', listItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen', 'oiyuo');
    // const sendData = {
    //     user_id: listItem.receiver_id
    // }
    // dispatch(postEndUserProfile(sendData))
    // dispatch(postEndUserProfileSuccess())
    // setTimeout(() => {
    //     NavigationService.navigate('OtherUserProfileScreen')
    // }, 1500);
  };

  // -----Link btn function call----- //
  const sendLinkInvite = mutualItem => {
    // console.log('igggff', mutualItem);
    dispatch(sendUserLinkApi(mutualItem.receiver_id));
    setUirender(!uiRender);
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
      <View>
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
                    <Text style={{ alignSelf: 'center', color: 'rgba(60, 60, 67, 0.6)', fontSize: 17 }}>Search Connections</Text>
                </TouchableOpacity> */}
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              height: 45,
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 12,
            }}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <Image source={Images.back_button} style={styles.backImgStyle} />
            </TouchableOpacity>
            {totalCount != undefined && (
              <Text
                style={{
                  color: '#252020',
                  fontSize: 17,
                  lineHeight: 17,
                  fontWeight: '600',
                }}>
                Connections
              </Text>
            )}
            <Text
              style={{
                color: '#252020',
                fontSize: 17,
                fontWeight: '600',
              }}></Text>
          </View>
        </View>
        <View>
          {/* <View style={{ padding: 10, flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{ fontSize: 17, color: '#252020', fontWeight: 'bold', }}>Mutual Links</Text>
                        <TouchableOpacity>
                        <Text style={{ fontSize: 12, color: '#252020', fontWeight: 'bold', textDecorationLine:'underline'}}>See All</Text>
                        </TouchableOpacity>
                    </View> */}
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 1,
            }}
          />
          {mutualArray && mutualArray.length > 0 ? (
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
                                  left: '8%',
                                  right: 0,
                                  top: '12%',
                                }}>
                                <Image
                                  source={require('../../../../assets/images/play-button.png')}
                                  style={{
                                    opacity: 0.4,
                                    height: 36,
                                    width: 36,
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
                      <View style={{marginLeft: 10}}>
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
                            textDecorationLine: 'underline',
                          }}>
                          {mutualItem.city}, {mutualItem.state},{' '}
                          {mutualItem.country}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => sendLinkInvite(mutualItem)}
                      style={{
                        alignSelf: 'center',
                        width: width / 4,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#ABABAB',
                      }}>
                      <Text
                        style={{
                          color: '#ABABAB',
                          fontSize: 15,
                          fontWeight: '600',
                        }}>
                        Unlink
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                height: 150,
                width: width,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>No data available</Text>
            </View>
          )}
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("EndUserMutualList state",state)
  return {};
};

export default connect(mapStateToProps, {})(EndUserMutualList);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
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
    height: height * 0.023,
    width: height * 0.023,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 50,
    width: width - 70,
    alignSelf: 'center',
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
});
