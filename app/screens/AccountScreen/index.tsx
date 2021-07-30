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
import ProfileGet from '../../actions/ProfileActions';
import {useFocusEffect} from '@react-navigation/native';

const AccountScreen = props => {
  const dispatch = useDispatch();
  console.log('props', props);

  const profileData = props.profileRes.data;
  console.log('profileData', profileData);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Account</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };
  useEffect(() => {
    dispatch(ProfileGet());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View>
        <View style={styles.lineView} />
        <TouchableOpacity
        activeOpacity={1}
          // onPress={() => NavigationService.navigate('EmailScreen')}
          style={styles.btnTouchableStyle}>
          <Text style={styles.btnTextStyle}>{strings.EMAIL}</Text>
          <View style={styles.dataArrowStyle}>
            <Text style={styles.dataBtnStyle}>{profileData.email}</Text>
            <Image source={Images.back_button} style={styles.rightImageStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          onPress={() => NavigationService.navigate('PasswordChange')}
          style={styles.btnTouchableStyle}>
          <Text style={styles.btnTextStyle}>{strings.PASSWORD}</Text>
          <View style={styles.dataArrowStyle}>
            <Text style={styles.dataBtnStyle}> * * * * * * * * * * </Text>
            <Image source={Images.back_button} style={styles.rightImageStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
         activeOpacity={1}
          // onPress={() => NavigationService.navigate('PhonenoScreen')}
          style={styles.btnTouchableStyle}>
          <Text style={styles.btnTextStyle}>{strings.PHONE}</Text>
          <View style={styles.dataArrowStyle}>
            <Text style={styles.dataBtnStyle}>{profileData.phone}</Text>
            <Image source={Images.back_button} style={styles.rightImageStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.lineView} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data,
  };
};

export default connect(mapStateToProps, {})(AccountScreen);

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
  btnTouchableStyle: {
    padding: 15,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTextStyle: {
    color: '#000',
    fontWeight: '600',
  },
  dataBtnStyle: {
    color: '#DADADA',
    fontSize: 16,
    fontWeight: '600',
  },
  dataArrowStyle: {
    flexDirection: 'row',
  },
});
