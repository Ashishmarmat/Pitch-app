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
  TextInput,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import ActionButtons from '../../../components/atoms/Actionbutton';
import ChangeMobile from '../../../actions/ChangeMobile';
import getProfile from '../../../actions/ProfileActions';

const PhonenoScreen = props => {
  const dispatch = useDispatch();

  const [phoneno, setPhoneno] = useState('');

  const profileData = props.profileRes.data;
  console.log('profileData', profileData);

  const ChangeMobFunc = () => {
    const sendData = {
      mobile: phoneno,
    };
    dispatch(ChangeMobile(sendData));
    console.log('sendData', sendData);
    dispatch(getProfile());
    goBackFunc();
  };
  const goBackFunc = () => {
    dispatch(getProfile());
    NavigationService.goBack();
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
          <Text style={styles.titleTextStyle}>Phone Number</Text>
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
      {/* <BottomTabbar /> */}
      <View style={styles.lineView} />
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
          <TextInput
            style={{
              width: '85%',
              backgroundColor: 'transparent',
              height: scale(40),
              paddingHorizontal: 8,
            }}
            keyboardType="numeric"
            secureEntry={false}
            placeholder={profileData.phone}
            placeholderTextColor={'#C4C4C4'}
            onChangeText={text => setPhoneno(text)}
            // value={profileData.phone}
            editable={true}
          />
          {/* <CustomTextInput
                        style={{ width: '85%', backgroundColor: 'transparent', height: scale(40), paddingHorizontal: 8 }}
                        label={'000-000-000'}
                        secureEntry={false}
                        placeholderTextColor={'#C4C4C4'}
                        marginTop={verticalScale(0)}
                        onChange={(text) => setPhoneno(text)}
                        value={profileData.phone}
                        editable={true}
                    /> */}
          <View
            style={{
              width: scale(55),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Image
                source={Images.closeImages}
                style={styles.textInputPencil}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <ActionButtons
          onClick={() => {
            phoneno.length != 0 ? ChangeMobFunc() : null;
          }}
          title={'Save'}
          buttonColor={phoneno.length != 0 ? Colors.actionButtonColor : 'grey'}
          textColor={Colors.white}
          borderColor={Colors.white}
          marginTop={verticalScale(50)}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data
  };
};

export default connect(mapStateToProps, {})(PhonenoScreen);

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
