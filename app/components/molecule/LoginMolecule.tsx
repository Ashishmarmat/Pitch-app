import React from 'react';
import {Text, View, Image, StyleSheet, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Colors, Images, Fonts} from '../../theme';
import CustomTextInput from '../atoms/CustomTextInput';
import SocialButtons from '../atoms/SocialButtons';
import ActionButtons from '../atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import CommonStyles from './CommonStyles';

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
  },
  forgotStyle: {
    color: Colors.borderGrey,
    marginTop: verticalScale(6),
  },
  clickHere: {
    color: Colors.primary,
    fontWeight: '500',
  },
  orStyle: {
    color: Colors.borderGrey,
    fontSize: 15,
    marginTop: verticalScale(36),
  },
});

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '881851114013-d1aahebmj1qsromam133lgv8e5bf14jb.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId:
    '881851114013-d1aahebmj1qsromam133lgv8e5bf14jb.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

async function onAppleButtonPress() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  console.log('appleAuth', appleAuth);
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
}

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

interface LoginProps {
  onPasswordChange?: (str: string) => void;
  onEmailChange?: (str: string) => void;
  onLoginClick?: () => void;
}

const defaultProps: LoginProps = {
  onPasswordChange: String,
  onEmailChange: String,
  onLoginClick: () => {},
};

const LoginMolecule = (props: LoginProps) => {
  // StatusBar.setBackgroundColor(Colors.white);

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

      <CustomTextInput
        label={strings.PASSWORD}
        secureEntry
        placeholderTextColor={'#C4C4C4'}
        marginTop={verticalScale(18)}
        onChange={props.onPasswordChange}
      />

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

      <Text style={localStyles.orStyle}>{strings.OR}</Text>

      <View style={{marginTop: verticalScale(27)}} />
      <SocialButtons
        onClick={() => signIn()}
        image={Images.googleicon}
        title={strings.SIGN_WITH_GOOGLE}
      />
      <View style={{marginTop: verticalScale(7)}} />

      <SocialButtons
        onClick={() => onAppleButtonPress()}
        image={Images.appleicon}
        title={strings.SIGN_WITH_APPLE}
      />

      <View style={localStyles.joinUsStyle}>
        <Text
          onPress={() => NavigationService.navigate('JoinUsScreen')}
          style={localStyles.textStyle}>
          {strings.DONT_HAVE_ACCOUNT}
          <Text style={localStyles.clickHere}>{strings.JOIN_US}</Text>
        </Text>
      </View>
    </View>
  </KeyboardAwareScrollView>;
};

LoginMolecule.defaultProps = defaultProps;

export default LoginMolecule;
