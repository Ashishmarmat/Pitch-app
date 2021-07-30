import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../theme/scale';
import { Colors, Images } from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import ToggleButton from '../../components/atoms/ToggleButton';
import NotiSetting from '../../actions/NotiSetting';
import ProfileGet from '../../actions/ProfileActions';


 
const NotificationScreen = props => {
  console.log('props12345', props);;

  const dispatch = useDispatch();

  const getUserProfileRes = useSelector(state => state.profileReducer.data);

  const [switchVal, setSwitchVal] = useState(true);
  const [emailVal, setEmailVal] = useState(true);

  useEffect(() => {
    if (getUserProfileRes != undefined) {
      console.log("getUserProfileRes",getUserProfileRes);
      if(getUserProfileRes && getUserProfileRes.data){
        if(getUserProfileRes.data.graph){
          if(getUserProfileRes.data.graph[0].push_notification == "true"){
            setSwitchVal(true)
          } else {
            setSwitchVal(false);
          }
          if(getUserProfileRes.data.graph[0].email_notification == "true"){
            setEmailVal(true)
          } else {
            setEmailVal(false);
          }
        }
      }
    }
   
  }, [getUserProfileRes]);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>{strings.NOTIFICATIONS}</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };

  const ToggleBtnValue = data => {
    if (data === 'push') {
      setSwitchVal(!switchVal);
      const sendData = {
        pushstatus: switchVal  ? false : true,
        emailstatus: emailVal,
      };
      dispatch(NotiSetting(sendData));
      dispatch(ProfileGet());
    } else if (data === 'email') {
      setEmailVal(!emailVal);
      const sendData = {
        emailstatus: emailVal === true ? false : true,
        pushstatus: switchVal,
      };
      dispatch(NotiSetting(sendData));
      dispatch(ProfileGet());
      dispatch(ProfileGet());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={styles.lineView} />
      <View style={styles.BtnMainViewStyle}>
        <Text style={styles.toggleTextStyle}>Push Notifications</Text>
        <ToggleButton
          onOffValue={switchVal}
          onClick={() => ToggleBtnValue('push')}
        />
      </View>
      <View style={styles.lineView} />
      <View style={styles.BtnMainViewStyle}>
        <Text style={styles.toggleTextStyle}>Email Notifications</Text>
        <ToggleButton
          onOffValue={emailVal}
          onClick={() => ToggleBtnValue('email')}
        />
      </View>
      <View style={styles.lineView} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data
  };
};

export default connect(mapStateToProps, {})(NotificationScreen);

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
    transform: [{ rotate: '180deg' }],
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
  BtnMainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
  },
  toggleTextStyle: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});
