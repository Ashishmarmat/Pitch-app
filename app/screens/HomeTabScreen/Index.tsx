import React, {createRef, useEffect, useState} from 'react';
import {
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
import {ScrollView} from 'react-native-gesture-handler';
import {postEndUserProfileSuccess} from '../../actions/EndUserProfileAction';
import {getrecommendedConnectionList} from '../../actions/ConnectionsAction';
import {
  sendUserLinkApi,
  sendUserLinkSuccess,
} from '../../actions/UserLinkedActions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import likeShareMoments from '../../actions/ShareMomentLike';
import {feedPost} from '../../actions/FeedPostAction';
import {likeShareMomentsSuccess} from '../../actions/ShareMomentLike';
import userPostReport from '../../actions/UserPostReport';
import Modal from 'react-native-modal';
import likeWorkWithMe from '../../actions/WorkWithMeLike';
import {likeWorkWithMeSuccess} from '../../actions/WorkWithMeLike';
import {postEndUserProfile} from '../../actions/EndUserProfileAction';
import AsyncStorage from '@react-native-community/async-storage';
import insightLike from '../../actions/InsightLike';
import likeBadges from '../../actions/BadgesLike';
import {likeBadgesSuccess} from '../../actions/BadgesLike';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const HomeTabScreen = ({navigation, ...props}) => {
  const dispatch = useDispatch();

  const getrecommendedListRes = useSelector(
    state => state.ConnectionReducer.getRecommendedList,
  );
  const linkSendRes = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );
  const feedPostListRes = useSelector(state => state.FeedPostReducer.data);

  console.log('feedPostListRes', feedPostListRes);
  const [UserId, setUserId] = useState('');
  const [uiRender, setUirender] = useState(false);
  const [certificateArray, setCertificatArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPIModalVisible, setPIModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [recommendedListArray, setRecommendedListArray] = useState([]);
  const [feedPostListArray, setFeedPostListArray] = useState([]);
  const [sharemomentArray, setSharemomentArray] = useState([]);
  const [wwmArray, setWwmArray] = useState([]);
  const [insightrray, setInsightrray] = useState([]);
  const [badgesArray, setBadgesArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [workWithMeSelected, setWorkWithMeSelected] = useState('');
  const [workWithMeUserId, setWorkWithMeUserId] = useState('');
  const [workWithMeQuestionId, setWorkWithMeQuestionId] = useState('');
  const [workWithMeLikeStatus, setWorkWithMeLikeStatus] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const PItoggleModal = () => {
    setPIModalVisible(!isPIModalVisible);
  };
  // -----first usseEffect will call-----//
  useEffect(() => {
    calledFunc();
  }, []);

  // -----second usseEffect will call-----//
  useEffect(() => {
    calledFunc();
  }, [navigation]);

  // -----AnyTime call for render the UI-----//
  const calledFunc = async () => {
    dispatch(likeShareMomentsSuccess());
    dispatch(likeWorkWithMeSuccess());
    dispatch(likeBadgesSuccess());
    dispatch(feedPost());
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log("Focus call")
      dispatch(postUserSuggestionSuccess(''));
      dispatch(postUserFilterSuccess(''));
      dispatch(getLinkedTeamSuccess());
      dispatch(postEndUserProfileSuccess(''));
      dispatch(getrecommendedConnectionList());
      dispatch(feedPost());
      dispatch(likeShareMomentsSuccess());
      dispatch(likeWorkWithMeSuccess());
      dispatch(likeBadgesSuccess());
    }, []),
  );
  // -----Props useEffect will called Start-----//
  useEffect(() => {
    if (props != undefined) {
      if (
        props.LikeShareMomentReducer != undefined &&
        props.LikeShareMomentReducer.data != undefined
      ) {
        if (props.LikeShareMomentReducer.response_code === 200) {
          calledFunc();
        }
      }
      if (
        props.likeWorkWithMe != undefined &&
        props.likeWorkWithMe.data != undefined
      ) {
        if (props.likeWorkWithMe.response_code === 200) {
          calledFunc();
        }
      }
      if (
        props.InsightLike != undefined &&
        props.InsightLike.data != undefined
      ) {
        if (props.InsightLike.response_code === 200) {
          calledFunc();
        }
      }
      if (
        props.LikeBadgesReducer != undefined &&
        props.LikeBadgesReducer.data != undefined
      ) {
        if (props.LikeBadgesReducer.response_code === 200) {
          calledFunc();
        }
      }
    }
  }, [props]);

  useEffect(() => {
    let loginwwmArray = [];
    if (feedPostListRes != undefined && feedPostListRes.data != undefined) {
      if (feedPostListRes.data.length > 0) {
        setFeedPostListArray(feedPostListRes.data);
        if (
          feedPostListRes.data[0].sharemoment != undefined &&
          feedPostListRes.data[0].sharemoment != ''
        ) {
          setSharemomentArray(feedPostListRes.data[0].sharemoment);
        }
        if (
          feedPostListRes.data[0].login_user_workwithme != undefined &&
          feedPostListRes.data[0].login_user_workwithme != ''
        ) {
          loginwwmArray.push(feedPostListRes.data[0].login_user_workwithme);
        }
        console.log('loginwwmArray', loginwwmArray);
        if (
          feedPostListRes.data[0].workwithme != undefined &&
          feedPostListRes.data[0].workwithme != null
        ) {
          let tempArray = [
            ...feedPostListRes.data[0].workwithme,
            ...loginwwmArray,
          ];
          let arrayToPush = [];
          for (let item of tempArray) {
            const obj = {
              corousalArray: item,
              activeIndex: 0,
            };
            arrayToPush.push(obj);
          }
          setWwmArray(arrayToPush);
        }
        if (
          feedPostListRes.data[0].insightdata != undefined &&
          feedPostListRes.data[0].insightdata != ''
        ) {
          setInsightrray(feedPostListRes.data[0].insightdata);
        }
        if (
          feedPostListRes.data[0].badgeslist != undefined &&
          feedPostListRes.data[0].badgeslist != ''
        ) {
          setBadgesArray(feedPostListRes.data[0].badgeslist);
        }
      }
    }
  }, [feedPostListRes]);

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

  // -----Working With me Crousal render Function Start-----//

  const twoOptionAlertHandler = shareItem => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure you want to report this item?',
      //body
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => toggleModal(),
        },
        {
          text: 'Report',
          onPress: () => ReportFunc(shareItem),
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  const ReportFunc = shareItem => {
    const sendData = {
      post_id: shareItem.id,
      post_type: 'share',
    };
    dispatch(userPostReport(sendData));
    toggleModal();
    // console.log('qwertyyy',sendData);
  };

  const renderWorking = ({item, index}) => {
    // console.log("renderWorking item", item);
    return (
      <View>
        <ImageBackground
          imageStyle={{borderRadius: 15}}
          source={Images.FrameImage}
          style={{
            height: scale(height / 5 + 40),
            width: width - 60,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}>
          <View style={{height: height / 5 - 10}}>
            <Text
              style={{
                fontSize: 18,
                color: '#4900E8',
                textAlign: 'center',
                width: width - 70,
                alignSelf: 'center',
                fontWeight: '600',
                marginTop: scale(30),
              }}>
              {item.questions}
            </Text>
            {item.ans_data != undefined && (
              <Text
                style={{
                  color: '#000',
                  textAlign: 'center',
                  marginTop: scale(25),
                }}>
                {item.ans_data}
              </Text>
            )}
          </View>

          {/* {pagination()} */}
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 14,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10, flexDirection: 'row'}}>
              {item.like_count === false ? (
                <Text
                  style={{fontSize: 12, marginRight: 5, alignSelf: 'center'}}>
                  0
                </Text>
              ) : (
                <Text
                  style={{
                    marginRight: 5,
                    color: '#4900E8',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  {item.like_count}
                </Text>
              )}
              <TouchableOpacity onPress={() => wwmAddLike(item)}>
                {item.likestatus === '1' ? (
                  <Image
                    source={require('../../../assets/images/Vector.png')}
                    style={{height: 26, width: 26}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/Vector1.png')}
                    style={{height: 26, width: 26}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              {item.commentcount === false ? (
                <Text
                  style={{fontSize: 12, marginRight: 5, alignSelf: 'center'}}>
                  0
                </Text>
              ) : (
                <Text
                  style={{
                    marginRight: 5,
                    color: '#4900E8',
                    fontSize: 12,
                    alignSelf: 'center',
                  }}>
                  {item.commentcount}
                </Text>
              )}
              <TouchableOpacity onPress={() => wwmAddComment(item)}>
                <Image
                  source={Images.chatImg}
                  style={{height: 23, width: 23}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate('WantAnswerScreen', {data: item})
            }>
            <Text
              style={{
                right: 5,
                fontWeight: '600',
                textDecorationLine: 'underline',
                fontSize: 10,
                lineHeight: 14,
                alignSelf: 'center',
              }}>
              I want to answer this too!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const pagination = (data, activeIndex) => {
    return (
      <View style={{position: 'absolute', bottom: 40, alignSelf: 'center'}}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: -6.5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            width: 13,
            height: 13,
            borderRadius: 50,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };

  const indexFunc = (itemIndex, wmindex) => {
    let tempArray = [...wwmArray];
    tempArray[wmindex].activeIndex = itemIndex;
    setWwmArray(tempArray);
  };

  // ----- get Work with me Active Question_id and User_id----- //
  const getActiveId = activeItem => {
    setWorkWithMeQuestionId(activeItem.question_id);
    setWorkWithMeUserId(activeItem.user_id);
    setWorkWithMeLikeStatus(activeItem.workwithmelikestatus);
    setWorkWithMeSelected(activeItem);
  };

  // -----insights Like/comment Function Start-----//
  const InsightsAddLike = postItem => {
    const id = postItem.id;
    dispatch(insightLike(id));
  };
  const insightComment = postItem => {
    NavigationService.navigate('InsightComment', {postItem: postItem});
  };

  // -----insights Like/comment Function End-----//

  // -----Badges Like/comment Function Start-----//

  const BadgesAddLike = badgesItem => {
    console.log('like badgesItem', badgesItem);
    const sendData = {
      badges_id: badgesItem.badges_id,
      user_id: badgesItem.user_id,
    };
    dispatch(likeBadges(sendData));
    // console.log('likeBadges sendData', sendData);
  };
  const BadgesComment = badgesItem => {
    const sendData = {
      user_id: badgesItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    NavigationService.navigate('BadgesCommentScreen', {badgesItem: badgesItem});
  };
  // -----Badges Like/comment Function end-----//

  // -----Shared moments Like/comment Function Start-----//
  const SharedMomentAddLike = shareItem => {
    // console.log('shareItemshareItem', shareItem);

    const sendData={
      post_id : shareItem.id,
      sender_user_id:shareItem.user_id
    }
    dispatch(likeShareMoments(sendData));
  };

  const sharedMomentsComment = shareItem => {
    const sendData = {
      user_id: shareItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    NavigationService.navigate('ShareMomentInfoScreen', {shareItem: shareItem});
  };

  const OpenShareMomentPost = shareItem => {
    const sendData = {
      user_id: shareItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    NavigationService.navigate('OpenShareMomentScreen', {shareItem: shareItem});
  };
  // -----Shared moments Like/comment Function End-----//

  // -----Work with me Like/comment Function Start-----//
  const wwmAddLike = item => {
    console.log('ieeem', item);
    const sendData = {
      question_id: item.id,
      question_user_id: item.user_id,
    };
    dispatch(likeWorkWithMe(sendData));
  };

  const wwmAddComment = item => {
    const sendData = {
      user_id: item.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    NavigationService.navigate('WorkWithMeInfoScreen', {profileItem: item});
  };
  // -----Work with me Like/comment Function End-----//

  console.log('wwmArray', wwmArray);

  // -----Working with me Crousal render Function End-----//
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View>
        <View style={styles.headerMainView}>
          <Image
            source={Images.HomeLeftHeader}
            style={styles.leftHeaderImage}
          />
          <Image source={Images.logo_dot} style={styles.logoImgStyle} />
          <Image
            source={Images.HomeRightHeader}
            style={styles.rightHeaderImage}
          />
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
        <View
          style={{
            width: '100%',
            borderWidth: 3,
            borderColor: 'rgba(118, 118, 128, 0.12)',
            marginTop: 14,
            marginBottom: 19,
          }}
        />
      </View>
      <ScrollView>
        {/* //--- insightrray ---/// */}
        <View style={styles.postView}>
          {insightrray.map((postItem, postIndex) => (
            <View key={postIndex}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Images.Pitch_LogoBnw}
                    style={{
                      height: scale(50),
                      width: scale(50),
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 12,
                        lineHeight: 23,
                        fontWeight: '600',
                      }}>
                      Pitch Insight
                    </Text>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      By our team
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      {postItem.updatedtime}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => PItoggleModal()}>
                  <Image
                    source={Images.threeDotsImg}
                    style={styles.threedots}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 26, marginTop: 22}}>
                <Text
                  style={{fontSize: 12, fontWeight: '700', color: '#26242D'}}>
                  {postItem.about}
                </Text>
              </View>
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
                    {postItem.title}
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
                    {postItem.description}
                  </Text>
                </View>
                <View style={{bottom: 20, position: 'absolute'}}>
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
                </View>
              </ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 18,
                  marginTop: 14,
                }}>
                <View style={{marginRight: 10, flexDirection: 'row'}}>
                  {postItem.countlike === false ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 5,
                        alignSelf: 'center',
                      }}>
                      0
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginRight: 5,
                        color: '#4900E8',
                        fontSize: 12,
                        alignSelf: 'center',
                      }}>
                      {postItem.countlike}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => InsightsAddLike(postItem)}>
                    {postItem.likestatus === '1' ? (
                      <Image
                        source={require('../../../assets/images/Vector.png')}
                        style={{height: 23, width: 23}}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/images/Vector1.png')}
                        style={{height: 23, width: 23}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                  {postItem.countcomment === false ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 5,
                        alignSelf: 'center',
                      }}>
                      0
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginRight: 5,
                        color: '#4900E8',
                        fontSize: 12,
                        alignSelf: 'center',
                      }}>
                      {postItem.countcomment}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => insightComment(postItem)}>
                    <Image
                      source={Images.chatImg}
                      style={{height: 23, width: 23}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 3,
                  borderColor: 'rgba(118, 118, 128, 0.12)',
                  marginTop: 14,
                  marginBottom: 19,
                }}
              />
            </View>
          ))}
        </View>

        {/* //--- badgesArray ---/// */}
        <View style={styles.postView}>
          {badgesArray.map((badgesItem, badgesIndex) => (
            <View key={badgesIndex}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {badgesItem.badgesuser.profile_file != undefined ? (
                    <Image
                      source={{uri: badgesItem.badgesuser.profile_file}}
                      style={{
                        height: scale(50),
                        width: scale(50),
                        resizeMode: 'cover',
                        borderRadius: 50,
                      }}
                    />
                  ) : null}
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 12,
                        lineHeight: 23,
                        fontWeight: '600',
                      }}>
                      {badgesItem.badgesuser.first_name != '' &&
                      badgesItem.badgesuser.first_name != null
                        ? badgesItem.badgesuser.first_name
                        : null}{' '}
                      {badgesItem.badgesuser.last_name != '' &&
                      badgesItem.badgesuser.last_name != null
                        ? badgesItem.badgesuser.last_name
                        : null}
                    </Text>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      {badgesItem.badgesuser.job_title != '' &&
                      badgesItem.badgesuser.job_title != null
                        ? badgesItem.badgesuser.job_title
                        : null}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      {badgesItem.updatetime_at}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => twoOptionAlertHandler(badgesItem)}>
                  <Image
                    source={Images.threeDotsImg}
                    style={styles.threedots}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 15, marginTop: 10}}>
                <Text
                  style={{
                    color: '#141414',
                    fontSize: 12,
                    lineHeight: 14,
                    fontWeight: '700',
                  }}>
                  I received the “{badgesItem.badge_name}” badge!
                </Text>
              </View>
              <ImageBackground
                source={{uri: badgesItem.badge_image}}
                resizeMode="contain"
                style={{
                  width: 344,
                  height: 195,
                  alignSelf: 'center',
                  marginTop: 10,
                }}></ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 18,
                  marginTop: 14,
                }}>
                <View style={{marginRight: 10, flexDirection: 'row'}}>
                  {badgesItem.like_count === false ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 5,
                        alignSelf: 'center',
                      }}>
                      0
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginRight: 5,
                        color: '#4900E8',
                        fontSize: 12,
                        alignSelf: 'center',
                      }}>
                      {badgesItem.like_count}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => BadgesAddLike(badgesItem)}>
                    {badgesItem.likestatus === '1' ? (
                      <Image
                        source={require('../../../assets/images/Vector.png')}
                        style={{height: 23, width: 23}}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/images/Vector1.png')}
                        style={{height: 23, width: 23}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                  {badgesItem.commentcount == false ? (
                    <Text
                      style={{
                        fontSize: 12,
                        marginRight: 5,
                        alignSelf: 'center',
                      }}>
                      0
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginRight: 5,
                        color: '#4900E8',
                        fontSize: 12,
                        alignSelf: 'center',
                      }}>
                      {badgesItem.commentcount}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => BadgesComment(badgesItem)}>
                    <Image
                      source={Images.chatImg}
                      style={{height: 23, width: 23}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 3,
                  borderColor: 'rgba(118, 118, 128, 0.12)',
                  marginTop: 14,
                  marginBottom: 19,
                }}
              />
            </View>
          ))}
        </View>

        {/* //--- wwmArray ---/// */}

        <View style={styles.postView}>
          {wwmArray.map((wwmItem, wwmIndex) => (
            <View key={wwmIndex}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width - 40,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{
                      uri: wwmItem.corousalArray[0].useralldata.profile_file,
                    }}
                    style={{
                      height: scale(50),
                      width: scale(50),
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 12,
                        lineHeight: 23,
                        fontWeight: '600',
                      }}>
                      {wwmItem.corousalArray[0].useralldata.first_name}{' '}
                      {wwmItem.corousalArray[0].useralldata.last_name}
                    </Text>
                    <Text
                      style={{
                        color: '#141414',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      {wwmItem.corousalArray[0].useralldata.job_title}
                    </Text>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 10,
                        fontWeight: 'normal',
                      }}>
                      {wwmItem.corousalArray[0].updateworkingwithmetime}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => twoOptionAlertHandler(wwmItem.corousalArray)}>
                  <Image
                    source={Images.threeDotsImg}
                    style={styles.threedots}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 10}}>
                <Carousel
                  data={wwmItem.corousalArray}
                  renderItem={renderWorking}
                  sliderWidth={width}
                  itemWidth={width - 65}
                  onSnapToItem={index => indexFunc(index, wwmIndex)}
                />
                {pagination(wwmItem.corousalArray, wwmItem.activeIndex)}
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 3,
                  borderColor: 'rgba(118, 118, 128, 0.12)',
                  marginTop: 14,
                  marginBottom: 19,
                }}
              />
            </View>
          ))}
        </View>
        {/* //--- sharemomentArray ---/// */}
        <View style={styles.postView}>
          {sharemomentArray
            .slice(0)
            .reverse()
            .map((shareItem, shareIndex) => (
              <View key={shareIndex}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width - 40,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {shareItem.useralldata.profile_file != undefined ? (
                      <Image
                        source={{uri: shareItem.useralldata.profile_file}}
                        style={{
                          height: scale(50),
                          width: scale(50),
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    ) : null}
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: '#141414',
                          fontSize: 12,
                          lineHeight: 23,
                          fontWeight: '600',
                        }}>
                        {shareItem.useralldata.first_name != '' &&
                        shareItem.useralldata.first_name != null
                          ? shareItem.useralldata.first_name
                          : null}{' '}
                        {shareItem.useralldata.last_name != '' &&
                        shareItem.useralldata.last_name != null
                          ? shareItem.useralldata.last_name
                          : null}
                      </Text>
                      <Text
                        style={{
                          color: '#141414',
                          fontSize: 10,
                          fontWeight: 'normal',
                        }}>
                        {shareItem.useralldata.job_title != '' &&
                        shareItem.useralldata.job_title != null
                          ? shareItem.useralldata.job_title
                          : null}
                      </Text>
                      <Text
                        style={{
                          color: '#828282',
                          fontSize: 10,
                          fontWeight: 'normal',
                        }}>
                        {shareItem.updatesharemomenttime}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => twoOptionAlertHandler(shareItem)}>
                    <Image
                      source={Images.threeDotsImg}
                      style={styles.threedots}
                    />
                  </TouchableOpacity>
                </View>
                {shareItem.imagetype === 1 ? (
                  <TouchableOpacity
                    onPress={() => OpenShareMomentPost(shareItem)}>
                    <Image
                      resizeMode={'cover'}
                      source={{uri: shareItem.image}}
                      style={{
                        width: 344,
                        height: 195,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View>
                    <View pointerEvents="none">
                      <Video
                        source={
                          {uri: shareItem.image}
                          // { uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
                        }
                        style={{
                          width: 344,
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
                      />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        left: '42.7%',
                        right: 0,
                        top: '39%',
                      }}>
                      <TouchableOpacity
                        onPress={() => OpenShareMomentPost(shareItem)}>
                        <Image
                          source={require('../../../assets/images/play-button.png')}
                          style={{height: 55, width: 55, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 18,
                    marginTop: 14,
                  }}>
                  <View style={{marginRight: 10, flexDirection: 'row'}}>
                    {shareItem.count === false ? (
                      <Text
                        style={{
                          fontSize: 12,
                          marginRight: 5,
                          alignSelf: 'center',
                        }}>
                        0
                      </Text>
                    ) : (
                      <Text
                        style={{
                          marginRight: 5,
                          color: '#4900E8',
                          fontSize: 12,
                          alignSelf: 'center',
                        }}>
                        {shareItem.count}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => SharedMomentAddLike(shareItem)}>
                      {shareItem.likestatus === '1' ? (
                        <Image
                          source={require('../../../assets/images/Vector.png')}
                          style={{height: 23, width: 23}}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/images/Vector1.png')}
                          style={{height: 23, width: 23}}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 10}}>
                    {shareItem.commentcount === false ? (
                      <Text
                        style={{
                          fontSize: 12,
                          marginRight: 5,
                          alignSelf: 'center',
                        }}>
                        0
                      </Text>
                    ) : (
                      <Text
                        style={{
                          marginRight: 5,
                          color: '#4900E8',
                          fontSize: 12,
                          alignSelf: 'center',
                        }}>
                        {shareItem.commentcount}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => sharedMomentsComment(shareItem)}>
                      <Image
                        source={Images.chatImg}
                        style={{height: 23, width: 23}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderWidth: 3,
                    borderColor: 'rgba(118, 118, 128, 0.12)',
                    marginTop: 14,
                    marginBottom: 19,
                  }}
                />
              </View>
            ))}
        </View>
        {/* //--- recommendedListArray ---/// */}
        <View style={{paddingHorizontal: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 11}}>
              These users have similar interests to you
            </Text>
          </View>
          {recommendedListArray
            .slice(0, 3)
            .map((suggestionItem, suggestionIndex) => (
              <View
                key={suggestionIndex}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: suggestionItem.profile_file}}
                    style={styles.leftHeaderImage}
                  />
                  <View style={{marginLeft: 8}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Fonts.fontName.GibsonBold,
                        fontWeight: '600',
                      }}>
                      {suggestionItem.first_name} {suggestionItem.last_name}
                    </Text>
                    <Text style={{fontSize: 10}}>
                      {suggestionItem.Uprofile}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => sendLinkInvite(suggestionItem.id)}
                  style={{
                    backgroundColor: '#4A20E4',
                    height: 28,
                    width: 90,
                    borderWidth: 1,
                    borderColor: '#4A20E4',
                    borderRadius: 6,
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 15, alignItems: 'center'}}>
                    Link +
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(118, 118, 128, 0.12)',
            marginTop: 14,
            marginBottom: 19,
          }}
        />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('RecommendedConnection')}
          style={{height: 30, justifyContent: 'center', alignSelf: 'center'}}>
          <Text
            style={{
              lineHeight: 20,
              textDecorationLine: 'underline',
              fontSize: 15,
            }}>
            See more
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            borderWidth: 3,
            borderColor: 'rgba(118, 118, 128, 0.12)',
            marginTop: 14,
            marginBottom: 19,
          }}
        />
      </ScrollView>
      <Modal isVisible={isPIModalVisible} animationIn="slideInUp">
        <View style={styles.modalMainView}>
          <View style={{borderRadius: 14, backgroundColor: '#fff'}}>
            <TouchableOpacity
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
            <TouchableOpacity style={{justifyContent: 'center', height: 52}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#000',
                  fontWeight: '600',
                  fontSize: 14,
                  lineHeight: 16,
                }}>
                See Less Insights
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{borderRadius: 14, top: 21, backgroundColor: '#fff'}}>
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
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log('feed state', state);
  return {
    LikeShareMomentReducer: state.LikeShareMomentReducer.data,
    likeWorkWithMe: state.LikeWorkWithMeReducer.data,
    InsightLike: state.InsightLikeReducer.data,
    LikeBadgesReducer: state.LikeBadgesReducer.data,
  };
};

export default connect(mapStateToProps, {})(HomeTabScreen);

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
    paddingHorizontal: 13,
    marginTop: 12,
  },
  leftHeaderImage: {
    height: height * 0.05,
    width: height * 0.05,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 50,
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
  postView: {
    // height: scale(310),
    marginTop: 15,
    width: scale(375),
  },
  threedots: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  modalMainView: {
    height: 260,
    position: 'absolute',
    bottom: -20,
    width: 345,
    alignSelf: 'center',
  },
});
