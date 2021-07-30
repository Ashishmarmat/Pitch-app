import React, { useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images } from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import { updateProfile } from '../../actions/SignUpAction';
import AsyncStorage from '@react-native-community/async-storage';
import CustomDropdown from '../../components/atoms/CustomDropdown';
import {
  getStatesRequest,
  getCitiesRequest,
} from '../../actions/LocationActions';
import badgess from '../../actions/BadgesActions';
import getWorkWithMeAPi from '../../actions/WorkWithMeAction';
import shareMoments from '../../actions/ShareMoments';
import ProfileGet from '../../actions/ProfileActions';
import { useFocusEffect } from '@react-navigation/native';
import { workListApi } from '../../actions/WorkList';
import { getEducation } from '../../actions/EducationActions';
import GetTeamListApi from '../../actions/TeamListAction';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';
import { PinchZoomView } from 'react-native-pinch-to-zoom-view';
import showToast from '../../utils/ShowToast';
import RNHeicConverter from 'react-native-heic-converter';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProfileScreen = props => {
  const dispatch = useDispatch();

  const baseUrl = 'http://3.140.234.233/pitch/apiV1';
  const [profileLoadData, setProfileloadData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [token, setToken] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [tagline, setTagLine] = useState('');
  const [taglineId, setTagLineId] = useState('');
  const [isLocationModal, setLocationModal] = useState();
  const [countryRes, setCountryRes] = useState('');
  const [stateRes, setStateRes] = useState('');
  const [cityRes, setCityRes] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uiRender, setUiRender] = useState(false);
  const [profilePicType, setProfilePicType] = useState('');
  const [enableFirst, setEnableFirst] = useState(false);
  const [enableLast, setEnableLast] = useState(false);
  const [enableJobtitle, setEnableJob] = useState(false);
  const [enableTag, setEnableTag] = useState(false);
  const [isProfileModalVisible, setprofileModalVisible] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);
  useEffect(() => {
    if (props != undefined && props.navigation) {
      if (
        props.navigation.state != undefined &&
        props.navigation.state.params != undefined &&
        props.navigation.state.params.profileData != undefined
      ) {
        setProfileloadData(props.navigation.state.params.profileData);
        setProfilePic(props.navigation.state.params.profileData.profile_file);
        setProfilePicType(props.navigation.state.params.profileData.image_type);
        setFirstname(props.navigation.state.params.profileData.first_name);
        setLastname(props.navigation.state.params.profileData.last_name);
        setCoverImage(props.navigation.state.params.profileData.user_cover_img);
        setJobTitle(props.navigation.state.params.profileData.job_title);
        setCountryId(props.navigation.state.params.profileData.country_id);
        setCountryRes(props.navigation.state.params.profileData.country_name);
        setStateRes(props.navigation.state.params.profileData.state_name);
        setCityRes(props.navigation.state.params.profileData.city_name);
        if (
          props.navigation.state.params.profileData.res &&
          props.navigation.state.params.profileData.res.length > 0
        ) {
          setTagLine(props.navigation.state.params.profileData.res[0].ans_data);
          setTagLineId(props.navigation.state.params.profileData.res[0].id);
        }
      }
    }
  }, []);

  console.log('profileLoadData', profileLoadData);

  useEffect(() => {
    const type = {
      country_id: '233',
    };
    getTokenFunc();
    dispatch(getStatesRequest(type));
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  const showLocFunc = data => {
    const showLoc = cityRes + ',' + stateRes;
    return showLoc;
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleProfileModal = () => {
    setprofileModalVisible(!isProfileModalVisible);
  };

  const openCameraFunc = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: false,
    })
      .then(response => {
        console.log('camera response', response);
        const abc = response.path.split('/');
        const def = abc[abc.length - 1];
        console.log('pathh', def);
        const imageResponse = {
          sourceURL: response.path,
          mime: response.mime,
          filename: def,
        };

        if (imageResponse.filename.endsWith('.heic') || imageResponse.filename.endsWith('.HEIC')) {
          RNHeicConverter
            .convert({ // options
              path: imageResponse.sourceURL,
            })
            .then((result) => {
              console.log("Heic result", result); // { success: true, path: "path/to/jpg", error, base64, }
              const sendData = {
                filename: `${imageResponse.filename.split(".")[0]}.JPG`,
                sourceURL: result.path,
                mime: imageResponse.mime
              }
              console.log("Photo sendData", sendData)
              profileImageUpload(sendData);
            });
        } else {
          profileImageUpload(imageResponse);
        }

        toggleModal();
      })
      .catch(err => {
        console.log('kjgasyjfjdhsjkwdbkjadb', err);
        toggleModal();
      });
  };

  const openLibraryFunc = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      width: 1000,
      height: 1000,
      cropping: false,
    })
      .then(response => {
        console.log('photo or video response', response);
        setProfilePic(response.sourceURL);
        if (response.filename.endsWith('.heic') || response.filename.endsWith('.HEIC')) {
          RNHeicConverter
            .convert({ // options
              path: response.sourceURL,
            })
            .then((result) => {
              console.log("Heic result", result); // { success: true, path: "path/to/jpg", error, base64, }
              const sendData = {
                filename: `${response.filename.split(".")[0]}.JPG`,
                sourceURL: result.path,
                mime: response.mime
              }
              console.log("Photo sendData", sendData)
              profileImageUpload(sendData);
            });
        } else {
          profileImageUpload(response);
        }
        toggleModal();
      })
      .catch(err => {
        console.log('openLibraryFunc err', err);
        toggleModal();
      });
  };

  const openCoverFunc = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 1000,
      height: 1000,
      cropping: false,
    })
      .then(response => {
        console.log('photo or video response', response);
        coverImagUpload(response);
      })
      .catch(err => {
        console.log('openCoverFunc err', err);
      });
  };
  console.log('profilePic', profilePic);
  console.log('coverImage', coverImage);

  const profileImageUpload = imageResponse => {
    console.log('Indside Profile ', imageResponse);
    setIsLoading(true);
    var data = new FormData();
    data.append('ProfileImage', {
      uri: imageResponse.sourceURL,
      type: imageResponse.mime,
      name: imageResponse.filename,
    });
    console.log('dataaaa', data);

    fetch('http://3.140.234.233/pitch/apiV1/userProfileImage', {
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
        console.log('Upload Profile Image res', res);
        if (res.response_code === 200) {
          setProfilePic(res.data);
          setIsLoading(false);
          setUiRender(!uiRender);
        } else {
          console.log(res.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        showToast('No Internet Connection');
        console.log(e);
        setIsLoading(false);
      });
  };

  const coverImagUpload = coverData => {
    console.log('Indside Profile ', coverData);
    setIsLoading(true);
    var data = new FormData();
    data.append('ProfileImage', {
      uri: coverData.sourceURL,
      type: coverData.mime,
      name: coverData.filename,
    });
    fetch('http://3.140.234.233/pitch/apiV1/userProfileImage', {
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
        console.log('Cover Image res', res);
        if (res.response_code === 200) {
          setCoverImage(res.data);
          setIsLoading(false);
        } else {
          console.log(res.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        showToast('No Internet Connection');
        console.log(e);
        setIsLoading(false);
      });
  };

  const saveEditData = () => {
    const payload = {
      full_name: firstname + ' ' + lastname,
      phone: profileLoadData.phone,
      dob: '1995-10-18',
      pronoun: profileLoadData.pronoun,
      work: profileLoadData.work,
      job_title: jobTitle,
      state: stateId,
      country: countryId,
      city: cityId,
      last_school: profileLoadData.last_school,
      profile_pic: profilePic,
      user_cover_img: coverImage,
      tagline_id: taglineId,
      tagline_data: tagline,
    };
    dispatch(updateProfile(payload));
    setEnableFirst(false);
    setEnableLast(false);
    setEnableJob(false);
    setEnableTag(false);
  };

  const selectState = (index, value) => {
    console.log('value', value);
    const params = {
      state_id: value.id,
    };
    setStateRes(value.name);
    setStateId(value.id);
    setCityRes('');
    setCityId('');
    setUiRender(!uiRender);
    dispatch(getCitiesRequest(params));
  };

  const selectCityFunc = (index, value) => {
    console.log('value', value);
    setCityRes(value.name);
    setCityId(value.id);
  };
  const goBackFunc = () => {
    dispatch(badgess());
    dispatch(ProfileGet());
    dispatch(shareMoments());
    dispatch(getWorkWithMeAPi());
    dispatch(workListApi());
    dispatch(getEducation());
    dispatch(GetTeamListApi());
    NavigationService.goBack();
  };
  const onLoadStart = () => {
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
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
          <Text style={styles.titleTextStyle}>Edit Profile Card</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('SettingsScreen', {
              profileLoadData: profileLoadData,
            })
          }
          style={styles.settingImgMainView}>
          <Image source={Images.settingBtn} style={styles.backImgStyle} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}

      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={10}>
        {profileLoadData != undefined && (
          <ScrollView style={styles.contentMainView}>
            <View style={{ marginTop: 25 }}>
              <Text style={{ fontWeight: '800' }}>{strings.PROFILEPICTITLE}</Text>
              <View style={styles.profileCardMainView}>
                <View style={{ width: scale(30) }} />

                <ImageBackground
                  source={Images.EcillipsImg}
                  style={styles.backgroundImageStyle}>
                  {profilePic != 'undefined' ? (
                    <TouchableOpacity onPress={() => toggleProfileModal()}>
                      <View>
                        {profilePicType === 1 ? (
                          <Image
                            source={{ uri: profilePic }}
                            style={styles.profileImageStyle}
                          />
                        ) : (
                          <View pointerEvents="none">
                            <Video
                              source={{ uri: profilePic }}
                              style={styles.profileImageStyle}
                              paused={true}
                              disableFullscreen={true}
                              seekColor="transparent"
                              disableSeekbar
                              controls={true}
                              muted={true}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: '9%',
                              }}>
                              <Image
                                source={require('../../../assets/images/play-button.png')}
                                style={{
                                  height: 66,
                                  width: 66,
                                  resizeMode: 'contain',
                                }}
                              />
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
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    source={Images.EditPencil}
                    style={styles.editPencilImageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: '800' }}>{strings.FIRSTNAME}</Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  marginTop: 5,
                  borderWidth: 2,
                  borderColor: '#F2F2F2',
                }}>
                <TextInput
                  style={{
                    width: '85%',
                    backgroundColor: 'transparent',
                    height: scale(40),
                    paddingHorizontal: 8,
                  }}
                  label={'Enter first name'}
                  secureEntry={false}
                  marginTop={verticalScale(0)}
                  onChangeText={text => setFirstname(text)}
                  value={firstname}
                  editable={enableFirst}
                />
                <View
                  style={{
                    width: scale(55),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setEnableFirst(true)}>
                    <Image
                      source={Images.EditPencil}
                      style={styles.textInputPencil}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: '800' }}>{strings.LASTNAME}</Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  marginTop: 5,
                  borderWidth: 2,
                  borderColor: '#F2F2F2',
                }}>
                <CustomTextInput
                  style={{
                    width: '85%',
                    backgroundColor: 'transparent',
                    height: scale(40),
                    paddingHorizontal: 8,
                  }}
                  label={'Enter last name'}
                  secureEntry={false}
                  placeholderTextColor={'#C4C4C4'}
                  marginTop={verticalScale(0)}
                  onChange={text => setLastname(text)}
                  value={lastname}
                  editable={enableLast}
                />
                <View
                  style={{
                    width: scale(55),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setEnableLast(true)}>
                    <Image
                      source={Images.EditPencil}
                      style={styles.textInputPencil}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 33 }}>
              <Text style={{ fontWeight: '800' }}>{strings.COVER_PHOTO}</Text>
              {coverImage === 'http://3.140.234.233/pitch/uploads/users/' ? (
                <ImageBackground
                  resizeMode="cover"
                  source={Images.ProfileRectangle}
                  style={styles.coverImageStyle}>
                  <TouchableOpacity onPress={() => openCoverFunc()}>
                    <Image
                      source={Images.EditPencil}
                      style={[
                        styles.textInputPencil,
                        { marginRight: scale(10), marginTop: scale(4) },
                      ]}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={{ uri: coverImage }}
                  style={styles.coverImageStyle}>
                  <TouchableOpacity onPress={() => openCoverFunc()}>
                    <Image
                      source={Images.EditPencil}
                      style={[
                        styles.textInputPencil,
                        { marginRight: scale(10), marginTop: scale(4) },
                      ]}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </View>
            <View style={{ marginTop: scale(30) }}>
              <Text style={{ fontWeight: '800' }}>{strings.PROFILEJOBTITLE}</Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  marginTop: scale(5),
                  borderWidth: 2,
                  borderColor: '#F2F2F2',
                }}>
                <CustomTextInput
                  style={{
                    width: '85%',
                    backgroundColor: 'transparent',
                    height: scale(40),
                    paddingHorizontal: 8,
                  }}
                  label={'Enter job title'}
                  secureEntry={false}
                  placeholderTextColor={'#C4C4C4'}
                  marginTop={verticalScale(0)}
                  onChange={text => setJobTitle(text)}
                  value={jobTitle}
                  editable={enableJobtitle}
                />
                <View
                  style={{
                    width: scale(55),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setEnableJob(true)}>
                    <Image
                      source={Images.EditPencil}
                      style={styles.textInputPencil}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: scale(20) }}>
              <Text style={{ fontWeight: '800' }}>{strings.CURRENTLOCATION}</Text>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  marginTop: scale(5),
                  borderWidth: 2,
                  borderColor: '#F2F2F2',
                }}>
                <CustomTextInput
                  style={{
                    width: '85%',
                    backgroundColor: 'transparent',
                    height: scale(40),
                    paddingHorizontal: 8,
                  }}
                  label={'San Francisco, California, USA'}
                  secureEntry={false}
                  placeholderTextColor={'#C4C4C4'}
                  marginTop={verticalScale(0)}
                  onChange={props.onEmailChange}
                  value={showLocFunc(profileLoadData)}
                  editable={false}
                />
                <View
                  style={{
                    width: scale(55),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setLocationModal(true)}>
                    <Image
                      source={Images.EditPencil}
                      style={styles.textInputPencil}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30, marginBottom: 50 }}>
              <Text style={{ fontWeight: '800' }}>{strings.TAG_LINE}</Text>
              <View style={[styles.profileCardMainView, { height: 80 }]}>
                <View style={{ justifyContent: 'center' }}>
                  <TextInput
                    style={{ height: 70, width: width / 2 + 100, marginLeft: 10 }}
                    placeholder="Huge Foodie Allergic to Cats"
                    multiline={true}
                    textAlignVertical="top"
                    numberOfLines={4}
                    value={tagline}
                    onChangeText={text => setTagLine(text)}
                    editable={enableTag}
                  />
                </View>
                <TouchableOpacity onPress={() => setEnableTag(true)}>
                  <Image
                    source={Images.EditPencil}
                    style={styles.editPencilImageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Modal isVisible={isModalVisible} animationIn="slideInUp">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
                style={{
                  height: '100%',
                  backgroundColor: '#00000020',
                  width: width,
                  alignSelf: 'center',
                }}>
                <View style={styles.modalMainView}>
                  <TouchableOpacity
                    onPress={() => openLibraryFunc()}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#EBEBEB',
                      padding: 10,
                    }}>
                    <Image
                      source={Images.cameraImage}
                      style={{
                        height: scale(22),
                        width: scale(22),
                        resizeMode: 'contain',
                        marginLeft: scale(30),
                      }}
                    />
                    <Text style={{ alignSelf: 'center', marginLeft: scale(30) }}>
                      Upload via Camera Roll [Photo/ Video]{' '}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openCameraFunc()}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#EBEBEB',
                      padding: 10,
                    }}>
                    <Image
                      source={Images.cameraImage}
                      style={{
                        height: scale(22),
                        width: scale(22),
                        resizeMode: 'contain',
                        marginLeft: scale(30),
                      }}
                    />
                    <Text style={{ alignSelf: 'center', marginLeft: scale(30) }}>
                      Take a new photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>

            <Modal isVisible={isLocationModal} animationIn="slideInUp">
              <View>
                <TouchableOpacity
                  onPress={() => setLocationModal(false)}
                  activeOpacity={1}
                  style={{
                    height: height / 2,
                    width: width,
                    alignSelf: 'center',
                    backgroundColor: '#00000005',
                  }}></TouchableOpacity>
                <View
                  style={{
                    height: height / 2 - 80,
                    backgroundColor: '#fff',
                    width: width,
                    alignSelf: 'center',
                    marginBottom: '-40%',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingHorizontal: scale(50),
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: Colors.lighGray,
                      height: 35,
                      borderRadius: 10,
                      justifyContent: 'center',
                      marginTop: 40,
                    }}>
                    <Text style={{ marginLeft: '5%', color: Colors.grayText }}>
                      USA
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <CustomDropdown
                      label={stateRes}
                      onSelect={(index, value) => selectState(index, value)}
                      options={props.statesResponse}
                    />
                    <View style={{ marginLeft: 10, width: width / 3 + 10 }}>
                      <CustomDropdown
                        label={cityRes === '' ? 'Select city' : cityRes}
                        disabled={stateRes === '' ? true : false}
                        onSelect={(index, value) =>
                          selectCityFunc(index, value)
                        }
                        options={props.citiesResponse}
                      />
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setLocationModal(false)}
                      style={{
                        height: 40,
                        width: width / 2,
                        backgroundColor: '#8650FD',
                        alignSelf: 'center',
                        marginTop: '10%',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              backdropOpacity={0.0}
              isVisible={isProfileModalVisible}
              animationInTiming={1}
              animationOutTiming={1}
              onBackdropPress={() =>
                setprofileModalVisible(!isProfileModalVisible)
              }>
              <View style={styles.upperModalView}>
                <View style={{ position: 'absolute', top: 50, left: 15, zIndex: 222 }}>
                  <TouchableOpacity
                    onPress={() => toggleProfileModal()}
                    style={{
                      justifyContent: 'center',
                      marginLeft: 18,
                      top: 30,
                      height: 35,
                      width: 35,
                      backgroundColor: '#fff',
                      borderRadius: 50,
                    }}>
                    <Text style={{ fontSize: 20, color: '#000',alignSelf:'center' }}> X </Text>
                  </TouchableOpacity>
                </View>
                <PinchZoomView scaleable={true}>
                  <View>
                    {profilePic != 'undefined' ? (
                      <View>
                        {profilePicType === 1 ? (
                          <LazyLoader
                            uriImg={profilePic}
                            style={{
                              height: height / 1.1,
                              width: width / 1,
                              resizeMode: 'contain',
                              top: 20,
                            }}
                          />
                        ) : (
                          <View>
                            {isLoadings ? (
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
                              source={{ uri: profilePic }}
                              style={{
                                height: height / 1.25,
                                width: width / 1,
                                top: 20,
                              }}
                              paused={false}
                              disableFullscreen={true}
                              seekColor="transparent"
                              disableSeekbar
                              controls={true}
                              muted={false}
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
          </ScrollView>
        )}
        <View style={{ height: 70, justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => saveEditData()}
            style={{
              height: 50,
              width: '80%',
              borderRadius: 10,
              alignSelf: 'center',
              backgroundColor: '#8650FD',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 16,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000050',
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
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('Profile state', state);
  return {
    statesResponse: state.LocationReducer.statesResponse,
    citiesResponse: state.LocationReducer.citiesResponse,
  };
};

export default connect(mapStateToProps, {})(ProfileScreen);

let styles = StyleSheet.create({
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
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  contentMainView: {
    paddingHorizontal: 18,
  },
  profileCardMainView: {
    minHeight: 110,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#F2F2F2',
    paddingVertical: 10,
  },
  backgroundImageStyle: {
    height: scale(104),
    width: scale(104),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageStyle: {
    height: scale(90),
    width: scale(90),
    marginTop: -5,
    borderRadius: 50,
  },
  editPencilImageStyle: {
    width: scale(25),
    height: scale(25),
    resizeMode: 'contain',
    marginTop: scale(5),
    marginRight: scale(10),
  },
  textInputPencil: {
    width: scale(25),
    height: scale(25),
    resizeMode: 'contain',
  },
  coverImageStyle: {
    height: scale(90),
    width: '98%',
    alignSelf: 'center',
    marginLeft: scale(5),
    marginTop: scale(12),
    alignItems: 'flex-end',
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
  cityContainer: {
    flex: 2,
    marginLeft: scale(10),
  },
  upperModalView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#2A1753',
    height: height / 1,
    width: width,
    alignSelf: 'center',
  },
});
