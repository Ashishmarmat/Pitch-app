import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Colors, Images, Fonts} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import SocialButtons from '../../components/atoms/SocialButtons';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import CommonStyles from '../../components/molecule/CommonStyles';
import Loader from '../../components/atoms/Loader';
import {socialLogin, appleLoginApi} from '../../actions/SignUpAction';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const localStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImageStyle: {
    width: scale(179),
    height: verticalScale(69),
    marginTop: verticalScale(108),
    // tintColor: Colors.primary,
  },
  headerTextStyle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: verticalScale(54),
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(18),
    backgroundColor: Colors.lighGray,
    width: scale(270),
    height: verticalScale(45),
    borderRadius: 10,
  },
  forgotPasswordStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(12),
  },
  subViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(15),
  },
  socialViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
  },
  joinUsStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scale(10),
    marginTop: verticalScale(90),
  },
  textStyle: {
    fontSize: 15,
    color: Colors.borderGrey,
    marginTop: 5,
    fontWeight: '400',
    lineHeight: 15,
  },
  forgotStyle: {
    color: Colors.borderGrey,
    marginTop: verticalScale(8),
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 15,
  },
  clickHere: {
    color: '#4AC4E0', //Colors.termsColorBlue,
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 15,
  },
  joinusText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 15,
    fontFamily: Fonts.fontName.GibsonBold,
  },
  orStyle: {
    color: Colors.borderGrey,
    fontSize: 15,
    // marginTop: verticalScale(36),
    alignSelf: 'center',
    marginHorizontal: 30,
  },
});

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '739769856006-2gli3v89tubag4njqs1pe4e9v8s7fv67.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '739769856006-2gli3v89tubag4njqs1pe4e9v8s7fv67.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

interface LoginProps {
  onPasswordChange?: (str: string) => void;
  onEmailChange?: (str: string) => void;
  onLoginClick?: () => void;
  loading: boolean;
}

const defaultProps: LoginProps = {
  onPasswordChange: String,
  onEmailChange: String,
  onLoginClick: () => {},
  loading: false,
};

