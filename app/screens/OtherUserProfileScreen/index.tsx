import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images, Fonts } from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import OthersCircleComp from '../OtherUserProfileScreen/OthersCircleComp';
import { AddEndUserBadgesSuccess } from '../../actions/AddEndUserBadges';
import { sendUserLinkApi } from '../../actions/UserLinkedActions';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import { AddEndUserBadges } from '../../actions/AddEndUserBadges';
import likeShareMoments from '../../actions/ShareMomentLike';
import { likeShareMomentsSuccess } from '../../actions/ShareMomentLike';
import likeWorkWithMe from '../../actions/WorkWithMeLike';
import { likeWorkWithMeSuccess } from '../../actions/WorkWithMeLike';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';
import BetweenUs from '../../actions/BetweenUs';
import {
  createRoomApi,
  createRoomSuccess,
  chatHistorySuccess,
} from '../../actions/MessagesAction';
import moment from 'moment';
import { PinchZoomView } from 'react-native-pinch-to-zoom-view';
import {
  postEndUserProfile,
  postEndUserProfileSuccess,
} from '../../actions/EndUserProfileAction';
import { BetweenUsSuccess } from '../../actions/BetweenUs';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const OtherUserProfileScreen = ({ navigation, ...props }) => {
  const dispatch = useDispatch();

  const [aboutTab, setAboutTab] = useState(true);
  const [experienceTab, setExperienceTab] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [certifyIndex, setActivecertifyIndex] = useState(0);
  const [EndUserId, setEndUserId] = useState('');
  const [uiRender, setUirender] = useState(false);
  const [workWithMeArray, setWorkWithMeArray] = useState([]);
  const [WorkListArray, setWorkListArray] = useState([]);
  const [EducationArray, setEducationArray] = useState([]);
  const [currentJobsPage, setCurrentJobsPage] = useState(0);
  const [getEndUserProfile, setEndUserProfile] = useState();
  const [sendDataVal, setSendDataValue] = useState();
  const [bigImage, setBigImage] = useState('');
  const [workWithMeUserId, setWorkWithMeUserId] = useState('');
  const [workWithMeQuestionId, setWorkWithMeQuestionId] = useState('');
  const [workWithMeLikeStatus, setWorkWithMeLikeStatus] = useState('');
  const [sharedArray, setSharedArray] = useState([]);
  const [BadgesRes, setBadgesArray] = useState([]);
  const [TeamRes, setTeamArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleUser, setModalVisibleUser] = useState(false);
  const [workWithMeSelected, setWorkWithMeSelected] = useState('');
  const [MutualConnectionCount, setMutualConnectionCount] = useState();
  const [MutualCompany, setMutualCompany] = useState();
  const [MutualQuestionCategory, setMutualQuestionCategory] = useState('');
  const [isLoading, setIsLoadings] = useState(false);
  const [showMsgData, setShowMsgData] = useState({});
  const [token, setToken] = useState('');
  const [UserId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [EndUserPP, setEndUserPP] = useState('');
  const [EndUserPPType, setEndUserPPType] = useState('');
console.log('workWithMeLikeStatus',workWithMeLikeStatus);


  const EndUserProfileRes = useSelector(
    state => state.EndUserProfileReducer.data,
  );
  const linkResData = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );
  const addRemoveBadgesRes = useSelector(
    state => state.AddEndUserBadgesReducer.data,
  );
  const BetweenUsRes = useSelector(state => state.BetweenUsReducer.data);
  const charRoomResData = useSelector(
    state => state.MessagesReducer.createRoomData,
  );

  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    setUserId(USER_ID);
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
    const tokenGet = await AsyncStorage.getItem('Authorization');
    setToken(tokenGet);
    const endUserId = await AsyncStorage.getItem('EndUSerId');
    setEndUserId(endUserId);
    const sendData = {
      user_id: endUserId,
    };
    dispatch(postEndUserProfile(sendData));
    const sendData2 = {
      enduserid: endUserId,
    };
    dispatch(BetweenUs(sendData2));
    dispatch(AddEndUserBadgesSuccess());
    dispatch(likeShareMomentsSuccess());
    dispatch(likeWorkWithMeSuccess());
    // dispatch(BetweenUsSuccess())
    userIDfunc();
  };
  useEffect(() => {
    console.log('getEndUserProfile',getEndUserProfile);
    if (
      charRoomResData != undefined &&
      charRoomResData.data != undefined ) {
      dispatch(chatHistorySuccess());
      NavigationService.navigate('MessageChatScreen', {
        roomId: charRoomResData.data.room_id,
        selectItem: {
          user_id: UserId,
          receiver_id: Number(EndUserId),
          full_name: fullName,
          profile_file: EndUserPP,
          image_type: EndUserPPType,
        },
      });
      // setTimeout(() => {
        dispatch(createRoomSuccess());
      // }, 1000);
    }
  }, [charRoomResData]);

  // useEffect(() => {
  //   if (charRoomResData != undefined && charRoomResData.data != undefined) {
  //     dispatch(chatHistorySuccess());
  //     console.log('showMsgData',showMsgData);
  //     NavigationService.navigate('MessageChatScreen', {
  //       roomId: charRoomResData.data.room_id,
  //       selectItem: {
  //         user_id: UserId,
  //         receiver_id: showMsgData.receiver_id,
  //         full_name: showMsgData.full_name,
  //         profile_file: showMsgData.profile_file,
  //         image_type: showMsgData.imagetype,
  //       },
  //     });
  //     setTimeout(() => {
  //       dispatch(createRoomSuccess());
  //     }, 1000);
  //   }
  // }, [charRoomResData]);


  useEffect(() => {
    if (BetweenUsRes != undefined) {
      if (BetweenUsRes && BetweenUsRes.company_data[0] != undefined) {
        setMutualCompany(BetweenUsRes.company_data[0]);
      }
      if (BetweenUsRes && BetweenUsRes.mutual_connection != undefined) {
        setMutualConnectionCount(BetweenUsRes.mutual_connection.length);
      }
      if (BetweenUsRes && BetweenUsRes.data != undefined) {
        for (let data of BetweenUsRes.data) {
          setMutualQuestionCategory(data.question_category);
        }
      }
    }
  }, [BetweenUsRes]);

  // -----linkResData useEffect will called Start-----//
  useEffect(() => {
    getData(linkResData);
  }, [linkResData]);

  const getData = async linkResData => {
    if (linkResData != undefined && linkResData.response_code === 200) {
      const sendData = {
        user_id: EndUserId,
      };
      dispatch(postEndUserProfile(sendData));
    }
  };
  // -----linkResData useEffect will called End-----//

  // -----EndUserProfileRes useEffect will called Start-----//
  useEffect(() => {
    let tempArray = [];
    if (EndUserProfileRes && EndUserProfileRes.data != undefined) {
      setEndUserPP(EndUserProfileRes.data.profile_file)
      setEndUserPPType(EndUserProfileRes.data.image_type)
      setEndUserProfile(EndUserProfileRes.data);
      if (
        EndUserProfileRes.data.first_name != undefined &&
        EndUserProfileRes.data.last_name != undefined
      ) {
        const fullName =
          EndUserProfileRes.data.first_name +
          ' ' +
          EndUserProfileRes.data.last_name;
        setFullName(fullName);
      }

      if (EndUserProfileRes.data.workhistory != undefined) {
        for (let item of EndUserProfileRes.data.workhistory) {
          item.workStatus = false;
          if (item.currently_working != '1') {
            tempArray.push(item);
          }
        }
      }
      setWorkListArray(tempArray);
      {
        EndUserProfileRes.data.user_badge != undefined &&
          setBadgesArray(EndUserProfileRes.data.user_badge);
      }
      const array1 = EndUserProfileRes.data.certificate;
      const array2 = EndUserProfileRes.data.education;
      const array3 = [...array1, ...array2];
      setEducationArray(array3);
      setSharedArray(EndUserProfileRes.data.sharemoment);
      {
        EndUserProfileRes.data.sharemoment.length > 0 &&
          setBigImage(EndUserProfileRes.data.sharemoment[0].image);
        setSendDataValue(EndUserProfileRes.data.sharemoment[0]);
      }
      {
        EndUserProfileRes.data.team != undefined &&
          setTeamArray(EndUserProfileRes.data.team);
      }
    }
  }, [EndUserProfileRes]);
  // -----EndUserProfileRes useEffect will called End-----//

  // -----WorkListArray useEffect will called Start-----//
  useEffect(() => {
    if (WorkListArray && WorkListArray.length > 0) {
      for (let item of WorkListArray) {
        item.workStatus = false;
      }
      setUirender(!uiRender);
    }
  }, [WorkListArray]);
  // -----WorkListArray useEffect will called End-----//

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
    }
  }, [props]);
  // -----Props useEffect will called End-----//

  useEffect(() => {
    if (addRemoveBadgesRes && addRemoveBadgesRes.data != undefined) {
      calledFunc();
    }
  }, [addRemoveBadgesRes]);

  const tabFunction = tabData => {
    if (tabData === 'about') {
      setAboutTab(true);
      setExperienceTab(false);
    } else if (tabData === 'experience') {
      setAboutTab(false);
      setExperienceTab(true);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalUser = () => {
    setModalVisibleUser(!isModalVisibleUser);
  };

  // -----Badges Like Function Start-----//
  const addLikeFunc = likeItem => {
    const sendData = {
      sender_user_id: likeItem.user_id,
      badge_id: likeItem.badges_id,
      status: 1,
    };
    dispatch(AddEndUserBadges(sendData));
    setModalVisible(!isModalVisible);
  };
  // -----Badges Like Function End-----//

  // -----Shared moments Like Function Start-----//
  const SharedMomentAddLike = () => {
    const sendData = {
      post_id: sendDataVal.id,
      sender_user_id: sendDataVal.user_id
    }
    dispatch(likeShareMoments(sendData));
  };

  // -----Badghes Crousal render Function Start-----//
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.user_badges_statusnew === '0' ? addLikeFunc(item) : null
        }
        style={{ alignItems: 'center', paddingTop: scale(5) }}>
        <ImageBackground
          source={{ uri: item.badge_image }}
          style={{ height: scale(70), width: scale(70), borderRadius: 50 }}>
          <View
            style={{
              alignSelf: 'flex-end',
              width: 22,
              height: 22,
              borderRadius: 22 / 2,
              backgroundColor: '#4A20E4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 10 }}>{item.count}</Text>
          </View>
          <ImageBackground
            resizeMode="contain"
            source={Images.badgeBackImage}
            style={{
              height: 130,
              width: 130,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-33%',
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: '#fff',
                fontSize: 10,
                marginTop: 3,
                width: '55%',
                textAlign: 'center',
              }}>
              {item.badge_name}
            </Text>
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  // -----Badges Crousal render Function End-----//

  // -----Working With me Crousal render Function Start-----//
  const renderWorking = ({ item, index }) => {
    return (
      <View>
        <ImageBackground
          imageStyle={{ borderRadius: 15 }}
          source={Images.FrameImage}
          style={{
            height: scale(height / 5 + 40),
            width: width - 60,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}>
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
          {pagination(item)}
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Image
              source={require('../../../assets/images/Vector.png')}
              style={{ height: 15, width: 15, resizeMode: 'contain' }}
            />
            <Text
              style={{
                marginLeft: 5,
                color: '#4900E8',
                fontSize: 12,
                alignSelf: 'center',
              }}>
              {item.likecount === false ? 0 : item.likecount}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ color: '#4900E8', fontSize: 12, alignSelf: 'center' }}>
              {item.workwithmecommentcount === false
                ? 0
                : item.workwithmecommentcount}
            </Text>
            <Image
              source={require('../../../assets/images/comment1.png')}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                tintColor: '#4900E8',
                marginLeft: 5,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  // ----- get Work with me Active Question_id and User_id----- //
  const getActiveId = activeItem => {
    setWorkWithMeQuestionId(activeItem.question_id);
    setWorkWithMeUserId(activeItem.user_id);
    setWorkWithMeLikeStatus(activeItem.workwithmelikestatus);
    setWorkWithMeSelected(activeItem);
  };

  const pagination = paginationItem => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 20,
        }}>
        {getEndUserProfile.workwithme.length > 0 &&
          getEndUserProfile.workwithme.slice(0, 20).map((item, index) => {
            return activeIndex === index ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={getActiveId(item)}
                style={{
                  height: 8,
                  width: 8,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginHorizontal: 2.5,
                }}></TouchableOpacity>
            ) : (
              <View
                key={index}
                style={{
                  height: 7,
                  width: 7,
                  borderRadius: 10,
                  backgroundColor: '#ffffff20',
                  marginHorizontal: 2.5,
                }}></View>
            );
          })}
      </View>
    );
  };
  // -----Working with me Crousal render Function End-----//

  // -----Certificate and Education Crousal render Function Start-----//
  const renderCertifiacte = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            height: height / 7 + 20,
            width: width - 30,
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderRadius: 15,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../../assets/images/ucseal_blu.png')}
              style={{
                height: scale(50),
                width: scale(50),
                resizeMode: 'contain',
              }}
            />
            <View style={{ marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '800' }}>
                {item.type === 'certificate'
                  ? item.certificate
                  : item.school_name}
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                {item.type === 'certificate' ? item.organization : item.degree}
              </Text>
              <Text style={{ fontSize: 12, color: '#B1B1B1', marginTop: 15 }}>
                {item.type === 'certificate'
                  ? item.year_issued
                  : item.startyear}{' '}
                -{' '}
                {item.type === 'certificate'
                  ? item.expiration_year
                  : item.endyear}
              </Text>
            </View>
          </View>
          <View
            style={{ position: 'absolute', bottom: -20, alignSelf: 'center' }}>
            {ceriposition()}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ceriposition = () => {
    return (
      <Pagination
        dotsLength={EducationArray.length}
        activeDotIndex={certifyIndex}
        containerStyle={{ backgroundColor: 'transparent', marginTop: -5 }}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          backgroundColor: '#000',
        }}
        inactiveDotStyle={{
          width: 9.5,
          height: 9.5,
          borderRadius: 5,
          backgroundColor: '#c4c4c4',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.7}
      />
    );
  };
  // -----Certificate and Education Crousal render Function End-----//

  // -----Worklist show more Function Start-----//
  const showMore = labeltem => {
    for (let item of WorkListArray) {
      if (item.id === labeltem.id) {
        if (item.workStatus === false) {
          item.workStatus = true;
        } else if (item.workStatus === true) {
          item.workStatus = false;
        }
      }
    }
    setUirender(!uiRender);
  };

  const showMore2 = workItem => {
    for (let item of getEndUserProfile.workhistory) {
      if (item.id === workItem.id) {
        if (item.workStatus === false) {
          item.workStatus = true;
        } else if (item.workStatus === true) {
          item.workStatus = false;
        }
      }
    }
    setUirender(!uiRender);
  };

  // -----Worklist show more Function End-----//

  // -----Linked function Function-----//
  const sendLinkInvite = () => {
    dispatch(sendUserLinkApi(EndUserId));
  };

  // -----Set big image function-----//
  const sharedMomentItem = shareItem => {
    setBigImage(shareItem.image);
    setSendDataValue(shareItem);
  };

  // -----Work with me like function----- //
  const likeWorkWithFunc = () => {
    const sendData = {
      question_id: workWithMeQuestionId,
      question_user_id: workWithMeUserId,
    };
    dispatch(likeWorkWithMe(sendData));
  };

  const goToChoosenCard = () => {
    NavigationService.navigate('WorkWithMeInfoScreen', {
      profileItem: workWithMeSelected,
    });
  };

  const chatRoomApiCall = getEndUserProfile => {
    setShowMsgData(getEndUserProfile);
    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    const sendData = {
      userTo: Number(EndUserId),
      userBy: UserId,
      time: time,
      date: date2[0],
      createrId: UserId,
    };
    dispatch(createRoomApi({ sendData, token }));
  };


  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure you want to Unlink',
      //body
      'This action cannot be undone',
      [
        {
          text: 'Yes',
          onPress: () => sendLinkInvite(),
        },
        {
          text: 'No',
        },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };

  const goBackFunc = () => {
    // NavigationService.navigateAndReset('HomeScreen')
    NavigationService.goBack();
  };

  const onLoadStart = () => {
    setIsLoadings(true);
  };
  const onLoad = () => {
    setIsLoadings(false);
  };

  const TeamMemberProfile = teamItem => {
    const sendData = {
      user_id: teamItem.receiver_id,
    };
    dispatch(postEndUserProfile(sendData));
    // AsyncStorage.setItem('EndUSerId', teamItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    // NavigationService.navigate('OtherUserProfileScreen');
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar backgroundColor={Colors.primary} />

      {getEndUserProfile != undefined ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerMainView}>
            {getEndUserProfile.user_cover_img ===
              'http://3.140.234.233/pitch/uploads/users/' ? (
              <ImageBackground
                source={Images.ProfileRectangle}
                style={styles.rectangleImg}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: 15,
                    marginTop: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => goBackFunc()}
                    style={styles.backImgMainView}>
                    <Image
                      source={Images.back_button}
                      style={styles.backImgStyle}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            ) : (
              <ImageBackground
                source={{ uri: getEndUserProfile.user_cover_img }}
                style={styles.rectangleImg}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: 15,
                    marginTop: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => NavigationService.goBack()}
                    style={styles.backImgMainView}>
                    <Image
                      source={Images.back_button}
                      style={styles.backImgStyle}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
          </View>
          <View
            style={{
              height: scale(165),
              backgroundColor: '#fff',
              width: width,
            }}></View>
          <View style={[styles.profileMainView, { marginTop: 5 }]}>
            <View style={styles.imageBackgroundView}>
              <ImageBackground
                source={Images.EcillipsImg}
                style={styles.eclipseImg}>
                {getEndUserProfile.profile_file != 'undefined' ? (
                  <TouchableOpacity
                    style={{ marginTop: scale(-2.5), marginLeft: scale(1) }}
                    activeOpacity={1}
                    onPress={() => toggleModalUser()}>
                    <View>
                      {getEndUserProfile.image_type === 1 ? (
                        <LazyLoader
                          uriImg={getEndUserProfile.profile_file}
                          style={styles.profileImageStyle}
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
                          <View pointerEvents="none">
                            <Video
                              source={{ uri: getEndUserProfile.profile_file }}
                              style={{
                                height: scale(82),
                                width: scale(82),
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
                            <View
                              style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '9%',
                                opacity: 0.6,
                              }}>
                              <Image
                                source={require('../../../assets/images/play-button.png')}
                                style={{
                                  opacity: 0.4,
                                  height: 64,
                                  width: 64,
                                  resizeMode: 'contain',
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={Images.profile2}
                    style={styles.profileImageStyle}
                  />
                )}
              </ImageBackground>
            </View>
            <View style={styles.profileNameMainView}>
              <Text style={styles.profileNameStyle}>
                {getEndUserProfile.first_name}{' '}
                {getEndUserProfile.last_name != null &&
                  getEndUserProfile.last_name != ''
                  ? getEndUserProfile.last_name
                  : null}
              </Text>
              <Text style={styles.jobTitleStyle}>
                {getEndUserProfile.job_title}
              </Text>
              {getEndUserProfile.countconnection != undefined &&
                getEndUserProfile.countconnection != undefined && (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('ConnectionList', {
                        user_id: getEndUserProfile.user_id,
                      })
                    }>
                    <Text
                      style={{
                        color: '#55A6FF',
                        fontSize: 9,
                        lineHeight: 12,
                        marginTop: 3,
                      }}>
                      {getEndUserProfile.countconnection} connections
                    </Text>
                  </TouchableOpacity>
                )}
              <View style={styles.addressMainView}>
                <Image
                  source={Images.locationImages}
                  style={styles.locationImageStyle}
                />
                <Text style={styles.locationTextStyle}>
                  {getEndUserProfile.city_name}, {getEndUserProfile.state_name}
                </Text>
              </View>
              <View style={styles.tagMainView}>
                {getEndUserProfile != undefined &&
                  getEndUserProfile.randomqueston[0] != undefined && (
                    <Text style={styles.tagTextStyle}>
                      {getEndUserProfile.randomqueston[0].ans_data}
                    </Text>
                  )}
              </View>
              <View style={styles.linkMsgbtnView}>
                {getEndUserProfile.userlink_status === 0 ? (
                  <TouchableOpacity
                    onPress={() => sendLinkInvite()}
                    style={{
                      backgroundColor: '#4A20E4',
                      height: 27,
                      width: 89,
                      right: 6.77,
                      borderWidth: 1,
                      borderColor: '#828282',
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
                ) : (
                  <TouchableOpacity
                    onPress={twoOptionAlertHandler}
                    style={{
                      backgroundColor: '#4A20E4',
                      height: 27,
                      width: 89,
                      right: 6.77,
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
                      Unlink
                    </Text>
                  </TouchableOpacity>
                )}
                {getEndUserProfile.userlink_status === 0 ? (
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      height: 27,
                      width: 89,
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#828282',
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#828282',
                        fontSize: 15,
                        alignItems: 'center',
                      }}>
                      Message
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => chatRoomApiCall(getEndUserProfile)}
                    disabled={
                      getEndUserProfile.userlink_status === 0 ? true : false
                    }
                    style={{
                      backgroundColor: '#4A20E4',
                      height: 27,
                      width: 89,
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
                      Message
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity style={{ width: 22 }}>
              {/* <Image source={Images.BlackEditPencil} style={styles.editPencilImage} /> */}
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: scale(10) }}>
            <View style={{ paddingHorizontal: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                }}>
                <Text style={styles.badgesTextStyle}>BETWEEN US</Text>
                {BetweenUsRes && BetweenUsRes.data != undefined ? (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('BetweenUsScreen')
                    }>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '800',
                        color: '#007AFF',
                        lineHeight: 16,
                        textDecorationLine: 'underline',
                      }}>
                      More Similarities
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {BetweenUsRes && BetweenUsRes.data != undefined ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: width / 1.1,
                    marginVertical: 30,
                    // marginHorizontal: 13,
                  }}>
                  {MutualConnectionCount != 0 ? (
                    <View style={{ alignItems: 'center', width: width / 3.25 }}>
                      <Image
                        source={require('../../../assets/images/Group164001.png')}
                        style={{
                          width: scale(58),
                          height: scale(55),
                        }}
                      />

                      {MutualConnectionCount == 1 ?
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '800',
                          }}>
                          {MutualConnectionCount} mutual link
                        </Text> :
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '800',
                          }}>
                          {MutualConnectionCount} mutual links
                        </Text>
                      }
                    </View>
                  ) : null}
                  {MutualQuestionCategory == 'Goals' ? (
                    <View style={{ alignItems: 'center', width: width / 3.25 }}>
                      <Image
                        source={require('../../../assets/images/Group1640-04.png')}
                        style={{
                          width: scale(58),
                          height: scale(55),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '800',
                        }}>
                        Same Goals
                      </Text>
                    </View>
                  ) : null}
                  {MutualQuestionCategory == 'Workplace Dynamics' ? (
                    <View style={{ alignItems: 'center', width: width / 3.25 }}>
                      <Image
                        source={require('../../../assets/images/Group1640-05.png')}
                        style={{
                          width: scale(58),
                          height: scale(55),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '800',
                        }}>
                        Same Team Dynamic
                      </Text>
                    </View>
                  ) : null}
                  {MutualQuestionCategory == 'Interests' ? (
                    <View style={{ alignItems: 'center', width: width / 3.25 }}>
                      <Image
                        source={require('../../../assets/images/Group1640-06.png')}
                        style={{
                          width: scale(58),
                          height: scale(55),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '800',
                        }}>
                        Same Values
                      </Text>
                    </View>
                  ) : null}
                  {MutualCompany != undefined && MutualCompany != null ? (
                    <View style={{ alignItems: 'center', width: width / 3.25 }}>
                      <Image
                        source={require('../../../assets/images/Group1640-03.png')}
                        style={{
                          width: scale(58),
                          height: scale(55),
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: '800',
                        }}>
                        Same Company
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 30,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/images/userGroup.png')}
                    style={{
                      width: scale(27.42),
                      height: scale(27),
                      resizeMode: 'contain',
                      marginRight: 28,
                    }}
                  />
                  <Text
                    style={{ color: '#B1B1B1', fontWeight: '400', fontSize: 12 }}>
                    Currently, no similarities. Link to find some!
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.tabStyle}>
              <TouchableOpacity
                onPress={() => tabFunction('about')}
                style={[
                  styles.aboutTabStyle,
                  { backgroundColor: aboutTab ? '#D3C1FC' : '#f2f2f2' },
                ]}>
                <Text
                  style={{
                    color: aboutTab ? '#4A20E4' : '#C5ACFF',
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => tabFunction('experience')}
                style={[
                  styles.experienceTabStyle,
                  { backgroundColor: experienceTab ? '#D3C1FC' : '#f2f2f2' },
                ]}>
                <Text
                  style={{
                    color: experienceTab ? '#4A20E4' : '#C5ACFF',
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  Experience
                </Text>
              </TouchableOpacity>
            </View>
            {aboutTab ? (
              <View>
                <View style={styles.badgesMainView}>
                  <View>
                    <Text style={styles.badgesTextStyle}>BADGES</Text>
                    {BadgesRes.length > 0 ? (
                      <Carousel
                        data={BadgesRes}
                        renderItem={_renderItem}
                        sliderWidth={width - 70}
                        itemWidth={110}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '70%',
                          width: width / 2 + 145,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 12,
                            fontWeight: '400',
                            width: '80%',
                            textAlign: 'center',
                            fontFamily: Fonts.fontName.nunitoRegular
                          }}>
                          Badges help celebrate your connections. Give a badge!
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('AddbadgesScreen', {
                        endUserProfileId: EndUserId,
                      })
                    }
                    style={[styles.addImageTouchStyle, { marginLeft: -50 }]}>
                    <Image
                      source={require('../../../assets/images/Group1726.png')}
                      style={styles.addImageStyle}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.workWithmeMainView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 15,
                      height: 25,
                    }}>
                    <Text
                      style={[styles.badgesTextStyle, { alignSelf: 'flex-end' }]}>
                      WORKING WITH ME
                    </Text>
                    <TouchableOpacity
                      style={{ alignSelf: 'flex-end' }}
                      onPress={() =>
                        NavigationService.navigate('SeeAllWorkWithMeScreen')
                      }>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '800',
                          color: '#007AFF',
                          textDecorationLine: 'underline',
                          marginBottom: 1,
                        }}>
                        See All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 8, backgroundColor: '#F0F0F0' }} />
                  {getEndUserProfile &&
                    getEndUserProfile.workwithme &&
                    getEndUserProfile.workwithme.length > 0 ? (
                    <View
                      style={{
                        marginTop: 3,
                        backgroundColor: '#fff',
                        paddingVertical: 10,
                      }}>
                      {getEndUserProfile.workwithme &&
                        getEndUserProfile.workwithme.length > 0 && (
                          <Carousel
                            data={getEndUserProfile.workwithme}
                            renderItem={renderWorking}
                            sliderWidth={width}
                            itemWidth={width - 65}
                            onSnapToItem={index => setActiveIndex(index)}
                          />
                        )}
                    </View>
                  ) : (
                    <View style={{ width: width, backgroundColor: '#fff' }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 100,
                          width: width,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: Fonts.fontName.nunitoRegular
                          }}>
                          No data available
                        </Text>
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 40,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: width,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => likeWorkWithFunc()}
                      style={{ flexDirection: 'row' }}>
                      {workWithMeLikeStatus === '1' ? (
                        <Image
                          source={require('../../../assets/images/Vector.png')}
                          style={styles.likeBtn}
                        />
                      ) : (
                        <Image
                          source={require('../../../assets/images/Vector1.png')}
                          style={styles.likeBtn}
                        />
                      )}
                      {workWithMeLikeStatus === '1' ? (
                        <Text
                          style={{
                            color: '#4900E8',
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
                      disabled={
                        getEndUserProfile &&
                          getEndUserProfile.workwithme &&
                          getEndUserProfile.workwithme.length > 0
                          ? false
                          : true
                      }
                      onPress={() => goToChoosenCard()}
                      style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('../../../assets/images/comment1.png')}
                        style={{
                          height: 15,
                          width: 15,
                          resizeMode: 'contain',
                          tintColor: '#B1B1B1',
                        }}
                      />
                      <Text
                        style={{
                          color: '#B1B1B1',
                          fontSize: 12,
                          alignSelf: 'center',
                          marginLeft: 5,
                        }}>
                        Comment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.workWithmeMainView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 55,
                      paddingHorizontal: 15,
                      backgroundColor: '#fff',
                    }}>
                    <Text
                      style={[styles.badgesTextStyle, { alignSelf: 'center' }]}>
                      SHARED MOMENTS
                    </Text>
                    <TouchableOpacity
                      style={{ alignSelf: 'center' }}
                      onPress={() =>
                        NavigationService.navigate('SeeAllSharedMomentScreen')
                      }>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '800',
                          color: '#007AFF',
                        }}>
                        See All
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ backgroundColor: '#fff', paddingBottom: 15 }}>
                    {sendDataVal != undefined && (
                      <View>
                        <View style={{ alignSelf: 'center' }}>
                          <View style={{ alignSelf: 'center' }}>
                            {sendDataVal.imagetype === 1 ? (
                              <LazyLoader
                                uriImg={bigImage}
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
                                      top: '45%',
                                    }}
                                  />
                                ) : null}
                                <Video
                                  source={{ uri: bigImage }}
                                  style={{
                                    height: height / 4,
                                    width: width - 35,
                                    borderRadius: 20,
                                    marginTop: scale(3),
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
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 40,
                            marginTop: 5,
                          }}>
                          <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Image
                              source={require('../../../assets/images/Vector.png')}
                              style={{
                                height: 15,
                                width: 15,
                                resizeMode: 'contain',
                              }}
                            />
                            {sendDataVal.count === false ? (
                              <Text
                                style={{
                                  marginLeft: 5,
                                  color: '#4900E8',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                0
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  marginLeft: 5,
                                  color: '#4900E8',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                {sendDataVal.count}
                              </Text>
                            )}
                          </View>
                          <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {sendDataVal.commentcount === false ? (
                              <Text
                                style={{
                                  marginLeft: 5,
                                  color: '#4900E8',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                0
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  marginLeft: 5,
                                  color: '#4900E8',
                                  fontSize: 12,
                                  alignSelf: 'center',
                                }}>
                                {sendDataVal.commentcount}
                              </Text>
                            )}
                            <Image
                              source={require('../../../assets/images/comment1.png')}
                              style={{
                                height: 15,
                                width: 15,
                                resizeMode: 'contain',
                                tintColor: '#4900E8',
                                marginLeft: 5,
                              }}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 40,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width,
                            alignSelf: 'center',
                            backgroundColor: '#F0F0F0',
                            marginTop: 8,
                          }}>
                          <TouchableOpacity
                            onPress={() => SharedMomentAddLike()}
                            style={{ flexDirection: 'row' }}>
                            {sendDataVal.likestatus === '1' ? (
                              <Image
                                source={require('../../../assets/images/Vector.png')}
                                style={styles.likeBtn}
                              />
                            ) : (
                              <Image
                                source={require('../../../assets/images/Vector1.png')}
                                style={styles.likeBtn}
                              />
                            )}
                            {sendDataVal.likestatus === '1' ? (
                              <Text
                                style={{
                                  color: '#4900E8',
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
                            onPress={() =>
                              NavigationService.navigate(
                                'ShareMomentInfoScreen',
                                { shareItem: sendDataVal },
                              )
                            }
                            style={{ flexDirection: 'row' }}>
                            <Image
                              source={require('../../../assets/images/comment1.png')}
                              style={{
                                height: 15,
                                width: 15,
                                resizeMode: 'contain',
                                tintColor: '#B1B1B1',
                              }}
                            />
                            <Text
                              style={{
                                color: '#B1B1B1',
                                fontSize: 12,
                                alignSelf: 'center',
                                marginLeft: 5,
                              }}>
                              Comment
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    <View style={[styles.sharemomMapMaineView, { marginTop: 5 }]}>
                      {sharedArray.length === 0 ? (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 100,
                            width: width,
                            marginLeft: -10,
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontSize: 16,
                              fontWeight: '400',
                              fontFamily: Fonts.fontName.nunitoRegular
                            }}>
                            No data available
                          </Text>
                        </View>
                      ) : (
                        <ScrollView
                          horizontal
                          style={{ marginTop: 10, flexDirection: 'row' }}>
                          {sharedArray.map((shareItem, shareIndex) => (
                            <TouchableOpacity
                              onPress={() => sharedMomentItem(shareItem)}>
                              <View style={{ alignSelf: 'center' }}>
                                {shareItem.imagetype === 1 ? (
                                  <LazyLoader
                                    uriImg={shareItem.image}
                                    style={styles.mapImageStyle}
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
                                          top: '35%',
                                        }}
                                      />
                                    ) : null}
                                    <Video
                                      source={{ uri: shareItem.image }}
                                      style={{
                                        height: scale(105),
                                        width: scale(105),
                                        marginLeft: 10,
                                        borderRadius: 10,
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
                                )}
                              </View>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {experienceTab ? (
              <View style={{ marginTop: scale(20) }}>
                <View style={{ paddingHorizontal: 18 }}>
                  <View
                    style={{
                      paddingVertical: 10,
                      backgroundColor: 'transparent',
                      width: width,
                      alignSelf: 'center',
                      paddingHorizontal: 18,
                    }}>
                    <Text style={styles.badgesTextStyle}>
                      CURRENTLY WORKING AT
                    </Text>
                  </View>
                  {getEndUserProfile &&
                    getEndUserProfile.workhistory &&
                    getEndUserProfile.workhistory.length > 0 ? (
                    <View>
                      {getEndUserProfile.workhistory.map(
                        (workItem, workIndex) => (
                          // <View key={workIndex}>
                          //   {workItem.currently_working === '1' ? (
                          //     <View
                          //       style={{
                          //         height: scale(80),
                          //         width: width - 40,
                          //         alignSelf: 'center',
                          //         backgroundColor: '#fff',
                          //         borderRadius: 15,
                          //         marginTop: scale(10),
                          //         flexDirection: 'row',
                          //         justifyContent: 'space-between',
                          //         paddingHorizontal: 10,
                          //         paddingVertical: 10,
                          //         alignItems: 'center',
                          //       }}>
                          //       <Image
                          //         source={require('../../../assets/images/BriefCase.png')}
                          //         style={{
                          //           height: 40,
                          //           width: 40,
                          //           resizeMode: 'contain',
                          //         }}
                          //       />
                          //       <View
                          //         style={{
                          //           justifyContent: 'center',
                          //           width: width / 3,
                          //         }}>
                          //         <Text
                          //           style={{
                          //             fontSize: 11,
                          //             fontWeight: '600',
                          //             color: '#000',
                          //             fontStyle: 'normal',
                          //           }}>
                          //           {workItem.company_name}
                          //         </Text>
                          //         <Text style={{ marginTop: 5, fontSize: 11 }}>
                          //           {workItem.title}
                          //         </Text>
                          //       </View>
                          //       <View style={{ justifyContent: 'center' }}>
                          //         {workItem.startyear != '' ? (
                          //           <Text
                          //             style={{
                          //               fontSize: 12,
                          //               color: '#B1B1B1',
                          //               fontWeight: 'normal',
                          //             }}>
                          //             {workItem.startyear} - present
                          //           </Text>
                          //         ) : (
                          //           <Text
                          //             style={{
                          //               fontSize: 12,
                          //               color: '#B1B1B1',
                          //               fontWeight: 'normal',
                          //             }}>
                          //             present
                          //           </Text>
                          //         )}

                          //         <Text
                          //           style={{
                          //             fontSize: 12,
                          //             color: '#B1B1B1',
                          //             fontWeight: 'normal',
                          //             marginTop: 5,
                          //           }}></Text>
                          //       </View>
                          //     </View>
                          //   ) : null}
                          // </View>
                          <View key={workIndex}>
                            {workItem.currently_working === '1' ? (
                              <View style={{ width: width - 30 }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  <View
                                    style={{
                                      width: width - 40,
                                      minHeight: workItem.workStatus
                                        ? scale(100)
                                        : scale(100),
                                      backgroundColor: '#fff',
                                      marginTop: 20,
                                      borderRadius: 15,
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 10,
                                        paddingTop: scale(20),
                                      }}>
                                      <Image
                                        source={require('../../../assets/images/BriefCase.png')}
                                        style={{
                                          height: 40,
                                          width: 40,
                                          resizeMode: 'contain',
                                        }}
                                      />
                                      <View style={{ width: width / 2 - 20 }}>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            fontWeight: '800',
                                            color: '#000',
                                            fontStyle: 'normal',
                                          }}>
                                          {workItem.title}
                                        </Text>
                                        <Text
                                          style={{ marginTop: 3, fontSize: 12 }}>
                                          {workItem.company_name}
                                        </Text>
                                        <Text
                                          style={{
                                            marginTop: 10,
                                            fontSize: 12,
                                            color: '#B1B1B1',
                                            textTransform: 'capitalize',
                                          }}>
                                          {workItem.startyear} -{' '}
                                          {workItem.endyear}
                                        </Text>
                                      </View>
                                      <TouchableOpacity
                                        onPress={() => showMore2(workItem)}
                                        style={{
                                          height: 25,
                                          width: 25,
                                          borderRadius: 25 / 2,
                                          backgroundColor:
                                            'rgba(0, 122, 255, 0.28)',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          alignSelf: 'flex-start',
                                          marginTop: scale(20),
                                        }}>
                                        {workItem.workStatus == true ?
                                          (<Image
                                            source={Images.back_button}
                                            style={{
                                              height: 13,
                                              width: 13,
                                              alignSelf: 'center',
                                              tintColor: '#fff',
                                              resizeMode: 'contain',
                                              transform: [{ rotate: '90deg' }],
                                            }}
                                          />)
                                          :
                                          (<Image
                                            source={Images.back_button}
                                            style={{
                                              height: 13,
                                              width: 13,
                                              alignSelf: 'center',
                                              tintColor: '#fff',
                                              resizeMode: 'contain',
                                              transform: [{ rotate: '-90deg' }],
                                            }}
                                          />)
                                        }
                                      </TouchableOpacity>
                                    </View>
                                    {workItem.workStatus && (
                                      <View>
                                        <View
                                          style={{
                                            width: width / 2,
                                            alignSelf: 'center',
                                            marginLeft: scale(33),
                                            marginTop: 10,
                                          }}>
                                          <Text style={{ fontSize: 12 }}>
                                            {workItem.describtion}
                                          </Text>
                                          <ScrollView
                                            horizontal
                                            style={{
                                              marginVertical: 10,
                                              flexDirection: 'row',
                                            }}>
                                            {workItem.teammmembers.length > 0 &&
                                              workItem.teammmembers.map(
                                                (workItem, workIndex) => (
                                                  <Image
                                                    source={{ uri: workItem.profile_file }}
                                                    style={{
                                                      height: 50,
                                                      width: 50,
                                                      resizeMode: 'cover',
                                                      marginLeft: 10,
                                                      borderRadius: 50,
                                                    }}
                                                  />
                                                ),
                                              )}
                                          </ScrollView>
                                        </View>
                                      </View>
                                    )}
                                  </View>
                                </View>
                              </View>
                            ) : null}
                          </View>
                        ),
                      )}
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    marginTop: scale(10),
                    padding: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[styles.badgesTextStyle, { alignSelf: 'center' }]}>
                      TEAM
                    </Text>
                  </View>
                  <View
                    style={{
                      minHeight: scale(90),
                      width: width - 40,
                      alignSelf: 'center',
                      backgroundColor: '#fff',
                      borderRadius: 15,
                      marginTop: scale(10),
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                    }}>
                    {TeamRes && TeamRes.length > 0 ? (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {TeamRes.map((teamItem, teamIndex) => (
                          <TouchableOpacity
                            activeOpacity={1}
                            // onPress={() => TeamMemberProfile(teamItem)}
                            key={teamIndex}>
                            <Image
                              source={{ uri: teamItem.profile_file }}
                              style={{
                                marginRight: 5,
                                height: scale(60),
                                width: scale(60),
                                borderRadius: 50,
                              }}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 60,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '400',
                          }}>
                          No Team member
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: scale(5) }}>
                  <View
                    style={{
                      paddingVertical: 10,
                      backgroundColor: 'transparent',
                      width: width,
                      alignSelf: 'center',
                      paddingHorizontal: 18,
                    }}>
                    <Text style={[styles.badgesTextStyle]}>WORK HISTORY</Text>
                  </View>
                  {WorkListArray && WorkListArray.length > 0 ? (
                    <View style={{ flexDirection: 'row' }}>
                      <OthersCircleComp
                        array={WorkListArray}
                        uiRender={uiRender}
                      />
                      <View style={{ marginLeft: '6%' }}>
                        {WorkListArray.map((labeltem, labelIndex) => (
                          <View>
                            <View style={{ width: width - 30 }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                }}>
                                <View
                                  style={{
                                    width: width - 80,
                                    minHeight: labeltem.workStatus
                                      ? scale(100)
                                      : scale(100),
                                    backgroundColor: '#fff',
                                    marginTop: 20,
                                    borderRadius: 15,
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      paddingHorizontal: 10,
                                      paddingTop: scale(20),
                                    }}>
                                    <Image
                                      source={require('../../../assets/images/BriefCase.png')}
                                      style={{
                                        height: 40,
                                        width: 40,
                                        resizeMode: 'contain',
                                      }}
                                    />
                                    <View style={{ width: width / 2 - 20 }}>
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: '800',
                                          color: '#000',
                                          fontStyle: 'normal',
                                        }}>
                                        {labeltem.title}
                                      </Text>
                                      <Text
                                        style={{ marginTop: 3, fontSize: 12 }}>
                                        {labeltem.company_name}
                                      </Text>
                                      <Text
                                        style={{
                                          marginTop: 10,
                                          fontSize: 12,
                                          color: '#B1B1B1',
                                          textTransform: 'capitalize',
                                        }}>
                                        {labeltem.startyear} -{' '}
                                        {labeltem.endyear}
                                      </Text>
                                    </View>
                                    <TouchableOpacity
                                      onPress={() => showMore(labeltem)}
                                      style={{
                                        height: 25,
                                        width: 25,
                                        borderRadius: 25 / 2,
                                        backgroundColor:
                                          'rgba(0, 122, 255, 0.28)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-start',
                                        marginTop: scale(20),
                                      }}>
                                      {labeltem.workStatus == true ?
                                        (<Image
                                          source={Images.back_button}
                                          style={{
                                            height: 13,
                                            width: 13,
                                            alignSelf: 'center',
                                            tintColor: '#fff',
                                            resizeMode: 'contain',
                                            transform: [{ rotate: '90deg' }],
                                          }}
                                        />)
                                        :
                                        (<Image
                                          source={Images.back_button}
                                          style={{
                                            height: 13,
                                            width: 13,
                                            alignSelf: 'center',
                                            tintColor: '#fff',
                                            resizeMode: 'contain',
                                            transform: [{ rotate: '-90deg' }],
                                          }}
                                        />)
                                      }
                                    </TouchableOpacity>
                                  </View>
                                  {labeltem.workStatus && (
                                    <View>
                                      <View
                                        style={{
                                          width: width / 2,
                                          alignSelf: 'center',
                                          marginLeft: scale(33),
                                          marginTop: 10,
                                        }}>
                                        <Text style={{ fontSize: 12 }}>
                                          {labeltem.describtion}
                                        </Text>
                                        <ScrollView
                                          horizontal
                                          style={{
                                            marginVertical: 10,
                                            flexDirection: 'row',
                                          }}>
                                          {labeltem.teammmembers.length > 0 &&
                                            labeltem.teammmembers.map(
                                              (workItem, workIndex) => (
                                                <Image
                                                  source={{ uri: workItem.profile_file }}
                                                  style={{
                                                    height: 50,
                                                    width: 50,
                                                    resizeMode: 'cover',
                                                    marginLeft: 10,
                                                    borderRadius: 50,
                                                  }}
                                                />
                                              ),
                                            )}
                                        </ScrollView>
                                      </View>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        No work history
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                  <View
                    style={{
                      paddingVertical: 10,
                      backgroundColor: 'transparent',
                      width: width,
                      alignSelf: 'center',
                      paddingHorizontal: 18,
                    }}>
                    <Text style={[styles.badgesTextStyle]}>
                      EDUCATION & CERTIFICATIONS
                    </Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                  {EducationArray.length > 0 ? (
                    <Carousel
                      data={EducationArray}
                      renderItem={renderCertifiacte}
                      sliderWidth={width - 30}
                      itemWidth={width - 30}
                      onSnapToItem={index => setActivecertifyIndex(index)}
                    />
                  ) : (
                    <View
                      style={{
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        No education & certificate
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ height: 10 }} />
              </View>
            ) : null}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        </View>
      )}
      {getEndUserProfile != undefined && (
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          onBackdropPress={() => setModalVisible(!isModalVisible)}>
          <ImageBackground
            resizeMode="cover"
            source={require('../../../assets/images/celebrationImg.png')}
            style={{
              height: 200,
              width: 343,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                textAlign: 'center',
                lineHeight: 23,
                letterSpacing: 0.5,
              }}>
              Thanks for endorsing {'\n'}
              {getEndUserProfile.first_name}{' '}
              {getEndUserProfile.last_name != null &&
                getEndUserProfile.last_name != ''
                ? getEndUserProfile.last_name
                : null}
              !
            </Text>
          </ImageBackground>
        </Modal>
      )}

      <Modal
        backdropOpacity={0.0}
        isVisible={isModalVisibleUser}
        animationInTiming={1}
        animationOutTiming={1}
        onBackdropPress={() => setModalVisible(!isModalVisibleUser)}>
        <View style={styles.upperModalView}>
          <View
            style={{ position: 'absolute', top: 50, left: 15, zIndex: 222 }}>
            <TouchableOpacity
              onPress={() => toggleModalUser()}
              style={{
                justifyContent: 'center',
                marginLeft: 18,
                top: 15,
                height: 35,
                width: 35,
                backgroundColor: '#fff',
                borderRadius: 50,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20, color: '#000' }}> X </Text>
            </TouchableOpacity>
          </View>
          <PinchZoomView scaleable={true}>
            <View>
              {/* <View
                style={{ position: 'absolute', top: 50, left: 15, zIndex: 222 }}>
                <TouchableOpacity
                  onPress={() => toggleModalUser()}
                  style={styles.backImgMainView}>
                  <Text style={{ fontSize: 20, color: '#000' }}> X </Text>
                </TouchableOpacity>
              </View> */}
              {getEndUserProfile != undefined &&
                getEndUserProfile.profile_file != 'undefined' ? (
                <View>
                  {getEndUserProfile.image_type === 1 ? (
                    <LazyLoader
                      uriImg={getEndUserProfile.profile_file}
                      style={{
                        height: height / 1.15,
                        width: width / 1,
                        resizeMode: 'contain',
                        top: 20,
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
                            top: '50%',
                          }}
                        />
                      ) : null}
                      <Video
                        source={{ uri: getEndUserProfile.profile_file }}
                        style={{
                          height: height / 1.25,
                          width: width / 1,
                          top: 100,
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
                  )}
                </View>
              ) : (
                <Image
                  source={Images.profile2}
                  style={{
                    height: height / 1.25,
                    width: width / 1,
                    resizeMode: 'contain',
                    top: 20,
                  }}
                />
              )}
            </View>
          </PinchZoomView>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    LikeShareMomentReducer: state.LikeShareMomentReducer.data,
    likeWorkWithMe: state.LikeWorkWithMeReducer.data,
  };
};

export default connect(mapStateToProps, {})(OtherUserProfileScreen);

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  headerMainView: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  rectangleImg: {
    height: 105,
    width: '100%',
    resizeMode: 'cover',
  },
  profileMainView: {
    minHeight: scale(175),
    width: '92%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: scale(60),
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  imageBackgroundView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eclipseImg: {
    height: scale(95),
    width: scale(95),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageStyle: {
    height: scale(82),
    width: scale(82),
    resizeMode: 'cover',
    borderRadius: 50,
    // marginTop: -3
  },
  profileNameMainView: {
    width: scale(170),
    marginTop: scale(20),
    alignItems: 'flex-start',
  },
  profileNameStyle: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '600',
    // alignSelf: 'center',
    fontFamily: Fonts.fontName.GibsonRegular,
    marginTop: 17,
  },
  jobTitleStyle: {
    fontSize: 10,
    color: '#B1B1B1',
    marginTop: 4,
    lineHeight: 14,
    fontFamily: Fonts.fontName.nunitoRegular,
  },
  addressMainView: {
    flexDirection: 'row',
    marginTop: 4,
  },
  locationImageStyle: {
    height: scale(13),
    width: scale(13),
    resizeMode: 'contain',
  },
  locationTextStyle: {
    fontSize: 10,
    lineHeight: 14,
    color: '#B1B1B1',
    marginLeft: 3,
    alignSelf: 'center',
  },
  tagMainView: {
    // height: 45,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkMsgbtnView: {
    flexDirection: 'row',
    // height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    left: 16,
    marginTop: 4,
  },
  tagTextStyle: {
    fontSize: 10,
    lineHeight: 14,
    fontStyle: 'italic',
    fontFamily: Fonts.fontName.nunitoRegular,
  },
  editPencilImage: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
    marginTop: 10,
  },
  tabStyle: {
    height: 30,
    width: '92%',
    borderWidth: 2,
    borderColor: '#D3C1FC',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 50,
    top: scale(10),
    flexDirection: 'row',
  },
  aboutTabStyle: {
    width: '50%',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  experienceTabStyle: {
    width: '50%',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStrengthView: {
    marginTop: scale(30),
    paddingHorizontal: 15,
  },
  progressMainView: {
    alignSelf: 'center',
    marginTop: scale(20),
  },
  badgesMainView: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
    height: scale(130),
    paddingHorizontal: 15,
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  badgesTextStyle: {
    color: '#000',
    fontWeight: '500',
    marginTop: 10,
    fontSize: 14.5,
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  addImageTouchStyle: {
    height: 80,
    width: 40,
    marginTop: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageStyle: {
    height: scale(40),
    width: scale(40),
  },
  workWithmeMainView: {
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#EBEBEB'
  },
  workWithmeImage: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  shareMomBigImage: {
    height: height / 4,
    width: width - 35,
    resizeMode: 'contain',
    borderRadius: 20,
    marginTop: scale(3),
  },
  sharemomMapMaineView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 20,
    alignSelf: 'center',
    marginTop: 18,
  },
  mapImageStyle: {
    height: scale(105),
    width: scale(105),
    resizeMode: 'cover',
    marginLeft: 10,
    borderRadius: 10,
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    width: 50,
  },
  backImgStyle: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  likeBtn: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperModalView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: 67,
    backgroundColor: '#2A1753',
    height: height / 1,
    width: width,
    alignSelf: 'center',
  },
  backImgMainView2: {
    justifyContent: 'center',
    marginLeft: 18,
    top: 15,
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});
