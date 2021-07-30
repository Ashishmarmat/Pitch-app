import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import likeShareMoments from '../../actions/ShareMomentLike';
import ProfileGet from '../../actions/ProfileActions';
import {likeShareMomentsSuccess} from '../../actions/ShareMomentLike';
import LazyLoader from '../../components/atoms/LazyLoader';
import {postEndUserProfile} from '../../actions/EndUserProfileAction';
import Video from 'react-native-video';
import {PinchZoomView} from 'react-native-pinch-to-zoom-view';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const OpenShareMomentScreen = props => {
  console.log('props@@£££@@', props);
  const dispatch = useDispatch();

  const ProfileDataRes = useSelector(state => state.EndUserProfileReducer.data);

  const [uiRender, setUiRender] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sharedMomentImage, setSharedMomentImage] = useState('');
  const [sharedMomentTags, setSharedMomentTags] = useState('');
  const [sharedMomentPostId, setSharedMomentPostId] = useState('');
  const [issetTime, setIsSetTime] = useState('');
  const [sharedMomentLikes, setSharedMomentLikes] = useState(0);
  const [SharedMomentCmnt, setSharedMomentCmnt] = useState(0);
  const [shareItemData, setShareItemData] = useState();
  const [SharedMomentType, setSharedMomentType] = useState();
  const [isLikeCounts, setIsLikeCounts] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [ProfileName, setProfileName] = useState('');
  const [ProfileLast, setProfileLast] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [token, setToken] = useState('');
  const [ProfileImageType, setProfileImageType] = useState();
  const [isLoading, setIsLoadings] = useState(false);
  const [ShareUserID, setShareUserID] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsLoading(false);
  };

  useEffect(() => {
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  useEffect(() => {
    if (ProfileDataRes && ProfileDataRes.data != undefined) {
      setProfileName(ProfileDataRes.data.first_name);
      setProfileLast(ProfileDataRes.data.last_name);
      setProfileJob(ProfileDataRes.data.job_title);
      setProfileImage(ProfileDataRes.data.profile_file);
      setProfileImageType(ProfileDataRes.data.image_type);
    }
  }, [ProfileDataRes]);

  console.log('ProfileDataRes', ProfileDataRes);

  useEffect(() => {
    setShareItemData(props.navigation.state.params.shareItem);
    setShareUserID(props.navigation.state.params.shareItem.user_id);
    setSharedMomentImage(props.navigation.state.params.shareItem.image);
    setSharedMomentTags(props.navigation.state.params.shareItem.tags);
    setSharedMomentPostId(props.navigation.state.params.shareItem.id);
    setIsSetTime(props.navigation.state.params.shareItem.updatesharemomenttime);
    setSharedMomentType(props.navigation.state.params.shareItem.imagetype);

    if (props.navigation.state.params.shareItem.commentcount === false) {
      setSharedMomentCmnt(0);
    } else {
      setSharedMomentCmnt(props.navigation.state.params.shareItem.commentcount);
    }

    if (props.navigation.state.params.shareItem.count === false) {
      setSharedMomentLikes(0);
    } else {
      setSharedMomentLikes(props.navigation.state.params.shareItem.count);
    }

    if (props.navigation.state.params.shareItem.likestatus === '1') {
      setIsLikeCounts(true);
    } else {
      setIsLikeCounts(false);
    }
  }, []);

  useEffect(() => {
    console.log('props shared moments', props);
    if (props != undefined) {
      if (
        props.LikeShareMomentReducer != undefined &&
        props.LikeShareMomentReducer.data != undefined
      ) {
        if (props.LikeShareMomentReducer.response_code === 200) {
          dispatch(ProfileGet());
          dispatch(likeShareMomentsSuccess());
          console.log('Inside called');
        }
      }
    }
  }, [props]);

  const likePost = () => {
    setIsLikeCounts(!isLikeCounts);
    likeCall();
  };

  const likeCall = () => {
    if (isLikeCounts === true) {
      setSharedMomentLikes(sharedMomentLikes - 1);
    } else if (isLikeCounts === false) {
      setSharedMomentLikes(sharedMomentLikes + 1);
    }
    setUiRender(!uiRender);
    const sendData={
      post_id : sharedMomentPostId,
      sender_user_id:ShareUserID
    }
    dispatch(likeShareMoments(sendData));
  };
  const sharedMomentsComment = () => {
    toggleModal();
    NavigationService.navigate('ShareMomentInfoScreen', {
      shareItem: shareItemData,
      screenType: 'OpenShareMomentScreen',
    });
  };
  const goBackFunc = () => {
    NavigationService.goBack();
  };

  const headerView = () => {
    return (
      <View style={[styles.headerMainView, {zIndex: 222}]}>
        <View style={{position: 'absolute', top: 12, left: 15, zIndex: 222}}>
          <TouchableOpacity
            onPress={() => goBackFunc()}
            style={styles.backImgMainView}>
            <Text style={{ fontSize: 20, color: '#000' }}> X </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onLoadStart = () => {
    console.log('loadstart');
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />

      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        {headerView()}
        <View style={{flex: 1, zIndex: 0}}>
          <PinchZoomView scaleable={true}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => toggleModal()}
              style={{alignSelf: 'center', position: 'absolute', top: 75}}>
              {sharedMomentImage != undefined ? (
                <View style={{zIndex: 0}}>
                  {SharedMomentType === 1 ? (
                    <LazyLoader
                      uriImg={sharedMomentImage}
                      style={styles.shareMomBigImage}
                    />
                  ) : (
                    // <Image source={{ uri: sharedMomentImage }} style={styles.shareMomBigImage} />
                    <View>
                      {isLoading ? (
                        <ActivityIndicator
                          animating
                          size="large"
                          color="gray"
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '30%',
                          }}
                        />
                      ) : null}
                      <Video
                        source={{uri: sharedMomentImage}}
                        style={{
                          height: height / 1.62,
                          width: width - 4,
                          // resizeMode: 'contain',
                          borderRadius: 20,
                          // marginTop: scale(20),
                          alignSelf: 'center',
                        }}
                        paused={true}
                        // resizeMode={'cover'}
                        disableFullscreen={false}
                        seekColor="transparent"
                        disableSeekbar
                        controls={true}
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                        muted={false}
                      />
                    </View>
                  )}
                </View>
              ) : null}
            </TouchableOpacity>
          </PinchZoomView>
        </View>
        <Modal
          animationInTiming={1}
          animationOutTiming={1}
          backdropOpacity={0.0}
          isVisible={isModalVisible}
          // animationIn=''
          onBackdropPress={() => setModalVisible(!isModalVisible)}>
          <View style={styles.upperModalView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: width - 40,
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row'}}>
                {ProfileImage != 'undefined' ? (
                  // <Image source={{ uri: ProfileImage }}
                  //     style={{ height: scale(46), width: scale(46), resizeMode: 'cover', borderRadius: 50 }} />

                  <View>
                    {ProfileImageType === 1 ? (
                      // <Image
                      //     resizeMode={'contain'}
                      //     source={
                      //         { uri: ProfileImage }
                      //     }
                      //     style={{ height: scale(46), width: scale(46), resizeMode: 'cover', borderRadius: 50 }}
                      // />
                      <LazyLoader
                        uriImg={ProfileImage}
                        style={{
                          height: scale(46),
                          width: scale(46),
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    ) : (
                      <View>
                        {isLoading ? (
                          <ActivityIndicator
                            animating
                            size="large"
                            color="gray"
                            style={{
                              position: 'absolute',
                              alignSelf: 'center',
                              top: '30%',
                            }}
                          />
                        ) : null}
                        <Video
                          source={{uri: ProfileImage}}
                          style={{
                            height: scale(46),
                            width: scale(46),
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
                      </View>
                    )}
                  </View>
                ) : (
                  <Image
                    source={Images.profile2}
                    style={{
                      height: scale(48),
                      width: scale(48),
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                )}

                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      lineHeight: 23,
                      fontWeight: '800',
                    }}>
                    {ProfileName != null &&
                    ProfileName != '' &&
                    ProfileName != undefined
                      ? ProfileName
                      : null}{' '}
                    {ProfileLast != null &&
                    ProfileLast != '' &&
                    ProfileLast != undefined
                      ? ProfileLast
                      : null}
                  </Text>
                  <Text
                    style={{color: '#fff', fontSize: 12, fontWeight: 'normal'}}>
                    {ProfileJob != null &&
                    ProfileJob != '' &&
                    ProfileJob != undefined
                      ? ProfileJob
                      : null}
                  </Text>
                  <Text
                    style={{color: '#fff', fontSize: 10, fontWeight: 'normal'}}>
                    {issetTime != null &&
                    issetTime != '' &&
                    issetTime != undefined
                      ? issetTime
                      : null}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.modalMainView}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 30,
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../assets/images/Vector.png')}
                  style={styles.likeBtn}
                />

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 15,
                    marginLeft: 5,
                  }}>
                  {sharedMomentLikes} Likes
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => sharedMomentsComment()}
                style={{flexDirection: 'row'}}>
                <Image
                  source={Images.chatImg}
                  style={{height: 15, width: 15, tintColor: '#fff'}}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 15,
                    marginLeft: 5,
                  }}>
                  {SharedMomentCmnt} Comments
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 1,
                width: width,
                marginTop: 25,
                alignSelf: 'center',
                opacity: 0.4,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'space-between',
                marginHorizontal: 40,
              }}>
              <TouchableOpacity
                onPress={() => likePost()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                  width: 100,
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/Vector.png')}
                  style={styles.biglikeBtn}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 14,
                    marginLeft: 5,
                  }}>
                  Likes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sharedMomentsComment()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                  width: 100,
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.chatImg}
                  style={{height: 18, width: 18, tintColor: '#fff'}}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 14,
                    marginLeft: 5,
                  }}>
                  Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('OpenShareMomentScreen state', state);
  return {
    EndUserProfileReducer: state.EndUserProfileReducer.data,
    profileRes: state.profileReducer.data,
    LikeShareMomentReducer: state.LikeShareMomentReducer.data,
    getPostCommentsData: state.sharedMomentsCommentReducer.getPostCommentsData,
    getSharedComments: state.sharedMomentsCommentReducer.getSharedComments,
    getLikeSharedMomentsComments:
      state.sharedMomentsCommentReducer.gatSharedLikeCommentsCalled,
  };
};

export default connect(mapStateToProps, {})(OpenShareMomentScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A1753',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backImgMainView: {
    justifyContent: 'center',
    marginLeft: 18,
    top: 15,
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
  },

  likeBtn: {
    // flex: 1,
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#fff',
  },
  biglikeBtn: {
    // flex: 1,
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#fff',
  },
  commentBtn: {
    flex: 1,
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeBtnCrcl: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    tintColor: '#fff',
  },

  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
  },
  titleTextStyle: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '600',
  },

  shareMomBigImage: {
    height: height / 1.62,
    width: width - 4,
    resizeMode: 'contain',
    borderRadius: 20,
    // marginTop: scale(20),
    alignSelf: 'center',
  },
  modalMainView: {
    position: 'absolute',
    bottom: 16,
    backgroundColor: '#2A1753',
    height: height / 7,
    width: width,
    alignSelf: 'center',
  },
  upperModalView: {
    position: 'absolute',
    top: 67,
    backgroundColor: '#2A1753',
    height: height / 11,
    width: width,
    alignSelf: 'center',
  },
});
