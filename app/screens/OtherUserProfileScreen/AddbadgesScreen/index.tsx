import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import Modal from 'react-native-modal';
import EndUserBadges from '../../../actions/EndUserBadges';
import EndUserBadgesSuccess from '../../../actions/EndUserBadges'
import {AddEndUserBadges} from '../../../actions/AddEndUserBadges';
import suggestBadges from '../../../actions/BadgeSuggestAction';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AddbadgesScreen = ({navigation, ...props}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBadgeModalVisible, setBadgeModalVisible] = useState(false);
  const [userId, setUserId] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [getEndUserProfile, setEndUserProfile] = useState();
  const [badgeStatus, setBadgeStatus] = useState(0);
  const [suggestedBadge, setSuggestedBadge] = useState('');
  const [badgesArray, setBadgesArray] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = (profileItem, value) => {
    console.log('value', value);
    setBadgeStatus(value);
    setUserId(navigation.state.params.endUserProfileId);
    setBadgeId(profileItem.badge_id);
    setBadgeModalVisible(!isBadgeModalVisible);
  };

  const AddBadgesApiCall = () => {
    const sendData = {
      sender_user_id: userId,
      badge_id: badgeId,
      status: badgeStatus,
    };
    console.log('sendData', sendData);
    dispatch(AddEndUserBadges(sendData));
    setBadgeModalVisible(!isBadgeModalVisible);
  };

  const suggestBadgeFunc = () => {
    const sendData = {
      suggestedBadge: suggestedBadge,
    };
    console.log('sendData', sendData);
    dispatch(suggestBadges(sendData));
    toggleModal();
  };

  useEffect(() => {
    const sendData = {
      user_id: navigation.state.params.endUserProfileId,
    };
    console.log('sendData', sendData);
    dispatch(EndUserBadges(sendData));
  }, []);

  const GetAdminBadgesRes = useSelector(
    state => state.EndUserBadgesReducer.data,
  );
  const EndUserProfileRes = useSelector(
    state => state.EndUserProfileReducer.data,
  );
  const addRemoveBadgesRes = useSelector(
    state => state.AddEndUserBadgesReducer.data,
  );

  useEffect(() => {
    if (EndUserProfileRes && EndUserProfileRes.data != undefined) {
      setEndUserProfile(EndUserProfileRes.data.first_name);
    }
  }, [EndUserProfileRes]);

  useEffect(() => {
    if (addRemoveBadgesRes && addRemoveBadgesRes.data != undefined) {
      const sendData = {
        user_id: navigation.state.params.endUserProfileId,
      };
      console.log('sendData', sendData);
      dispatch(EndUserBadges(sendData));
    }
  }, [addRemoveBadgesRes]);
  console.log('GetAdminBadgesResRes', GetAdminBadgesRes);

  const goBackFunc=()=>{
    NavigationService.navigate('OtherUserProfileScreen', {
      endUserProfileId: navigation.state.params.endUserProfileId,
    })
    dispatch(EndUserBadgesSuccess(''))
  }
  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => goBackFunc()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Badges</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}

      {/* <View style={{height: height / 2 + 100, backgroundColor:'red'}}>
            <ScrollView> */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: width,
          alignSelf: 'center',
        }}>
        {GetAdminBadgesRes &&
          GetAdminBadgesRes.data &&
          GetAdminBadgesRes.data.map((profileItem, profileIndex) => (
            <View style={styles.profileCardMainView}>
              <ImageBackground
                source={{uri: profileItem.badge_image}}
                style={{
                  height: scale(92),
                  width: scale(92),
                  resizeMode: 'contain',
                }}>
                {profileItem.user_badges_status === '0' ? (
                  <TouchableOpacity
                    onPress={() => toggleModal2(profileItem, 1)}>
                    <Image
                      source={Images.VectorPluss}
                      style={{
                        height: scale(24),
                        width: scale(24),
                        position: 'absolute',
                        right: 4,
                        top: 5,
                      }}
                    />
                    {/* <Image source={Images.badgeBlockImage} style={{ height: scale(24), width: scale(24), position: 'absolute', right: 4, top: 5 }} /> */}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => toggleModal2(profileItem, 0)}>
                    <Image
                      source={Images.badgeBlockImage}
                      style={{
                        height: scale(24),
                        width: scale(24),
                        position: 'absolute',
                        right: 4,
                        top: 5,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <ImageBackground
                  resizeMode="cover"
                  source={Images.badgeBackImage}
                  style={styles.ImageBackStyle}>
                  <Text style={styles.ImageBackName}>
                    {profileItem.badge_name}
                  </Text>
                </ImageBackground>
              </ImageBackground>
            </View>
          ))}
      </View>
      {/* </ScrollView>
            </View> */}
      <View>
        <TouchableOpacity
          onPress={() => toggleModal()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: scale(40),
          }}>
          <Image
            source={Images.addIcon}
            style={{height: scale(60), width: scale(60)}}
          />
          <Text
            style={{
              color: '#3A3643',
              fontSize: 12,
              width: width - 20,
              alignSelf: 'center',
              marginLeft: 10,
              fontWeight: 'bold',
              lineHeight: 15,
            }}>
            Can't find the right badge?{'\n'}Suggest a new badge idea to the
            Pitch team!
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={160}
          behavior="padding"
          style={styles.modalMainView}>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={Images.closeImages}
              style={{height: 12, width: 12}}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                textAlign: 'center',
                lineHeight: 20,
                fontWeight: 'bold',
                fontSize: 12,
              }}>
              Can't find the right badge?{'\n'}Suggest a new badge idea to our
              pitch team!
            </Text>
          </View>
          <View
            style={{
              height: scale(40),
              width: width - 40,
              alignSelf: 'center',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              borderRadius: 10,
              marginTop: scale(20),
              flexDirection: 'row',
            }}>
            <View style={{width: '90%'}}>
              <CustomTextInput
                style={{
                  backgroundColor: 'transparent',
                  height: scale(40),
                  paddingHorizontal: 8,
                }}
                label={'Suggest a new badge idea...'}
                marginTop={verticalScale(0)}
                value={suggestedBadge}
                onChange={text => setSuggestedBadge(text)}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '10%',
              }}>
              <Image
                source={Images.miceImages}
                style={{
                  height: scale(22),
                  width: scale(22),
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              paddingHorizontal: 10,
              marginTop: scale(10),
            }}>
            <Text
              style={{
                color: '#B1B1B1',
                fontSize: 12,
                fontWeight: 'normal',
                lineHeight: 14,
              }}>
              *We will evaluate your recommendation and will be rolling out new
              badges periodically.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => suggestBadgeFunc()}
            style={styles.doneBtnStyle}>
            <Text style={styles.doneTextStyle}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#8D8D8D',
                fontSize: 15,
                fontWeight: '600',
                textAlign: 'center',
                marginTop: scale(5),
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        isVisible={isBadgeModalVisible}
        // animationIn='slideInUp'
        onBackdropPress={() => setBadgeModalVisible(!isBadgeModalVisible)}>
        <View style={styles.BadgemodalMainView}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              lineHeight: 15,
              marginTop: 47,
            }}>
            Are you sure you{'\n'}want to endorse {getEndUserProfile} for this
            skill?
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              lineHeight: 15,
              marginTop: 20,
              color: '#B1B1B1',
            }}>
            You can undo this action later
          </Text>
          <TouchableOpacity
            onPress={() => AddBadgesApiCall()}
            style={{
              marginTop: 16,
              borderRadius: 5,
              backgroundColor: '#4A20E4',
              justifyContent: 'center',
              alignSelf: 'center',
              height: 27,
              width: 164,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                lineHeight: 15,
                color: '#fff',
              }}>
              Yup!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBadgeModalVisible(!isBadgeModalVisible)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                lineHeight: 15,
                color: '#8D8D8D',
                marginTop: 10,
                textDecorationLine: 'underline',
              }}>
              Maybe Later
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('Badges state', state);
  return {};
};

export default connect(mapStateToProps, {})(AddbadgesScreen);

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
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },

  profileCardMainView: {
    width: 90,
    height: 90,
    marginLeft: 18,
    marginTop: 26,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 14,
  },
  ImageBackStyle: {
    height: 70,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: -10,
    // marginLeft: -20
  },
  ImageBackName: {
    color: '#fff',
    fontSize: 9,
    marginTop: scale(5),
    textAlign: 'center',
  },

  modalMainView: {
    height: height / 3 + 30,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  doneBtnStyle: {
    height: scale(35),
    width: width / 2,
    alignSelf: 'center',
    backgroundColor: '#4A20E4',
    borderRadius: 5,
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTextStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  BadgemodalMainView: {
    height: scale(200),
    width: scale(274),
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 15,
    alignSelf: 'center',
  },
});
