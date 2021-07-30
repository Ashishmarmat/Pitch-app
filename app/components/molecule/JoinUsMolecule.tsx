import React from 'react';
import ActionButtons from '../atoms/Actionbutton';
import {Text, View, Image, Platform, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import {Colors, Fonts} from '../../theme';
import CommonStyles from './CommonStyles';
interface JoinUsMoleculeProps {
  title: string;
  onFullNameChange?: (str: string) => void;
  onEmailChange?: (str: string) => void;
  onJoinUsClick?: () => void;
}

const defaultProps: JoinUsMoleculeProps = {
  title: '',
  onFullNameChange: String,
  onEmailChange: String,
  onJoinUsClick: () => {},
};

const JoinUsMolecule = (props: JoinUsMoleculeProps) => (
  <KeyboardAwareScrollView
    style={CommonStyles.flex}
    contentContainerStyle={Platform.OS === 'ios' && CommonStyles.flex}
    enableOnAndroid={true}
    enableAutomaticScroll={Platform.OS === 'ios'}>
    <View style={styles.contanerStyle}>
      <Image
        resizeMode={'contain'}
        style={styles.logoStyle}
        source={require('../../../assets/images/logo_pitch_dot.png')}
      />
      <Text style={styles.subHeadingStyle}>{strings.JOIN_US_SUB_HEADING}</Text>

      <CustomTextInput
        label={strings.FULL_NAME}
        secureEntry={false}
        placeholderTextColor={'#C4C4C4'}
        onChange={props.onFullNameChange}
        marginTop={verticalScale(45)}
      />

      <CustomTextInput
        label={strings.EMAIL_ADDRESS}
        secureEntry={false}
        placeholderTextColor={'#C4C4C4'}
        onChange={props.onEmailChange}
        marginTop={verticalScale(28)}
      />

      <ActionButtons
        title={strings.JOIN_US}
        buttonColor={Colors.primary}
        textColor={Colors.white}
        borderColor={Colors.primary}
        marginTop={verticalScale(47)}
        onClick={props.onJoinUsClick}
      />
    </View>
  </KeyboardAwareScrollView>
);

JoinUsMolecule.defaultProps = defaultProps;

export default JoinUsMolecule;

let styles = StyleSheet.create({
  contanerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  logoStyle: {
    width: scale(179),
    height: verticalScale(69),
    marginTop: verticalScale(108),
  },
  joinUsView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(28),
  },
  inputViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(45),
  },
  subHeadingStyle: {
    color: Colors.primary,
    fontSize: 22,
    fontFamily: Fonts.fontName.GibsonRegular,
    marginTop: verticalScale(57),
  },
});
