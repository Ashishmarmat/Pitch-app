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
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import ActionButtons from '../../../components/atoms/Actionbutton';
import ChangePass from '../../../actions/ChangePass';

const PasswordChange = props => {
  const dispatch = useDispatch();
  console.log('props', props);

  const profileData = props.profileRes.data;
  console.log('propsprofileData', profileData);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [cnfpassword, setCnfpassword] = useState('');

  const changePassword = () => {
    const sendData = {
      old_password: currentPassword,
      new_password: newpassword,
      confirm_password: cnfpassword,
    };
    console.log('sendData', sendData);

    dispatch(ChangePass(sendData));
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
          <Text style={styles.titleTextStyle}>Password</Text>
        </View>
        <TouchableOpacity style={styles.settingImgMainView}>
          {/* <Image source={Images.saveImages} style={styles.backImgStyle} /> */}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={styles.lineView} />
      {profileData.signup_type != 'google' &&
      profileData.signup_type != 'apple' ? (
        <View>
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'rgba(242, 242, 242, 0.7)',
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
                label={'Current Password'}
                secureEntry={true}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
                onChange={text => setCurrentPassword(text)}
              />
              <View
                style={{
                  width: scale(55),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <TouchableOpacity>
                            <Image source={Images.closeImages} style={styles.textInputPencil} />
                        </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'rgba(242, 242, 242, 0.7)',
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
                label={'New Password'}
                secureEntry={true}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
                onChange={text => setNewpassword(text)}
              />
              <View
                style={{
                  width: scale(55),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <TouchableOpacity>
                            <Image source={Images.closeImages} style={styles.textInputPencil} />
                        </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 5}}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'rgba(242, 242, 242, 0.7)',
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
                label={'Confirm Password'}
                secureEntry={true}
                marginTop={verticalScale(0)}
                onChange={text => setCnfpassword(text)}
                placeholderTextColor="#B1B1B1"
              />
              <View
                style={{
                  width: scale(55),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <TouchableOpacity>
                            <Image source={Images.closeImages} style={styles.textInputPencil} />
                        </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <ActionButtons
              onClick={() => {
                currentPassword.length != 0 ||
                newpassword.length != 0 ||
                cnfpassword.length != 0
                  ? changePassword()
                  : null;
              }}
              title={'Save'}
              buttonColor={
                currentPassword.length != 0 &&
                newpassword.length != 0 &&
                cnfpassword.length != 0
                  ? Colors.actionButtonColor
                  : 'grey'
              }
              textColor={Colors.white}
              borderColor={Colors.white}
              marginTop={verticalScale(50)}
            />
          </View>
          {/* <View>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('ForgotPassword')}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: scale(30),
              }}>
              <Text style={{textDecorationLine: 'underline', fontSize: 15}}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      ) : (
        <View style={{alignSelf: 'center', top: 25}}>
          <Text style={{fontSize: 13}}>
            You have done social log in, so you can't use this.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data,
  };
};

export default connect(mapStateToProps, {})(PasswordChange);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  textInputPencil: {
    width: scale(10),
    height: scale(10),
    resizeMode: 'contain',
  },
  lineView: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEBEB',
  },
});
