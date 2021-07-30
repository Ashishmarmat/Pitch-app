import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import ActionButtons from '../../components/atoms/Actionbutton';
import scale from '../../theme/scale';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  chatlistApi,
  chatHistorySuccess,
  createRoomApi,
  createRoomSuccess,
} from '../../actions/MessagesAction';
import moment from 'moment';
import SocketIOClient from 'socket.io-client';

var as = null;
let noCall = false;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  notCameraReadyTextStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    marginTop: scale(10),
    textAlign: 'center',
    color: Colors.notCameraReady,
  },
});

const MakeYourPitchScreen = () => {
  const signupSuccessRes = useSelector(
    state => state.SignupReducer.userSignUpInfo,
  );
  const charRoomResData = useSelector(
    state => state.MessagesReducer.createRoomData,
  );
  console.log('signupSuccessRes', signupSuccessRes);
  console.log('charRoomResData', charRoomResData);

  const dispatch = useDispatch();

  const [User_Id, setUserId] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    as = SocketIOClient('http://3.140.234.233:4000', {
      transports: ['websocket'],
      jsonp: false,
    });
    console.log('as', as);
    noCall = false;
  }, []);

  useEffect(() => {
    if (signupSuccessRes != undefined && signupSuccessRes.data != undefined) {
      chatRoomApiCall(signupSuccessRes.data);
    }
  }, [signupSuccessRes]);

  const chatRoomApiCall = async data => {
    setUserId(data.id);
    const token = data.Authorization;
    const date1 = moment().format();
    const date2 = date1.split('T');
    const time = moment().format('HH:mm');
    const sendData = {
      // "userTo": 157,
      // "userBy": Number(data.id),
      userTo: Number(data.id),
      userBy: 157,
      time: time,
      date: date2[0],
      createrId: Number(data.id),
    };
    dispatch(createRoomApi({sendData, token}));
  };

  useEffect(() => {
    if (charRoomResData != undefined && charRoomResData.data != undefined) {
      console.log('', charRoomResData.data);
      const date1 = moment().format();
      const date2 = date1.split('T');
      const time = moment().format('HH:mm');
      if(noCall == false){
      const sendAdminMessage = {
        message: 'Welcome to Pitch',
        room_id: charRoomResData.data.room_id,
        // "receiver_id": 157,
        // "sender_id": Number(User_Id),
        receiver_id: Number(User_Id),
        sender_id: 157,
        date: date2[0],
        time: time,
        fileType: 0,
      };
      console.log('sendAdminMessage', sendAdminMessage);
      as.emit('newuser', sendAdminMessage);
      dispatch(createRoomSuccess());
      noCall = true;
    }
    }
  }, [charRoomResData]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 36,
            textAlign: 'center',
            fontWeight: '700',
            width: 252,
            marginTop: scale(80),
            fontFamily: Fonts.fontName.GibsonBold,
          }}>
          {strings.MAKE_YOUR_PITCH}
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            width: 252,
            fontFamily: Fonts.fontName.GibsonRegular,
            marginTop: scale(9),
          }}>
          {strings.CREATE_YOUR_OWN}
        </Text>
        <Image
          source={require('../../../assets/images/Ellipse11.png')}
          resizeMode="cover"
          style={{
            height: 230,
            width: 238,
            alignSelf: 'center',
            marginTop: scale(37),
          }}
        />
        <View style={{marginTop: scale(90)}}>
          <ActionButtons
            title={strings.THIS_SOUNDS_FUN}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            onClick={() => NavigationService.navigate('YourPitchVideoScreen')}
          />
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate('SkipCameraModal', {
                screenName: 'MakeYourPitchScreen',
              })
            }>
            <Text style={styles.notCameraReadyTextStyle}>
              {strings.NOT_CAMERA_READY_TEXT}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakeYourPitchScreen;
