import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import ActionButtons from '../../components/atoms/Actionbutton';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import {ScrollView} from 'react-native-gesture-handler';
import {
  postTeamSuggestionApi,
  postAddUserTeamMemberApi,
  postAddUserTeamMemberSuccess,
  postTeamSuggestionSuccess,
} from '../../actions/UserLinkedActions';
import GetTeamListApi from '../../actions/TeamListAction';
import ProfileGet from '../../actions/ProfileActions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let FinalArray = [];

let teamArray = [
  {
    profileImage: require('../../../assets/images/Team2.png'),
    name1: 'Abhishek',
    selected: false,
  },
  {
    profileImage: require('../../../assets/images/Team2.png'),
    name1: 'Ashish',
    selected: false,
  },
  {
    profileImage: require('../../../assets/images/Team2.png'),
    name1: 'Mayank',
    selected: false,
  },
];

const EditTeamScreen = props => {
  const dispatch = useDispatch();
  const suggestionRes = useSelector(
    state => state.UserLinkedReducer.teamSuggestionData,
  );
  const postAddTeamMemberRes = useSelector(
    state => state.UserLinkedReducer.postAddTeamMember,
  );
  // console.log("suggestionRes",suggestionRes)

  const [uiRender, setUiRender] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModelInv, setModelInvite] = useState(false);
  const [teamListArray, setTeamListArray] = useState([]);
  const [suggestionListArray, setSuggestionListArray] = useState([]);
  const [apiSendData, setApiSendData] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    dispatch(postTeamSuggestionSuccess());
  };

  const inviteModalFunc = () => {
    setModalVisible(false);
    callMethod();
  };

  const callMethod = () => {
    // console.log("kjghmnghjgk")
    setModelInvite(!isModelInv);
  };

  useEffect(() => {
    dispatch(postTeamSuggestionSuccess());
  }, []);

  useEffect(() => {
    if (suggestionRes && suggestionRes != undefined) {
      if (suggestionRes.data != undefined && suggestionRes.data.length > 0) {
        for (let item of suggestionRes.data) {
          item.isSelected = false;
        }
        setSuggestionListArray(suggestionRes.data);
        setUiRender(!uiRender);
      }
    }
  }, [suggestionRes]);

  useEffect(() => {
    if (postAddTeamMemberRes && postAddTeamMemberRes != undefined) {
      if (postAddTeamMemberRes.response_code === 200) {
        dispatch(GetTeamListApi());
        dispatch(postAddUserTeamMemberSuccess());
      }
    }
  }, [postAddTeamMemberRes]);

  // console.log("apiSendData", apiSendData)
  const goBackFunc = () => {
    NavigationService.goBack();
    dispatch(GetTeamListApi());
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
          <Text style={styles.titleTextStyle}>Edit Team</Text>
        </View>
        <TouchableOpacity
          onPress={() => goBackFunc()}
          style={styles.settingImgMainView}>
          <Text style={{color: '#007AFF', fontSize: 12, fontWeight: '600'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const twoOptionAlertHandler = teamItem => {
    //function to make two option alert
    Alert.alert(
      //title
      'Are you sure you want to delete',
      //body
      'This action cannot be undone',
      [
        {
          text: 'Yes',
          onPress: () => removeTeamMemberFunc(teamItem),
        },
        {
          text: 'No',
          onPress: () => console.log('No pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  const removeTeamMemberFunc = teamItem => {
    const sendData = {
      linkuser_id: teamItem.id,
      team_status: 0,
    };
    console.log('sendData', sendData);
    dispatch(postAddUserTeamMemberApi(sendData));
    dispatch(GetTeamListApi());
  };

  const contactPermission = () => {
    inviteModalFunc();
    //function to make two option alert
    Alert.alert(
      //title
      '"Pitch" Would Like to Access your Contacts',
      //body
      'Pitch uses your contacts to make inviting team members more convenient.',
      [
        {
          text: 'Yes',
          onPress: () => openShare(),
        },
        {
          text: 'No',
          onPress: () => console.log('No pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  const openShare = () => {
    const options = {
      title: 'iOS 14 kit for Figma',
      url:
        'https://www.figma.com/file/HYcN8VjCd7XlzXOQqhSY0S/Final-Profile-(View%2C-Edit%2C-Components)?node-id=1%3A2',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const TeamListRes = useSelector(state => state.TeamListReducer.data);
  // console.log('TeamListResTeamListRes', TeamListRes);

  useEffect(() => {
    if (
      TeamListRes &&
      TeamListRes.data != undefined &&
      TeamListRes.data.length > 0
    ) {
      setTeamListArray(TeamListRes.data);
      setUiRender(!uiRender);
    }
  }, [TeamListRes]);

  const pushedSelected = selectItem => {
    for (let item of suggestionListArray) {
      if (item.full_name === selectItem.full_name) {
        if (item.isSelected === false) {
          item.isSelected = true;
          const sendData = {
            linkuser_id: item.id,
            team_status: 1,
          };
          console.log('itemitem12', item);
          setApiSendData(sendData);
        } else if (item.isSelected === true) {
          item.isSelected = false;
          setApiSendData();
        }
      } else {
        item.isSelected = false;
      }
    }
    setUiRender(!uiRender);
  };

  const ListApiCall = text => {
    // console.log("text", text)
    dispatch(postTeamSuggestionApi(text));
  };

  const AddMemberApiCallFunc = () => {
    setModalVisible(!isModalVisible);
    dispatch(postAddUserTeamMemberApi(apiSendData));
  };

  // console.log("FinalArray",FinalArray)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {teamListArray && teamListArray.length > 0 ? (
          <View>
            {teamListArray.map((teamItem, teamIndex) => (
              <View
                key={teamIndex}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#F0F0F0',
                  width: width - 30,
                  alignSelf: 'center',
                  borderRadius: 15,
                  marginTop: 10,
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{uri: teamItem.profile_file}}
                    style={{
                      height: scale(50),
                      width: scale(50),
                      borderRadius: 50,
                    }}
                  />
                  <View
                    style={{
                      width: width / 2 + 20,
                      marginLeft: 15,
                      justifyContent: 'center',
                    }}>
                    <Text style={{}}>{teamItem.full_name}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => twoOptionAlertHandler(teamItem)}>
                  <Image
                    source={Images.badgeBlockImage}
                    style={{
                      height: scale(17),
                      width: scale(17),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
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
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: scale(50),
          }}>
          <Text style={{alignSelf: 'center'}}>Add a new team member</Text>
          <Image
            source={Images.addIcon}
            style={{
              height: scale(35),
              width: scale(35),
              resizeMode: 'contain',
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>
        {isModalVisible ? (
          <Modal
            isVisible={isModalVisible}
            // animationIn='slideInUp'
            onBackdropPress={() => setModalVisible(!isModalVisible)}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={200}
              behavior="padding"
              style={styles.modalMainView}>
              <View>
                <Text style={{marginTop: '15%', alignSelf: 'center'}}>
                  Team Member Name
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  borderRadius: 10,
                  marginTop: scale(25),
                }}>
                <ScrollView>
                  <CustomTextInput
                    style={{
                      width: '95%',
                      backgroundColor: 'rgba(242, 242, 242, 0.7)',
                      height: scale(40),
                      paddingHorizontal: 8,
                      alignSelf: 'center',
                    }}
                    placeholderTextColor={'#C4C4C4'}
                    label={'Enter member name'}
                    secureEntry={false}
                    marginTop={verticalScale(0)}
                    onChange={text => ListApiCall(text)}
                  />

                  {suggestionListArray &&
                    suggestionListArray.length > 0 &&
                    suggestionListArray.map((teamItem, teamIndex) => (
                      <TouchableOpacity
                        onPress={() => pushedSelected(teamItem)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          marginTop: 10,
                        }}>
                        <Text>{teamItem.full_name}</Text>
                        <Image
                          source={
                            teamItem.isSelected
                              ? require('../../../assets/images/ic_checked.png')
                              : require('../../../assets/images/rectangle.png')
                          }
                          style={{height: 20, width: 20, resizeMode: 'contain'}}
                        />
                      </TouchableOpacity>
                    ))}

                  <TouchableOpacity
                    onPress={() => AddMemberApiCallFunc()}
                    disabled={apiSendData != undefined ? false : true}
                    style={{
                      height: scale(40),
                      width: width / 3 + 50,
                      backgroundColor:
                        apiSendData != undefined ? '#4A20E4' : 'lightgrey',
                      borderRadius: 5,
                      alignSelf: 'center',
                      marginTop: scale(30),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                      Add Member
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: scale(10)}}>
                    <Text
                      onPress={() => toggleModal()}
                      style={{
                        textDecorationLine: 'underline',
                        color: '#8D8D8D',
                        fontSize: 12,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <TouchableOpacity
                onPress={() => inviteModalFunc()}
                style={{alignSelf: 'center', marginTop: scale(40)}}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#8D8D8D',
                    fontSize: 12,
                  }}>
                  Can't find who you're looking for? Invite Now
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Modal>
        ) : null}

        <Modal isVisible={isModelInv} animationIn="slideInUp">
          <View
            style={{
              height: height / 3 + 85,
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: -20,
              width: width,
              alignSelf: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => inviteModalFunc()}
              style={{alignSelf: 'flex-end'}}>
              <Image
                source={Images.closeImages}
                style={{
                  height: scale(12),
                  width: scale(12),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: '#3A3643',
                textAlign: 'center',
                marginTop: 15,
              }}>
              This person is not on Pitch. Want to invite them?
            </Text>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F2F2F2',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: scale(18),
              }}>
              <View
                style={{
                  width: '12%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.emailInvite}
                  style={{
                    height: scale(15),
                    width: scale(15),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <CustomTextInput
                style={{width: '86%', height: scale(40), paddingHorizontal: 8}}
                label={'Type in email address to invite'}
                secureEntry={false}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
              />
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: '#F2F2F2',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: scale(7),
              }}>
              <View
                style={{
                  width: '12%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.contactInvite}
                  style={{
                    height: scale(15),
                    width: scale(15),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <CustomTextInput
                style={{width: '86%', height: scale(40), paddingHorizontal: 8}}
                label={'Invite via Contacts'}
                secureEntry={false}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
              />
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: '#F2F2F2',
                borderRadius: 10,
                flexDirection: 'row',
                marginTop: scale(7),
              }}>
              <View
                style={{
                  width: '12%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={Images.linkInvite}
                  style={{
                    height: scale(15),
                    width: scale(15),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <CustomTextInput
                style={{width: '86%', height: scale(40), paddingHorizontal: 8}}
                label={'Copy Invite link'}
                secureEntry={false}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
              />
            </View>

            <TouchableOpacity
              onPress={() => contactPermission()}
              style={{
                height: scale(40),
                width: width / 3 + 50,
                backgroundColor: '#4A20E4',
                borderRadius: 5,
                alignSelf: 'center',
                marginTop: scale(30),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => inviteModalFunc()}
              style={{alignSelf: 'center', marginTop: scale(6)}}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#8D8D8D',
                  fontSize: 12,
                }}>
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log('teamedir state', state);
  return {
    postAddTeamMember: state.UserLinkedReducer.postAddTeamMember,
  };
};

export default connect(mapStateToProps, {})(EditTeamScreen);

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
    width: scale(16),
    height: scale(16),
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
  modalMainView: {
    height: height - 100,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },
});
