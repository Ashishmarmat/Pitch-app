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
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Metrics} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import ActionButtons from '../../../components/atoms/Actionbutton';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserWork, updateUserWorkSuccess} from '../../../actions/WorkList';
import ModalDropdown from 'react-native-modal-dropdown-deprecated-support';
import {workListApi} from '../../../actions/WorkList';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import LazyLoader from '../../../components/atoms/LazyLoader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let arrayMember = [];
let photoArray = [];
let descValue: '';

const yearArray = [
  {
    year: 1980,
  },
  {
    year: 1981,
  },
  {
    year: 1982,
  },
  {
    year: 1983,
  },
  {
    year: 1984,
  },
  {
    year: 1985,
  },
  {
    year: 1986,
  },
  {
    year: 1987,
  },
  {
    year: 1988,
  },
  {
    year: 1989,
  },
  {
    year: 1990,
  },
  {
    year: 1991,
  },
  {
    year: 1992,
  },
  {
    year: 1993,
  },
  {
    year: 1994,
  },
  {
    year: 1995,
  },
  {
    year: 1996,
  },
  {
    year: 1997,
  },
  {
    year: 1998,
  },
  {
    year: 1999,
  },
  {
    year: 2000,
  },
  {
    year: 2001,
  },
  {
    year: 2002,
  },
  {
    year: 2003,
  },
  {
    year: 2004,
  },
  {
    year: 2005,
  },
  {
    year: 2006,
  },
  {
    year: 2007,
  },
  {
    year: 2008,
  },
  {
    year: 2009,
  },
  {
    year: 2010,
  },
  {
    year: 2011,
  },
  {
    year: 2012,
  },
  {
    year: 2013,
  },
  {
    year: 2014,
  },
  {
    year: 2015,
  },
  {
    year: 2016,
  },
  {
    year: 2017,
  },
  {
    year: 2018,
  },
  {
    year: 2019,
  },
  {
    year: 2020,
  },
  {
    year: 2021,
  },
];
let endYears: any = [];
let tempArray = [];
const EditDetailWorkHistory = props => {
  const dispatch = useDispatch();

  const WorkListRes = useSelector(
    state => state.WorkListReducer.updateWorkData,
  );
  console.log('WorkListRes', WorkListRes);
  const TeamListRes = useSelector(state => state.TeamListReducer.data);
  console.log('TeamListRes', TeamListRes);

  const [uiRender, setUiRender] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [comapnyName, setCompanyName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [teamMember, setTeamMember] = useState([]);
  const [highLightArray, sethighLightArray] = useState([]);
  const [currentworking, setCurrentWorking] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [workingArray, setWorkingArray] = useState([]);
  const [teamListArray, setTeamListArray] = useState([]);
  const [workingType, setWorkingType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isLoadings, setIsLoadings] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    getTokenFunc();
    if (props && props.navigation) {
      if (
        props.navigation.state &&
        props.navigation.state.params != undefined &&
        props.navigation.state.params.labeltem != undefined
      ) {
        const labelData = props.navigation.state.params.labeltem;
        setId(labelData.id);
        setName(labelData.title);
        setCompanyName(labelData.company_name);
        setStartDate(labelData.startyear);
        if (labelData.endyear != 'Present') {
          setEndDate(labelData.endyear);
        } else {
          setCurrentWorking(true);
          setWorkingType(1);
          setEndDate(labelData.endyear);
        }
        onSelectStartYear(0, {year: labelData.startyear});
        setDescription(labelData.describtion);
        (descValue = labelData.describtion),
          setTeamMember(labelData.teammmembers);
        tempArray = [];
        arrayMember = [];
        photoArray = [];
        sethighLightArray(labelData.work_highlight);
      }
    }
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  useEffect(() => {
    let demoArray = [];
    let teamTempArray = [];
    if (highLightArray && highLightArray.length > 0) {
      for (let item of highLightArray) demoArray.push(item);
    }
    if (teamMember && teamMember.length > 0) {
      for (let data of teamMember) {
        teamTempArray.push(data);
      }
    }
    tempArray.push(...demoArray);
    arrayMember.push(...teamTempArray);
    setUiRender(!uiRender);
  }, [highLightArray]);

  const onSelectStartYear = (index, value) => {
    let endYear = [];
    for (let i = 0; i < yearArray.length; i++) {
      let indexItem = yearArray.indexOf(yearArray[index]);
      if (i >= indexItem) {
        endYear.push(yearArray[i]);
      }
    }
    endYears = endYear;
    setStartDate(value.year);
  };

  const onSelectEndYear = (index, value) => {
    setEndDate(value.year);
  };

  useEffect(() => {
    if (
      WorkListRes != undefined &&
      WorkListRes.response_code &&
      WorkListRes.response_code === 200
    ) {
      createTwoButtonAlert();
    }
  }, [WorkListRes]);

  const createTwoButtonAlert = () =>
    Alert.alert('Work history updated successfully', '', [
      {text: 'OK', onPress: () => goToNext()},
    ]);

  const goToNext = () => {
    dispatch(updateUserWorkSuccess());
    // NavigationService.navigateAndReset('HomeScreen')
    dispatch(workListApi());
    NavigationService.goBack();
  };
  const openLibraryFunc = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      multiple: true,
      maxFiles: 50,
    }).then(image => {
      photoArray.push(...image);
      setWorkingArray(image);
      profileImageUpload();
    });
  };

  const profileImageUpload = () => {
    setIsLoading(true);
    const data = new FormData();
    photoArray.forEach((element, i) => {
      const newFile = {
        uri: element.path,
        type: element.mime,
        name: element.filename,
      };
      // console.log("newFile", newFile)
      data.append('work_highlight[]', newFile);
    });
    fetch('http://3.140.234.233/pitch/apiV1/userworkuploadimg', {
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
        if (res.status === 1) {
          tempArray.push(...res.data);
          setIsLoading(false);
        } else {
          // console.log("jhyfjhfhjfjf", res.message);
          setIsLoading(false);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateWorkFunc = () => {
    const SendData = {
      title: name,
      company_name: comapnyName,
      currently_working: workingType,
      startyear: startDate,
      endyear: endDate,
      describtion: description,
      teammmembers: arrayMember,
      work_highlight: tempArray,
      id: id,
    };
    if (startDate > endDate) {
      Alert.alert('Invalid entry of end year');
    } else {
      dispatch(updateUserWork(SendData));
    }
  };

  const removeItemFunc = removeItem => {
    const index = tempArray.indexOf(removeItem);
    tempArray.splice(index, 1);
    setUiRender(!uiRender);
  };
  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.closeImages} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Edit Work History</Text>
        </View>
        <TouchableOpacity
          onPress={() => updateWorkFunc()}
          style={styles.settingImgMainView}>
          <Text style={{color: '#007AFF', fontSize: 12, fontWeight: '600'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    if (
      TeamListRes &&
      TeamListRes.data != undefined &&
      TeamListRes.data.length > 0
    ) {
      for (let item of TeamListRes.data) {
        item.isSelected = false;
      }
      setTeamListArray(TeamListRes.data);
      setUiRender(!uiRender);
    }
  }, [TeamListRes]);

  const chnageImage = () => {
    if (currentworking === false) {
      setCurrentWorking(true);
      setWorkingType(1);
      setEndDate('Present');
      setUiRender(!uiRender);
    } else if (currentworking === true) {
      setCurrentWorking(false);
      setWorkingType(0);
      setEndDate('');
      setUiRender(!uiRender);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('called');
    for (let valSelect of teamListArray) {
      for (let teamVal of arrayMember) {
        if (valSelect.id === teamVal.id) {
          valSelect.isSelected = true;
        }
      }
    }
    setUiRender(!uiRender);
  };

  const goToshared = () => {
    toggleModal();
    NavigationService.navigate('SharedmomentsPhotos');
  };
  const removeMainFunc = teamItem => {
    teamItem.isSelected = false;
    const index = arrayMember.indexOf(teamItem);
    arrayMember.splice(index, 1);
    setUiRender(!uiRender);
  };

  const selectTeamFunc = teamData => {
    for (let item of teamListArray) {
      if (item.id === teamData.id) {
        if (item.isSelected === false) {
          item.isSelected = true;
          arrayMember.push(item);
        } else if (item.isSelected === true) {
          item.isSelected = false;
          const index = arrayMember.indexOf(teamData);
          arrayMember.splice(index, 1);
        }
      }
    }
    // setTeamMember(arrayMember)
    setUiRender(!uiRender);
  };

  const onPressSave = () => {
    setTeamMember(arrayMember);
    setModalVisible(!isModalVisible);
  };

  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    setIsLoadings(false);
  };

  const seeMorelessFunc = () => {
    setSeeMore(!seeMore);
    setDescription(description);
  };

  const changeDescFunc = text => {
    setDescription(text);
  };

  console.log('arrayMember', arrayMember);
  console.log('teamListArray', teamListArray);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, backgroundColor: '#fff'}}
        keyboardVerticalOffset={10}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: 15}}>
              <Text
                style={{
                  marginTop: scale(37),
                  fontSize: 12,
                  fontWeight: 'normal',
                }}>
                Title*
              </Text>
              <View>
                <CustomTextInput
                  style={styles.titleTextInputStyle}
                  label={''}
                  placeholderTextColor={'#C4C4C4'}
                  marginTop={verticalScale(0)}
                  value={name}
                  onChange={text => setName(text)}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text
                style={{
                  marginTop: scale(18),
                  fontSize: 12,
                  fontWeight: 'normal',
                }}>
                Company name*
              </Text>
              <View>
                <CustomTextInput
                  style={styles.titleTextInputStyle}
                  label={''}
                  placeholderTextColor={'#C4C4C4'}
                  marginTop={verticalScale(0)}
                  value={comapnyName}
                  onChange={text => setCompanyName(text)}
                />
              </View>
            </View>
            <View style={styles.currentWorkingCheckView}>
              {currentworking ? (
                <TouchableOpacity onPress={() => chnageImage()}>
                  <Image
                    source={require('../../../../assets/images/ic_checked.png')}
                    style={styles.checkedImageStyle}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => chnageImage()}>
                  <Image
                    source={require('../../../../assets/images/rectangle.png')}
                    style={styles.uncheckedImageStyle}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.checkedTouchView}
                onPress={() => chnageImage()}>
                <Text style={styles.checkedTextStyle}>
                  I currently work here
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.startEndDateMainView}>
              <View>
                <Text style={styles.startEndTextStyle}>Start year*</Text>
                <ModalDropdown
                  defaultValue={startDate}
                  // label={'Start date'}
                  style={[styles.containerStyle, props.containerStyle]}
                  textStyle={[styles.textStyle, props.textStyle]}
                  dropdownStyle={styles.dropdownStyle}
                  renderRow={option => (
                    <View style={styles.dropdownViewStyle}>
                      <Text style={styles.nameStyle}>{option.year}</Text>
                    </View>
                  )}
                  renderButtonText={rowData => rowData.year}
                  onSelect={(index, value) => onSelectStartYear(index, value)}
                  disabled={props.disabled}
                  options={yearArray}
                />
              </View>
              <View>
                <Text style={styles.startEndTextStyle}>End year*</Text>
                {currentworking ? (
                  <View
                    style={{
                      marginTop: verticalScale(22),
                      backgroundColor: Colors.lighGray,
                      justifyContent: 'center',
                      height: verticalScale(39),
                      borderRadius: scale(10),
                      width: 100,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontSize: 12}}>{endDate}</Text>
                  </View>
                ) : (
                  <ModalDropdown
                    defaultValue={endDate}
                    style={[styles.containerStyle2, props.containerStyle]}
                    textStyle={[styles.textStyle, props.textStyle]}
                    dropdownStyle={styles.dropdownStyle}
                    renderRow={option => (
                      <View style={styles.dropdownViewStyle}>
                        <Text style={styles.nameStyle}>{option.year}</Text>
                      </View>
                    )}
                    renderButtonText={rowData => rowData.year}
                    onSelect={(index, value) => onSelectEndYear(index, value)}
                    disabled={currentworking === true}
                    options={endYears}
                  />
                )}
              </View>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text style={styles.startEndTextStyle}>Description*</Text>
              <TextInput
                style={[
                  styles.titleTextInputStyle,
                  {
                    height: seeMore ? scale(83) : scale(40),
                    paddingTop: 10,
                    lineHeight: 18,
                    paddingBottom: seeMore ? 10 : 0,
                  },
                ]}
                label={''}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(8)}
                value={description}
                textAlignVertical="top"
                multiline={true}
                scrollEnabled={seeMore ? true : false}
                onChangeText={text => changeDescFunc(text)}
              />
              <TouchableOpacity onPress={() => seeMorelessFunc()}>
                <Text
                  style={{
                    marginTop: scale(14),
                    fontSize: 12,
                    textAlign: 'right',
                    fontWeight: 'normal',
                    right: 10,
                  }}>
                  {seeMore ? 'See less...' : 'See more...'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text style={styles.startEndTextStyle}>Team Members*</Text>
              {arrayMember ? (
                <ScrollView horizontal>
                  <View style={{flexDirection: 'row', marginTop: scale(8)}}>
                    {arrayMember.map((teamItem, teamIndex) => (
                      <View>
                        {teamItem != undefined &&
                        teamItem.profile_file != 'undefined' ? (
                          <View>
                            {teamItem.imagetype == 1 ? (
                              <LazyLoader
                                uriImg={teamItem.profile_file}
                                style={{
                                  height: scale(50),
                                  width: scale(50),
                                  marginLeft: 10,
                                  resizeMode: 'cover',
                                  borderRadius: 50,
                                }}
                              />
                            ) : (
                              <View>
                                {isLoadings ? (
                                  <ActivityIndicator
                                    animating
                                    size="small"
                                    color="gray"
                                    style={{
                                      position: 'absolute',
                                      alignSelf: 'center',
                                      top: '20%',
                                    }}
                                  />
                                ) : null}
                                <View pointerEvents="none">
                                  <Video
                                    source={{uri: teamItem.profile_file}}
                                    style={{
                                      height: scale(50),
                                      width: scale(50),
                                      marginLeft: 10,
                                      resizeMode: 'contain',
                                      borderRadius: 50,
                                    }}
                                    paused={true}
                                    // resizeMode={'contain'}
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
                                      top: '5%',
                                    }}>
                                    <Image
                                      source={require('../../../../assets/images/play-button.png')}
                                      style={{
                                        height: scale(45),
                                        width: scale(45),
                                        resizeMode: 'contain',
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
                              marginLeft: 10,
                              height: scale(50),
                              width: scale(50),
                              borderRadius: 50,
                            }}
                          />
                        )}
                        <TouchableOpacity
                          onPress={() => removeMainFunc(teamItem)}
                          style={{
                            alignSelf: 'flex-end',
                            right: '5%',
                            position: 'absolute',
                          }}>
                          <Image
                            source={Images.badgeBlockImage}
                            style={{
                              height: 15,
                              width: 15,
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}
                      onPress={() => toggleModal()}>
                      <Image
                        source={Images.addIcon}
                        style={{
                          height: scale(35),
                          width: scale(35),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          marginLeft: arrayMember.length > 0 ? scale(10) : 0,
                          marginTop: arrayMember.length > 0 ? 0 : 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              ) : null}
              {arrayMember === '' ||
                (arrayMember == null && (
                  <View style={{alignSelf: 'flex-start', marginTop: 10}}>
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}
                      onPress={() => toggleModal()}>
                      <Image
                        source={Images.addIcon}
                        style={{
                          height: scale(35),
                          width: scale(35),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                          marginLeft:
                            arrayMember === '' &&
                            arrayMember == null &&
                            arrayMember.length > 0
                              ? scale(10)
                              : 0,
                          marginTop:
                            arrayMember === '' &&
                            arrayMember == null &&
                            arrayMember.length > 0
                              ? 0
                              : 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
            <View style={{marginTop: scale(25)}}>
              <Text style={[styles.startEndTextStyle, {paddingHorizontal: 15}]}>
                Work Highlights*
              </Text>
              <Text
                style={{
                  color: '#B1B1B1',
                  fontSize: 11,
                  paddingHorizontal: 15,
                  marginTop: scale(10),
                }}>
                + Add highlights from your shared moments to your profile
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: width - 10,
                  marginTop: scale(13),
                  alignSelf: 'center',
                }}>
                {tempArray.map((highlightItem, highlightIndex) => (
                  <View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 5,
                        zIndex: 222,
                      }}>
                      <TouchableOpacity
                        onPress={() => removeItemFunc(highlightItem)}>
                        <Image
                          source={Images.badgeBlockImage}
                          style={{height: 18, width: 18, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: highlightItem}}
                      style={{
                        height: scale(95),
                        width: scale(105),
                        marginLeft: 10,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() => openLibraryFunc()}
                  style={{
                    height: scale(95),
                    width: scale(104),
                    backgroundColor: '#C4C4C4',
                    alignSelf: 'center',
                    marginLeft: 12,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop:
                      workingArray.length > 0 && workingArray.length % 2 === 0
                        ? 0
                        : 15,
                  }}>
                  <Image
                    source={Images.addIcon}
                    style={{
                      height: scale(35),
                      width: scale(35),
                      resizeMode: 'contain',
                      tintColor: '#fff',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ marginTop: scale(45), alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 17, color: '#B1B1B1', textDecorationLine: 'underline', fontWeight: '600' }}>Delete</Text>
                        </TouchableOpacity>
                    </View> */}

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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.modalMainView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 15,
            }}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Image
                source={require('../../../../assets/images/crossImage.png')}
                style={{height: 15, width: 15, alignSelf: 'center'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPressSave()}>
              <Text style={{color: '#007AFF', fontSize: 16, fontWeight: '600'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{marginTop: 10}}>
            {teamListArray && teamListArray.length > 0 ? (
              <View style={{paddingHorizontal: 10}}>
                {teamListArray.map((teamItem, teamIndex) => (
                  <TouchableOpacity
                    onPress={() => selectTeamFunc(teamItem)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#F0F0F0',
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {teamItem.profile_file ===
                      'http://3.140.234.233/pitch/uploads/users/' ? (
                        <Image
                          source={require('../../../../assets/images/HomeLeftHeader.png')}
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 40 / 2,
                            resizeMode: 'contain',
                          }}
                        />
                      ) : (
                        <Image
                          source={{uri: teamItem.profile_file}}
                          style={{height: 40, width: 40, borderRadius: 40 / 2}}
                        />
                      )}
                      <View style={{justifyContent: 'center', marginLeft: 30}}>
                        <Text style={{}}>{teamItem.full_name}</Text>
                      </View>
                    </View>
                    {teamItem.isSelected ? (
                      <Image
                        source={require('../../../../assets/images/Group1661.png')}
                        style={{height: 20, width: 20, alignSelf: 'center'}}
                      />
                    ) : (
                      <Image
                        source={require('../../../../assets/images/VectorPluss.png')}
                        style={{height: 20, width: 20, alignSelf: 'center'}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: height / 2,
                  width: width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>No data available</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(EditDetailWorkHistory);

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
    backgroundColor: '#F0F0F0',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
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
  titleTextInputStyle: {
    width: '100%',
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    // backgroundColor: '#c4c4c4',
    height: scale(40),
    padding: 8,
    borderRadius: 10,
    marginTop: scale(7),
  },
  currentWorkingCheckView: {
    flexDirection: 'row',
    marginTop: scale(25),
    paddingHorizontal: 15,
  },
  checkedImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  uncheckedImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: '#141414',
  },
  checkedTextStyle: {
    marginLeft: scale(10),
    fontSize: 12,
  },
  checkedTouchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  startEndDateMainView: {
    flexDirection: 'row',
    marginTop: scale(15),
    width: width / 1 - 90,
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  smallTextInputStyle: {
    width: width / 4 + 10,
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    height: scale(40),
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: scale(7),
  },
  startEndTextStyle: {
    marginTop: scale(18),
    fontSize: 12,
    fontWeight: 'normal',
  },
  modalMainView: {
    height: height / 2 + 220,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  nameStyle: {
    fontSize: 15,
  },
  containerStyle: {
    flex: 1,
    marginTop: verticalScale(22),
    backgroundColor: Colors.lighGray,
    justifyContent: 'center',
    height: verticalScale(39),
    borderRadius: scale(10),
    width: 100,
  },
  containerStyle2: {
    flex: 1,
    marginTop: verticalScale(22),
    backgroundColor: Colors.lighGray,
    justifyContent: 'center',
    height: verticalScale(39),
    borderRadius: scale(10),
    width: 100,
  },
  textStyle: {
    color: '#000',
    width: '100%',
    paddingHorizontal: Metrics.paddingHorizontal10,
    fontSize: 12,
  },
  dropdownStyle: {
    width: '25%',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 8,
  },
  dropdownViewStyle: {
    height: scale(40),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
  },
});
