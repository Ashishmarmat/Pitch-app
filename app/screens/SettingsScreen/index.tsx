import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import {ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import badgessSuccess from '../../actions/BadgesActions';
import getProfileSuccess from '../../actions/ProfileActions';
import {messageCount} from '../../actions/MessagesAction';
import {userLogoutAct} from '../../actions/LoginActions';

const SettingsScreen = props => {
  const dispatch = useDispatch();

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Settings</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };
  const logoutFunc = () => {
    console.log('InsideLogout');
    AsyncStorage.removeItem('Authorization');
    AsyncStorage.removeItem('AutoLogin');
    AsyncStorage.removeItem('RESETTOKEN');
    // AsyncStorage.removeItem('AllowContact');
    NavigationService.navigate('LandingScreen');
    dispatch(badgessSuccess());
    dispatch(getProfileSuccess());
    dispatch(messageCount(''));
    dispatch(userLogoutAct(''));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('AccountScreen')}
          style={styles.touchableMainView}>
          <Text style={styles.nameTextStyle}>
            {strings.ACCOUNT}
          </Text>
          <Image source={Images.back_button} style={styles.rightImageStyle} />
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('TermsCondition')}
          style={styles.touchableMainView}>
          <Text style={styles.nameTextStyle}>
            {strings.TERMS_CONDITIONS}
          </Text>
          <Image source={Images.back_button} style={styles.rightImageStyle} />
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('PrivacyPolicy')}
          style={styles.touchableMainView}>
          <Text style={styles.nameTextStyle}>
            {strings.PRIVACY}
          </Text>
          <Image source={Images.back_button} style={styles.rightImageStyle} />
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('NotificationScreen')}
          style={styles.touchableMainView}>
          <Text style={styles.nameTextStyle}>
            {strings.NOTIFICATIONS}
          </Text>
          <Image source={Images.back_button} style={styles.rightImageStyle} />
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('HelpScreen')}
          style={styles.touchableMainView}>
          <Text style={styles.nameTextStyle}>{strings.HELP}</Text>
          <Image source={Images.back_button} style={styles.rightImageStyle} />
        </TouchableOpacity>
        <View style={styles.lineView} />
      </View>
      <View style={styles.logoutBtnMainView}>
        <TouchableOpacity
          onPress={() => logoutFunc()}
          style={styles.logoutTouchableBtn}>
          <Text style={styles.logoutTextStyle}>{strings.LOG_OUT}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(SettingsScreen);

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
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
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
  lineView: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEBEB',
  },
  touchableMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 13,
  },
  nameTextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontWeight: '600',
    marginLeft: 5,
  },
  logoutBtnMainView: {
    position: 'absolute',
    bottom: scale(30),
    width: '100%',
  },
  logoutTouchableBtn: {
    height: scale(40),
    width: '100%',
    backgroundColor: '#c4c4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutTextStyle: {
    color: '#FF4242',
  },
});
