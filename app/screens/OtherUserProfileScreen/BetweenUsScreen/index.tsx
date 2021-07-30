import React, { createRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../../theme/scale';
import { Colors, Images, Fonts } from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import LazyLoader from '../../../components/atoms/LazyLoader';
import AsyncStorage from '@react-native-community/async-storage';
import BetweenUs from '../../../actions/BetweenUs';
import Modal from 'react-native-modal';
import {
  postEndUserProfile,
  postEndUserProfileSuccess,
} from '../../../actions/EndUserProfileAction';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const BetweenUsScreen = props => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [UserId, setUserId] = useState('');
  const [uiRender, setUirender] = useState(false);
  const [type, setType] = useState('');
  const [MutualConnectionCount, setMutualConnectionCount] = useState();
  const [EndUserFirstName, setEndUserFirstName] = useState();
  const [MutualConnectionArray, setMutualConnectionArray] = useState([]);
  const [MutualCompany, setMutualCompany] = useState();
  const [MutualQuestionCategory, setMutualQuestionCategory] = useState('');

  const BetweenUsRes = useSelector(state => state.BetweenUsReducer.data);
  const EndUserProfileRes = useSelector(
    state => state.EndUserProfileReducer.data,
  );

  console.log('BetweenUsResBetweenUsRes', BetweenUsRes);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const calledFunc = async () => {
      const endUserId = await AsyncStorage.getItem('EndUSerId');
      console.log('EndUSerId', endUserId);
      setUserId(endUserId);
      const sendData2 = {
        enduserid: UserId,
      };
      dispatch(BetweenUs(sendData2));
    };
  }, []);

  useEffect(() => {
    if (BetweenUsRes != undefined) {
      if (BetweenUsRes && BetweenUsRes.company_data[0] != undefined) {
        setMutualCompany(BetweenUsRes.company_data[0]);
      }
      if (BetweenUsRes && BetweenUsRes.mutual_connection != undefined) {
        setMutualConnectionCount(BetweenUsRes.mutual_connection.length);
        setMutualConnectionArray(BetweenUsRes.mutual_connection);

      }
      if (BetweenUsRes && BetweenUsRes.data != undefined) {
        for (let data of BetweenUsRes.data) {
          console.log('BetweenUsRes que data', data.question_category);
          setMutualQuestionCategory(data.question_category);
        }
      }
    }
  }, [BetweenUsRes]);

  useEffect(() => {
    if (EndUserProfileRes && EndUserProfileRes.data != undefined) {
      setEndUserFirstName(EndUserProfileRes.data.first_name);
    }
  }, [EndUserProfileRes]);

  const otherUserProfile = async listItem => {
    toggleModal();
    AsyncStorage.setItem('EndUSerId', listItem.receiver_id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen', 'oiyuo');
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={{ flex: 2 }}>
          <Text style={styles.BetweenUsScreenTitleStyle}>Between Us</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {MutualConnectionCount != 0 ? (
          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              height: height / 8,
              width: width - 25,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', width: width / 3 }}>
              <Image
                source={require('../../../../assets/images/Group164001.png')}
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
            <View style={{ top: 15 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: width / 2 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'normal',
                    }}>
                    You and {EndUserFirstName} have{' '}
                  </Text>
                  <TouchableOpacity onPress={() => toggleModal()}>
                    {MutualConnectionCount == 1 ?
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 'normal',
                          color: '#007AFF',
                        }}>
                        {MutualConnectionCount} mutual link
                      </Text> :
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 'normal',
                          color: '#007AFF',
                        }}>
                        {MutualConnectionCount} mutual links
                      </Text>
                    }

                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', top: 8 }}>
                  {MutualConnectionArray.slice(0, 3).map(
                    (mutualItem, mutualIndex) => (
                      <View>
                        {mutualItem.profile_file != 'undefined' ? (
                          <View style={{ alignSelf: 'center' }}>
                            {mutualItem.imagetype === 1 ? (
                              <LazyLoader
                                uriImg={mutualItem.profile_file}
                                style={{
                                  width: scale(23),
                                  height: scale(23),
                                  borderRadius: 50,
                                  resizeMode: 'cover',
                                  marginRight: 5,
                                }}
                              />
                            ) : (
                              <View>
                                <Video
                                  source={{ uri: mutualItem.profile_file }}
                                  style={{
                                    width: scale(23),
                                    height: scale(23),
                                    borderRadius: 50,
                                    marginRight: 5,
                                  }}
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
                                    top: '6%',
                                    left: '8%',
                                  }}>
                                  <Image
                                    source={require('../../../../assets/images/play-button.png')}
                                    style={{
                                      opacity: 0.6,
                                      height: 21,
                                      width: 21,
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
                              width: scale(23),
                              height: scale(23),
                              borderRadius: 50,
                              marginRight: 5,
                              resizeMode: 'cover',
                            }}
                          />
                        )}
                      </View>
                    ),
                  )}
                </View>
              </View>
            </View>
          </View>
        ) : null}
        {MutualCompany != undefined || MutualCompany != null ? (
          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              height: height / 8,
              width: width - 25,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', width: width / 3 }}>
              <Image
                source={require('../../../../assets/images/Group1640-03.png')}
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
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    width: width / 2,
                    fontSize: 11,
                    fontWeight: 'normal',
                  }}>
                  You and {EndUserFirstName} both work at {MutualCompany.work}.
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {MutualQuestionCategory == 'Goals' ? (
          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              height: height / 8,
              width: width - 25,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', width: width / 3 }}>
              <Image
                source={require('../../../../assets/images/Group1640-04.png')}
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
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    width: width / 2,
                    fontSize: 11,
                    fontWeight: 'normal',
                  }}>
                  You and {EndUserFirstName} both want to be promoted quickly.
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {MutualQuestionCategory == 'Workplace Dynamics' ? (
          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              height: height / 8,
              width: width - 25,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', width: width / 3 }}>
              <Image
                source={require('../../../../assets/images/Group1640-05.png')}
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
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    width: width / 2,
                    fontSize: 11,
                    fontWeight: 'normal',
                  }}>
                  You and {EndUserFirstName} are both a morning person.
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {MutualQuestionCategory === 'Interests' ? (
          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              height: height / 8,
              width: width - 25,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center', width: width / 3 }}>
              <Image
                source={require('../../../../assets/images/Group1640-06.png')}
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
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    width: width / 2,
                    fontSize: 11,
                    fontWeight: 'normal',
                  }}>
                  You and {EndUserFirstName} both value a company that supports
                  environmental causes
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <ScrollView style={styles.modalMainView}>
          {/* <View style={}> */}
          <View
            style={{
              flexDirection: 'row',
              height: 40,
              backgroundColor: '#f2f2f2',
              alignItems: 'center',
              marginTop: '15%',
            }}>
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                flex: 1,
              }}>
              <Image source={Images.back_button} style={styles.backImgStyle} />
            </TouchableOpacity>
            <Text
              style={{
                flex: 2,
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: '20%',
              }}>
              {MutualConnectionCount} Mutual connection
            </Text>
          </View>
          {MutualConnectionArray.map((mutualItem, mutualIndex) => (
            <TouchableOpacity
              onPress={() => otherUserProfile(mutualItem)}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#EBEBEB',
                padding: 5,
              }}>
              <View>
                {mutualItem.profile_file != 'undefined' ? (
                  <View style={{ alignSelf: 'center' }}>
                    {mutualItem.imagetype === 1 ? (
                      <LazyLoader
                        uriImg={mutualItem.profile_file}
                        style={{
                          height: 45,
                          width: 45,
                          resizeMode: 'cover',
                          borderRadius: 50,
                        }}
                      />
                    ) : (
                      <View>
                        <Video
                          source={{ uri: mutualItem.profile_file }}
                          style={{ height: 45, width: 45, borderRadius: 50 }}
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
                            top: '10%',
                          }}>
                          <Image
                            source={require('../../../../assets/images/play-button.png')}
                            style={{
                              opacity: 0.6,
                              height: 36,
                              width: 36,
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
                    style={{ height: 45, width: 45, borderRadius: 50 }}
                  />
                )}
              </View>
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    lineHeight: 14,
                    fontFamily: Fonts.fontName.GibsonRegular,
                  }}>
                  {mutualItem.full_name}
                </Text>
                <Text
                  style={{
                    color: '#9A9A9A',
                    fontSize: 12,
                    fontFamily: Fonts.fontName.nunitoRegular,
                    lineHeight: 14,
                  }}>
                  {mutualItem.job_title}
                </Text>
                <Text
                  style={{
                    color: '#9A9A9A',
                    fontSize: 12,
                    fontFamily: Fonts.fontName.nunitoRegular,
                    lineHeight: 14,
                  }}>
                  {mutualItem.alldata.city_name},{' '}
                  {mutualItem.alldata.state_name},{' '}
                  {mutualItem.alldata.country_name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* </View> */}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('state', state);
  return {};
};

export default connect(mapStateToProps, {})(BetweenUsScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  backImgStyle: {
    width: scale(17),
    height: scale(17),
    resizeMode: 'contain',
    marginLeft: 10,
  },
  historyTitleMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: scale(15),
  },
  BetweenUsScreenTitleStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '800',
    top: 5,
    lineHeight: 17,
  },
  addHistoryStyle: {
    height: scale(30),
    width: scale(30),
    resizeMode: 'contain',
  },
  cardMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainCardTouchable: {
    width: width - 80,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
  },
  profileImagestyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  labelNameTextStyle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    fontStyle: 'normal',
  },
  name2TextStyle: {
    marginTop: 3,
    fontSize: 12,
  },
  name3TextStyle: {
    marginTop: 10,
    fontSize: 12,
    color: '#B1B1B1',
  },
  editPencilTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  editPencilImgStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  showStatusMainView: {
    width: width / 2,
    alignSelf: 'center',
    marginLeft: scale(33),
    marginTop: 10,
  },
  seeMoreTextstyle: {
    color: '#864AFF',
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 8,
  },
  teamImageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  modalMainView: {
    flex: 1,
    position: 'absolute',
    height: height,
    backgroundColor: '#fff',
    width: width,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
