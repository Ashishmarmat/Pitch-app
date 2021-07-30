import React, {createRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomTextInput from '../atoms/CustomTextInput';
import scale, {verticalScale} from '../../theme/scale';
import FabButton from '../atoms/FabButton';
import strings from '../../theme/strings';
import {Colors, Fonts, Metrics, Images} from '../../theme';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import CommonStyles from './CommonStyles';

let captchaForm = createRef();

interface SignupPasswordMoleculeProps {
  title: string;
  onPasswordChange?: (str: string) => void;
  isAgreed: boolean;
  onConfirmPasswordChange?: (str: string) => void;
  data: [{id: Number; value: String; isValid: Boolean}];
  useIsAgreed: () => void;
  onTermsClicked?: () => void;
  onNextClick?: () => void;
  isEnabled: boolean;
}

const defaultProps: SignupPasswordMoleculeProps = {
  title: '',
  onPasswordChange: String,
  isAgreed: false,
  onConfirmPasswordChange: String,
  data: [{id: 0, value: '', isValid: false}],
  useIsAgreed: () => {},
  onTermsClicked: () => {},
  onNextClick: () => {},
  isEnabled: false,
};

const SignupPasswordMolecule = (props: SignupPasswordMoleculeProps) => {
  const [filldata, setFillData] = useState(false);
  useEffect(() => {
    setFillData(false);
  }, []);

  const onMessage = event => {
    console.log('event', event);
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        captchaForm.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          captchaForm.hide();
          setFillData(true);
          // do what ever you want here
        }, 1500);
      }
    }
  };
  console.log('filldata', filldata);

  const [hidePassword, sethidePassword] = useState(true);
  const [hidePasswordConf, sethidePasswordConf] = useState(true);

  const managePasswordVisibility = () => {
    if (hidePassword === true) {
      sethidePassword(!hidePassword);
    } else {
      sethidePassword(!hidePassword);
    }
  };

  const managePasswordConfVisibility = () => {
    if (hidePasswordConf === true) {
      sethidePasswordConf(!hidePasswordConf);
    } else {
      sethidePasswordConf(!hidePasswordConf);
    }
  };

  console.log('props', props);

  return (
    <View style={CommonStyles.flex}>
      <KeyboardAwareScrollView
        style={CommonStyles.flex}
        contentContainerStyle={Platform.OS === 'ios' && CommonStyles.flex}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}>
        <View style={styles.containerStyle}>
          <Image
            resizeMode={'contain'}
            style={styles.logoStyle}
            source={require('../../../assets/images/logo_pitch_dot.png')}
          />
          {/* <CustomTextInput
          label={strings.CREATE_PASSWORD}
          secureEntry={true}
          onChange={props.onPasswordChange}
          marginTop={verticalScale(76)}
        /> */}
          <View
            style={
              props.style ? props.style : {...styles.button, marginTop: 76}
            }>
            <TextInput
              editable={props.editable}
              secureTextEntry={hidePassword}
              placeholder={strings.CREATE_PASSWORD}
              placeholderTextColor={props.placeholderTextColor}
              onChangeText={props.onPasswordChange}
              multiline={props.multiline}
              placeholderTextColor={'#C4C4C4'}
              textAlignVertical="top"
              style={{
                width: scale(210),
              }}
            />
            <TouchableOpacity
              style={{
                width: scale(28),
                height: scale(18),
              }}
              onPress={managePasswordVisibility}>
              {!hidePassword ? (
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/ClossEyeImg.png')}
                  style={styles.passwordIconView}
                />
              ) : (
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/eyeImg.png')}
                  style={styles.passwordIconView}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.listContainerStyle}>
            <FlatList
              data={props.data}
              renderItem={({item}) => (
                <View
                  style={
                    item.isValid
                      ? styles.listItemContainer
                      : styles.listItemContainerChecked
                  }>
                  {item.isValid ? (
                    <Image
                      resizeMode={'contain'}
                      style={styles.checkedStyle}
                      source={require('../../../assets/images/ic_green_check.png')}
                    />
                  ) : null}
                  <Text style={styles.listText}>{item.value}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>

          {/* <CustomTextInput
          label={strings.CONFIRM_PASSWORD}
          secureEntry={true}
          onChange={props.onConfirmPasswordChange}
          marginTop={verticalScale(53)}
        /> */}
          <View
            style={
              props.style ? props.style : {...styles.button, marginTop: 53}
            }>
            <TextInput
              editable={props.editable}
              secureTextEntry={hidePasswordConf}
              placeholder={strings.CONFIRM_PASSWORD}
              placeholderTextColor={props.placeholderTextColor}
              onChangeText={props.onConfirmPasswordChange}
              multiline={props.multiline}
              placeholderTextColor={'#C4C4C4'}
              textAlignVertical="top"
              style={{
                width: scale(210),
              }}
            />
            <TouchableOpacity
              style={{
                width: scale(28),
                height: scale(18),
              }}
              onPress={managePasswordConfVisibility}>
              {!hidePasswordConf ? (
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/ClossEyeImg.png')}
                  style={styles.passwordIconView}
                />
              ) : (
                <Image
                  resizeMode={'contain'}
                  source={require('../../../assets/images/eyeImg.png')}
                  style={styles.passwordIconView}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            eslint-disable-next-line
            no-undef
            onPress={() => captchaForm.show()}
            style={{...styles.termsContainer, marginTop: verticalScale(56)}}>
            <Image
              resizeMode={'contain'}
              source={
                filldata
                  ? require('../../../assets/images/ic_checked.png')
                  : require('../../../assets/images/rectangle.png')
              }
              style={styles.checkButtonStyle}
            />
            <Text style={styles.agreeTextStyle}> {strings.NOT_A_ROBOT}</Text>

            <Image
              resizeMode={'contain'}
              source={require('../../../assets/images/ic_captcha.png')}
              style={styles.captchaStyle}
            />
          </TouchableOpacity>

          <View
            style={{...styles.termsContainer, marginTop: verticalScale(11)}}>
            <TouchableOpacity onPress={props.useIsAgreed}>
              <Image
                resizeMode={'contain'}
                source={
                  props.isAgreed
                    ? require('../../../assets/images/ic_checked.png')
                    : require('../../../assets/images/rectangle.png')
                }
                style={[styles.checkButtonStyle]}
              />
            </TouchableOpacity>
            <Text style={styles.agreeTextStyle}>
              {' '}
              {strings.I_AM_AGREE}
              <Text onPress={props.onTermsClicked} style={styles.styleTerms}>
                {''}
                {strings.TERMS_CONDITIONS}
              </Text>{' '}
            </Text>
          </View>
        </View>

        <ConfirmGoogleCaptcha
          // eslint-disable-next-line no-undef
          ref={(_ref: {show: () => void} | null) => (captchaForm = _ref)}
          // siteKey={'6LfH7nIaAAAAAEgbcYkQz0wbmUFHs2R79lRj0EsC'}
          siteKey={'6LeDXPEaAAAAAOEOSDo-4lkVHU3TV5e3tf-5AhCe'}
          baseUrl={'http://3.140.234.233/pitch/apiV1'}
          languageCode="en"
          onMessage={onMessage}
        />
      </KeyboardAwareScrollView>
      {/* <FabButton onClick={props.onNextClick} enable={props.isEnabled} /> */}
      <View
        style={{
          right: scale(20),
          bottom: scale(20),
          position: 'absolute',
        }}>
        <TouchableOpacity
          disabled={props.isEnabled ? false : true}
          onPress={props.onNextClick}>
          <Image
            resizeMode={'contain'}
            source={props.isEnabled ? Images.fab_enable : Images.fab_disable}
            style={{
              width: scale(55),
              height: scale(55),
              marginRight: scale(10),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

SignupPasswordMolecule.defaultProps = defaultProps;

export default SignupPasswordMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  contanerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },

  styleTerms: {
    color: Colors.termsColorBlue,
    fontFamily: Fonts.fontName.GibsonBold,
    fontSize: 14,
  },
  agreeTextStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_15,
    fontFamily: Fonts.fontName.GibsonBold,
  },
  logoStyle: {
    width: scale(179),
    height: verticalScale(69),
    marginTop: verticalScale(108),
  },
  checkButtonStyle: {
    marginHorizontal: 5,
    width: scale(14),
    height: scale(14),
  },
  termsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    padding: scale(8),
    alignItems: 'center',
    width: scale(270),
    height: verticalScale(43),
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: scale(10),
  },
  touchableStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: scale(10),
  },
  joinUsView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(28),
  },
  listStyle: {
    width: scale(250),
    paddingHorizontal: scale(15),
    marginTop: scale(3),
  },
  styleNotRobotContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  listContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(49),
    width: '75%',
    alignSelf: 'center',
    marginVertical: verticalScale(14),
  },
  subHeadingStyle: {
    color: Colors.primary,
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.fontName.GibsonBold,
    marginTop: scale(15),
  },
  checkedStyle: {
    width: scale(30),
    height: scale(30),
  },
  listText: {
    fontSize: Fonts.size.size_13,
    color: Colors.grayText,
    paddingHorizontal: scale(4),
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listItemContainer: {
    margin: scale(3),
    backgroundColor: Colors.lighGray,
    borderRadius: scale(10),
    marginVertical: scale(3),
    height: scale(26),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    paddingHorizontal: scale(3.5),
  },
  listItemContainerChecked: {
    margin: scale(3),
    backgroundColor: Colors.lighGray,
    borderRadius: scale(10),
    marginVertical: scale(3),
    height: scale(26),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: scale(7),
  },
  captchaStyle: {
    width: scale(28),
    height: scale(28),
    marginLeft: scale(88),
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(50),
    marginRight: scale(26),
  },
  passwordIconView: {
    width: scale(26),
    height: scale(16),
    resizeMode: 'contain',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    width: scale(270),
    height: verticalScale(45),
    borderRadius: 10,
  },
});
