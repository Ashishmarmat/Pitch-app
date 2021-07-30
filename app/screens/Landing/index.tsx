import React, {useEffect, useState} from 'react';
import LandingScreenMolecule from '../../components/molecule/LandingScreenMolecule';
import NavigationService from '../../services/NavigationService';
import login from '../../actions/LoginActions';
import {connect, useDispatch} from 'react-redux';
import {
  resendOtpSuccess,
  checkPhoneExistSuccess,
  verifyOtpSuccess,
} from '../../actions/SignUpAction';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, Alert} from 'react-native';
import {tokenAuth} from '../../utils/SendJSON';

// import firebase from '@react-native-firebase/app';
import messaging, {firebase} from '@react-native-firebase/messaging';

export default function LandingScreenComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const dispatch = useDispatch();

  // const requestUserPermission = async () => {
  //     /**
  //      * On iOS, messaging permission must be requested by
  //      * the current application before messages can be
  //      * received or sent
  //      */
  //     const authStatus = await messaging().requestPermission();
  //     console.log('Authorization status(authStatus):', authStatus);
  //     return (
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //     );
  //   };

  //   useEffect(() => {

  //     if (requestUserPermission()) {
  //       /**
  //        * Returns an FCM token for this device
  //        */
  //       messaging()
  //         .getToken()
  //         .then((fcmToken) => {
  //           Alert.alert('FCM Token ---------> ', fcmToken);
  //           AsyncStorage.setItem('FcmToken', fcmToken)
  //         });
  //     } else console.log('Not Authorization status:', );

  //   }, []);

  const userIDfunc = async () => {
    const USER_ID = await AsyncStorage.getItem('USER_ID');
    console.log('USER_ID', USER_ID);
    setUserId(USER_ID);
  };

  useEffect(() => {
    dispatch(resendOtpSuccess(''));
    dispatch(checkPhoneExistSuccess(''));
    // checkLoginFunc();
    dispatch(verifyOtpSuccess(''));
  }, []);

  // const checkLoginFunc = async () => {
  //   const data = await AsyncStorage.getItem('AutoLogin');
  //   const token = await AsyncStorage.getItem('Authorization');
  //   console.log('AutoLogin', data);
  //   setIsLoggedIn(data);
  //   dispatch(tokenAuth(token));
  // };

  // useEffect(() => {
  //   if (isLoggedIn != '' && isLoggedIn != undefined && isLoggedIn === '1') {
  //     setTimeout(() => {
  //       NavigationService.navigate('HomeScreen');
  //     }, 50);
  //   }
  // }, [isLoggedIn]);

  // console.log('isLoggedIn', isLoggedIn);

  return (
    <View style={{flex: 1}}>
      <LandingScreenMolecule
        onJoinUsClick={() => {
          console.log('Join us');
          NavigationService.navigate('JoinUsScreen'); //MakeYourPitchScreen //JoinUsScreen //UploadVideo
        }}
        onLoginClick={() => {
          console.log('Login');
          NavigationService.navigate('Login');
        }}
      />
    </View>
  );
}
