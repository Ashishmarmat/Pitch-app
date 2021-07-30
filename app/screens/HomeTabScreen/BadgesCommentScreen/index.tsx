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
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getBadgesCommentApi,
  postBadgesCommentAPi,
  postBadgesCommentSuccess,
  getBadgesCommentSuccess,
  likeBadgesCommentsApi,
  likeBadgesCommentsApiSuccess,
} from '../../../actions/SharedMomentsComments';
import ProfileGet from '../../../actions/ProfileActions';
import {likeBadgesSuccess} from '../../../actions/BadgesLike';
import LazyLoader from '../../../components/atoms/LazyLoader';
// import { Image } from 'react-native-elements';
import likeBadges from '../../../actions/BadgesLike';
import {postEndUserProfile} from '../../../actions/EndUserProfileAction';
import Video from 'react-native-video';
import {postEndUserProfileSuccess} from '../../../actions/EndUserProfileAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BadgesCommentScreen = props => {
  // console.log("props@@£££@@", props)
  const dispatch = useDispatch();

  const PostBadgesCommentRes = useSelector(
    state => state.sharedMomentsCommentReducer.PostBadgesComment,
  );
  const ProfileRes = useSelector(state => state.EndUserProfileReducer.data);

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
  const [isLoading, setIsLoadings] = useState(false);
  const [ProfileName, setProfileName] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [profileUpdateTime, setProfileUpdateTime] = useState('');
  const [rplyCommentId, setReplyCommentId] = useState('');
  const [rplyCommentText, setRplyCommentText] = useState('');
  const [replyCommentArray, setReplyArrayComment] = useState('');
  const [replyCommentArrayIndex, setReplyArrayCommentIndex] = useState('');
  const [imageloading, setImageLoading] = useState(true);
  const [PostUserID, setPostUserID] = useState('');
  const [ProfileImgType, setProfileImgType] = useState();

  const [ProfilePicRes, setProfilePicRes] = useState();
  const [ProfileNameRes, setProfileNameRes] = useState('');
  const [ProfileLastRes, setProfileLastRes] = useState('');
  const [ProfileJobRes, setProfileJobRes] = useState('');
  const [UserIdRes, setUserIdRes] = useState('');
  const [ProfileImageType, setProfileImageType] = useState();
  const [screenType, setScreenType] = useState('');
  const [UserId, setUserId] = useState('');

  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
  };

  const [token, setToken] = useState('');

  const toggleModal = () => {
    setIsCommentModal(!isCommentModal);
    setRenderHeight(false);
    setIsLoading(false);
  };

  useEffect(() => {
    userIDfunc();
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  useEffect(() => {
    if (
      ProfileRes &&
      ProfileRes.data != undefined &&
      ProfileRes &&
      ProfileRes.data != null
    ) {
      setProfileNameRes(ProfileRes.data.first_name);
      setProfileLastRes(ProfileRes.data.last_name);
      setProfileJobRes(ProfileRes.data.job_title);
      setProfilePicRes(ProfileRes.data.profile_file);
      setUserIdRes(ProfileRes.data.user_id);
      setProfileImageType(ProfileRes.data.image_type);
    }
  }, [ProfileRes]);
  // console.log('ProfileRes', ProfileRes)
  useEffect(() => {
    if (props != undefined) {
      if (props.navigation.state.params != undefined) {
        setScreenType(props.navigation.state.params.screenType);
      }
    }
    // console.log('props.navigation.state.params.badgesItem', props.navigation.state.params.badgesItem)
    setSharedMomentImage(props.navigation.state.params.badgesItem.badge_image);
    setSharedMomentTags(props.navigation.state.params.badgesItem.badge_name);
    setSharedMomentPostId(props.navigation.state.params.badgesItem.badges_id);
    setIsSetTime(props.navigation.state.params.badgesItem.updatetime_at);
    setPostUserID(props.navigation.state.params.badgesItem.user_id);

    const sendData = {
      badges_id: props.navigation.state.params.badgesItem.badggesid,
      user_id: props.navigation.state.params.badgesItem.user_id,
    };
    dispatch(getBadgesCommentApi(sendData));
    if (props.navigation.state.params.badgesItem.like_count === false) {
      setSharedMomentLikes(0);
    } else {
      setSharedMomentLikes(props.navigation.state.params.badgesItem.like_count);
    }
    if (props.navigation.state.params.badgesItem.likestatus === '1') {
      setIsLikeCounts(true);
    } else {
      setIsLikeCounts(false);
    }
    dispatch(getBadgesCommentSuccess());
    dispatch(likeBadgesCommentsApiSuccess());
  }, []);

  useEffect(() => {
    // console.log("props badges data", props)
    if (props != undefined) {
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        const name =
          props.profileRes.data.first_name + props.profileRes.data.last_name;
        setProfileName(name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJob(props.profileRes.data.job_title);
        setProfileImgType(props.profileRes.data.image_type);
        // const sendData = {
        //     badges_id: props.navigation.state.params.badgesItem.badggesid,
        //     user_id: props.navigation.state.params.badgesItem.user_id
        // }
        // dispatch(getBadgesCommentApi(sendData))
      }
      if (
        props.LikeBadgesReducer != undefined &&
        props.LikeBadgesReducer.data != undefined
      ) {
        if (props.LikeBadgesReducer.response_code === 200) {
          dispatch(ProfileGet());
          dispatch(likeBadgesSuccess());
          const sendData = {
            badges_id: props.navigation.state.params.badgesItem.badggesid,
            user_id: props.navigation.state.params.badgesItem.user_id,
          };
          dispatch(getBadgesCommentApi(sendData));
          // console.log("Inside called")
        }
      }

      if (props.getBadgesComments != undefined) {
        console.log('inside if 1');

        if (
          props.getBadgesComments.data != undefined &&
          props.getBadgesComments.data.length > 0
        ) {
          // console.log('inside if 2');
          let tempArray = [];
          setCommentsFlatlist(props.getBadgesComments.data);
          const data1 = props.getBadgesComments.data;
          // console.log("data1", data1)
          if (replyCommentArrayIndex != '' && data1 != undefined) {
            // console.log("inside data1", data1[replyCommentArrayIndex])
            tempArray.push(data1[replyCommentArrayIndex].replycommentlist);
            setReplyArrayComment(...tempArray);
          }
        }
      }
      if (props.likeBadgesComments != undefined) {
        if (
          props.likeBadgesComments.data != undefined &&
          props.likeBadgesComments.response_code === 200
        ) {
          const sendData = {
            badges_id: props.navigation.state.params.badgesItem.badggesid,
            user_id: props.navigation.state.params.badgesItem.user_id,
          };
          dispatch(getBadgesCommentApi(sendData));
        }
      }
    }
  }, [props]);

  useEffect(() => {
    if (props.PostBadgesComment != undefined) {
      if (props.PostBadgesComment.response_code === 200) {
        const sendData = {
          badges_id: props.navigation.state.params.badgesItem.badggesid,
          user_id: props.navigation.state.params.badgesItem.user_id,
        };
        setIsLoading(false);
        dispatch(getBadgesCommentApi(sendData));
        dispatch(postBadgesCommentSuccess());
        dispatch(likeBadgesCommentsApiSuccess());
      }
    }
  }, [PostBadgesCommentRes]);

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
      badges_id: sharedMomentPostId,
      user_id: PostUserID,
    };
    dispatch(likeBadges(sendData));
  };

  const goBackFunc = () => {
    if (screenType === 'FeedScreen') {
      NavigationService.navigateAndReset('HomeScreen');
    } else {
      NavigationService.goBack();
    }
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => goBackFunc()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>{ProfileNameRes}'s Post</Text>
        </View>
      </View>
    );
  };

  const sendComment = () => {
    const sendData = {
      badges_id: sharedMomentPostId,
      comment: commentText,
      user_id: PostUserID,
    };
    // console.log("sendData", sendData)
    dispatch(postBadgesCommentAPi(sendData));
    setCommentText('');
    setIsLoading(true);
  };

  // const commentsLikeComment = (item) => {
  //     const dataSend = {
  //         comment_id: item.id
  //     }
  //     dispatch(likeBadgesCommentsApi(dataSend))
  // }

  const commentsLikeComment = item => {
    // console.log('itemitem', item);
    const data = new FormData();
    data.append('comment_id', item.id);

    fetch('http://3.140.234.233/pitch/apiV1/likecommentsbadges', {
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
        console.log('likecommentsbadges res', res);
        if (res.status != 0) {
          const sendData = {
            badges_id: props.navigation.state.params.badgesItem.badggesid,
            user_id: props.navigation.state.params.badgesItem.user_id,
          };
          // console.log('question_id', sendData);

          setIsLoading(false);
          dispatch(getBadgesCommentApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  // console.log("commentsFlatList", commentsFlatList)

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

    fetch('http://3.140.234.233/pitch/apiV1/badgescommentsreply', {
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
        console.log('badgescommentsreply res', res);
        setIsLoading(false);
        if (res.status != 0) {
          const sendData = {
            badges_id: props.navigation.state.params.badgesItem.badggesid,
            user_id: props.navigation.state.params.badgesItem.user_id,
          };
          // console.log("sendData", sendData)
          dispatch(getBadgesCommentApi(sendData));
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
    if (listItem.sender_user_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.sender_user_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } 
    else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };


  const goToEndUser = async () => {
    if (UserIdRes != UserId) {
    AsyncStorage.setItem('EndUSerId', UserIdRes);
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
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{height: height / 2 + 220}}>
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
                  style={{flexDirection: 'row'}}>
                  {/* {ProfilePicRes != undefined ?
                                         <LazyLoader uriImg={ProfilePicRes} 
                                         style={{ height: scale(66), width: scale(66), resizeMode: 'cover', borderRadius: 50 }} />
                                    
                                        : null} */}
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
                              }}
                            />
                          ) : null}
                          <Video
                            source={{uri: ProfilePicRes}}
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
                  <View style={{marginLeft: 10}}>
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
              </View>

              <Text
                style={{
                  color: '#4D4D4D',
                  fontSize: 12,
                  lineHeight: 15,
                  marginLeft: 32,
                  marginTop: 14,
                }}>
                I received the “{sharedMomentTags}” badge!
              </Text>
              <Image
                source={{uri: sharedMomentImage}}
                resizeMode="contain"
                style={styles.shareMomBigImage}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 32,
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <ImageBackground
                  source={require('../../../../assets/images/Ellipse141.png')}
                  resizeMode="contain"
                  style={styles.likeBtnCrcl}>
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
                </ImageBackground>
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
                  style={{flexDirection: 'row', flex: 1}}>
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

                <TouchableOpacity style={{flexDirection: 'row', right: 8}}>
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
                <View style={{flexDirection: 'row'}}>
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
                    renderItem={({item, index}) => (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 28,
                            marginTop: 7,
                          }}>
                          {item.sedneruser != undefined &&
                          item.sedneruser.profile_file != 'undefined' ? (
                            <TouchableOpacity
                              activeOpacity={1}
                              onPress={() => goToEndUserSharedm(item)}>
                              {item.sedneruser.image_type === 1 ? (
                                <LazyLoader
                                  uriImg={item.sedneruser.profile_file}
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
                                    source={{uri: item.sedneruser.profile_file}}
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
                                {item.sedneruser != undefined && (
                                  <Text
                                    style={{
                                      color: '#141414',
                                      fontSize: 11,
                                      lineHeight: 15,
                                    }}>
                                    {item.sedneruser.first_name}{' '}
                                    {item.sedneruser.last_name != ''
                                      ? item.sedneruser.last_name
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
                                  {item.sedneruser.job_title}
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
                            <View style={{flexDirection: 'row', marginTop: 8}}>
                              <TouchableOpacity
                                onPress={() => commentsLikeComment(item)}
                                style={{flexDirection: 'row'}}>
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
                                style={{flexDirection: 'row'}}>
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
                      source={{uri: ProfileImage}}
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
                        source={{uri: ProfileImage}}
                        style={{width: 32, height: 32, borderRadius: 50}}
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
              style={{height: 40, width: width - 105, paddingHorizontal: 8}}
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
                <Text style={{color: '#000', fontWeight: '600'}}>Replies</Text>
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
                      renderItem={({item}) => (
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
                                <Text style={{fontSize: 12}}>
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
              <View style={{flex: 1}}>
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
                    <Text style={{color: '#fff'}}>Send</Text>
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
  console.log('BadgesCommentScreen state', state);
  return {
    profileRes: state.profileReducer.data,
    LikeBadgesReducer: state.LikeBadgesReducer.data,
    PostBadgesComment: state.sharedMomentsCommentReducer.PostBadgesComment,
    getBadgesComments: state.sharedMomentsCommentReducer.getBadgesComments,
    likeBadgesComments: state.sharedMomentsCommentReducer.likeBadgesComments,
  };
};

export default connect(mapStateToProps, {})(BadgesCommentScreen);

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
  likeBtnCrcl: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
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
    transform: [{rotate: '180deg'}],
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
    height: height / 4.5,
    width: height / 4.5,
    marginTop: scale(20),
    alignSelf: 'center',
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
