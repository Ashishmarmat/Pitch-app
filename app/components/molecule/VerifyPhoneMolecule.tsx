import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Fonts} from '../../theme';
import ActionButtons from '../../components/atoms/Actionbutton';
import scale, {verticalScale} from '../../theme/scale';
import NavigationService from '../../services/NavigationService';
import strings from '../../theme/strings';
//import OTPTextInput from 'react-native-otp-textinput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(53),
  },
  titleViewStyle: {
    alignItems: 'center',
    marginTop: verticalScale(36),
    justifyContent: 'flex-end',
  },
  titleText: {
    color: Colors.primary,
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.fontName.GibsonRegular,
    fontWeight: 'bold',
  },
  textStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_17,
    marginTop: verticalScale(32),
    fontFamily: Fonts.fontName.GibsonRegular,
    fontWeight: 'normal',
    lineHeight: 17,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: verticalScale(45),
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 10,
    color: '#828282',
    fontSize: 17,
    fontWeight: 'normal',
  },
  buttonViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(53),
  },
  textInputLocalStyle: {
    shadowColor: Colors.borderGrey,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.textInputColor,
    width: scale(37),
    height: verticalScale(39),
    borderWidth: 0.5,
    borderRadius: 10,
    fontSize: Fonts.size.size_15,
  },
  logoStyle: {
    width: scale(179),
    height: verticalScale(69),
    marginTop: verticalScale(108),
    alignSelf: 'center',
  },
});

interface LoginProps {
  title: string;
  onVerifyClick?: () => void;
  codeFilledOnPress?: () => void;
  onPasswordChange?: (str: string) => void;
}

const defaultProps: LoginProps = {
  title: '',
  onVerifyClick: () => {},
  codeFilledOnPress: () => {},
  onPasswordChange: String,
};
const VerifyPhoneMolecule = (props: LoginProps) => {
  console.log('verify props', props);
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <View style={localStyles.container}>
        <Image
          resizeMode={'contain'}
          style={localStyles.logoStyle}
          source={require('../../../assets/images/logo_pitch_dot.png')}
        />
        <View style={localStyles.titleViewStyle}>
          <Text style={localStyles.titleText}>{strings.VERIFY_CODE}</Text>
          <Text style={localStyles.textStyle}>
            Enter code sent to
            <Text style={{color: '#828282'}}>
              {props.mobile} {props.title}
            </Text>
          </Text>
        </View>
        <View>
          {/* <OTPTextInput
            handleTextChange={props.onPasswordChange}
            containerStyle={localStyles.textInputStyle}
            textInputStyle={localStyles.textInputLocalStyle}
            tintColor={Colors.borderGrey}
          /> */}
          <OTPInputView
            style={{width: '100%', height: 200}}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={localStyles.textInputStyle}
            codeInputHighlightStyle={{borderColor: '#c4c4c4'}}
            onCodeChanged={props.onPasswordChange}
            onCodeFilled={() => props.codeFilledOnPress()}
          />
        </View>

        <View style={localStyles.buttonViewStyle}>
          <ActionButtons
            onClick={props.onVerifyClick}
            title={strings.VERIFY}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
          />
        </View>
        <TouchableOpacity
          style={localStyles.buttonViewStyle}
          onPress={() => props.onClickSendOTP()}>
          <Text
            style={{
              color: Colors.textColor,
              fontSize: Fonts.size.size_15,
              textDecorationLine: 'underline',
              top: -16,
              fontWeight: '600',
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
VerifyPhoneMolecule.defaultProps = defaultProps;
export default VerifyPhoneMolecule;
