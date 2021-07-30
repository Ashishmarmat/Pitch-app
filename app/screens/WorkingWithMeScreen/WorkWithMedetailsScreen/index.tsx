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
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../../theme/scale';
import { Colors, Images, Fonts } from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import Modal from 'react-native-modal';
import deleteShareMoments from '../../../actions/DeleteShareMoment';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import likeWorkWithMe from '../../../actions/WorkWithMeLike';
import {
  postWorkingWithmeCommentsAPi,
  getworkwithmeCommentsApi,
  postWorkingWithmeCommentsSuccess,
  likeWorkingwithmeCommentsApi,
  likeWorkingwithmeCommentsSuccess,
} from '../../../actions/SharedMomentsComments';
import { ScrollView } from 'react-native-gesture-handler';
import InvertedFlatList from 'react-native-inverted-flat-list';
import moment from 'moment';
import LazyLoader from '../../../components/atoms/LazyLoader';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const flatListRef = createRef();

const WorkWithMedetailsScreen = props => {
  const dispatch = useDispatch();

  const likeWorkWithMeCommentsRes = useSelector(
    state => state.sharedMomentsCommentReducer.likeWorkWithMeComments,
  );

  const [uiRender, setUiRender] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [que, setQue] = useState('');
  const [ans, setAns] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionUserId, setQuestUserId] = useState('');
  const [Postid, setID] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [ProfileLast, setProfileLast] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [token, setToken] = useState('');
  const [LikeCounts, setLikeCounts] = useState('');
  const [isLikeCounts, setIsLikeCounts] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [renderHeight, setRenderHeight] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsFlatList, setCommentsFlatlist] = useState([]);
  const [profileUpdateTime, setProfileUpdateTime] = useState('');
  const [rplyCommentText, setRplyCommentText] = useState('');
  const [rplyCommentId, setReplyCommentId] = useState('');
  const [replyCommentArray, setReplyArrayComment] = useState('');
  const [replyCommentArrayIndex, setReplyArrayCommentIndex] = useState('');
  const [ProfileImageType, setProfileImageType] = useState();
  const [isLoading, setIsLoadings] = useState(false);
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

  useEffect(() => {
    userIDfunc();
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  useEffect(() => {
    const workwithmeData = props.navigation.state.params.data;
    if (workwithmeData != undefined) {
      setQue(workwithmeData.questions);
      setAns(workwithmeData.ans_data);
      setID(workwithmeData.id);
      setProfileUpdateTime(workwithmeData.updateworkingwithmetime);
      setQuestUserId(workwithmeData.user_id);
      setQuestionId(workwithmeData.question_id);
      const time = workwithmeData.created_dt;
      if (workwithmeData.like_count == false) {
        setLikeCounts(0);
      } else {
        setLikeCounts(workwithmeData.like_count);
      }
      if (workwithmeData.likestatus === '1') {
        setIsLikeCounts(true);
      } else {
        setIsLikeCounts(false);
      }
      const sendData = {
        question_id: workwithmeData.question_id,
        user_id: workwithmeData.user_id,
      };
      dispatch(getworkwithmeCommentsApi(sendData));
    }
    dispatch(likeWorkingwithmeCommentsSuccess());
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }, []);

  useEffect(() => {
    if (props != undefined) {
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        setProfileName(props.profileRes.data.first_name);
        setProfileLast(props.profileRes.data.last_name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJob(props.profileRes.data.job_title);
        setProfileImageType(props.profileRes.data.image_type);
      }
      if (props.getPostCommentsData != undefined) {
        if (
          props.getPostCommentsData.data != undefined &&
          props.getPostCommentsData.response_code === 200
        ) {
          const sendData = {
            question_id: props.navigation.state.params.data.question_id,
            user_id: props.navigation.state.params.data.user_id,
          };
          setIsLoading(false);
          dispatch(getworkwithmeCommentsApi(sendData));
          dispatch(postWorkingWithmeCommentsSuccess());
          dispatch(likeWorkingwithmeCommentsSuccess());
        }
      }

      if (props.getWorkWithMeComments != undefined) {
        if (
          props.getWorkWithMeComments.data != undefined &&
          props.getWorkWithMeComments.data.length > 0
        ) {
          let tempArray = [];
          setCommentsFlatlist(props.getWorkWithMeComments.data);
          const data1 = props.getWorkWithMeComments.data;
          if (replyCommentArrayIndex != '' && data1 != undefined) {
            console.log('data1', data1[replyCommentArrayIndex]);
            tempArray.push(data1[replyCommentArrayIndex].replycommentlist);
            setReplyArrayComment(...tempArray);
          }
        }
      }

      if (props.likeWorkWithMeComments != undefined) {
        if (
          props.likeWorkWithMeComments.data != undefined &&
          props.likeWorkWithMeComments.response_code === 200
        ) {
          const sendData = {
            question_id: props.navigation.state.params.data.question_id,
            user_id: props.navigation.state.params.data.user_id,
          };
          setIsLoading(false);
          dispatch(getworkwithmeCommentsApi(sendData));
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
      setLikeCounts(LikeCounts - 1);
    } else if (isLikeCounts === false) {
      setLikeCounts(LikeCounts + 1);
    }
    setUiRender(!uiRender);
    const sendData = {
      question_id: questionId,
      question_user_id: questionUserId,
    };
    console.log('sendData', sendData);
    dispatch(likeWorkWithMe(sendData));
  };

  const goBackFunc = () => {
    NavigationService.goBack();
  };

  const headerView = () => {
    return (
      <View>
        <View style={styles.headerMainView}>
          <TouchableOpacity
            onPress={() => goBackFunc()}
            style={{ alignSelf: 'center' }}>
            <Image source={Images.back_button} style={styles.leftHeaderImage} />
          </TouchableOpacity>
          <Image source={Images.logo_dot} style={styles.logoImgStyle} />
          {/* <Image
            source={Images.HomeRightHeader}
            style={styles.rightHeaderImage}
          /> */}
          <View />
        </View>
      </View>
    );
  };

  const sendComment = () => {
    const sendData = {
      question_id: questionId,
      question_user_id: questionUserId,
      comment: commentText,
    };
    dispatch(postWorkingWithmeCommentsAPi(sendData));
    setCommentText('');
    setIsLoading(true);
  };

  const commentsLikeComment = item => {
    const dataSend = {
      comment_id: item.id,
    };
    dispatch(likeWorkingwithmeCommentsApi(dataSend));
  };

  const openRplyModal = (data, index) => {
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

    fetch('http://3.140.234.233/pitch/apiV1/workingwithmecommentsreply', {
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
        console.log('workingwithmecommentsreply res', res);
        setIsLoading(false);
        if (res.status != 0) {
          const sendData = {
            question_id: props.navigation.state.params.data.question_id,
            user_id: props.navigation.state.params.data.user_id,
          };
          setIsLoading(false);
          dispatch(getworkwithmeCommentsApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const onLoadStart = () => {
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
  };
  const goToEndUserSharedm = async listItem => {
    console.log('listItem', listItem.user_id);
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
          <View style={{ height: height / 2 + 150 }}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                  marginTop: 20,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => NavigationService.navigate('HomeScreen')}>
                    {ProfileImage != undefined ? (
                      <View>
                        {ProfileImageType === 1 ? (
                          <LazyLoader
                            uriImg={ProfileImage}
                            style={{
                              height: scale(66),
                              width: scale(66),
                              resizeMode: 'cover',
                              borderRadius: 50,
                            }}
                          />
                        ) : (
                          <View pointerEvents="none">
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
                            </View>
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
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 17,
                        lineHeight: 23,
                        fontWeight: '800',
                        fontFamily: Fonts.fontName.GibsonRegular,
                      }}>
                      {ProfileName} {ProfileLast}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontWeight: 'normal',
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {ProfileJob}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontWeight: 'normal',
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
              <View style={{ marginTop: 14 }}>
                <ImageBackground
                  imageStyle={{ borderRadius: 15 }}
                  source={Images.FrameImage}
                  style={{
                    height: scale(160),
                    width: width - 30,
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                  }}>
                  <View style={{ height: height / 5 - 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000',
                        textAlign: 'center',
                        width: width - 40,
                        alignSelf: 'center',
                        fontWeight: '600',
                        marginTop: scale(30),
                        fontFamily: Fonts.fontName.GibsonRegular,
                      }}>
                      {que}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        textAlign: 'center',
                        marginTop: scale(25),
                        fontFamily: Fonts.fontName.nunitoRegular,
                      }}>
                      {ans}
                    </Text>
                  </View>
                </ImageBackground>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 32,
                  alignItems: 'center',
                  marginTop: 5,
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
                  style={{ flexDirection: 'row' }}>
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
                    ref={flatListRef}
                    style={{ flex: 1 }}
                    data={commentsFlatList}
                    keyExtractor={item => item.id}
                    extraData={uiRender}
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
                            {item.sedneruser != undefined &&
                              item.sedneruser != null ? (
                              <View>
                                {item.sedneruser.image_type === 1 ? (
                                  <LazyLoader
                                    uriImg={item.sedneruser.profile_file}
                                    style={{
                                      height: 45,
                                      width: 45,
                                      resizeMode: 'cover',
                                      borderRadius: 50,
                                    }}
                                  />
                                ) : (
                                  <View pointerEvents="none">
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
                                          uri: item.sedneruser.profile_file,
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
                                        left: '8%',
                                        right: 0,
                                        top: '8%',
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
                              {item.sedneruser != undefined &&
                                item.sedneruser != null && (
                                  <Text
                                    style={{
                                      color: '#141414',
                                      fontSize: 11,
                                      lineHeight: 15,
                                    }}>
                                    {item.sedneruser.first_name}{' '}
                                    {item.sedneruser.last_name != '' &&
                                      item.sedneruser.last_name != null
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
      </KeyboardAvoidingView>
      <Modal
        isVisible={isCommentModal}
        animationIn="slideInUp"
        onBackdropPress={() => closeComentModal()}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-310}>
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
                paddingHorizontal: 10,
                marginVertical: 5,
              }}>
              <TouchableOpacity onPress={() => closeComentModal()}>
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
              <TouchableOpacity></TouchableOpacity>
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
                              <Text style={{ fontSize: 12 }}>{item.message}</Text>
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
                }}>
                <TextInput
                  style={{ height: 40, width: width - 80, paddingHorizontal: 8 }}
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
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data,
    getPostCommentsData:
      state.sharedMomentsCommentReducer.getPostWorkingwithmeComments,
    getWorkWithMeComments:
      state.sharedMomentsCommentReducer.getWorkWithMeComments,
    likeWorkWithMeComments:
      state.sharedMomentsCommentReducer.likeWorkWithMeComments,
  };
};

export default connect(mapStateToProps, {})(WorkWithMedetailsScreen);

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
    paddingHorizontal: 13,
    marginTop: 12,
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
    width: width - 35,
    resizeMode: 'cover',
    borderRadius: 20,
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
  leftHeaderImage: {
    height: height * 0.025,
    width: height * 0.025,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rightHeaderImage: {
    height: height * 0.06,
    width: height * 0.06,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoImgStyle: {
    height: 30,
    width: 75,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchBarMainView: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    width: width - 30,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
  },
  searchIconImageView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconStyle: {
    height: height * 0.025,
    width: height * 0.025,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 50,
    width: width - 70,
    alignSelf: 'center',
  },
});
