import React, {useEffect, useState} from 'react';
import {StatusBar, Alert} from 'react-native';
import Validators from '../../utils/Validators';
import JoinUsMolecule from '../../components/molecule/JoinUsMolecule';
import NavigationService from '../../services/NavigationService';
import showToast from '../../utils/ShowToast';
import * as CONST from '../../utils/Constants';
import {connect, useDispatch} from 'react-redux';
import {checkEmailApi} from '../../actions/SignUpAction';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';

export default function JoinUsScreenComponent() {
  const dispatch = useDispatch();

  let [email, onEmailChange] = useState('');
  let [name, onNameChange] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  // StatusBar.setBackgroundColor('white');
  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(fcmToken => {
          // Alert.alert('FCM Login screen ---------> ', fcmToken);
          AsyncStorage.setItem('FcmToken', fcmToken);
          setFcmToken(fcmToken);
        });
    } else console.log('Not Authorization status:');
  }, []);

  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const validateAndSubmit = () => {
    // NavigationService.navigate('ProfileScreen', {});
    if (Validators.isEmpty(name)) {
      showToast(CONST.MSG_ENTER_VALID_NAME);
    } else if (!Validators.validEmail(email)) {
      showToast(CONST.MSG_ENTER_VALID_EMAIL);
    } else {
      const sendData = {
        email: email,
        name: name,
        signup_type: 'normal',
      };
      dispatch(checkEmailApi(sendData));
      // NavigationService.navigate('CreateSignupPassword', {email, name});
    }
  };

  return (
    <JoinUsMolecule
      onEmailChange={(str: string) => {
        console.log('Email Text-' + str);
        console.log('Email valid-' + Validators.validEmail(str));

        onEmailChange(str);
      }}
      onFullNameChange={(str: string) => {
        console.log('Fullname Text-' + str);
        onNameChange(str);
      }}
      onJoinUsClick={() => {
        console.log('Join us click');
        //TODO : Need to add the action to move to the next screen.
        validateAndSubmit();
      }}
    />
  );
}
