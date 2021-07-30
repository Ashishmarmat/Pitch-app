import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import LoginComponent from './LoginComponent';
import {View, Alert} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';
import login from '../../actions/LoginActions';
import Validators from '../../utils/Validators';
import showToast from '../../utils/ShowToast';
import * as CONST from '../../utils/Constants';
import NavigationService from '../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';

const LandingScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (requestUserPermission()) {
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then(fcmToken => {
          //  console.log('FCM Login screen ---------> ', fcmToken);
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

  return (
    <View style={CommonStyles.flex}>
      <LoginComponent
        onEmailChange={str => {
          setEmail(str.trim());
        }}
        onPasswordChange={str => {
          setPassword(str);
        }}
        onLoginClick={() => {
          // NavigationService.navigate('HomeScreen')
          if (!Validators.validEmail(email)) {
            showToast(CONST.MSG_ENTER_VALID_EMAIL);
          } else if (
            Validators.isEmpty(password) ||
            !Validators.validPassword(password)
          ) {
            showToast(CONST.MSG_ENTER_VALID_PASSWORD);
          } else {
            dispatch(login({email, password, fcmToken}));
            // NavigationService.navigate('HomeScreen')
          }
        }}
        loading={props.loading}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    error: state.LoginReducer.error,
    data: state.LoginReducer.data,
    loading: state.LoginReducer.loaderValue,
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: params => {
    dispatch(login(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
