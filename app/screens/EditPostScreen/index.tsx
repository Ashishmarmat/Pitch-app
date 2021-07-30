import React, { createRef, useEffect, useState, useRef } from 'react';
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
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images, Fonts } from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import deleteShareMoments from '../../actions/DeleteShareMoment';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import likeShareMoments from '../../actions/ShareMomentLike';
import ProfileGet from '../../actions/ProfileActions';
import { likeShareMomentsSuccess } from '../../actions/ShareMomentLike';
import shareMoments from '../../actions/ShareMoments';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {
  getSharedMomentsCommentApi,
  postSharedCommentsAPi,
  postSharedCommentsSuccess,
  getSharedMomentsCommentSuccess,
  likeOnSharedCommentsApi,
  likeOnSharedCommentsSuccess,
} from '../../actions/SharedMomentsComments';
import moment from 'moment';
import LazyLoader from '../../components/atoms/LazyLoader';
import { feedPost } from '../../actions/FeedPostAction';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EditPostScreen = props => {
  const flatlistRef = useRef();
  const dispatch = useDispatch();

  const [uiRender, setUiRender] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sharedMomentImage, setSharedMomentImage] = useState('');
  const [sharedMomentTags, setSharedMomentTags] = useState('');
  const [sharedMomentPostId, setSharedMomentPostId] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsFlatList, setCommentsFlatlist] = useState([]);
  const [profileUpdateTime, setProfileUpdateTime] = useState('');
  const [ProfileLast, setProfileLast] = useState('');
  const [LikeCounts, setLikeCounts] = useState(0);
  const [isLikeCounts, setIsLikeCounts] = useState(false);
  const [commentsLikeCount, setIsCommentsLikeCount] = useState(false);
  const [ProfileName, setProfileName] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [token, setToken] = useState('');
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [renderHeight, setRenderHeight] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [rplyCommentId, setReplyCommentId] = useState('');
  const [rplyCommentText, setRplyCommentText] = useState('');
  const [replyCommentArray, setReplyArrayComment] = useState([]);
  const [replyCommentArrayIndex, setReplyArrayCommentIndex] = useState('');
  const [shareItemData, setShareItemData] = useState();
  const [SharedMomentType, setSharedMomentType] = useState();
  const [ProfileImageType, setProfileImageType] = useState();
  const [isLoading, setIsLoadings] = useState(false);
  const [ShareUserID, setShareUserID] = useState();
  const [UserId, setUserId] = useState('');

  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeComentModal = () => {
    setIsCommentModal(!isCommentModal);
    setRenderHeight(false);
    setIsLoading(false);
  };

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  useEffect(() => {
    userIDfunc();
    console.log("Useeffect props called", props.navigation.state.params.shareItems)
    getTokenFunc();
    setShareUserID(props.navigation.state.params.shareItems.user_id)
    setShareItemData(props.navigation.state.params.shareItems);
    setSharedMomentPostId(props.navigation.state.params.shareItems.id);
    setSharedMomentImage(props.navigation.state.params.shareItems.image);
    setSharedMomentTags(props.navigation.state.params.shareItems.tags);
    setProfileUpdateTime(
      props.navigation.state.params.shareItems.updatesharemomenttime,
    );
    setSharedMomentType(props.navigation.state.params.shareItems.imagetype);
    const sendData = {
      post_id: props.navigation.state.params.shareItems.id,
    };
    dispatch(getSharedMomentsCommentApi(sendData));
    if (props.navigation.state.params.shareItems.count === false) {
      setLikeCounts(0);
    } else {
      setLikeCounts(props.navigation.state.params.shareItems.count);
    }
    if (props.navigation.state.params.shareItems.likestatus === '1') {
      setIsLikeCounts(true);
    } else {
      setIsLikeCounts(false);
    }
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(likeOnSharedCommentsSuccess());
  }, []);

  // console.log("token", token)

  useEffect(() => {
    if (props != undefined) {
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        setProfileName(props.profileRes.data.first_name);
        setProfileLast(props.profileRes.data.last_name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJob(props.profileRes.data.job_title);
        setProfileImageType(props.profileRes.data.image_type);
      }
      if (
        props.LikeShareMomentReducer != undefined &&
        props.LikeShareMomentReducer.data != undefined
      ) {
        if (props.LikeShareMomentReducer.response_code === 200) {
          dispatch(ProfileGet());
          dispatch(likeShareMomentsSuccess());
          dispatch(shareMoments());
          // console.log("Inside called")
        }
      }

      if (props.getPostCommentsData != undefined) {
        if (props.getPostCommentsData.response_code === 200) {
          const sendData = {
            post_id: props.navigation.state.params.shareItems.id,
          };
          setIsLoading(false);
          dispatch(getSharedMomentsCommentApi(sendData));
          dispatch(likeOnSharedCommentsSuccess());
        }
      }

      if (props.getSharedComments != undefined) {
        // console.log('prooop', props);

        if (
          props.getSharedComments.data != undefined &&
          props.getSharedComments.data.length > 0
        ) {
          let tempArray = [];
          setCommentsFlatlist(props.getSharedComments.data);
          const data1 = props.getSharedComments.data;
          if (replyCommentArrayIndex != '' && data1 != undefined) {
            // console.log("data1", data1[replyCommentArrayIndex])
            tempArray.push(data1[replyCommentArrayIndex].replycommentlist);
            setReplyArrayComment(...tempArray);
          }
          dispatch(postSharedCommentsSuccess());
          dispatch(shareMoments());
        }
      }

      if (props.getLikeSharedMomentsComments != undefined) {
        if (
          props.getLikeSharedMomentsComments.data != undefined &&
          props.getLikeSharedMomentsComments.response_code === 200
        ) {
          const sendData = {
            post_id: props.navigation.state.params.shareItems.id,
          };
          dispatch(getSharedMomentsCommentApi(sendData));
        }
      }
    }
    setUiRender(!uiRender);
  }, [props]);

  const OpenShareMomentPost = () => {
    NavigationService.navigate('UserOpenShareMoment', {
      shareItem: shareItemData,
    });
  };

  const datapass = {
    id: props.navigation.state.params.shareItems.id,
    image: props.navigation.state.params.shareItems.image,
    tags: props.navigation.state.params.shareItems.tags,
    imagetype: props.navigation.state.params.shareItems.imagetype,
  };
  const deletePost = () => {
    const id = sharedMomentPostId;
    dispatch(deleteShareMoments(id));
    toggleModal();
    goBackFunc();
    dispatch(shareMoments());
    dispatch(ProfileGet());
  };

  const likePost = () => {
    setIsLikeCounts(!isLikeCounts);
    likeCall();
  };

  const likeCall = () => {
    if (isLikeCounts === true) {
      setLikeCounts(LikeCounts - 1);
    } else if (isLikeCounts === false) {
      setLikeCounts(LikeCounts + 1);
    }
    setUiRender(!uiRender);
    const sendData = {
      post_id: sharedMomentPostId,
      sender_user_id: ShareUserID
    }
    dispatch(likeShareMoments(sendData));
  };

  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure you want to delete',
      //body
      'This action cannot be undone',
      [
        {
          text: 'Yes',
          onPress: () => deletePost(),
        },
        {
          text: 'No',
          onPress: () => toggleModal(),
          style: 'cancel',
        },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };

  const editPost = () => {
    toggleModal();
    NavigationService.navigate('EditPostScreen2', datapass);
  };

  const goBackFunc = () => {
    NavigationService.goBack();
    dispatch(shareMoments());
    dispatch(feedPost());
    dispatch(shareMoments());
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(ProfileGet());
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
          <Text style={styles.titleTextStyle}>Edit Post</Text>
        </View>
      </View>
    );
  };

  const sendComment = () => {
    const sendData = {
      post_id: props.navigation.state.params.shareItems.id,
      comment: commentText,
      sender_user_id: props.navigation.state.params.shareItems.user_id
    };
    // console.log("sendData", sendData)
    dispatch(postSharedCommentsAPi(sendData));
    setCommentText('');
    setIsLoading(true);
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(shareMoments());
  };

  const commentsLikeComment = item => {
    const dataSend = {
      comment_id: item.id,
    };
    dispatch(likeOnSharedCommentsApi(dataSend));
  };

  console.log('commentsFlatList', commentsFlatList);

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
        console.log('sharedmomentcommentsreply res', res);
        setIsLoading(false);
        if (res.status != 0) {
          const sendData = {
            post_id: props.navigation.state.params.shareItems.id,
          };
          dispatch(getSharedMomentsCommentApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    // console.log("load")
    setIsLoadings(false);
  };
console.log('UserId',UserId);

  const goToEndUserSharedm = async listItem => {
    console.log('listItem',listItem.user_id); 
    if (listItem.user_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.user_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } 
    else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
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
                  top: 4,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => NavigationService.navigate('HomeScreen')}>
                    {ProfileImage != 'undefined' ? (
                      <View>
                        {ProfileImageType === 1 ? (
                          <LazyLoader
                            uriImg={ProfileImage}
                            style={styles.profileImage}
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
                              source={{ uri: ProfileImage }}
                              style={{
                                height: scale(66),
                                width: scale(66),
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
                            {/* <View style={{ position: 'absolute', left: '24%', right: 0, top: '22%', }}>
                                                            <Image source={require('../../../assets/images/play-button.png')}
                                                                style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                                                        </View> */}
                          </View>
                        )}
                      </View>
                    ) : (
                      <Image
                        source={Images.profile2}
                        style={styles.profileImage}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 17,
                        lineHeight: 23,
                        fontWeight: '800',
                      }}>
                      {ProfileName} {ProfileLast}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {ProfileJob}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {profileUpdateTime}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => toggleModal()}
                  style={{ justifyContent: 'center', height: scale(40) }}>
                  <Image
                    source={Images.threeDotsImg}
                    style={{
                      width: scale(23),
                      height: scale(5),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                {sharedMomentImage != undefined ? (
                  <TouchableOpacity onPress={() => OpenShareMomentPost()}>
                    {SharedMomentType === 1 ? (
                      // <Image source={{ uri: sharedMomentImage }} style={styles.shareMomBigImage} />
                      <LazyLoader
                        uriImg={sharedMomentImage}
                        style={styles.shareMomBigImage}
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
                              top: '40%',
                            }}
                          />
                        ) : null}
                        <Video
                          source={{ uri: sharedMomentImage }}
                          style={{
                            height: height / 4,
                            width: '98%',
                            marginTop: scale(20),
                            alignSelf: 'center',
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
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 32,
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <ImageBackground
                  source={require('../../../assets/images/Ellipse141.png')}
                  resizeMode="contain"
                  style={styles.likeBtnCrcl}>
                  <Image
                    source={require('../../../assets/images/Vector1.png')}
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
                  {LikeCounts} likes
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
                      source={require('../../../assets/images/Vector1.png')}
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
                      source={require('../../../assets/images/Vector1.png')}
                      style={styles.likeBtn}
                    />
                  )}

                  {/* </ImageBackground> */}
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

                <TouchableOpacity
                  // onPress={() => setIsCommentModal(!isCommentModal)}
                  style={{ flexDirection: 'row', right: 8 }}>
                  <View>
                    <Image
                      source={require('../../../assets/images/comment1.png')}
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
                {/* <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../../../assets/images/shareArrow.png')}
                      style={styles.likeBtn} />
                    <Text style={{ color: '#4D4D4D', fontSize: 12, lineHeight: 15, marginLeft: 5 }}>Share
                    </Text>
                  </TouchableOpacity>
                </View> */}
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
                         <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => goToEndUserSharedm(item)}>
                            {item.senderuserdata != undefined ? (
                              <View>
                                {item.senderuserdata.image_type === 1 ? (
                                  <LazyLoader
                                    uriImg={item.senderuserdata.profile_file}
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
                                            top: '10%',
                                          }}
                                        />
                                      ) : null}
                                      <Video
                                        source={{
                                          uri: item.senderuserdata.profile_file,
                                        }}
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
                                        alignSelf: 'center',
                                        top: '7%',
                                      }}>
                                      <Image
                                        source={require('../../../assets/images/play-button.png')}
                                        style={{
                                          height: 40,
                                          width: 40,
                                          resizeMode: 'contain',
                                        }}
                                      />
                                    </View>
                                  </View>
                                )
                                  // </View>
                                }
                              </View>
                            ) : (
                              <Image
                                source={Images.profile2}
                                style={{
                                  height: 45,
                                  width: 45,
                                  resizeMode: 'contain',
                                  borderRadius: 50,
                                }}
                              />
                            )}
                          </TouchableOpacity>
                          <View
                            style={{
                              height: 104,
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
                                source={require('../../../assets/images/Ellipse146.png')}
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
                            <Text
                              style={{
                                color: '#B1B1B1',
                                fontSize: 10,
                                lineHeight: 15,
                              }}>
                              {item.commenttime}
                            </Text>
                            <Text
                              style={{ color: '#000', fontSize: 10, width: 248 }}>
                              {item.comment}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                              <TouchableOpacity
                                onPress={() => commentsLikeComment(item)}
                                style={{ flexDirection: 'row' }}>
                                {item.count_comment_like ? (
                                  <Image
                                    source={require('../../../assets/images/Vector1.png')}
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
                                    source={require('../../../assets/images/Vector1.png')}
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
                                  source={require('../../../assets/images/Vector2.png')}
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
              ) : (
                <View
                  style={{
                    height: 200,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No Comments</Text>
                </View>
              )}
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
              <Image
                source={{ uri: ProfileImage }}
                style={{
                  width: 32,
                  height: 32,
                  resizeMode: 'cover',
                  borderRadius: 50,
                }}
              />
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
                source={require('../../../assets/images/send-button.png')}
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
          isVisible={isModalVisible}
          animationIn="slideInUp"
          onBackdropPress={() => setModalVisible(!isModalVisible)}>
          <View style={styles.modalMainView}>
            <TouchableOpacity
              onPress={() => editPost()}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#EBEBEB',
                padding: 10,
              }}>
              <Image
                source={Images.BlackEditPencil}
                style={{
                  height: scale(22),
                  width: scale(22),
                  resizeMode: 'contain',
                  marginLeft: scale(20),
                }}
              />
              <Text style={{ alignSelf: 'center', marginLeft: scale(30) }}>
                Edit Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={twoOptionAlertHandler}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#EBEBEB',
                padding: 10,
              }}>
              <Image
                source={Images.badgeBlockImage}
                style={{
                  height: scale(22),
                  width: scale(22),
                  resizeMode: 'contain',
                  marginLeft: scale(20),
                }}
              />
              <Text style={{ alignSelf: 'center', marginLeft: scale(30) }}>
                Delete Post
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          isVisible={isCommentModal}
          animationIn="slideInUp"
          onBackdropPress={() => closeComentModal()}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-310}>
            <View
              style={{
                height: height / 2 + 220,
                backgroundColor: '#fff',
                marginTop: '65%',
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
                  paddingVertical: 8,
                  marginTop: -3,
                }}>
                <TouchableOpacity onPress={() => closeComentModal()}>
                  <Image
                    source={require('../../../assets/images/ic_back_arrow.png')}
                    style={{
                      height: 16,
                      width: 16,
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
                            {item.replyuserdata != undefined && (
                              <LazyLoader
                                uriImg={item.replyuserdata.profile_file}
                              />
                            )
                              // <Image source={{ uri: item.replyuserdata.profile_file }} style={{ height: 30, width: 30, resizeMode: 'cover', borderRadius: 50 }} />
                            }
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
              {/* <Text>jhgjh</Text> */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: 40,
                    width: width - 20,
                    flexDirection: 'row',
                    backgroundColor: '#d9d9d9',
                  }}>
                  <TextInput
                    style={{
                      height: 40,
                      width: width - 80,
                      paddingHorizontal: 8,
                    }}
                    placeholder="Enter text here..."
                    placeholderTextColor="#c4c4c4"
                    value={rplyCommentText}
                    onFocus={() => setRenderHeight(true)}
                    onBlur={() => setRenderHeight(false)}
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
          </KeyboardAvoidingView>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("Edit post state", state)
  return {
    profileRes: state.profileReducer.data,
    LikeShareMomentReducer: state.LikeShareMomentReducer.data,
    shareMomentsReducer: state.shareMomentsReducer.data,
    getPostCommentsData: state.sharedMomentsCommentReducer.getPostCommentsData,
    getSharedComments: state.sharedMomentsCommentReducer.getSharedComments,
    getLikeSharedMomentsComments:
      state.sharedMomentsCommentReducer.gatSharedLikeCommentsCalled,
  };
};

export default connect(mapStateToProps, {})(EditPostScreen);

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
    transform: [{ rotate: '180deg' }],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
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
  profileImage: {
    height: scale(66),
    width: scale(66),
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
