import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import EnterCode from './EnterCodeComponent';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';
import * as CONST from '../../utils/Constants';
import {EmailverifyOTP} from '../../actions/VerifyOTPActions';
import showToast from '../../utils/ShowToast';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, Fonts, Images} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import NavigationService from '../../services/NavigationService';

const EnterCodeScreen = props => {

  const AuthRes = useSelector(state => state);
  console.log("AuthRes",AuthRes);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("......props", props);
    if(props && props.navigation){
      if(props.navigation.state.params){
        setToken(props.navigation.state.params.auth)
      }
    }
    AsyncStorage.getItem(CONST.USER_EMAIL).then(userEmail => {
      setEmail(userEmail);
    });
  }, [email]);

  console.log('email', email);
  console.log('finalOtp', otp);

  const goback = () => {
    NavigationService.goBack();
  };

  return (
    <View style={CommonStyles.flex}>
      <TouchableOpacity
        style={{marginTop: 80}}
        onPress={
          () => goback()
          //  NavigationService.goBack()
        }>
        <Image
          resizeMode={'contain'}
          source={Images.back_button}
          style={{
            width: scale(20),
            height: scale(20),
            marginLeft: scale(20),
          }}
        />
      </TouchableOpacity>
      <EnterCode
        title={email}
        onVerifyClick={() => {
          if (otp.length !== 4 || otp === '0000') {
            showToast(CONST.MSG_ENTER_VALID_OTP);
          } else {
            dispatch(EmailverifyOTP({otp, token}));
          }
        }}
        onPasswordChange={str => {
          setOtp(str);
        }}
        loader={props.loader}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    error: state.ForgotPasswordReducer.error,
    data: state.ForgotPasswordReducer.data,
    loader: state.ForgotPasswordReducer.loader,
  };
};

const mapDispatchToProps = dispatch => ({
  verifyOTPCall: params => {
    dispatch(EmailverifyOTP(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterCodeScreen);
