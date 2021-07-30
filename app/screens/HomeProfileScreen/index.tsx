import React, { useEffect, useState, useRef } from 'react';
import {
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
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import { ScrollView, State } from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CircleComp from '../HomeProfileScreen/CircleComp';
import badgess from '../../actions/BadgesActions';
import getWorkWithMeAPi from '../../actions/WorkWithMeAction';
import shareMoments from '../../actions/ShareMoments';
import ProfileGet from '../../actions/ProfileActions';
import { useFocusEffect } from '@react-navigation/native';
import { workListApi } from '../../actions/WorkList';
import { getEducation } from '../../actions/EducationActions';
import GetTeamListApi from '../../actions/TeamListAction';
import {
  getSharedMomentsCommentSuccess,
  getworkwithmeCommentsSuccess,
} from '../../actions/SharedMomentsComments';
import likeWorkWithMe from '../../actions/WorkWithMeLike';
import likeShareMoments from '../../actions/ShareMomentLike';
import { likeWorkWithMeSuccess } from '../../actions/WorkWithMeLike';
import { likeShareMomentsSuccess } from '../../actions/ShareMomentLike';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import LazyLoader from '../../components/atoms/LazyLoader';
import { PinchZoomView } from 'react-native-pinch-to-zoom-view';
import AsyncStorage from '@react-native-community/async-storage';
import {
  postEndUserProfile,
  postEndUserProfileSuccess,
} from '../../actions/EndUserProfileAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const HomeProfileScreen = ({ navigation, ...props }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [UserId, setUserId] = useState('');
  const [aboutTab, setAboutTab] = useState(true);
  const [experienceTab, setExperienceTab] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [certifyIndex, setActivecertifyIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState();
  const [badgesArray, setBadgesArray] = useState([]);
  const [uiRender, setUirender] = useState(false);
  const [getProfileData, setGetProfileData] = useState();
  const [sendDataVal, setSendDataValue] = useState();
  const [bigImage, setBigImage] = useState('');
  const [sharedArray, setSharedArray] = useState([]);
  const [workWithMeArray, setWorkWithMeArray] = useState([]);
  const [WorkListArray, setWorkListArray] = useState([]);
  const [EducationArray, setEducationArray] = useState([]);
  const [currentlyWorkingArray, setCurrentWorkingArray] = useState([]);
  const [linkTeamList, setLinkedTeamList] = useState([]);
  const [teamListArray, setTeamListArray] = useState([]);
  const [showBadgeEditBtn, setShowBadgeEditBtn] = useState(false);
  const [isLoading, setIsLoadings] = useState(false);
  const [paused, setPaused] = useState(false);

  const sharedMomentData = useSelector(state => state.shareMomentsReducer.data);
  const WorkWithMeData = useSelector(state => state.WorkWithMeReducer.data);
  const WorkListData = useSelector(state => state.WorkListReducer.data);
  const EducationListRes = useSelector(
    state => state.EducationListReducer.geteducationList,
  );
  const TeamListRes = useSelector(state => state.TeamListReducer.data);

  const [workWithMeUserId, setWorkWithMeUserId] = useState('');
  const [workWithMeQuestionId, setWorkWithMeQuestionId] = useState('');
  const [workWithMeLikeStatus, setWorkWithMeLikeStatus] = useState('');
  const [workWithMeSelected, setWorkWithMeSelected] = useState('');

  const [skillStatus, setSkillStatus] = useState();
  const [AnswerAboutYourStatus, setAnswerAboutYourStatus] = useState();
  const [ShareMomentStatus, setShareMomentStatus] = useState();
  const [WorkExpStatus, setWorkExpStatus] = useState();
  const [FrndReqStatus, setFrndReqStatus] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsLoading(false);
  };
  // console.log('sharedArray', sharedArray);

  const player = useRef();
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
    dispatch(shareMoments());
    dispatch(getWorkWithMeAPi());
    dispatch(likeShareMomentsSuccess());
    dispatch(likeWorkWithMeSuccess());
    setShowBadgeEditBtn(false);
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(getworkwithmeCommentsSuccess());
    dispatch(ProfileGet());
    // setSharedArray([])
    // setBigImage('')
  };

  const tabFunction = tabData => {
    if (tabData === 'about') {
      setAboutTab(true);
      setExperienceTab(false);
    } else if (tabData === 'experience') {
      setAboutTab(false);
      setExperienceTab(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(badgess());
      dispatch(ProfileGet());
      dispatch(shareMoments());
      dispatch(getWorkWithMeAPi());
      dispatch(workListApi());
      dispatch(getEducation());
      dispatch(GetTeamListApi());
      dispatch(getSharedMomentsCommentSuccess());
      setShowBadgeEditBtn(false);
    }, []),
  );

  useEffect(() => {
    if (
      sharedMomentData &&
      sharedMomentData.data != undefined &&
      sharedMomentData.data.length > 0
    ) {
      setSharedArray(sharedMomentData.data);
      setBigImage(sharedMomentData.data[0].image);
      setSendDataValue(sharedMomentData.data[0]);
      setUirender(!uiRender);
    }
  }, [sharedMomentData]);

  useEffect(() => {
    let arrayData = [];
    let currentArray = [];
    if (
      WorkListData &&
      WorkListData.data != undefined &&
      WorkListData.data.length > 0
    ) {
      for (let item of WorkListData.data) {
        item.status = false;
      }
      for (let data of WorkListData.data) {
        if (data.currently_working === '0') {
          currentArray.push(data);
        }
      }
      setWorkListArray(currentArray);
      for (let data of WorkListData.data) {
        if (data.currently_working === '1') {
          arrayData.push(data);
        }
      }
      setCurrentWorkingArray(arrayData);
      setUirender(!uiRender);
    }
  }, [WorkListData]);
  console.log('WorkListData', WorkListData);


  useEffect(() => {
    if (EducationListRes && EducationListRes.data != undefined) {
      const array1 = EducationListRes.data.user_certificate;
      const array2 = EducationListRes.data.user_education;
      const array3 = [...array1, ...array2];
      setEducationArray(array3);
      setUirender(!uiRender);
    }
  }, [EducationListRes]);

  useEffect(() => {
    if (
      WorkWithMeData &&
      WorkWithMeData.data != undefined &&
      WorkWithMeData.data.length > 0
    ) {
      setWorkWithMeArray(WorkWithMeData.data);
      setUirender(!uiRender);
    }
  }, [WorkWithMeData]);

  useEffect(() => {
    if (
      TeamListRes != undefined &&
      TeamListRes.data != undefined
    ) {
      setTeamListArray(TeamListRes.data);
      setUirender(!uiRender);
    }
  }, [TeamListRes]);

  useEffect(() => {
    if (props != undefined) {
      if (
        props.data != undefined &&
        props.data.data != undefined &&
        props.data != null &&
        props.data.data != null
      ) {
        setShowBadgeEditBtn(false);
        setBadgesArray(props.data.data.active);
      } else if (props.data === undefined) {
        setShowBadgeEditBtn(true);
      }
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        setGetProfileData(props.profileRes.data);
      }
      if (
        props.profileRes != undefined &&
        props.profileRes.data != undefined &&
        props.profileRes.data.graph != undefined
      ) {
        setSkillStatus(props.profileRes.data.graph[0].skill);
        setAnswerAboutYourStatus(props.profileRes.data.graph[0].aboutyou);
        setShareMomentStatus(props.profileRes.data.graph[0].share_moment);
        setWorkExpStatus(props.profileRes.data.graph[0].workexperince);
        setFrndReqStatus(props.profileRes.data.graph[0].friendrequest);
      }
    }
  }, [props]);

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
        props.LikeWorkWithMeReducer != undefined &&
        props.LikeWorkWithMeReducer.data != undefined
      ) {
        if (props.LikeWorkWithMeReducer.response_code === 200) {
          calledFunc();
        }
      }
    }
  }, [props]);

  // -----Props useEffect will called End-----//

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: 'center', paddingTop: scale(5) }}>
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
      </View>
    );
  };

  const renderWorking = ({ item, index }) => {
    return (
      <TouchableOpacity>
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
                  // fontFamily: Fonts.fontName.nunitoRegular,
                }}>
                {item.ans_data}
              </Text>
            )}
          </View>
          {pagination()}
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
              {item.like_count === false ? 0 : item.like_count}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Image
              source={require('../../../assets/images/comment1.png')}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                tintColor: '#4900E8',
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                color: '#4900E8',
                fontSize: 12,
                alignSelf: 'center',
              }}>
              {item.commentcount === false ? 0 : item.commentcount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
              source={require('../../../assets/images/educationCircle.png')}
              style={{
                height: scale(40),
                width: scale(40),
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

  // ----- get Work with me Active Question_id and User_id----- //
  const getActiveId = activeItem => {
    setWorkWithMeQuestionId(activeItem.question_id);
    setWorkWithMeUserId(activeItem.user_id);
    setWorkWithMeLikeStatus(activeItem.likestatus);
    setWorkWithMeSelected(activeItem);
  };

  const likeWorkWithFunc = () => {
    const sendData = {
      question_id: workWithMeQuestionId,
      question_user_id: workWithMeUserId,
    };
    dispatch(likeWorkWithMe(sendData));
  };

  const goToChoosenCard = () => {
    NavigationService.navigate('WorkWithMedetailsScreen', {
      data: workWithMeSelected,
    });
  };

  const pagination = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 20,
        }}>
        {workWithMeArray.length > 0 &&
          workWithMeArray.slice(0, 20).map((item, index) => {
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

  const showMore = labeltem => {
    for (let item of WorkListArray) {
      console.log("item@@", item)
      if (item.id === labeltem.id) {
        if (item.status === false) {
          item.status = true;
        } else if (item.status === true) {
          item.status = false;
        }
      }
    }
    setUirender(!uiRender);
  };

  const showMoreCurrentlyWork = currentItem => {
    for (let item of currentlyWorkingArray) {
      console.log("item@@", item)
      if (item.id === currentItem.id) {
        if (item.status === false) {
          item.status = true;
        } else if (item.status === true) {
          item.status = false;
        }
      }
    }
    setUirender(!uiRender);
  };
  // -----Set big image function-----//
  const sharedMomentItem = shareItem => {
    setBigImage(shareItem.image);
    setSendDataValue(shareItem);
  };
  // -----Shared moments Like Function Start-----//
  const SharedMomentAddLike = () => {
    const sendData = {
      post_id: sendDataVal.id,
      sender_user_id: sendDataVal.user_id
    }
    dispatch(likeShareMoments(sendData));
  };
  // -----Shared moments Like Function Start-----//

  console.log('getProfileData', getProfileData);

  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    // console.log("load")
    setIsLoadings(false);
  };

  const TeamMemberProfile = teamItem => {
    console.log('teamItemteamItem', teamItem.receiver_id);
    AsyncStorage.setItem('EndUSerId', teamItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };

  return (
    <View style={styles.containerStyle}>
      <StatusBar backgroundColor={Colors.primary} />
      <ScrollView>
        {getProfileData != undefined && (
          <View style={styles.headerMainView}>
            {getProfileData.user_cover_img ===
              'http://3.140.234.233/pitch/uploads/users/' ? (
              <Image
                source={Images.ProfileRectangle}
                style={styles.rectangleImg}
              />
            ) : (
              <Image
                source={{ uri: getProfileData.user_cover_img }}
                style={styles.rectangleImg}
              />
            )}
          </View>
        )}
        {getProfileData != undefined && (
          <View style={styles.profileMainView}>
            <View style={styles.imageBackgroundView}>
              <ImageBackground
                source={Images.EcillipsImg}
                style={styles.eclipseImg}>
                {getProfileData.profile_file != 'undefined' ? (
                  <TouchableOpacity
                    style={{ marginTop: scale(-2.5), marginLeft: scale(1) }}
                    activeOpacity={1}
                    onPress={() => toggleModal()}>
                    <View>
                      {getProfileData.image_type === 1 ? (
                        <LazyLoader
                          uriImg={getProfileData.profile_file}
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
                              source={{ uri: getProfileData.profile_file }}
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
                              onHideControls={true}
                              muted={true}
                              onLoadStart={onLoadStart}
                              onLoad={onLoad}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '8%',
                              }}>
                              <Image
                                source={require('../../../assets/images/play-button.png')}
                                style={{
                                  height: 64,
                                  width: 64,
                                  resizeMode: 'contain',
                                  opacity: 0.6,
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
              <Text
                style={[styles.profileNameStyle, { alignSelf: 'flex-start' }]}>
                {getProfileData.first_name} {getProfileData.last_name}
              </Text>
              <Text style={styles.jobTitleStyle}>
                {getProfileData.job_title}
              </Text>
              {getProfileData.connectioncount[0] != undefined &&
                getProfileData.connectioncount[0].allconnection !=
                undefined && (
                  <View>
                    <Text
                      style={{ color: '#55A6FF', fontSize: 10, lineHeight: 14 }}>
                      {getProfileData.connectioncount[0].allconnection}{' '}
                      connections
                    </Text>
                  </View>
                )}
              <View style={styles.addressMainView}>
                <Image
                  source={Images.locationImages}
                  style={styles.locationImageStyle}
                />
                <Text style={styles.locationTextStyle}>
                  {getProfileData.city_name}, {getProfileData.state_name}
                </Text>
              </View>
              {getProfileData.res != undefined &&
                getProfileData.res[0] != undefined && (
                  <View style={styles.tagMainView}>
                    <Text style={styles.tagTextStyle}>
                      {getProfileData.res[0].ans_data}
                    </Text>
                  </View>
                )}
            </View>
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('ProfileScreen', {
                  profileData: getProfileData,
                })
              }>
              <Image
                source={Images.BlackEditPencil}
                style={styles.editPencilImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ marginTop: scale(140) }}>
          <View style={styles.tabStyle}>
            <TouchableOpacity
              onPress={() => tabFunction('about')}
              style={[
                styles.aboutTabStyle,
                { backgroundColor: aboutTab ? '#D3C1FC' : '#fff' },
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
                  fontWeight: 'bold',
                  fontSize: 16,
                  lineHeight: 22,
                }}>
                Experience
              </Text>
            </TouchableOpacity>
          </View>
          {aboutTab ? (
            <View>
              <View style={styles.profileStrengthView}>
                <Text
                  style={{
                    marginTop: 14,
                    textAlign: 'center',
                    fontSize: 9.5,
                    lineHeight: 13,
                    fontWeight: '400',
                    color: '#828282',
                  }}>
                  Welcome to Pitch, we are excited to have you join the first
                  networking platform that puts people first! Add to your story
                  to strengthen your profile.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 20,
                    left: 14,
                  }}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#828282',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#828282',
                            alignSelf: 'center',
                          }}>
                          1
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 2.5,
                          width: 46,
                          borderWidth: 1,
                          borderColor: '#828282',
                          backgroundColor: '#828282',
                          alignSelf: 'center',
                        }}></View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 8.5,
                          lineHeight: 10,
                          color: '#828282',
                          width: 62,
                          textAlign: 'center',
                          right: 15,
                        }}>
                        Add your skills
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#828282',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#828282',
                            alignSelf: 'center',
                          }}>
                          2
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 2.5,
                          width: 46,
                          borderWidth: 1,
                          borderColor: '#828282',
                          backgroundColor: '#828282',
                          alignSelf: 'center',
                        }}></View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 8.5,
                          lineHeight: 10,
                          color: '#828282',
                          width: 62,
                          textAlign: 'center',
                          right: 15,
                        }}>
                        Answer some questions
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#828282',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#828282',
                            alignSelf: 'center',
                          }}>
                          3
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 2.5,
                          width: 46,
                          borderWidth: 1,
                          borderColor: '#828282',
                          backgroundColor: '#828282',
                          alignSelf: 'center',
                        }}></View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 8.5,
                          lineHeight: 10,
                          color: '#828282',
                          width: 62,
                          textAlign: 'center',
                          right: 15,
                        }}>
                        Share some moments
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#828282',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#828282',
                            alignSelf: 'center',
                          }}>
                          4
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 2.5,
                          width: 46,
                          borderWidth: 1,
                          borderColor: '#828282',
                          backgroundColor: '#828282',
                          alignSelf: 'center',
                        }}></View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 8.5,
                          lineHeight: 10,
                          color: '#828282',
                          width: 62,
                          textAlign: 'center',
                          right: 15,
                        }}>
                        Add your work experience
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#828282',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#828282',
                            alignSelf: 'center',
                          }}>
                          5
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text
                        style={{
                          fontSize: 8.5,
                          lineHeight: 10,
                          color: '#828282',
                          width: 62,
                          textAlign: 'center',
                          right: 15,
                        }}>
                        Link with new connections
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.badgesMainView}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 30,
                      backgroundColor: '#fff',
                      paddingHorizontal: 15,
                      width: width,
                    }}>
                    <Text style={styles.badgesTextStyle}>BADGES</Text>
                    {showBadgeEditBtn === false && (
                      <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() =>
                          NavigationService.navigate('BadgeScreen')
                        }>
                        <Image
                          source={Images.BlackEditPencil}
                          style={styles.editPencilImage}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {badgesArray.length > 0 ? (
                    <Carousel
                      data={badgesArray}
                      renderItem={_renderItem}
                      sliderWidth={width - 55}
                      itemWidth={width / 4}
                    />
                  ) : (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '70%',
                        width: width,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          fontWeight: '400',
                        }}>
                        No Badges
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.workWithmeMainView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                    backgroundColor: '#F0F0F0',
                    paddingHorizontal: 15,
                  }}>
                  <Text style={styles.badgesTextStyle}>WORKING WITH ME</Text>
                  <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() =>
                      NavigationService.navigate('WorkingWithMeScreen')
                    }>
                    <Image
                      source={Images.BlackEditPencil}
                      style={styles.workWithmeImage}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  {workWithMeArray && workWithMeArray.length > 0 ? (
                    <View
                      style={{
                        marginTop: 5,
                        backgroundColor: '#fff',
                        paddingVertical: 10,
                      }}>
                      <Carousel
                        data={workWithMeArray}
                        renderItem={renderWorking}
                        sliderWidth={width}
                        itemWidth={width - 65}
                        onSnapToItem={index => setActiveIndex(index)}
                      />
                    </View>
                  ) : (
                    <View>
                      <View style={{ height: 5, backgroundColor: '#F0F0F0' }} />
                      <View
                        style={{
                          backgroundColor: '#fff',
                          padding: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 16,
                            fontWeight: '400',
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
                        workWithMeArray && workWithMeArray.length > 0
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
              </View>
              <View style={styles.workWithmeMainView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 30,
                    backgroundColor: '#fff',
                    paddingHorizontal: 15,
                  }}>
                  <Text style={styles.badgesTextStyle}>SHARED MOMENTS</Text>
                  <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() =>
                      NavigationService.navigate('EditSharedMoments')
                    }>
                    <Image
                      source={Images.BlackEditPencil}
                      style={styles.workWithmeImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff', paddingBottom: 15 }}>
                  {sendDataVal != undefined && (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          NavigationService.navigate('EditPostScreen', {
                            shareItems: sendDataVal,
                            getProfileDataItems: getProfileData,
                          })
                        }
                        style={{ alignSelf: 'center' }}>
                        <View>
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
                                  marginTop: scale(10),
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
                          )}
                        </View>
                      </TouchableOpacity>
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
                            NavigationService.navigate('EditPostScreen', {
                              shareItems: sendDataVal,
                              getProfileDataItems: getProfileData,
                            })
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
                  <View style={[styles.sharemomMapMaineView, { marginTop: 10 }]}>
                    {sharedArray.length === 0 ? (
                      <View
                        style={{
                          height: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 20,
                          flexDirection: 'row',
                          width: width / 2 + 150,
                        }}>
                        <Text
                          style={{
                            color: '#B1B1B1',
                            fontSize: 12,
                            textAlign: 'center',
                          }}>
                          + Add photos of moments in your life!
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            NavigationService.navigate('EditSharedMoments')
                          }
                          style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50 / 2,
                            borderWidth: 2,
                            borderColor: '#A49999',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '5%',
                          }}>
                          <Text
                            style={{
                              color: '#A49999',
                              fontSize: 35,
                              lineHeight: 35,
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <ScrollView
                        horizontal
                        style={{ marginTop: 10, flexDirection: 'row' }}>
                        {sharedArray.map((shareItem, shareIndex) => (
                          <TouchableOpacity
                            onPress={() =>
                              sharedMomentItem(shareItem, getProfileData)
                            }>
                            <View>
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
                                      size="large"
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
                                    controls={false}
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
              <View >
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '600',
                    marginTop: 10,
                    fontSize: 14.5,
                    fontFamily: Fonts.fontName.GibsonRegular,
                    marginLeft: 18
                  }}>
                  CURRENTLY WORKING AT
                </Text>
                {currentlyWorkingArray && currentlyWorkingArray.length > 0 ? (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: '6%' }}>
                      {currentlyWorkingArray.map((currentItem, currentIndex) => (
                        <View>
                          <View style={{ width: width - 30 }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  width: width - 40,
                                  minHeight: currentItem.status
                                    ? scale(100)
                                    : scale(100),
                                  marginBottom: 10,
                                  marginTop: 20,
                                  borderRadius: 15,
                                  backgroundColor: '#fff',
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
                                      {currentItem.title}
                                    </Text>
                                    <Text style={{ marginTop: 3, fontSize: 12 }}>
                                      {currentItem.company_name}
                                    </Text>
                                    <Text
                                      style={{
                                        marginTop: 10,
                                        fontSize: 12,
                                        color: '#B1B1B1',
                                        textTransform: 'capitalize',
                                      }}>
                                      {currentItem.startyear} - {currentItem.endyear}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => showMoreCurrentlyWork(currentItem)}
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
                                    {currentItem.status == true ?
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
                                {currentItem.status && (
                                  <View>
                                    <View
                                      style={{
                                        width: width / 2,
                                        alignSelf: 'center',
                                        marginLeft: scale(33),
                                        marginTop: 10,
                                        marginBottom: scale(10),
                                      }}>
                                      <Text style={{ fontSize: 12 }}>
                                        {currentItem.describtion}
                                      </Text>

                                      <ScrollView
                                        horizontal
                                        style={{
                                          marginTop: 10,
                                          flexDirection: 'row',
                                        }}>
                                        {currentItem.teammmembers != null &&
                                          currentItem.teammmembers != '' &&
                                          currentItem.teammmembers.length > 0 && (
                                            <View
                                              style={{ flexDirection: 'row' }}>
                                              {currentItem.teammmembers.map(
                                                (workItem, workIndex) => (
                                                  <Image
                                                    source={{
                                                      uri:
                                                        workItem.profile_file,
                                                    }}
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
                                            </View>
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
                ) :
                  (
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>
                      No data{' '}
                    </Text>
                  )}
              </View>

              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  marginTop: scale(15),
                  padding: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.badgesTextStyle, { alignSelf: 'center' }]}>
                    TEAM
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('EditTeamScreen')
                    }>
                    <Image
                      source={Images.BlackEditPencil}
                      style={[styles.editPencilImage, { marginTop: 0 }]}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: scale(90),
                    width: width - 40,
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    marginTop: scale(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {teamListArray && teamListArray.length > 0 ? (
                      <View style={{ flexDirection: 'row' }}>
                        {teamListArray.map((teamItem, teamIndex) => (
                          <TouchableOpacity
                            onPress={() => TeamMemberProfile(teamItem)}
                            key={teamIndex}>
                            {teamItem != undefined &&
                              teamItem.profile_file != 'undefined' ? (
                              <View>
                                {teamItem.imagetype == 1 ? (
                                  <LazyLoader
                                    uriImg={teamItem.profile_file}
                                    style={{
                                      marginRight: 5,
                                      height: scale(60),
                                      width: scale(60),
                                      borderRadius: 50,
                                      resizeMode: 'cover',
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
                                          top: '25%',
                                        }}
                                      />
                                    ) : null}
                                    <View pointerEvents="none">
                                      <Video
                                        source={{ uri: teamItem.profile_file }}
                                        style={{
                                          marginRight: 5,
                                          height: scale(60),
                                          width: scale(60),
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
                                      <View
                                        style={{
                                          position: 'absolute',
                                          alignSelf: 'center',
                                          top: '7%',
                                          left: '6%',
                                        }}>
                                        <Image
                                          source={require('../../../assets/images/play-button.png')}
                                          style={{
                                            height: scale(52),
                                            width: scale(52),
                                            resizeMode: 'contain',
                                            opacity: 0.5,
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                            ) : (
                              <Image
                                source={Images.profile2}
                                style={{
                                  marginRight: 5,
                                  height: scale(60),
                                  width: scale(60),
                                  borderRadius: 50,
                                }}
                              />
                            )}
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
                        <Text>No Team member</Text>
                      </View>
                    )}
                  </ScrollView>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginTop: scale(10) }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.badgesTextStyle, { alignSelf: 'center' }]}>
                    WORK HISTORY
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('Workhistory', {
                        WorkListArray: WorkListArray,
                      })
                    }>
                    <Image
                      source={Images.BlackEditPencil}
                      style={[styles.editPencilImage, { marginTop: 0 }]}
                    />
                  </TouchableOpacity>
                </View>
                {WorkListArray.length > 0 ? (
                  <View style={{ flexDirection: 'row' }}>
                    <CircleComp array={WorkListArray} uiRender={uiRender} />
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
                                  minHeight: labeltem.status
                                    ? scale(100)
                                    : scale(100),
                                  marginBottom: 10,
                                  marginTop: 20,
                                  borderRadius: 15,
                                  backgroundColor: '#fff',
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
                                    <Text style={{ marginTop: 3, fontSize: 12 }}>
                                      {labeltem.company_name}
                                    </Text>
                                    <Text
                                      style={{
                                        marginTop: 10,
                                        fontSize: 12,
                                        color: '#B1B1B1',
                                        textTransform: 'capitalize',
                                      }}>
                                      {labeltem.startyear} - {labeltem.endyear}
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
                                    {labeltem.status == true ?
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
                                {labeltem.status && (
                                  <View>
                                    <View
                                      style={{
                                        width: width / 2,
                                        alignSelf: 'center',
                                        marginLeft: scale(33),
                                        marginTop: 10,
                                        marginBottom: scale(10),
                                      }}>
                                      <Text style={{ fontSize: 12 }}>
                                        {labeltem.describtion}
                                      </Text>

                                      <ScrollView
                                        horizontal
                                        style={{
                                          marginTop: 10,
                                          flexDirection: 'row',
                                        }}>
                                        {labeltem.teammmembers != null &&
                                          labeltem.teammmembers != '' &&
                                          labeltem.teammmembers.length > 0 && (
                                            <View
                                              style={{ flexDirection: 'row' }}>
                                              {labeltem.teammmembers.map(
                                                (workItem, workIndex) => (
                                                  <Image
                                                    source={{
                                                      uri:
                                                        workItem.profile_file,
                                                    }}
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
                                            </View>
                                          )}
                                        {labeltem.teammmembers === null ||
                                          (labeltem.teammmembers === '' && (
                                            <Text
                                              style={{
                                                fontSize: 12,
                                                fontWeight: '600',
                                              }}>
                                              Add Team Member +{' '}
                                            </Text>
                                          ))}
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
                    <Text>No work history</Text>
                  </View>
                )}
              </View>
              <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.badgesTextStyle, { alignSelf: 'center' }]}>
                    EDUCATION & CERTIFICATIONS
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('EducationListScreen', {
                        EducationArray,
                      })
                    }>
                    <Image
                      source={Images.BlackEditPencil}
                      style={[styles.editPencilImage, { marginTop: 0 }]}
                    />
                  </TouchableOpacity>
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
                    <Text>No education & certificate</Text>
                  </View>
                )}
              </View>
              <View style={{ height: 10 }} />
            </View>
          ) : null}
        </View>
      </ScrollView>
      <Modal
        backdropOpacity={0.0}
        isVisible={isModalVisible}
        animationInTiming={1}
        animationOutTiming={1}
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.upperModalView}>
          <View
            style={{ position: 'absolute', top: 50, left: 15, zIndex: 222 }}>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={styles.backImgMainView}>
              <Text style={{ fontSize: 20, color: '#000' }}> X </Text>
            </TouchableOpacity>
          </View>
          <PinchZoomView scaleable={true}>
            <View>

              {getProfileData != undefined &&
                getProfileData.profile_file != 'undefined' ? (
                <View>
                  {getProfileData.image_type === 1 ? (
                    <LazyLoader
                      uriImg={getProfileData.profile_file}
                      style={{
                        height: height / 1.1,
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
                          size="small"
                          color="gray"
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '50%',
                          }}
                        />
                      ) : null}
                      <Video
                        source={{ uri: getProfileData.profile_file }}
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
    data: state.badgesReducer.data,
    profileRes: state.profileReducer.data,
    LikeShareMomentReducer: state.LikeShareMomentReducer.data,
    LikeWorkWithMeReducer: state.LikeWorkWithMeReducer.data,
  };
};

export default connect(mapStateToProps, {})(HomeProfileScreen);

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
    height: scale(168),
    width: '92%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: scale(60),
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
    height: scale(82.5),
    width: scale(82.5),
    resizeMode: 'cover',
    borderRadius: 50,
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
    alignSelf: 'center',
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
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    left: 16,
  },
  tagTextStyle: {
    fontSize: 10,
    lineHeight: 14,
    fontStyle: 'italic',
    // fontFamily: Fonts.fontName.nunitoRegular,
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
    height: scale(150),
    marginTop: scale(25),
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  // progressMainView: {
  //     alignSelf: 'center',
  //     marginTop: scale(20)
  // },
  badgesMainView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    height: scale(123),
    // paddingHorizontal: 15,
    marginTop: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  badgesTextStyle: {
    color: '#000',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 14.5,
    alignSelf: 'center',
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
    // paddingVertical: 15,
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
    marginTop: scale(10),
  },
  sharemomMapMaineView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 20,
    alignSelf: 'center',
  },
  mapImageStyle: {
    height: scale(105),
    width: scale(105),
    resizeMode: 'cover',
    marginLeft: 10,
    borderRadius: 10,
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
  backgroundVideo: {
    position: 'relative',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
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
});
