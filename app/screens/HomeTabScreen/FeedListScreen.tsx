import React, { createRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images, Fonts } from '../../theme';
import NavigationService from '../../services/NavigationService';
import { postUserSuggestionSuccess, postUserFilterSuccess, getLinkedTeamSuccess } from '../../actions/UserLinkedActions';
import { ScrollView } from 'react-native-gesture-handler';
import { postEndUserProfileSuccess } from '../../actions/EndUserProfileAction';
import { getrecommendedConnectionList } from '../../actions/ConnectionsAction';
import { sendUserLinkApi, sendUserLinkSuccess } from '../../actions/UserLinkedActions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import likeShareMoments from '../../actions/ShareMomentLike';
import { newuserFeedListApi, newuserFeedListSuccess } from '../../actions/NewFeedListAction';
import { likeShareMomentsSuccess } from '../../actions/ShareMomentLike';
import userPostReport from '../../actions/UserPostReport';
import Modal from 'react-native-modal';
import likeWorkWithMe from '../../actions/WorkWithMeLike';
import { likeWorkWithMeSuccess } from '../../actions/WorkWithMeLike';
import { postEndUserProfile } from '../../actions/EndUserProfileAction';
import AsyncStorage from '@react-native-community/async-storage';
import insightLike from '../../actions/InsightLike';
import likeBadges from '../../actions/BadgesLike';
import { likeBadgesSuccess } from '../../actions/BadgesLike';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';
import Share from 'react-native-share';
import { chatHistorySuccess, ActiveState } from '../../actions/MessagesAction';
import { getBadgesCommentSuccess, getworkwithmeCommentsSuccess, getSharedMomentsCommentSuccess, getInsightPitchCommentSuccess } from '../../actions/SharedMomentsComments';

