import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../atoms/Logo';
import TextView from '../atoms/TextView';
import ActionButtons from '../atoms/Actionbutton';
import strings from '../../theme/strings';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Fonts} from '../../theme';

interface LandingScreenMoleculeProps {
  title: string;
  onLoginClick?: () => void;
  onJoinUsClick?: () => void;
}

const defaultProps: LandingScreenMoleculeProps = {
  title: '',
  onLoginClick: () => {},
  onJoinUsClick: () => {},
};

const LandingScreenMolecule = (props: LandingScreenMoleculeProps) => (
  <View style={styles.landingScreenStyle}>
    <StatusBar backgroundColor={Colors.primary} />
    <Logo />
    <TextView
      text={strings.LANDING_PAGE_TITLE}
      color={Colors.white}
      style={styles.text}
    />

    <ActionButtons
      title={strings.LOG_IN}
      buttonColor={Colors.white}
      textColor={Colors.actionButtonColor}
      borderColor={Colors.white}
      onClick={props.onLoginClick}
      marginTop={verticalScale(46)}
    />

    <ActionButtons
      onClick={props.onJoinUsClick}
      title={strings.JOIN_US}
      buttonColor={Colors.actionButtonColor}
      textColor={Colors.white}
      borderColor={Colors.white}
      marginTop={verticalScale(26)}
    />
  </View>
);

LandingScreenMolecule.defaultProps = defaultProps;

export default LandingScreenMolecule;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingScreenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  forgotPasswordScreenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Fonts.size.size_20,
    alignContent: 'center',
    lineHeight: scale(20),
    marginTop: verticalScale(26),
    color: 'rgba(255, 255, 255, 0.9)', //Colors.white,
    fontFamily: Fonts.fontName.GibsonRegular,
    fontWeight: 'normal',
  },
  textForgotPasswordHeading: {
    fontSize: Fonts.size.size_20,
    alignContent: 'center',
    lineHeight: 30,
    color: '#8653FB',
    fontWeight: 'bold',
    fontFamily: Fonts.fontName.GibsonRegular,
  },
});
