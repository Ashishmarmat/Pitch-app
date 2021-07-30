import React, { useState, useEffect } from 'react';
import WorkMolecule from '../../components/molecule/WorkMolecule';
import NavigationService from '../../services/NavigationService';
import Validators from '../../utils/Validators';
import { userSignUpAct } from '../../actions/SignUpAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { signUpSuccess } from '../../actions/SignUpAction';
const SchoolScreen = props => {
  console.log('propssssss', props.userSignupSuccess);

  const singUpResData = useSelector(state => state.SignupReducer.userSignUpInfo);

  console.log("singUpResData", singUpResData)

  const [isNotEmpty, setEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const dispatch = useDispatch();
  console.log('data', data);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (singUpResData && singUpResData.status) {
      if (singUpResData.status === 1) {
        setIsLoading(false);
        NavigationService.navigateAndReset('MakeYourPitchScreen');
      }
    }
  }, [singUpResData]);

  const checkToken = async () => {
    const fcm = await AsyncStorage.getItem('FcmToken');
    console.log('fcm', fcm);
    setFcmToken(fcm);
  };

  const onNextClick = () => {
    if (isNotEmpty) {
      let params = {
        full_name: props.navigation.getParam('name'),
        email: props.navigation.getParam('email'),
        password: props.navigation.getParam('password'),
        phone: props.navigation.getParam('mobile'),
        dob: props.navigation.getParam('dob'),
        city: props.navigation.getParam('city'),
        state: props.navigation.getParam('state'),
        country: props.navigation.getParam('country'),
        work: props.navigation.getParam('work'),
        job_title: props.navigation.getParam('job'),
        pronoun: props.navigation.getParam('pronoun'),
        signup_type: props.navigation.getParam('signup_type'),
        apple_user_id: props.navigation.getParam('apple_user_id'),
        last_school: data,
        device_id: fcmToken,
      };
      setIsLoading(true)
      dispatch(userSignUpAct(params));
      console.log('paramsparams', params);

      // NavigationService.navigate('MakeYourPitchScreen', {
      //   ...props,
      //   school: data,
      // });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WorkMolecule
        screenType={'school'}
        onTextChange={str => {
          setData(str);
          setEmpty(!Validators.isEmpty(str));
        }}
        onNextClick={() => {
          onNextClick();
        }}
        isEnable={isNotEmpty}
      />

      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000050',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  userSignUpAct,
})(SchoolScreen);
