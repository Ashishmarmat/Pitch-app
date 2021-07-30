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
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  postInsightCommentAPi,
  getInsightPitchCommentApi,
  postInsightCommentSuccess,
  getInsightPitchCommentSuccess,
  likeInsightCommentsApiSuccess,
  likeInsightCommentsApi,
} from '../../../actions/SharedMomentsComments';
import LazyLoader from '../../../components/atoms/LazyLoader';
import insightLike from '../../../actions/InsightLike';
import {insightLikeSuccess} from '../../../actions/InsightLike';
import ProfileGet from '../../../actions/ProfileActions';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const InsightComment = props => {
  // console.log("props@@£££@@", props)
  const dispatch = useDispatch();

  const getPostCommentsDataRes = useSelector(
    state => state.sharedMomentsCommentReducer.PostInsightComment,
  );

  const [uiRender, setUiRender] = useState(false);
  const [type, setType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPIModalVisible, setPIModalVisible] = useState(false);
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Postid, setID] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJobTitle, setProfileJobTitle] = useState('');
  const [token, setToken] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionUserId, setQuestUserId] = useState('');
  const [LikeCounts, setLikeCounts] = useState();
  const [isLikeCounts, setIsLikeCounts] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [renderHeight, setRenderHeight] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isLoading, setIsLoadings] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsFlatList, setCommentsFlatlist] = useState([]);
  const [profileUpdateTime, setProfileUpdateTime] = useState('');
  const [rplyCommentText, setRplyCommentText] = useState('');
  const [rplyCommentId, setReplyCommentId] = useState('');
  const [replyCommentArray, setReplyArrayComment] = useState('');
  const [replyCommentArrayIndex, setReplyArrayCommentIndex] = useState('');
  const [ProfileImageType, setProfileImageType] = useState();
  const [screenType, setScreenType] = useState('');
  const [insightModalVisible, setInsghtModalVisible] = useState(false);
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

  const PItoggleModal = () => {
    setPIModalVisible(!isPIModalVisible);
    setInsghtModalVisible(false)
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
    // console.log("propsinsight...", props)

    if (props != undefined) {
      if (props.navigation.state.params != undefined) {
        setScreenType(props.navigation.state.params.screenType);
      }
    }
    const insightData = props.navigation.state.params.postItem;
    // console.log("insightData", insightData)
    if (insightData != undefined) {
      setCaption(insightData.about);
      setTitle(insightData.title);
      setDescription(insightData.description);
      setID(insightData.id);
      setQuestUserId(insightData.user_id);
      setQuestionId(insightData.question_id);
      setProfileUpdateTime(insightData.updatedtime);
      if (insightData.countlike == false) {
        setLikeCounts(0);
      } else {
        setLikeCounts(insightData.countlike);
      }
      if (insightData.likestatus === '1') {
        setIsLikeCounts(true);
      } else {
        setIsLikeCounts(false);
      }
      const sendData = {
        post_id: Postid,
      };
      dispatch(getInsightPitchCommentApi(sendData));
    }
    dispatch(getInsightPitchCommentSuccess());
    dispatch(likeInsightCommentsApiSuccess());
  }, []);

  useEffect(() => {
    if (props != undefined) {
      // console.log("InsightPitch Props", props)
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        const name =
          props.profileRes.data.first_name + props.profileRes.data.last_name;
        setProfileName(name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJobTitle(props.profileRes.data.job_title);
        setProfileImageType(props.profileRes.data.image_type);
        const sendData = {
          post_id: Postid,
        };
        dispatch(getInsightPitchCommentApi(sendData));
      }
      if (
        props.InsightLikeReducer != undefined &&
        props.InsightLikeReducer.data != undefined
      ) {
        if (props.InsightLikeReducer.response_code === 200) {
          dispatch(ProfileGet());
          dispatch(insightLikeSuccess());
          const sendData = {
            post_id: Postid,
          };
          dispatch(getInsightPitchCommentApi(sendData));
          // console.log("Inside called")
        }
      }

      if (props.getInsightComments != undefined) {
        // console.log('inside if 1');

        if (
          props.getInsightComments.data != undefined &&
          props.getInsightComments.data.length > 0
        ) {
          // console.log('inside if 2');
          let tempArray = [];
          setCommentsFlatlist(props.getInsightComments.data);
          const data1 = props.getInsightComments.data;
          // console.log("data1", data1)
          if (replyCommentArrayIndex != '' && data1 != undefined) {
            // console.log("inside data1", data1[replyCommentArrayIndex])
            tempArray.push(data1[replyCommentArrayIndex].replycommentlist);
            setReplyArrayComment(...tempArray);
          }
        }
        const sendData = {
          post_id: Postid,
        };
        dispatch(getInsightPitchCommentApi(sendData));
      }
      if (props.likeInsightComments != undefined) {
        if (
          props.likeInsightComments.data != undefined &&
          props.likeInsightComments.response_code === 200
        ) {
          const sendData = {
            post_id: Postid,
          };
          dispatch(getInsightPitchCommentApi(sendData));
        }
      }
    }
    dispatch(getInsightPitchCommentSuccess());
  }, [props]);

  useEffect(() => {
    if (props.PostInsightComment != undefined) {
      if (props.PostInsightComment.response_code === 200) {
        const sendData = {
          post_id: Postid,
        };
        setIsLoading(false);
        dispatch(getInsightPitchCommentApi(sendData));
        dispatch(postInsightCommentSuccess());
        dispatch(likeInsightCommentsApiSuccess());
      }
    }
  }, [getPostCommentsDataRes]);

  // -----insights Like/comment Function Start-----//
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

    const post_id = Postid;
    dispatch(insightLike(post_id));
    // console.log('like insight');
  };
  const sendComment = () => {
    const sendData = {
      post_id: Postid,
      comment: commentText,
    };
    dispatch(postInsightCommentAPi(sendData));
    setCommentText('');
    setIsLoading(true);
  };
  // -----insights Like/comment Function End-----//

  const goBackFunc = () => {
    if (screenType === 'FeedScreen') {
      NavigationService.navigateAndReset('HomeScreen');
    } else {
      NavigationService.goBack();
    }
  };

  // const commentsLikeComment = (item) => {
  //     const dataSend = {
  //         comment_id: item.id
  //     }
  //     dispatch(likeInsightCommentsApi(dataSend))
  // }

  const commentsLikeComment = item => {
    // console.log('itemitem', item);
    const data = new FormData();
    data.append('comment_id', item.id);

    fetch('http://3.140.234.233/pitch/apiV1/insightpostlikecomments', {
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
        console.log('insightpostlikecomments res', res);
        if (res.status != 0) {
          const sendData = {
            post_id: Postid,
          };
          // console.log('question_id', sendData);
          setIsLoading(false);
          dispatch(getInsightPitchCommentApi(sendData));
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

    fetch('http://3.140.234.233/pitch/apiV1/insightpostcommentsreply', {
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
        console.log('insightpostcommentsreply res', res);
        setIsLoading(false);
        if (res.status != 0) {
          const sendData = {
            post_id: Postid,
          };
          // console.log("sendData", sendData)
          dispatch(getInsightPitchCommentApi(sendData));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const headerView = () => {
    return (
      <View>
        <View style={styles.headerMainView}>
          <TouchableOpacity
            onPress={() => goBackFunc()}
            style={{alignSelf: 'center'}}>
            <Image source={Images.back_button} style={styles.leftHeaderImage} />
          </TouchableOpacity>
          <Image source={Images.logo_dot} style={styles.logoImgStyle} />
          <Image
            source={Images.HomeRightHeader}
            style={styles.rightHeaderImage}
          />
        </View>
        <TouchableOpacity style={styles.searchBarMainView}>
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
    );
  };
  // const goToEndUserSharedm = async listItem => {
  //   // console.log("listItem", listItem.user_id)
  //   AsyncStorage.setItem('EndUSerId', listItem.senderuserdata.user_id);
  //   NavigationService.navigate('OtherUserProfileScreen');
  // };
  const goToEndUserSharedm = async listItem => {
    console.log('listItem',listItem); 
    if (listItem.user_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.user_id);
      dispatch(postEndUserProfileSuccess());
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

  const goToContactScreen = () => {
    setPIModalVisible(false);
    NavigationService.navigate('ContactUsScreen');
  };

  const openInsightFunc = () => {
    setInsghtModalVisible(!insightModalVisible);
    setUiRender(!uiRender);
  };

  const allModal = () => {
    setInsghtModalVisible(!insightModalVisible);
    setPIModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{height: height / 2 + 150}}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                  marginTop: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Images.Pitch_LogoBnw}
                    style={{
                      height: scale(66),
                      width: scale(66),
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 17,
                        lineHeight: 23,
                        fontWeight: '800',
                        fontFamily: Fonts.fontName.GibsonRegular,
                      }}>
                      Pitch Insight
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontWeight: 'normal',
                      }}>
                      By our team
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 12,
                        fontWeight: 'normal',
                      }}>
                      {profileUpdateTime}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => PItoggleModal()}
                  style={{justifyContent: 'center', height: scale(40)}}>
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
              <View style={{marginTop: 14}}>
                <Text
                  style={{
                    marginLeft: 20,
                    marginVertical: 6,
                    fontSize: 12,
                    fontWeight: '700',
                    color: '#26242D',
                  }}>
                  {caption}
                </Text>
                <ImageBackground
                  source={Images.HomeScreen02}
                  resizeMode="contain"
                  style={{
                    width: 344,
                    height: 195,
                    alignSelf: 'center',
                    marginTop: 9,
                  }}>
                  <View style={{marginTop: 30}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 17,
                        fontWeight: '600',
                        fontFamily: Fonts.fontName.GibsonRegular,
                        width: 313,
                        alignSelf: 'center',
                        lineHeight: 17,
                      }}>
                      {title}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: 14,
                        fontWeight: 'normal',
                        color: '#3A3643',
                        marginTop: 16,
                        width: 300,
                      }}>
                      {description}
                    </Text>
                  </View>
                  {/* <View style={{bottom: 20, position: 'absolute'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: 12,
                        fontWeight: 'normal',
                        color: '#3A3643',
                        width: 350,
                      }}>
                      *based on information you shared about yourself
                    </Text>
                  </View> */}
                </ImageBackground>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 32,
                  alignItems: 'center',
                  marginTop: 5,
                }}>
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
                  style={{flexDirection: 'row'}}>
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

                <TouchableOpacity
                  // onPress={() => setIsCommentModal(!isCommentModal)}
                  style={{flexDirection: 'row', right: 8}}>
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
                          {/* {item.senderuserdata != undefined && item.senderuserdata != null &&

                                                        <LazyLoader uriImg={item.senderuserdata.profile_file} />
                                                    } */}
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
                              {item.senderuserdata != undefined &&
                                item.senderuserdata != null && (
                                  <Text
                                    style={{
                                      color: '#141414',
                                      fontSize: 11,
                                      lineHeight: 15,
                                    }}>
                                    {item.senderuserdata.first_name}{' '}
                                    {item.senderuserdata.last_name != '' &&
                                    item.senderuserdata.last_name != null
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
                            <Text
                              style={{
                                color: '#B1B1B1',
                                fontSize: 10,
                                lineHeight: 15,
                              }}>
                              {item.commenttime}
                            </Text>
                            <Text
                              style={{color: '#000', fontSize: 10, width: 248}}>
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
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
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
                  {ProfileImageType === 1 ? (
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

            {/* <Image source={{ uri: ProfileImage }} style={{ width: 32, height: 32, resizeMode: 'cover', borderRadius: 50 }} /> */}
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
                  <Text style={{color: '#000', fontWeight: '600'}}>
                    Replies
                  </Text>
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
                              {item.replyuserdata.profile_file !=
                              'undefined' ? (
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
          <Modal 
          isVisible={isPIModalVisible}
          animationIn="slideInUp"
          onBackdropPress={() => allModal()}>
          {insightModalVisible === false ? (
            <View style={styles.modalMainView2}>
              <View style={{borderRadius: 14, backgroundColor: '#fff'}}>
              <TouchableOpacity
                onPress={() => goToContactScreen()}
                style={{
                  justifyContent: 'center',
                  height: 52,
                  borderBottomWidth: 1,
                  borderBottomColor: '#EBEBEB',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#000',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 16,
                  }}>
                  Give Feedback
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openInsightFunc()}
                style={{
                  justifyContent: 'center',
                  height: 52,
                  borderBottomWidth: 1,
                  borderBottomColor: '#EBEBEB',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#000',
                    fontWeight: '600',
                    fontSize: 14,
                    lineHeight: 16,
                  }}>
                  What are insights?
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                  style={{justifyContent: 'center', height: 52}}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'gray',
                      fontWeight: '600',
                      fontSize: 14,
                      lineHeight: 16,
                    }}>
                    See Less Insights
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{borderRadius: 14, top: 21, backgroundColor: '#fff'}}>
                <TouchableOpacity
                  onPress={() => PItoggleModal()}
                  style={{justifyContent: 'center', height: 52}}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: '#000',
                      fontWeight: '600',
                      fontSize: 14,
                      lineHeight: 16,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
             ) : (
              <View
                style={{
                  height: 400,
                  position: 'absolute',
                  bottom: -20,
                  width: width,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 10,
                }}>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => allModal()}
                    style={{
                      height: 8,
                      width: width / 3 - 20,
                      backgroundColor: '#000',
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}
                  />
                  <Text
                    style={{
                      color: '#141414',
                      fontSize: 16,
                      fontWeight: '600',
                      lineHeight: 18,
                      textAlign: 'center',
                      fontFamily: Fonts.fontName.GibsonBold,
                      marginTop: 20,
                    }}>
                    What are insights?
                  </Text>
                </View>
    
                {/* <View style={{marginTop: 10, flexDirection: 'row'}}>
                  <Text
                    style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
                    Q:
                  </Text>
                  <Text style={{marginLeft: 5, fontSize: 14, alignSelf: 'center'}}>
                    What is lorem Ipsum
                  </Text>
                </View> */}
                <View style={{marginTop: 20, flexDirection: 'row'}}>
                  <Text
                    style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
                    A:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 15,
                      alignSelf: 'center',
                      width: width - 50,
                      lineHeight:22,
                      fontFamily:Fonts.fontName.nunitoRegular
                    }}>
                   Pitch insights are a summary of responses from our Pitch questions. They come directly from our Pitch community! Insights are a way to understand how others feel about topics that you have engaged with or might be interested in.
                  </Text>
                </View>
              </View>
            )}
                
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('insight state', state);
  return {
    profileRes: state.profileReducer.data,
    getInsightComments: state.sharedMomentsCommentReducer.getInsightComments,
    likeInsightComments: state.sharedMomentsCommentReducer.likeInsightComments,
    PostInsightComment: state.sharedMomentsCommentReducer.PostInsightComment,
    InsightLikeReducer: state.InsightLikeReducer.data,
  };
};

export default connect(mapStateToProps, {})(InsightComment);

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
  modalMainView2: {
    height: 260,
    position: 'absolute',
    bottom: -20,
    width: 345,
    alignSelf: 'center',
  },
});
