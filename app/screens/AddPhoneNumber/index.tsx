import React, {useState, useEffect} from 'react';
import AddPhoneNumberMolecule from '../../components/molecule/AddPhoneNumberMolecule';
import NavigationService from '../../services/NavigationService';
import showToast from '../../utils/ShowToast';
import {
  resendOtpAct,
  checkPhoneExistApi,
  checkPhoneExistSuccess,
} from '../../actions/SignUpAction';
import * as CONST from '../../utils/Constants';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';

const AddPhoneScreen = props => {
  const OtpResData = useSelector(state => state.SignupReducer.otpData);
  const checkMobileExistRes = useSelector(
    state => state.SignupReducer.userEmailCheck,
  );
  console.log('OtpResData', OtpResData);
  console.log('checkMobileExistRes', checkMobileExistRes);
  const [value, setValue] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('value ' + value);
  }, [value]);

  console.log('props', props);

  const onSendClick = () => {
    if (value === '') {
      showToast(CONST.MSG_ENTER_VALID_PHONE);
    } else {
      dispatch(checkPhoneExistApi(phoneNumber));
    }
  };

  useEffect(() => {
    if(checkMobileExistRes && checkMobileExistRes.response_code === 200){
      dispatch(resendOtpAct(value));
      // createTwoButtonAlert()
    }
  }, [checkMobileExistRes]);

  const createTwoButtonAlert = () =>
    Alert.alert('OTP has been sent successfully', '', [
      {text: 'OK', onPress: () => goToNext()},
    ]);

  const goToNext = () => {
    dispatch(checkPhoneExistSuccess(''));
    NavigationService.navigate('VerifyPhoneScreen', {
      email: props.navigation.getParam('email'),
      name: props.navigation.getParam('name'),
      password: props.navigation.getParam('password'),
      signup_type: props.navigation.getParam('signup_type'),
      apple_user_id: props.navigation.getParam('apple_user_id'),
      mobile: value,
    });
  };

  useEffect(() => {
    if (OtpResData != undefined && OtpResData != '') {
      if (OtpResData.response_code === 200) {
        createTwoButtonAlert();
      } else if (OtpResData.response_code === 304) {
        Alert.alert(OtpResData.message);
      }
    }
  }, [OtpResData?.response_code]);

  return (
    <AddPhoneNumberMolecule
      onSendClick={() => {
        onSendClick();
      }}
      onChangeFormattedText={(text: string) => {
        setValue(text);
      }}
      phoneChange={(phone: string) => {
        setPhonenumber(phone);
      }}
      defaultValue={value}
    />
  );
};

const mapStateToProps = state => {
  console.log('state', state);
  return {};
};

export default connect(mapStateToProps, {
  resendOtpAct,
})(AddPhoneScreen);