let tempFeedArray = [];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FeedListScreen = ({ navigation, ...props }) => {
  const isFocused = navigation.isFocused();
  const dispatch = useDispatch();

  const getrecommendedListRes = useSelector(state => state.ConnectionReducer.getRecommendedList);
  const linkSendRes = useSelector(state => state.UserLinkedReducer.postsendLink);
  const feedPostListRes = useSelector(state => state.NewFeedListReducer.getNewFeedList);

  const [isLoading, setIsLoading] = useState(false);
  const [UserId, setUserId] = useState('');
  const [uiRender, setUirender] = useState(false);
  const [showFeedArray, setShowFeedArray] = useState([]);
  const [Limit, setLimit] = useState(5);
  const [Offset, setOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPIModalVisible, setPIModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [recommendedListArray, setRecommendedListArray] = useState([]);
  const [insightModalVisible, setInsghtModalVisible] = useState(false);
  const [feedLoading, setFeedLoading] = useState(false);

  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
  };

  useEffect(() => {
    userIDfunc();
    setLimit(5);
    setOffset(0);
    tempFeedArray = [];
    const sendData = {
      offset: 0,
      limit: 5,
    };
    dispatch(newuserFeedListApi(sendData));
    setFeedLoading(true)
    dispatch(chatHistorySuccess())
    dispatch(ActiveState(false))
  }, []);

  // -----second usseEffect will call-----//
  // useEffect(() => {
  //     console.log("Called navigation")
  //     calledFunc()
  // }, [navigation]);

  // -----AnyTime call for render the UI-----//
  const calledFunc = async () => {
    const sendData = {
      offset: Offset,
      limit: Limit,
    };
    dispatch(likeShareMomentsSuccess());
    dispatch(likeWorkWithMeSuccess());
    dispatch(likeBadgesSuccess());
    dispatch(newuserFeedListApi(sendData));
    dispatch(postUserSuggestionSuccess(''));
    dispatch(postUserFilterSuccess(''));
    dispatch(getLinkedTeamSuccess());
    dispatch(postEndUserProfileSuccess(''));
    dispatch(getrecommendedConnectionList());
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const PItoggleModal = () => {
    setPIModalVisible(!isPIModalVisible);
    setInsghtModalVisible(false)
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    tempFeedArray = [];
    setTimeout(() => {
      const sendData = {
        offset: 0,
        limit: 5,
      };
      dispatch(newuserFeedListApi(sendData));
      setRefreshing(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (feedPostListRes != undefined && feedPostListRes.data != undefined) {
      tempFeedArray = tempFeedArray.concat(feedPostListRes.data);
      for (let item of tempFeedArray) {
        if (item.posttype === 'workwithme') item.activeIndex = 0;
      }
      setUirender(!uiRender);
      setFeedLoading(false);
      setShowFeedArray(tempFeedArray);
      dispatch(newuserFeedListSuccess());
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

  // -----Badges Function Start-----//
  const BadgesAddLike = badgesItem => {
    if (badgesItem.likestatus === '0') {
      badgesItem.likestatus = '1';
      badgesItem.like_count = badgesItem.like_count + 1;
    } else if (badgesItem.likestatus === '1') {
      badgesItem.likestatus = '0';
      badgesItem.like_count = badgesItem.like_count - 1;
    }
    setUirender(!uiRender);
    const sendData = {
      badges_id: badgesItem.badges_id,
      user_id: badgesItem.user_id,
    };
    dispatch(likeBadges(sendData));
  };

  const BadgesComment = badgesItem => {
    const sendData = {
      user_id: badgesItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    dispatch(getBadgesCommentSuccess());
    NavigationService.navigate('BadgesCommentScreen', {
      badgesItem: badgesItem,
      screenType: 'FeedScreen',
    });
  };
  // -----Badges Function End-----//

  // -----Link btn function call----- //
  const sendLinkInvite = id => {
    dispatch(sendUserLinkApi(id));
  };

  // -----Shared moments Function Start-----//
  const twoOptionAlertHandler = showfeedItem => {
    Alert.alert(
      'Are you sure you want to report this item?',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          onPress: () => toggleModal(),
        },
        {
          text: 'Report',
          onPress: () => ReportFunc(showfeedItem),
        },
      ],
      { cancelable: false },
    );
  };

  const ReportFunc = showfeedItem => {
    const sendData = {
      post_id: showfeedItem.id,
      post_type: showfeedItem.posttype,
    };
    dispatch(userPostReport(sendData));
    toggleModal();
  };

  const SharedMomentAddLike = shareItem => {
    if (shareItem.likestatus === '0') {
      shareItem.likestatus = '1';
      shareItem.count = shareItem.count + 1;
    } else if (shareItem.likestatus === '1') {
      shareItem.likestatus = '0';
      shareItem.count = shareItem.count - 1;
    }
    setUirender(!uiRender);
    const sendData = {
      post_id: shareItem.id,
      sender_user_id: shareItem.user_id
    }
    dispatch(likeShareMoments(sendData));
  };

  const sharedMomentsComment = shareItem => {
    const sendData = {
      user_id: shareItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    dispatch(getSharedMomentsCommentSuccess());
    NavigationService.navigate('ShareMomentInfoScreen', {
      shareItem: shareItem,
      screenType: 'FeedScreen',
    });
  };

  const OpenShareMomentPost = shareItem => {
    const sendData = {
      user_id: shareItem.user_id,
    };
    dispatch(postEndUserProfile(sendData));
    NavigationService.navigate('OpenShareMomentScreen', { shareItem: shareItem });
  };
  // -----Shared moments Function End-----//

  // -----insights Function Start-----//
  const InsightsAddLike = postItem => {
    if (postItem.likestatus === '0') {
      postItem.likestatus = '1';
      postItem.countlike = postItem.countlike + 1;
    } else if (postItem.likestatus === '1') {
      postItem.likestatus = '0';
      postItem.countlike = postItem.countlike - 1;
    }
    setUirender(!uiRender);
    const id = postItem.id;
    dispatch(insightLike(id));
  };

  const insightComment = postItem => {
    dispatch(getInsightPitchCommentSuccess());
    NavigationService.navigate('InsightComment', {
      postItem: postItem,
      screenType: 'FeedScreen',
    });
  };
  // -----insights Function End-----//

  // -----Work with me Function Start-----//
  const wwmAddLike = item => {
    // console.log('ieeem', item)
    if (item.likestatus === '0') {
      item.likestatus = '1';
      item.like_count = item.like_count + 1;
    } else if (item.likestatus === '1') {
      item.likestatus = '0';
      item.like_count = item.like_count - 1;
    }
    setUirender(!uiRender);
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
    dispatch(getworkwithmeCommentsSuccess());
    NavigationService.navigate('WorkWithMeInfoScreen', {
      profileItem: item,
      screenType: 'FeedScreen',
    });
  };
  // -----Work with me Function End-----//

  const renderWorking = ({ item, index }) => {
    return (
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={Images.FrameImage}
          style={{
            height: scale(195),
            width: width - 60,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}>
          <View style={{ marginTop: scale(18), right: 15, position: 'absolute' }}>
            <Text style={{ color: '#000', fontSize: 10, fontWeight: 'normal' }}>
              {item.updateworkingwithmetime}
            </Text>
          </View>

          <View style={{ height: height / 5 - 10 }}>
            <Text
              style={{
                fontSize: scale(18),
                color: '#000',
                textAlign: 'center',
                width: width - 70,
                alignSelf: 'center',
                fontWeight: '600',
                marginTop: scale(60),
                paddingHorizontal: scale(16),
                fontFamily: Fonts.fontName.GibsonRegular,
                lineHeight: scale(18),
              }}>
              {item.questions}
            </Text>
            {item.ans_data != undefined && (
              <Text
                style={{
                  fontSize: scale(15),
                  lineHeight: scale(20),
                  color: '#3A3643',
                  textAlign: 'center',
                  marginTop: scale(18),
                  fontFamily: Fonts.fontName.nunitoRegular,
                }}>
                {item.ans_data}
              </Text>
            )}
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 14,
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 10, flexDirection: 'row' }}>
              {item.like_count === false ? (
                <Text
                  style={{ fontSize: 12, marginRight: 5, alignSelf: 'center' }}>
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
                    source={require('../../../assets/images/Vector1.png')}
                    style={{ height: 20, width: 20, tintColor: 'blue' }}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/images/Vector1.png')}
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {item.commentcount === false ? (
                <Text
                  style={{ fontSize: 12, marginRight: 5, alignSelf: 'center' }}>
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
                  style={{ height: 18, width: 18 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {item.useralldata.user_id != UserId ? (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('WantAnswerScreen', { data: item })
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
          ) : null}
        </View>
      </View>
    );
  };

  const showDots = data => {
    if (data.length > 20) {
      return 20;
    } else {
      return data.length;
    }
  };

  const pagination = (data, activeIndex) => {
    return (
      <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
        <Pagination
          dotsLength={showDots(data)}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            marginHorizontal: -6.5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 50,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };

  const indexFunc = (itemIndex, wmindex) => {
    let tempArray = [...showFeedArray];
    tempArray[wmindex].activeIndex = itemIndex;
    setShowFeedArray(tempArray);
  };

  const loadMoreFunc = () => {
    setLimit(Limit);
    setOffset(Offset + 5);
    const sendData = {
      offset: Offset + 5,
      limit: 5,
    };
    dispatch(newuserFeedListApi(sendData));
  };

  const goToEndUserWwm = async listItem => {
    if (listItem.work_array[0].user_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.work_array[0].user_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };

  const goToEndUserSharedm = async listItem => {
    if (listItem.useralldata.user_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.useralldata.user_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };

  const goToEndUserBadges = async listItem => {
    if (listItem.receiver_id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.receiver_id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };

  const goToEndUserRecommend = async listItem => {
    if (listItem.id != UserId) {
      AsyncStorage.setItem('EndUSerId', listItem.id);
      dispatch(postEndUserProfileSuccess());
      NavigationService.navigate('OtherUserProfileScreen');
    } else {
      NavigationService.navigate('HomeProfileScreenNew');
    }
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoad = () => {
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

  const goToContactScreen = () => {
    setPIModalVisible(false);
    NavigationService.navigate('ContactUsScreen');
  };

  const openInsightFunc = () => {
    setInsghtModalVisible(!insightModalVisible);
    setUirender(!uiRender);
  };

  const allModal = () => {
    setInsghtModalVisible(!insightModalVisible);
    setPIModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerMainView}>
          <View style={{ flex: 0.2 }}></View>
          {/* <Image source={Images.HomeLeftHeader} style={styles.leftHeaderImage} /> */}
          <Image source={Images.logo_dot} style={styles.logoImgStyle} />
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
        <View
          style={{
            width: '100%',
            borderWidth: 3,
            borderColor: 'rgba(118, 118, 128, 0.12)',
            marginTop: 14,
            marginBottom: 3,
          }}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {showFeedArray && showFeedArray.length > 0 ? (
          <View>
            {/* {refreshing ? (
              <View
                style={{
                  position: 'absolute', left: 0, right: 0, top: 5, bottom: 0, alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: "transparent"
                }}
              >
                <View>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              </View>) : null} */}
            {showFeedArray.map((showfeedItem, showfeedIndex) => (
              <View key={showfeedIndex}>
                {showfeedItem.posttype === 'workwithme' && (
                  <View>
                    <View style={{ marginTop: 10 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignSelf: 'center',
                          width: width - 40,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            width: width - 40,
                          }}>
                          <TouchableOpacity
                            onPress={() => goToEndUserWwm(showfeedItem)}
                            activeOpacity={1}
                            style={{ flexDirection: 'row' }}>
                            {showfeedItem.work_array[0].useralldata
                              .profile_file != 'undefined' ? (
                              <View>
                                {showfeedItem.work_array[0].useralldata
                                  .image_type === 1 ? (
                                  <LazyLoader
                                    uriImg={
                                      showfeedItem.work_array[0].useralldata
                                        .profile_file
                                    }
                                    style={{
                                      height: scale(50),
                                      width: scale(50),
                                      resizeMode: 'cover',
                                      borderRadius: 50,
                                    }}
                                  />
                                ) : (
                                  <View>
                                    <View pointerEvents="none" style={{}}>
                                      {isLoading ? (
                                        <ActivityIndicator
                                          animating
                                          size="small"
                                          color="gray"
                                          style={{
                                            position: 'absolute',
                                            left: '9%',
                                            right: 0,
                                            top: '2%',
                                          }}
                                        />
                                      ) : null}
                                      <Video
                                        source={{
                                          uri:
                                            showfeedItem.work_array[0]
                                              .useralldata.profile_file,
                                        }}
                                        style={{
                                          height: scale(50),
                                          width: scale(50),
                                          borderRadius: 50,
                                          marginTop: -3,
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
                                    {/* <View style={{ position: 'absolute', left: '9%', right: 0, top: '2%', }}>
                                                                            <Image source={require('../../../assets/images/play-button.png')} style={{ height: 46, width: 46, resizeMode: 'contain' }} />
                                                                        </View> */}
                                  </View>
                                )}
                              </View>
                            ) : (
                              <Image
                                source={Images.profile2}
                                style={{
                                  height: 46,
                                  width: 46,
                                  resizeMode: 'contain',
                                }}
                              />
                            )}
                            <View style={{ marginLeft: 10, marginBottom: 10 }}>
                              <Text
                                style={{
                                  color: '#141414',
                                  fontSize: 12,
                                  lineHeight: 23,
                                  fontWeight: '600',
                                  fontFamily: Fonts.fontName.GibsonRegular,
                                }}>
                                {showfeedItem.work_array[0].useralldata
                                  .first_name != '' &&
                                  showfeedItem.work_array[0].useralldata
                                    .first_name != null
                                  ? showfeedItem.work_array[0].useralldata
                                    .first_name
                                  : null}{' '}
                                {showfeedItem.work_array[0].useralldata
                                  .last_name != '' &&
                                  showfeedItem.work_array[0].useralldata
                                    .last_name != null
                                  ? showfeedItem.work_array[0].useralldata
                                    .last_name
                                  : null}
                              </Text>
                              <Text
                                style={{
                                  color: '#141414',
                                  fontSize: 10,
                                  fontFamily: Fonts.fontName.nunitoRegular,
                                }}>
                                {showfeedItem.work_array[0].useralldata
                                  .job_title != '' &&
                                  showfeedItem.work_array[0].useralldata
                                    .job_title != null
                                  ? showfeedItem.work_array[0].useralldata
                                    .job_title
                                  : null}
                              </Text>
                              <Text
                                style={{
                                  color: '#828282',
                                  fontSize: 10,
                                  fontWeight: 'normal',
                                }}>
                                {
                                  showfeedItem.work_array[0]
                                    .updateworkingwithmetime
                                }
                              </Text>
                            </View>
                          </TouchableOpacity>
                          {showfeedItem.work_array[0].useralldata.user_id !=
                            UserId ? (
                            <TouchableOpacity
                              onPress={() =>
                                twoOptionAlertHandler(showfeedItem)
                              }>
                              <Image
                                source={Images.threeDotsImg}
                                style={styles.threedots}
                              />
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                      <Carousel
                        data={showfeedItem.work_array}
                        renderItem={renderWorking}
                        sliderWidth={width}
                        itemWidth={width - 65}
                        onSnapToItem={index => indexFunc(index, showfeedIndex)}
                      />
                      {pagination(
                        showfeedItem.work_array,
                        showfeedItem.activeIndex,
                      )}
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
                )}
                {showfeedItem.posttype === 'sharemoment' && (
                  <View style={{ marginTop: 15 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        width: width - 40,
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => goToEndUserSharedm(showfeedItem)}
                        style={{ flexDirection: 'row' }}>
                        {showfeedItem.useralldata.profile_file !=
                          'undefined' ? (
                          <View>
                            {showfeedItem.useralldata.image_type === 1 ? (
                              <LazyLoader
                                uriImg={showfeedItem.useralldata.profile_file}
                                style={{
                                  height: scale(50),
                                  width: scale(50),
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            ) : (
                              <View pointerEvents="none" style={{}}>
                                {isLoading ? (
                                  <ActivityIndicator
                                    animating
                                    size="small"
                                    color="gray"
                                    style={{
                                      position: 'absolute',
                                      left: '9%',
                                      right: 0,
                                      top: '2%',
                                    }}
                                  />
                                ) : null}
                                <Video
                                  source={{
                                    uri: showfeedItem.useralldata.profile_file,
                                  }}
                                  style={{
                                    height: scale(50),
                                    width: scale(50),
                                    borderRadius: 50,
                                    marginTop: -3,
                                  }}
                                  paused={true}
                                  onLoadStart={onLoadStart}
                                  onLoad={onLoad}
                                  disableFullscreen={true}
                                  seekColor="transparent"
                                  disableSeekbar
                                  controls={true}
                                  muted={true}
                                />
                              </View>
                            )}
                          </View>
                        ) : (
                          <Image
                            source={Images.profile2}
                            style={{
                              height: 46,
                              width: 46,
                              resizeMode: 'contain',
                            }}
                          />
                        )}
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              color: '#141414',
                              fontSize: 12,
                              lineHeight: 23,
                              fontWeight: '600',
                              fontFamily: Fonts.fontName.GibsonRegular,
                            }}>
                            {showfeedItem.useralldata.first_name != '' &&
                              showfeedItem.useralldata.first_name != null
                              ? showfeedItem.useralldata.first_name
                              : null}{' '}
                            {showfeedItem.useralldata.last_name != '' &&
                              showfeedItem.useralldata.last_name != null
                              ? showfeedItem.useralldata.last_name
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#141414',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                            }}>
                            {showfeedItem.useralldata.job_title != '' &&
                              showfeedItem.useralldata.job_title != null
                              ? showfeedItem.useralldata.job_title
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#828282',
                              fontSize: 10,
                              fontWeight: 'normal',
                            }}>
                            {showfeedItem.updatesharemomenttime}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {showfeedItem.useralldata.user_id != UserId ? (
                        <TouchableOpacity
                          onPress={() => twoOptionAlertHandler(showfeedItem)}>
                          <Image
                            source={Images.threeDotsImg}
                            style={styles.threedots}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    {showfeedItem.imagetype === 1 ? (
                      <TouchableOpacity
                        onPress={() => OpenShareMomentPost(showfeedItem)}>
                        <LazyLoader
                          uriImg={showfeedItem.image}
                          style={{
                            resizeMode: 'contain',
                            // width: '90%',
                            height: 195,
                            marginTop: 10,
                            marginHorizontal: '8%'
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View>
                        <View pointerEvents="none" style={{}}>
                          {isLoading ? (
                            <ActivityIndicator
                              animating
                              size="large"
                              color="gray"
                              style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '44%',
                              }}
                            />
                          ) : null}
                          <Video
                            source={{ uri: showfeedItem.image }}
                            style={{
                              height: 195,
                              marginTop: 10,
                              marginHorizontal: '8%'
                            }}
                            paused={true}
                            disableFullscreen={true}
                            seekColor="transparent"
                            disableSeekbar
                            controls={true}
                            onLoadStart={onLoadStart}
                            onLoad={onLoad}
                          />
                        </View>
                        <View
                          style={{
                            alignSelf:'center',
                            position: 'absolute',
                            top: '37%',
                          }}>
                          <TouchableOpacity
                            onPress={() => OpenShareMomentPost(showfeedItem)}>
                            <Image
                              source={require('../../../assets/images/play-button.png')}
                              style={{
                                height: 62,
                                width: 62,
                                resizeMode: 'contain',
                                opacity: 0.7,
                              }}
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
                      <View style={{ marginRight: 10, flexDirection: 'row' }}>
                        {showfeedItem.count === false ? (
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
                            {showfeedItem.count}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => SharedMomentAddLike(showfeedItem)}>
                          {showfeedItem.likestatus === '1' ? (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              style={{ height: 20, width: 20, tintColor: 'blue' }}
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              resizeMode="contain"
                              style={{ height: 20, width: 20 }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        {showfeedItem.commentcount === false ? (
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
                            {showfeedItem.commentcount}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => sharedMomentsComment(showfeedItem)}>
                          <Image
                            source={Images.chatImg}
                            style={{ height: 18, width: 18 }}
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
                )}
                {showfeedItem.posttype === 'badges' && (
                  <View style={{}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        width: width - 40,
                      }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => goToEndUserBadges(showfeedItem)}
                        style={{ flexDirection: 'row' }}>
                        {showfeedItem.badgesuser.profile_file != 'undefined' ? (
                          <View>
                            {showfeedItem.badgesuser.image_type === 1 ? (
                              <LazyLoader
                                uriImg={showfeedItem.badgesuser.profile_file}
                                style={{
                                  height: scale(50),
                                  width: scale(50),
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            ) : (
                              <View>
                                <View pointerEvents="none" style={{}}>
                                  {isLoading ? (
                                    <ActivityIndicator
                                      animating
                                      size="large"
                                      color="gray"
                                      style={{
                                        position: 'absolute',
                                        left: '9%',
                                        right: 0,
                                        top: '2%',
                                      }}
                                    />
                                  ) : null}
                                  <Video
                                    source={{
                                      uri: showfeedItem.badgesuser.profile_file,
                                    }}
                                    style={{
                                      height: scale(50),
                                      width: scale(50),
                                      borderRadius: 50,
                                      marginTop: -3,
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
                              height: 46,
                              width: 46,
                              resizeMode: 'contain',
                            }}
                          />
                        )}
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontFamily: Fonts.fontName.GibsonRegular,
                              color: '#141414',
                              fontSize: 12,
                              lineHeight: 23,
                              fontWeight: '600',
                            }}>
                            {showfeedItem.badgesuser.first_name != '' &&
                              showfeedItem.badgesuser.first_name != null
                              ? showfeedItem.badgesuser.first_name
                              : null}{' '}
                            {showfeedItem.badgesuser.last_name != '' &&
                              showfeedItem.badgesuser.last_name != null
                              ? showfeedItem.badgesuser.last_name
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#141414',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                            }}>
                            {showfeedItem.badgesuser.job_title != '' &&
                              showfeedItem.badgesuser.job_title != null
                              ? showfeedItem.badgesuser.job_title
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#828282',
                              fontSize: 10,
                              fontWeight: 'normal',
                            }}>
                            {showfeedItem.updatetime_at}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {showfeedItem.badgesuser.user_id != UserId ? (
                        <TouchableOpacity
                          onPress={() => twoOptionAlertHandler(showfeedItem)}>
                          <Image
                            source={Images.threeDotsImg}
                            style={styles.threedots}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                      <Text
                        style={{
                          color: '#141414',
                          fontSize: 12,
                          lineHeight: 14,
                          fontWeight: '700',
                          fontFamily: Fonts.fontName.nunitoRegular,
                        }}>
                        I received the “{showfeedItem.badge_name}” badge!
                      </Text>
                    </View>
                    <Image
                      source={{ uri: showfeedItem.badge_image }}
                      // resizeMode='contain'
                      style={{
                        width: 115,
                        height: 115,
                        alignSelf: 'center',
                        marginVertical: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 18,
                        marginTop: 14,
                      }}>
                      <View style={{ marginRight: 10, flexDirection: 'row' }}>
                        {showfeedItem.like_count === false ? (
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
                            {showfeedItem.like_count}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => BadgesAddLike(showfeedItem)}>
                          {showfeedItem.likestatus === '1' ? (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              resizeMode="contain"
                              style={{ height: 20, width: 20, tintColor: 'blue' }}
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              resizeMode="contain"
                              style={{ height: 20, width: 20 }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        {showfeedItem.commentcount == false ? (
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
                            {showfeedItem.commentcount}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => BadgesComment(showfeedItem)}>
                          <Image
                            source={Images.chatImg}
                            style={{ height: 18, width: 18 }}
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
                )}

                {showfeedItem.posttype === 'insightpost' && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        width: width - 40,
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={Images.Pitch_LogoBnw}
                          style={{
                            height: scale(50),
                            width: scale(50),
                            resizeMode: 'cover',
                            borderRadius: 50,
                          }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              color: '#141414',
                              fontSize: 12,
                              lineHeight: 23,
                              fontWeight: '600',
                              fontFamily: Fonts.fontName.GibsonRegular,
                            }}>
                            Pitch Insight
                          </Text>
                          <Text
                            style={{
                              color: '#141414',
                              fontSize: 10,
                              fontFamily: Fonts.fontName.nunitoRegular,
                            }}>
                            By our team
                          </Text>
                          <Text
                            style={{
                              color: '#828282',
                              fontSize: 10,
                              fontWeight: 'normal',
                            }}>
                            {showfeedItem.updatedtime}
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
                    {/* <View style={{ marginLeft: 26, marginTop: 22 }}>
                                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#26242D' }}>
                                                {showfeedItem.about}
                                            </Text>
                                        </View> */}
                    <ImageBackground
                      source={Images.HomeScreen02}
                      resizeMode="contain"
                      style={{
                        width: 344,
                        height: 195,
                        alignSelf: 'center',
                        marginTop: 9,
                      }}>
                      <View style={{ marginTop: 30 }}>
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
                          {showfeedItem.title}
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
                          {showfeedItem.description}
                        </Text>
                      </View>
                      {/* <View style={{ bottom: 20, position: 'absolute' }}>
                                                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 12, fontWeight: 'normal', color: '#3A3643', width: 350 }}>*based on information you shared about yourself</Text>
                                            </View> */}
                    </ImageBackground>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: 18,
                        marginTop: 14,
                      }}>
                      <View style={{ marginRight: 10, flexDirection: 'row' }}>
                        {showfeedItem.countlike === false ? (
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
                            {showfeedItem.countlike}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => InsightsAddLike(showfeedItem)}>
                          {showfeedItem.likestatus === '1' ? (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              style={{ height: 20, width: 20, tintColor: 'blue' }}
                            />
                          ) : (
                            <Image
                              source={require('../../../assets/images/Vector1.png')}
                              resizeMode="contain"
                              style={{ height: 20, width: 20 }}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        {showfeedItem.countcomment === false ? (
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
                            {showfeedItem.countcomment}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => insightComment(showfeedItem)}>
                          <Image
                            source={Images.chatImg}
                            style={{ height: 18, width: 18 }}
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
                )}
              </View>
            ))}
            {/* </View>
                       ) : null} */}
            <View style={{ paddingHorizontal: 15 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 11 }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => goToEndUserRecommend(suggestionItem)}>
                        {suggestionItem.profile_file != 'undefined' ? (
                          <View>
                            {suggestionItem.imagetype === 1 ? (
                              <LazyLoader
                                uriImg={suggestionItem.profile_file}
                                style={styles.leftHeaderImage}
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
                                      left: '9%',
                                      right: 0,
                                      top: '2%',
                                    }}
                                  />
                                ) : null}
                                <Video
                                  source={{ uri: suggestionItem.profile_file }}
                                  style={styles.leftHeaderImage}
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
                            style={styles.leftHeaderImage}
                          />
                        )}
                      </TouchableOpacity>
                      <View style={{ marginLeft: 8 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: Fonts.fontName.GibsonBold,
                            fontWeight: '600',
                          }}>
                          {suggestionItem.first_name} {suggestionItem.last_name}
                        </Text>
                        {/* <Text style={{ fontSize: 10 }}>{suggestionItem.Uprofile}</Text> */}
                        <Text
                          style={{
                            color: '#9A9A9A',
                            fontSize: 10,
                            fontFamily: Fonts.fontName.nunitoRegular,
                            lineHeight: 14,
                          }}>
                          {suggestionItem.job_title}
                        </Text>
                        <Text
                          style={{
                            width: 180,
                            color: '#C2C2C2',
                            fontSize: 10,
                            fontWeight: 'normal',
                            lineHeight: 14,
                            textDecorationLine: 'underline',
                          }}>
                          {suggestionItem.city}, {suggestionItem.state},{' '}
                          {suggestionItem.country}
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
                        style={{
                          color: '#fff',
                          fontSize: 15,
                          alignItems: 'center',
                        }}>
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
              onPress={() =>
                NavigationService.navigate('RecommendedConnection')
              }
              style={{
                height: 30,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
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
            <TouchableOpacity
              onPress={() => loadMoreFunc()}
              style={{ alignSelf: 'center' }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                }}>
                Load More
              </Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
          </View>
        ) : null}
      </ScrollView>
      <Modal
        isVisible={isPIModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => allModal()}>
        {insightModalVisible === false ? (
          <View style={styles.modalMainView}>
            <View style={{ borderRadius: 14, backgroundColor: '#fff' }}>
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
                activeOpacity={1}
                style={{ justifyContent: 'center', height: 52 }}>
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
            <View style={{ borderRadius: 14, top: 21, backgroundColor: '#fff' }}>
              <TouchableOpacity
                onPress={() => PItoggleModal()}
                style={{ justifyContent: 'center', height: 52 }}>
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
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
              <Text
                style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>
                A:
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 15,
                  alignSelf: 'center',
                  width: width - 50,
                  lineHeight: 22,
                  fontFamily: Fonts.fontName.nunitoRegular
                }}>
                Pitch insights are a summary of responses from our Pitch questions. They come directly from our Pitch community! Insights are a way to understand how others feel about topics that you have engaged with or might be interested in.
              </Text>
            </View>
          </View>
        )}
      </Modal>
      {feedLoading === true &&
        <View style={styles.loaderPositionView}>
          <View style={styles.indicatorMainView}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        </View>
      }
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

export default connect(mapStateToProps, {})(FeedListScreen);

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
  loaderPositionView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  indicatorMainView: {
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
