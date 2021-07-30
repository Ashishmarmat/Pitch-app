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
import {getrecommendedConnectionList} from '../../../actions/ConnectionsAction';
import {ScrollView} from 'react-native-gesture-handler';
import {
  sendUserLinkApi,
  sendUserLinkSuccess,
} from '../../../actions/UserLinkedActions';
import Video from 'react-native-video';
import {
  postEndUserProfile,
  postEndUserProfileSuccess,
} from '../../../actions/EndUserProfileAction';
import Share from 'react-native-share';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecommendedConnection = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const linkSendRes = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );
  const getrecommendedListRes = useSelector(
    state => state.ConnectionReducer.getRecommendedList,
  );
  // console.log("getCurrentMutualListRes",getCurrentMutualListRes)

  const [uiRender, setUirender] = useState(false);
  const [recommendedListArray, setRecommendedListArray] = useState([]);
  useEffect(() => {
    dispatch(getrecommendedConnectionList());
  }, []);

  // -----Called UseEffect when get connection list----- //
  useEffect(() => {
    if (
      getrecommendedListRes != undefined &&
      getrecommendedListRes.data != undefined
    ) {
      if (getrecommendedListRes.data.length > 0) {
        setRecommendedListArray(getrecommendedListRes.data);
      }
    }
  }, [getrecommendedListRes]);

  useEffect(() => {
    if (linkSendRes != undefined) {
      if (linkSendRes.response_code === 200) {
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
  const SheredInsightgoToEndUser = async listItem => {
    console.log('listItem', listItem);
    AsyncStorage.setItem('EndUSerId', listItem.id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };

  const onLoadStart = () => {
    console.log('loadstart');
    setIsLoading(true);
  };
  const onLoad = () => {
    console.log('load');
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
                Recommended Connections
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
          {recommendedListArray.length > 0 ? (
            <View>
              {recommendedListArray.map((recommendedItem, recommendedIndex) => (
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
                      onPress={() => SheredInsightgoToEndUser(recommendedItem)}
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
                              <View>
                                {isLoading ? (
                                  <ActivityIndicator
                                    animating
                                    size="small"
                                    color="gray"
                                    style={{
                                      position: 'absolute',
                                      alignSelf: 'center',
                                      top: '44%',
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

                      {/* <LazyLoader uriImg={recommendedItem.profile_file} style={{ height: 45, width: 45, resizeMode: 'cover', borderRadius: 50 }} /> */}
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
                        Link+
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
          {/* <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 1,
            }}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("SharedInsightScreen state",state)
  return {};
};

export default connect(mapStateToProps, {})(RecommendedConnection);

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
