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
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import BottomTabbar from '../BottomTabbar';
import badgess from '../../actions/BadgesActions';
import changeStatusBAdges from '../../actions/SignUpAction';
import suggestBadges from '../../actions/BadgeSuggestAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// const profileBadge = [
//     {
//         names: 'Detail Oriented'
//     },
//     {
//         names: 'Number Cruncher'
//     },
//     {
//         names: 'Creative'
//     },
//     {
//         names: 'Active Liastener'
//     },
//     {
//         names: 'Number Cruncher'
//     },
//     {
//         names: 'Active Liastener'
//     },
// ]

// const newBadge = [
//     {
//         names: 'Visionary'
//     },
//     {
//         names: 'Active Liastener'
//     },
// ]

const BadgeScreen = props => {
  const dispatch = useDispatch();

  const badgesStatusData = useSelector(
    state => state.SignupReducer.badgesStatusRes,
  );
  // console.log("badgesStatusData", badgesStatusData)

  const [isModalVisible, setModalVisible] = useState(false);
  const [badgesArray, setBadgesArray] = useState([]);
  const [inActiveBadges, setInactiveBadges] = useState([]);
  const [suggestedBadge, setSuggestedBadge] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(badgess());
  }, []);

  useEffect(() => {
    // console.log("props", props)
    if (props != undefined) {
      if (props.data != undefined && props.data.data != undefined) {
        setBadgesArray(props.data.data.active);
        setInactiveBadges(props.data.data.block);
      }
    }
  }, [props]);

  useEffect(() => {
    // console.log("props", props)
    if (badgesStatusData != undefined) {
      if (badgesStatusData.status != 0) {
        dispatch(badgess());
      }
    }
  }, [badgesStatusData]);

  const suggestBadgeFunc = () => {
    const sendData = {
      suggestedBadge: suggestedBadge,
    };
    // console.log("sendData", sendData)
    dispatch(suggestBadges(sendData));
    toggleModal();
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
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

  const inactiveFuncCall = inactiveItems => {
    // console.log("inactiveItems", inactiveItems)
    const data = {
      status: 0,
      bid: inactiveItems.badges_id,
    };
    dispatch(changeStatusBAdges(data));
  };

  const activeFuncCall = inactiveItems => {
    // console.log("inactiveItems", inactiveItems)
    const data = {
      status: 1,
      bid: inactiveItems.badges_id,
    };
    dispatch(changeStatusBAdges(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View>
        {/* <View style={styles.searchBarMainView}>
                    <View style={styles.searchImageMainView}>
                        <Image source={Images.SearchImg} style={styles.searchImageStyle} />
                    </View>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Search'
                    />
                </View> */}
        <Text style={styles.dragTextStyle}>
          Drag and rearrange your top skills to showcase your best self!
        </Text>
        <View style={styles.profileLocMainView}>
          <Image source={Images.badgeLoc} style={styles.locImageStyle} />
          <Text style={styles.profileBadgeTextSty}>
            Badges shown on profile
          </Text>
        </View>
        {badgesArray && badgesArray.length > 0 ? (
          <View style={styles.profileMapMainView}>
            {badgesArray.map((profileItem, profileIndex) => (
              <View style={styles.profileCardMainView}>
                <TouchableOpacity
                  onPress={() => inactiveFuncCall(profileItem)}
                  style={{zIndex: 2222, alignSelf: 'center'}}>
                  <Image
                    source={Images.badgeBlockImage}
                    style={styles.blockImageStyle}
                  />
                </TouchableOpacity>
                <View style={styles.ImgBackMainView}>
                  <ImageBackground
                    resizeMode="cover"
                    source={Images.badgeBackImage}
                    style={styles.ImageBackStyle}>
                    <Text style={styles.ImageBackName}>
                      {profileItem.badge_name}
                    </Text>
                  </ImageBackground>
                </View>
                <Image source={Images.menuIcon} style={styles.menuimgStyle} />
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              height: 50,
              width: 343,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>No Badges</Text>
          </View>
        )}

        <View style={[styles.profileLocMainView, {marginTop: scale(30)}]}>
          <Image
            source={Images.badgeAddNew}
            style={{
              height: scale(33),
              width: scale(33),
              resizeMode: 'contain',
            }}
          />
          <Text style={styles.profileBadgeTextSty}>Add new Badges</Text>
        </View>
        {inActiveBadges && inActiveBadges.length > 0 ? (
          <View style={{width: width, marginTop: scale(8)}}>
            {inActiveBadges.map((profileItem, profileIndex) => (
              <View style={styles.profileCardMainView}>
                <TouchableOpacity
                  onPress={() => activeFuncCall(profileItem)}
                  style={{zIndex: 2222, alignSelf: 'center'}}>
                  <Image
                    source={Images.badgeAddIcon}
                    style={styles.blockImageStyle}
                  />
                </TouchableOpacity>
                <View style={styles.ImgBackMainView}>
                  <ImageBackground
                    resizeMode="cover"
                    source={Images.badgeBackImage}
                    style={styles.ImageBackStyle}>
                    <Text style={styles.ImageBackName}>
                      {profileItem.badge_name}
                    </Text>
                  </ImageBackground>
                </View>
                <Image source={Images.menuIcon} style={styles.menuimgStyle} />
              </View>
            ))}
          </View>
        ) : (
          <View
            style={{
              height: 50,
              width: 343,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>No Badges</Text>
          </View>
        )}

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
                placeholderTextColor={'#C4C4C4'}
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
      {/* <BottomTabbar /> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("Badges state", state)
  return {
    data: state.badgesReducer.data,
  };
};

export default connect(mapStateToProps, {})(BadgeScreen);

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
  searchBarMainView: {
    height: 40,
    width: width - 80,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  searchImageMainView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchImageStyle: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
  },
  textInputStyle: {
    width: width / 2 + 45,
    marginLeft: 5,
  },
  dragTextStyle: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },
  profileLocMainView: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    marginTop: scale(20),
  },
  locImageStyle: {
    height: scale(25),
    width: scale(25),
    resizeMode: 'contain',
  },
  profileBadgeTextSty: {
    color: '#4A20E4',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 20,
  },
  profileMapMainView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  profileCardMainView: {
    width: width / 3 + 40,
    backgroundColor: '#fff',
    height: 40,
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  blockImageStyle: {
    height: scale(18),
    width: scale(18),
    alignSelf: 'center',
  },
  ImgBackMainView: {
    width: 110,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
    marginRight: 3,
  },
  ImageBackStyle: {
    height: 70,
    width: 145,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackName: {
    color: '#fff',
    fontSize: 9,
    marginTop: scale(5),
    textAlign: 'center',
  },
  menuimgStyle: {
    height: scale(15),
    width: scale(15),
    alignSelf: 'center',
    marginLeft: 3,
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
});
