import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Fonts} from '../../theme';
import ActionButtons from '../../components/atoms/Actionbutton';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import OTPTextInput from 'react-native-otp-textinput';
import Loader from '../../components/atoms/Loader';
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: scale(53),
  },
  titleViewStyle: {
    alignItems: 'center',
    marginTop: verticalScale(151),
    justifyContent: 'flex-end',
  },
  titleText: {
    color: Colors.primary,
    fontSize: Fonts.size.size_20,
    fontWeight: 'bold',
  },
  textStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_15,
    marginTop: verticalScale(32),
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: verticalScale(45),
  },
  buttonViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(91),
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
});

interface LoginProps {
  title: string;
  onVerifyClick?: () => void;
  onPasswordChange?: (str: string) => void;
  loader: boolean;
}

const defaultProps: LoginProps = {
  title: '',
  onVerifyClick: () => {},
  onPasswordChange: String,
  loader: false,
};
const EnterCcdeComponent = (props: LoginProps) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <View style={localStyles.container}>
        <View style={localStyles.titleViewStyle}>
          <Text style={localStyles.titleText}>{strings.ENTER_CODE}</Text>
          <Text style={localStyles.textStyle}>
            {strings.ENTER_CODE_EMAIL}
            {props.title}
          </Text>
        </View>
        <View>
          <OTPTextInput
            handleTextChange={props.onPasswordChange}
            containerStyle={localStyles.textInputStyle}
            textInputStyle={localStyles.textInputLocalStyle}
            tintColor={Colors.borderGrey}
          />
        </View>

        {/* <View style={localStyles.buttonViewStyle}>
          <Text style={{color: Colors.textColor, fontSize: Fonts.size.size_15}}>
            Resend Code 60s
          </Text>
        </View> */}

        <View style={localStyles.buttonViewStyle}>
          <ActionButtons
            onClick={props.onVerifyClick}
            title={strings.VERIFY}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
          />
        </View>
        <Loader loader={props.loader} />
      </View>
    </KeyboardAwareScrollView>
  );
};
EnterCcdeComponent.defaultProps = defaultProps;
export default EnterCcdeComponent;