const LandingScreenComponent = (props: LoginProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const fcm = await AsyncStorage.getItem('FcmToken');
    console.log('fcm', fcm);
    setFcmToken(fcm);
  };

  const managePasswordVisibility = () => {
    if (hidePassword === true) {
      sethidePassword(!hidePassword);
    } else {
      sethidePassword(!hidePassword);
    }
  };

  const signIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'userInfo');
      const sendData = {
        email: userInfo.user.email,
        name: userInfo.user.givenName + ' ' + userInfo.user.familyName,
        password: '',
        signup_type: 'google',
        device_id: fcmToken,
      };
      dispatch(socialLogin(sendData));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setIsLoading(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setIsLoading(false);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setIsLoading(false);
        // play services not available or outdated
      } else {
        setIsLoading(false);
        // some other error happened
      }
    }
  };

  async function onAppleButtonPress() {
    console.log('onAppleButtonPress');
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log('credentialState', credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const sendData = {
        apple_user_id: appleAuthRequestResponse.user,
        email: appleAuthRequestResponse.email,
        name:
          appleAuthRequestResponse.fullName.givenName +
          appleAuthRequestResponse.fullName.familyName,
        password: '',
        signup_type: 'apple',
        device_id: fcmToken,
      };
      dispatch(appleLoginApi(sendData));
    }
  }

  return (
    <KeyboardAwareScrollView
      style={CommonStyles.flex}
      contentContainerStyle={Platform.OS === 'ios' && CommonStyles.flex}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}>
      <View style={localStyles.containerStyle}>
        <View style={localStyles.viewStyle}>
          <Image
            resizeMode={'contain'}
            style={localStyles.headerImageStyle}
            source={Images.logo_dot}
          />
          <Text style={localStyles.headerTextStyle}>
            {strings.READY_TO_PITCH}
          </Text>
        </View>

        <CustomTextInput
          label={strings.EMAIL}
          secureEntry={false}
          placeholderTextColor={'#C4C4C4'}
          marginTop={verticalScale(50)}
          onChange={props.onEmailChange}
        />

        {/* <CustomTextInput
          label={strings.PASSWORD}
          secureEntry
          placeholderTextColor={'#C4C4C4'}
          marginTop={verticalScale(18)}
          onChange={props.onPasswordChange}
        /> */}

        <View
          style={[{marginTop: verticalScale(61)}, localStyles.textInputStyle]}>
          <TextInput
            editable={props.editable}
            secureTextEntry={hidePassword}
            placeholder={strings.PASSWORD}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={props.onPasswordChange}
            multiline={props.multiline}
            placeholderTextColor={'#C4C4C4'}
            textAlignVertical="top"
            // onSubmitEditing={props.onLoginClick}
            style={{
              width: scale(210),
            }}
          />
          <TouchableOpacity
            style={{
              width: scale(28),
              height: scale(18),
              marginLeft: 20,
            }}
            onPress={managePasswordVisibility}>
            {!hidePassword ? (
              <Image
                resizeMode={'contain'}
                source={require('../../../assets/images/ClossEyeImg.png')}
                style={{
                  width: scale(26),
                  height: scale(16),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                resizeMode={'contain'}
                source={require('../../../assets/images/eyeImg.png')}
                style={{
                  width: scale(26),
                  height: scale(16),
                  resizeMode: 'contain',
                }}
              />
            )}
          </TouchableOpacity>
        </View>

        <ActionButtons
          title={strings.LOG_IN}
          buttonColor={Colors.actionButtonColor}
          textColor={Colors.white}
          borderColor={Colors.actionButtonColor}
          marginTop={verticalScale(22)}
          onClick={props.onLoginClick}
        />

        <Text style={localStyles.forgotStyle}>
          {strings.FORGOT_YOUR_PASSWORD}
          <Text
            onPress={() => NavigationService.navigate('ForgotPassword')}
            style={localStyles.clickHere}>
            {strings.CLICK_HERE}
          </Text>
        </Text>
        <View
          style={{
            marginTop: 36,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              height: 1,
              borderRightWidth: 90,
              borderColor: '#E5E5E5',
              alignSelf: 'center',
            }}
          />
          <Text style={localStyles.orStyle}>{strings.OR}</Text>
          <View
            style={{
              height: 1,
              borderRightWidth: 90,
              borderColor: '#E5E5E5',
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={{marginTop: verticalScale(27)}} />
        <TouchableOpacity onPress={() => signIn()}>
          <Image
            source={require('../../../assets/images/googleLogin.png')}
            style={{
              width: scale(270),
              height: verticalScale(39),
            }}
          />
        </TouchableOpacity>
        {/* <SocialButtons
          onClick={() => signIn()}
          image={Images.googleicon}
          title={strings.SIGN_WITH_GOOGLE}
        /> */}
        <View style={{marginTop: verticalScale(9)}} />

        <TouchableOpacity onPress={() => onAppleButtonPress()}>
          <Image
            source={require('../../../assets/images/appleLogin.png')}
            style={{
              width: scale(270),
              height: verticalScale(39),
            }}
          />
        </TouchableOpacity>
        {/* <SocialButtons
          onClick={() => onAppleButtonPress()}
          image={Images.appleicon}
          title={strings.SIGN_WITH_APPLE}
        /> */}

        <View style={localStyles.joinUsStyle}>
          <Text
            onPress={() => NavigationService.navigate('JoinUsScreen')}
            style={localStyles.textStyle}>
            {strings.DONT_HAVE_ACCOUNT}
            <Text style={localStyles.joinusText}>{strings.JOIN_US}</Text>
          </Text>
        </View>
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
        {/* <Loader loader={props.loading} /> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

LandingScreenComponent.defaultProps = defaultProps;

export default LandingScreenComponent;
