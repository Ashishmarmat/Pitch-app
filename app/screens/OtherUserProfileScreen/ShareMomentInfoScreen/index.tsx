import React, { createRef, useEffect, useState } from 'react';
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
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../../theme/scale';
import { Colors, Images, Fonts } from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import likeShareMoments from '../../../actions/ShareMomentLike';
import {
  getSharedMomentsCommentApi,
  postSharedCommentsAPi,
  postSharedCommentsSuccess,
  getSharedMomentsCommentSuccess,
  likeOnSharedCommentsApi,
  likeOnSharedCommentsSuccess,
} from '../../../actions/SharedMomentsComments';
import ProfileGet from '../../../actions/ProfileActions';
import { likeShareMomentsSuccess } from '../../../actions/ShareMomentLike';
import LazyLoader from '../../../components/atoms/LazyLoader';
import Video from 'react-native-video';
import { postEndUserProfile } from '../../../actions/EndUserProfileAction';
import { postEndUserProfileSuccess } from '../../../actions/EndUserProfileAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ShareMomentInfoScreen = props => {
  // console.log("props@@£££@@", props)
  const dispatch = useDispatch();

  const ProfileDataRes = useSelector(state => state.EndUserProfileReducer.data);
  const getPostCommentsDataRes = useSelector(
    state => state.sharedMomentsCommentReducer.getPostCommentsData,
  );

  // console.log("ProfileDataRes@@", ProfileDataRes)

  const [uiRender, setUiRender] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sharedMomentImage, setSharedMomentImage] = useState('');
  const [sharedMomentTags, setSharedMomentTags] = useState('');
  const [sharedMomentPostId, setSharedMomentPostId] = useState('');
  const [issetTime, setIsSetTime] = useState('');
  const [sharedMomentLikes, setSharedMomentLikes] = useState(0);
  const [isLikeCounts, setIsLikeCounts] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsFlatList, setCommentsFlatlist] = useState([]);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [renderHeight, setRenderHeight] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [ProfileName, setProfileName] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [ProfileImgType, setProfileImgType] = useState();
  const [profileUpdateTime, setProfileUpdateTime] = useState('');
  const [rplyCommentId, setReplyCommentId] = useState('');
  const [rplyCommentText, setRplyCommentText] = useState('');
  const [replyCommentArray, setReplyArrayComment] = useState('');
  const [replyCommentArrayIndex, setReplyArrayCommentIndex] = useState('');
  const [imageloading, setImageLoading] = useState(true);
  const [token, setToken] = useState('');
  const [shareItemData, setShareItemData] = useState();
  const [SharedMomentType, setSharedMomentType] = useState();
  const [screenType, setScreenType] = useState('');
  const [isLoading, setIsLoadings] = useState(false);
  const [ShareUserID, setShareUserID] = useState();
  const [ProfileNameRes, setProfileNameRes] = useState('');
  const [ProfileLastRes, setProfileLastRes] = useState('');
  const [ProfileJobRes, setProfileJobRes] = useState('');
  const [ProfilePicRes, setProfilePicRes] = useState('');
  const [ProfileImageType, setProfileImageType] = useState();
  const [ProfileID, setProfileID] = useState();
  const [UserId, setUserId] = useState('');


  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
  };

  const toggleModal = () => {
    setIsCommentModal(!isCommentModal);
    setRenderHeight(false);
    setIsLoading(false);
  };

  useEffect(() => {
    getTokenFunc();
    userIDfunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };
  // console.log('commentsFlatList', commentsFlatList);

  useEffect(() => {
    if (ProfileDataRes && ProfileDataRes.data != undefined) {
      setProfileNameRes(ProfileDataRes.data.first_name);
      setProfileLastRes(ProfileDataRes.data.last_name);
      setProfileJobRes(ProfileDataRes.data.job_title);
      setProfilePicRes(ProfileDataRes.data.profile_file);
      setProfileImageType(ProfileDataRes.data.image_type);
      setProfileID(ProfileDataRes.data.user_id);
    }
  }, [ProfileDataRes]);

  useEffect(() => {
    console.log("porps.......Sh", props.navigation.state.params.shareItem)
    if (props != undefined) {
      if (props.navigation.state.params != undefined) {
        setScreenType(props.navigation.state.params.screenType);
      }
    }
    setShareItemData(props.navigation.state.params.shareItem);
    setSharedMomentImage(props.navigation.state.params.shareItem.image);
    setSharedMomentTags(props.navigation.state.params.shareItem.tags);
    setSharedMomentPostId(props.navigation.state.params.shareItem.id);
    setIsSetTime(props.navigation.state.params.shareItem.updatesharemomenttime);
    setSharedMomentType(props.navigation.state.params.shareItem.imagetype);
    setShareUserID(props.navigation.state.params.shareItem.user_id);
    const sendData = {
      post_id: props.navigation.state.params.shareItem.id,
    };
    dispatch(getSharedMomentsCommentApi(sendData));
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
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(likeOnSharedCommentsSuccess());
  }, []);

  useEffect(() => {
    // console.log("props shared moments", props)
    if (props != undefined) {
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        const name =
          props.profileRes.data.first_name + props.profileRes.data.last_name;
        setProfileName(name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJob(props.profileRes.data.job_title);
        setProfileImgType(props.profileRes.data.image_type);
      }
      if (
        props.LikeShareMomentReducer != undefined &&
        props.LikeShareMomentReducer.data != undefined
      ) {
        if (props.LikeShareMomentReducer.response_code === 200) {
          dispatch(ProfileGet());
          dispatch(likeShareMomentsSuccess());
          // console.log("Inside called")
        }
      }

      if (props.getSharedComments != undefined) {
        if (
          props.getSharedComments.data != undefined &&
          props.getSharedComments.data.length > 0
        ) {
          let tempArray = [];
          // console.log("props.getSharedComments.data", props.getSharedComments.data)
          setCommentsFlatlist(props.getSharedComments.data);
          const data1 = props.getSharedComments.data;
          if (replyCommentArrayIndex != '' && data1 != undefined) {
            // console.log("data1", data1[replyCommentArrayIndex])
            tempArray.push(data1[replyCommentArrayIndex].replycommentlist);
            setReplyArrayComment(...tempArray);
          }
        }
      }

      if (props.getLikeSharedMomentsComments != undefined) {
        if (
          props.getLikeSharedMomentsComments.data != undefined &&
          props.getLikeSharedMomentsComments.response_code === 200
        ) {
          const sendData = {
            post_id: props.navigation.state.params.shareItem.id,
          };
          dispatch(getSharedMomentsCommentApi(sendData));
        }
      }
    }
  }, [props]);

  useEffect(() => {
    if (props.getPostCommentsData != undefined) {
      if (props.getPostCommentsData.response_code === 200) {
        const sendData = {
          post_id: props.navigation.state.params.shareItem.id,
        };
        setIsLoading(false);
        dispatch(getSharedMomentsCommentApi(sendData));
        dispatch(postSharedCommentsSuccess());
        dispatch(likeOnSharedCommentsSuccess());
      }
    }
  }, [getPostCommentsDataRes]);

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

    const sendData = {
      post_id: sharedMomentPostId,
      sender_user_id: ShareUserID
    }
    dispatch(likeShareMoments(sendData));
  };

  const goBackFunc = () => {
    if (screenType === 'FeedScreen' || screenType === 'OpenShareMomentScreen' ) {
      NavigationService.navigateAndReset('HomeScreen');
    } else {
      NavigationService.goBack();
      dispatch(postSharedCommentsSuccess());
    }
  };

  const OpenShareMomentPost = () => {
    // console.log('qpqpqppq');

    NavigationService.navigate('OpenShareMomentScreen', {
      shareItem: shareItemData,
    });
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => goBackFunc()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        {ProfileNameRes != undefined && ProfileNameRes != null && (
          <View style={styles.titleMainView}>
            <Text style={styles.titleTextStyle}>{ProfileNameRes}'s Post</Text>
          </View>
        )}
      </View>
    );
  };

  const sendComment = () => {
    const sendData = {
      post_id: sharedMomentPostId,
      comment: commentText,
      sender_user_id: ShareUserID
    };
    console.log('sendData££', sendData);

    dispatch(postSharedCommentsAPi(sendData));
    setCommentText('');
    setIsLoading(true);
  };

  // const commentsLikeComment = (item) => {
  //     const dataSend = {
  //         comment_id: item.id
  //     }
  //     dispatch(likeOnSharedCommentsApi(dataSend))
  // }
  const commentsLikeComment = item => {
    console.log('itemitem', item);
    const data = new FormData();
    data.append('comment_id', item.id);

    fetch('http://3.140.234.233/pitch/apiV1/sharedmomentlikecomments', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
        version: '1',
      },
    })
      .then(res => res.json())
      .then(async res => {
        console.log('sharedmomentlikecomments res', res);
        if (res.status != 0) {
          const sendData = {
            post_id: props.navigation.state.params.shareItem.id,
          };
          console.log('question_id', sendData);

          setIsLoading(false);
          dispatch(getSharedMomentsCommentApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openRplyModal = (data, index) => {
    // console.log("openRplyModal", data)
    setReplyCommentId(data.id);
    setReplyArrayCommentIndex(index);
    setReplyArrayComment(data.replycommentlist);
    setIsCommentModal(!isCommentModal);
  };

  const replyOnComments = () => {
    setIsLoading(true);
    setRplyCommentText('');
    const data = new FormData();
    data.append('comment_id', rplyCommentId);
    data.append('message', rplyCommentText);

    fetch('http://3.140.234.233/pitch/apiV1/sharedmomentcommentsreply', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
        version: '1',
      },
    })
      .then(res => res.json())
      .then(async res => {
        // console.log('sharedmomentcommentsreply res', res)
        setIsLoading(false);
        if (res.status != 0) {
          const sendData = {
            post_id: props.navigation.state.params.shareItem.id,
          };
          // console.log("sendData", sendData)
          dispatch(getSharedMomentsCommentApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const _onLoadEnd = () => {
    setImageLoading(false);
  };
  
  const goToEndUserSharedm = async listItem => {
    if (listItem.user_id != UserId) {
      const sendData = {
        user_id: listItem.user_id
      };
      dispatch(postEndUserProfile(sendData));
      // AsyncStorage.setItem('EndUSerId', listItem.user_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    }
    else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };

  const goToEndUser = async () => {
    if (ProfileID != UserId) {
      AsyncStorage.setItem('EndUSerId', ProfileID)
      // dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    }
    else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };
  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    // console.log("load")
    setIsLoadings(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ height: height / 2 + 220 }}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => goToEndUser()}
                  style={{ flexDirection: 'row' }}>
                  {ProfilePicRes != 'undefined' ? (
                    <View>
                      {ProfileImageType === 1 ? (
                        <LazyLoader
                          uriImg={ProfilePicRes}
                          style={{
                            height: scale(66),
                            width: scale(66),
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
                                top: '30%',
                              }}
                            />
                          ) : null}
                          <Video
                            source={{ uri: ProfilePicRes }}
                            style={{
                              height: scale(66),
                              width: scale(66),
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
                        height: scale(66),
                        width: scale(66),
                        resizeMode: 'cover',
                        borderRadius: 50,
                      }}
                    />
                  )}

                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 17,
                        lineHeight: 23,
                        fontWeight: '800',
                        fontFamily: Fonts.fontName.GibsonRegular,
                      }}>
                      {ProfileNameRes != null &&
                        ProfileNameRes != '' &&
                        ProfileNameRes != undefined
                        ? ProfileNameRes
                        : null}{' '}
                      {ProfileLastRes != null &&
                        ProfileLastRes != '' &&
                        ProfileLastRes != undefined
                        ? ProfileLastRes
                        : null}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {ProfileJobRes != null &&
                        ProfileJobRes != '' &&
                        ProfileJobRes != undefined
                        ? ProfileJobRes
                        : null}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {issetTime != null &&
                        issetTime != '' &&
                        issetTime != undefined
                        ? issetTime
                        : null}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => toggleModal()} style={{ justifyContent: 'center', height: scale(40) }}>
                    <Image source={Images.threeDotsImg} style={{ width: scale(23), height: scale(5), resizeMode: 'contain' }} />
                </TouchableOpacity> */}
              </View>
              {sharedMomentImage != undefined ? (
                <TouchableOpacity
                  // style={{marginHorizontal:'10%'}}
                  onPress={() => OpenShareMomentPost()}>
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
                            top: '45%',
                          }}
                        />
                      ) : null}
                      <Video
                        source={{ uri: sharedMomentImage }}
                        style={{
                          width: '98%',
                          height: 195,
                          alignSelf: 'center',
                          marginTop: 10,
                        }}
                        paused={true}
                        // resizeMode={'cover'}
                        disableFullscreen={true}
                        seekColor="transparent"
                        disableSeekbar
                        controls={true}
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 32,
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Image
                  source={require('../../../../assets/images/Vector1.png')}
                  style={{
                    width: scale(15),
                    height: scale(15),
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    tintColor: 'blue',
                  }}
                />
                <Text
                  style={{
                    color: '#4D4D4D',
                    fontSize: 12,
                    lineHeight: 15,
                    marginLeft: 5,
                  }}>
                  {sharedMomentLikes} likes
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#EBEBEB',
                  borderBottomWidth: 1,
                  width: 375,
                  marginTop: 9,
                  alignSelf: 'center',
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 32,
                  justifyContent: 'space-between',
                  marginTop: 6,
                }}>
                <TouchableOpacity
                  onPress={() => likePost()}
                  style={{ flexDirection: 'row', flex: 1 }}>
                  {isLikeCounts ? (
                    <Image
                      source={require('../../../../assets/images/Vector1.png')}
                      style={{
                        width: scale(15),
                        height: scale(15),
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        tintColor: 'blue',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/images/Vector1.png')}
                      style={styles.likeBtn}
                    />
                  )}
                  {isLikeCounts ? (
                    <Text
                      style={{
                        color: '#4D4D4D',
                        fontSize: 12,
                        lineHeight: 15,
                        marginLeft: 5,
                      }}>
                      Unlike
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#4D4D4D',
                        fontSize: 12,
                        lineHeight: 15,
                        marginLeft: 5,
                      }}>
                      Like
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', right: 8 }}>
                  <View>
                    <Image
                      source={require('../../../../assets/images/comment1.png')}
                      style={styles.commentBtn}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#4D4D4D',
                      fontSize: 12,
                      lineHeight: 15,
                      marginLeft: 5,
                    }}>
                    Comment
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  {/* <TouchableOpacity style={{ flexDirection: 'row' }}>
                                        <Image
                                            source={require('../../../../assets/images/shareArrow.png')}
                                            style={styles.likeBtn} />

                                        <Text style={{ color: '#4D4D4D', fontSize: 12, lineHeight: 15, marginLeft: 5 }}>Share
                                        </Text>
                                    </TouchableOpacity> */}
                </View>
              </View>
              <Text
                style={{
                  color: '#141414',
                  fontSize: 13,
                  lineHeight: 15,
                  marginLeft: 22,
                  marginTop: 9,
                }}>
                Comments
              </Text>
              {commentsFlatList && commentsFlatList.length > 0 ? (
                <View>
                  <FlatList
                    data={commentsFlatList}
                    keyExtractor={item => item.id}
                    inverted={true}
                    renderItem={({ item, index }) => (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 28,
                            marginTop: 7,
                          }}>
                          {item.senderuserdata != undefined &&
                            item.senderuserdata.profile_file != 'undefined' ? (
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => goToEndUserSharedm(item)}>
                              {item.senderuserdata.image_type === 1 ? (
                                <LazyLoader
                                  uriImg={item.senderuserdata.profile_file}
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
                                      }}
                                    />
                                  ) : null}
                                  <Video
                                    source={{
                                      uri: item.senderuserdata.profile_file,
                                    }}
                                    style={{
                                      height: scale(38),
                                      width: scale(38),
                                      // resizeMode: 'cover',
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
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => goToEndUserSharedm(item)}>
                              <Image
                                source={Images.profile2}
                                style={{
                                  height: scale(38),
                                  width: scale(38),
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          <View
                            style={{
                              minHeight: 104,
                              width: 280,
                              marginLeft: 10,
                              borderColor: '#f2f2f2',
                              borderWidth: 1,
                              borderRadius: 15,
                              backgroundColor: '#fff',
                              paddingHorizontal: 14,
                              paddingVertical: 9,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                {item.senderuserdata != undefined && (
                                  <Text
                                    style={{
                                      color: '#141414',
                                      fontSize: 11,
                                      lineHeight: 15,
                                    }}>
                                    {item.senderuserdata.first_name}{' '}
                                    {item.senderuserdata.last_name != ''
                                      ? item.senderuserdata.last_name
                                      : null}
                                  </Text>
                                )}
                                <Image
                                  source={require('../../../../assets/images/Ellipse146.png')}
                                  style={{
                                    width: 2,
                                    height: 2,
                                    marginHorizontal: 6,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: '#B1B1B1',
                                    fontSize: 11,
                                    lineHeight: 15,
                                    fontFamily: Fonts.fontName.nunitoRegular,
                                  }}>
                                  {item.senderuserdata.job_title}
                                </Text>
                              </View>
                              <TouchableOpacity>
                                <Image
                                  source={Images.threeDotsImg}
                                  style={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <Text
                              style={{
                                color: '#B1B1B1',
                                fontSize: 10,
                                lineHeight: 15,
                              }}>
                              {item.commenttime}
                            </Text>
                            <Text
                              style={{
                                color: '#000',
                                fontSize: 10,
                                width: 248,
                                minHeight: 20,
                                marginTop: 5,
                              }}>
                              {item.comment}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                              <TouchableOpacity
                                onPress={() => commentsLikeComment(item)}
                                style={{ flexDirection: 'row' }}>
                                {item.count_comment_like ? (
                                  <Image
                                    source={require('../../../../assets/images/Vector1.png')}
                                    style={{
                                      width: scale(15),
                                      height: scale(15),
                                      resizeMode: 'contain',
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      tintColor: 'blue',
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={require('../../../../assets/images/Vector1.png')}
                                    style={styles.likeBtn}
                                  />
                                )}
                                {item.count_comment_like === false ? (
                                  <Text
                                    style={{
                                      color: '#4D4D4D',
                                      fontSize: 12,
                                      lineHeight: 15,
                                      marginLeft: 5,
                                    }}>
                                    Like
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      color: '#4900E8',
                                      fontSize: 12,
                                      lineHeight: 15,
                                      marginLeft: 5,
                                    }}>
                                    {item.count_comment_like} Like
                                  </Text>
                                )}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => openRplyModal(item, index)}
                                style={{ flexDirection: 'row' }}>
                                <Image
                                  source={require('../../../../assets/images/Vector2.png')}
                                  style={{
                                    width: scale(9),
                                    height: scale(10),
                                    resizeMode: 'contain',
                                    marginLeft: 20,
                                    alignSelf: 'center',
                                  }}
                                />
                                {item.replycommentlist != undefined &&
                                  item.replycommentlist.length > 0 ? (
                                  <Text
                                    style={{
                                      marginLeft: 5,
                                      fontSize: 12,
                                      color: '#4D4D4D',
                                    }}>
                                    {item.replycommentlist.length}
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      marginLeft: 5,
                                      fontSize: 12,
                                      color: '#4D4D4D',
                                    }}>
                                    0
                                  </Text>
                                )}
                                <Text
                                  style={{
                                    color: '#4D4D4D',
                                    fontSize: 12,
                                    lineHeight: 15,
                                    marginLeft: 5,
                                  }}>
                                  Reply
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    inverted
                  />
                </View>
              ) : null}
            </ScrollView>
          </View>
          <View
            style={{
              height: 40,
              width: width - 20,
              flexDirection: 'row',
              backgroundColor: '#d9d9d9',
              alignSelf: 'center',
              borderRadius: 10,
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                width: 30,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {ProfileImage != 'undefined' ? (
                <View>
                  {ProfileImgType === 1 ? (
                    <Image
                      source={{ uri: ProfileImage }}
                      style={{
                        width: 32,
                        height: 32,
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
                          }}
                        />
                      ) : null}
                      <Video
                        source={{ uri: ProfileImage }}
                        style={{ width: 32, height: 32, borderRadius: 50 }}
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
                    width: 32,
                    height: 32,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                />
              )}
            </View>
            <TextInput
              style={{ height: 40, width: width - 105, paddingHorizontal: 8 }}
              placeholder="Pitch your thoughts..."
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              value={commentText}
              onFocus={() => setRenderHeight(true)}
              onBlur={() => setRenderHeight(false)}
              onChangeText={text => setCommentText(text)}
            />
            <TouchableOpacity
              onPress={() => sendComment()}
              style={{
                alignSelf: 'center',
                width: 32,
                height: 32,
                backgroundColor: '#3399ff',
                marginLeft: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <Image
                source={require('../../../../assets/images/send-button.png')}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          isVisible={isCommentModal}
          animationIn="slideInUp"
          onBackdropPress={() => toggleModal()}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-310}>
            {/* <ScrollView> */}
            <View
              style={{
                height: height / 2 + 220,
                backgroundColor: '#fff',
                marginTop: '65%',
                //  position: 'absolute',
                //  bottom: -20,
                width: width,
                alignSelf: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 5,
                }}>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    source={require('../../../../assets/images/ic_back_arrow.png')}
                    style={{
                      height: 15,
                      width: 15,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontWeight: '600' }}>Replies</Text>
                <TouchableOpacity>
                  {/* <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>Done</Text> */}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: renderHeight ? 200 : height / 2 + 80,
                  backgroundColor: '#f2f2f2',
                }}>
                {replyCommentArray && replyCommentArray.length > 0 ? (
                  <View>
                    <FlatList
                      data={replyCommentArray}
                      keyExtractor={item => item.id}
                      inverted={true}
                      renderItem={({ item }) => (
                        <View>
                          <View
                            style={{
                              marginTop: 10,
                              paddingHorizontal: 10,
                              flexDirection: 'row',
                            }}>
                            {item.replyuserdata.profile_file != 'undefined' ? (
                              <View>
                                {item.replyuserdata.image_type === 1 ? (
                                  <Image
                                    source={{
                                      uri: item.replyuserdata.profile_file,
                                    }}
                                    style={{
                                      height: 30,
                                      width: 30,
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
                                        }}
                                      />
                                    ) : null}
                                    <Video
                                      source={{
                                        uri: item.replyuserdata.profile_file,
                                      }}
                                      style={{
                                        height: 30,
                                        width: 30,
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
                                  height: 30,
                                  width: 30,
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            )}
                            <View>
                              <View
                                style={{
                                  width: width / 2 + 80,
                                  minHeight: 30,
                                  backgroundColor: '#fff',
                                  alignSelf: 'center',
                                  marginLeft: 10,
                                  borderRadius: 5,
                                  justifyContent: 'center',
                                  paddingHorizontal: 8,
                                }}>
                                <Text style={{ fontSize: 12 }}>
                                  {item.message}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 10,
                                  marginLeft: '6%',
                                  alignSelf: 'flex-end',
                                  marginTop: 1,
                                }}>
                                {item.replycommenttime}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                      inverted
                    />
                  </View>
                ) : null}
                {isloading ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                    }}>
                    <View>
                      <ActivityIndicator size="large" color="grey" />
                    </View>
                  </View>
                ) : null}
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: 40,
                    width: width - 20,
                    flexDirection: 'row',
                    backgroundColor: '#d9d9d9',
                    marginTop: 5,
                  }}>
                  <TextInput
                    style={{
                      height: 40,
                      width: width - 80,
                      paddingHorizontal: 8,
                    }}
                    placeholder="Enter text here..."
                    placeholderTextColor="#c4c4c4"
                    onFocus={() => setRenderHeight(true)}
                    onBlur={() => setRenderHeight(false)}
                    value={rplyCommentText}
                    onChangeText={text => setRplyCommentText(text)}
                  />
                  <TouchableOpacity
                    onPress={() => replyOnComments()}
                    style={{
                      alignSelf: 'center',
                      width: 50,
                      height: 30,
                      backgroundColor: '#3399ff',
                      marginLeft: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{ color: '#fff' }}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* </ScrollView> */}
          </KeyboardAvoidingView>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('ShareMomentInfoScreen state', state);
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

export default connect(mapStateToProps, {})(ShareMomentInfoScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  likeBtn: {
    // flex: 1,
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
  userPic: {
    width: scale(35),
    height: scale(35),
    resizeMode: 'cover',
    borderRadius: 50,
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
    alignSelf: 'center',
    marginLeft: 10,
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
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  editPencilStyle: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  questionCardMain: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardtitleMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitleTextStyle: {
    color: '#4A20E4',
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
  },
  questionTextStyle: {
    marginTop: scale(8),
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
    display: 'flex',
    marginBottom: 10,
  },
  selectBtnMainStyle: {
    height: scale(40),
    width: width - 40,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  selectedImgStyle: {
    height: scale(25),
    width: scale(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textInputMainView: {
    height: 102,
    width: width - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    padding: 10,
    marginTop: scale(20),
  },
  shareMomBigImage: {
    height: height / 4,
    width: '98%',
    resizeMode: 'contain',
    // borderRadius: 20,
    marginTop: scale(20),
    alignSelf: 'center',
    // alignItems:'center'
  },
  modalMainView: {
    height: height / 7.5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
