import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View, Alert} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';
import * as CONST from '../../utils/Constants';
import showToast from '../../utils/ShowToast';
import AsyncStorage from '@react-native-community/async-storage';
import VerifyPhoneMolecule from '../../components/molecule/VerifyPhoneMolecule';
import NavigationService from '../../services/NavigationService';
import {
  verifyOtpAct,
  resendOtpAct,
  verifyOtpSuccess,
  resendOtpSuccess,
} from '../../actions/SignUpAction';

const VerifyPhoneScreen = props => {
  const VerifyResData = useSelector(state => state.SignupReducer.verifyData);
  const otpDataData = useSelector(state => state.SignupReducer.otpData);

  console.log('otpDataData', otpDataData);

  const [email, setEmail] = useState('');
  const [finalOtp, setOtp] = useState('');
  const [checkOtp, setCheckotp] = useState('');

  const dispatch = useDispatch();

  const onClickSendOTP = () => {
    dispatch(resendOtpAct(props.navigation.getParam('mobile')));
  };

  useEffect(() => {
    AsyncStorage.getItem(CONST.USER_EMAIL).then(userEmail => {
      setEmail(userEmail);
    });
  }, [email]);

  useEffect(() => {
    if (otpDataData != undefined && otpDataData.data != undefined) {
      setCheckotp(otpDataData.data.otp);
    }
  }, [otpDataData]);

  useEffect(() => {
    if (VerifyResData != undefined && VerifyResData != '') {
      if (VerifyResData.response_code === 200) {
        createTwoButtonAlert();
      } else if (VerifyResData.response_code === 304) {
        Alert.alert(VerifyResData.message);
        createTwoButtonAlert();
      }
    }
  }, [VerifyResData]);

  const createTwoButtonAlert = () =>
    Alert.alert('OTP Verified Successfully', '', [
      {text: 'OK', onPress: () => goToNext()},
    ]);

  const goToNext = () => {
    dispatch(verifyOtpSuccess(''));
    dispatch(resendOtpSuccess(''));
    NavigationService.navigate('LocationScreen', {
      email: props.navigation.getParam('email'),
      name: props.navigation.getParam('name'),
      password: props.navigation.getParam('password'),
      mobile: props.navigation.getParam('mobile'),
      signup_type: props.navigation.getParam('signup_type'),
    });
  };
  console.log('finalOtp', Number(finalOtp));
  console.log('checkOtp', checkOtp);
  const codeFilledOnPress1 = () => {
    console.log('code', code);
    if (finalOtp.length !== 4 || finalOtp !== '0000') {
      //Number(finalOtp) !== checkOtp
      showToast(CONST.MSG_ENTER_VALID_OTP);
    } else {
      NavigationService.navigate('OnboardingTransitionScreen', {
        email: props.navigation.getParam('email'),
        name: props.navigation.getParam('name'),
        password: props.navigation.getParam('password'),
        mobile: props.navigation.getParam('mobile'),
        signup_type: props.navigation.getParam('signup_type'),
        apple_user_id: props.navigation.getParam('apple_user_id'),
      });
    }
  };

  return (
    <View style={CommonStyles.flex}>
      <VerifyPhoneMolecule
        title={props.navigation.getParam('mobile')}
        onClickSendOTP={() => onClickSendOTP()}
        // codeFilledOnPress={() => codeFilledOnPress1()}
        onVerifyClick={() => {
          if (finalOtp.length !== 4 || Number(finalOtp) !== checkOtp) {
            
            showToast(CONST.MSG_ENTER_VALID_OTP);
          } 
          else {
            NavigationService.navigate('OnboardingTransitionScreen', {
              email: props.navigation.getParam('email'),
              name: props.navigation.getParam('name'),
              password: props.navigation.getParam('password'),
              mobile: props.navigation.getParam('mobile'),
              signup_type: props.navigation.getParam('signup_type'),
              apple_user_id: props.navigation.getParam('apple_user_id'),
            });
          }
        }}
        onPasswordChange={str => {
          setOtp(str);
        }}
      />
    </View>
  );
};

const mapStateToProps = state => {
  console.log('Verify state', state);
  return {
    error: state.ForgotPasswordReducer.error,
    data: state.ForgotPasswordReducer.data,
  };
};

export default connect(mapStateToProps, {
  verifyOtpAct,
  resendOtpAct,
})(VerifyPhoneScreen);
