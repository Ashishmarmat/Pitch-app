import React from 'react';
import {Text, View, Image, Platform, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtons from '../atoms/Actionbutton';
import PhoneInput from 'react-native-phone-number-input';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import {Colors, Fonts, Images} from '../../theme';
import CommonStyles from './CommonStyles';
interface AddPhoneMoleculeProps {
  phoneChange?: (str: string) => void;
  onChangeFormattedText?: (str: string) => void;
  onSendClick?: () => void;
  defaultValue: String;
}

const defaultProps: AddPhoneMoleculeProps = {
  phoneChange: String,
  onChangeFormattedText: String,
  onSendClick: () => {},
  defaultValue: '',
};

const AddPhoneMolecule = (props: AddPhoneMoleculeProps) => (
  <KeyboardAwareScrollView
    style={CommonStyles.flex}
    contentContainerStyle={Platform.OS === 'ios' && CommonStyles.flex}
    enableOnAndroid={true}
    enableAutomaticScroll={Platform.OS === 'ios'}>
    <View style={styles.containerStyle}>
      <Image
        resizeMode={'contain'}
        style={styles.logoStyle}
        source={Images.logo_dot}
      />

      <Image
        resizeMode={'contain'}
        style={styles.imgStyle}
        source={Images.purpleDot}
      />
      <Text style={styles.subHeadingStyle}>{strings.ENTER_NUMBER}</Text>

      <PhoneInput
        ref={props.phoneRef}
        defaultValue={props.defaultValue}
        defaultCode="US"
        layout="first"
        onChangeText={props.phoneChange}
        onChangeFormattedText={props.onChangeFormattedText}
        withDarkTheme
        withShadow
        autoFocus
        containerStyle={styles.inputViewStyle}
        textInputStyle={{backgroundColor: Colors.lighGray}}
        textContainerStyle={{backgroundColor: Colors.lighGray}}
      />

      <Text style={styles.labelStyle}>{strings.DONT_WORRY_YOUR}</Text>

      <ActionButtons
        title={strings.SEND_CODE}
        buttonColor={Colors.primary}
        textColor={Colors.white}
        borderColor={Colors.primary}
        marginTop={verticalScale(100)}
        onClick={props.onSendClick}
      />
    </View>
  </KeyboardAwareScrollView>
);

AddPhoneMolecule.defaultProps = defaultProps;

export default AddPhoneMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  imgStyle: {
    width: scale(170),
    height: scale(202),
    marginTop: verticalScale(38),
    marginBottom: scale(10),
  },
  labelStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_17,
    marginTop: verticalScale(31),
    marginHorizontal: scale(53),
    textAlign: 'center',
  },
  logoStyle: {
    width: scale(179),
    height: verticalScale(69),
    marginTop: verticalScale(108),
  },
  inputViewStyle: {
    backgroundColor: Colors.lighGray,
    width: scale(270),
    marginTop: verticalScale(18),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  subHeadingStyle: {
    color: Colors.grayText,
    fontSize: Fonts.size.size_17,
    fontFamily: Fonts.fontName.GibsonRegular,
    marginTop: scale(10),
  },
});
