import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import TextView from '../atoms/TextView';
import CustomTextInput from '../atoms/CustomTextInput';
import ActionButtons from '../atoms/Actionbutton';
import strings from '../../theme/strings';
import {Colors} from '../../theme';
import {verticalScale} from '../../theme/scale';
import CommonStyles from './CommonStyles';
import Loader from '../atoms/Loader';
import HeaderImageTitle from '../atoms/HeaderImageTitle';

interface ForgotPasswordScreenMoleculeProps {
  title: string;
  onSendInsctructionClick?: () => void;
  onEmailChange?: (str: String) => void;
  loader: boolean;
}

const defaultProps: ForgotPasswordScreenMoleculeProps = {
  title: '',
  onSendInsctructionClick: () => {},
  onEmailChange: String,
  loader: false,
};
const ForgotPasswordScreenMolecule = (
  props: ForgotPasswordScreenMoleculeProps,
) => (
  <KeyboardAwareScrollView
    style={CommonStyles.flex}
    contentContainerStyle={CommonStyles.flex}
    enableOnAndroid={true}
    enableAutomaticScroll={true}>
    <HeaderImageTitle />
    <View style={styles.forgotPasswordScreenStyle}>
      <TextView
        text={strings.FORGOT_PASSWORD}
        style={styles.textForgotPasswordHeading}
      />

      <TextView
        text={strings.FORGOT_PASSWORD_SCREEN_TEXT}
        style={styles.textForgotPasswordBody}
      />

      <CustomTextInput
        label={strings.EMAIL}
        secureEntry={false}
        placeholderTextColor={'#C4C4C4'}
        marginTop={verticalScale(44)}
        onChange={props.onEmailChange}
      />

      <ActionButtons
        onClick={props.onSendInsctructionClick}
        title={strings.SEND_INSTRUCTIONS}
        buttonColor={Colors.actionButtonColor}
        textColor={Colors.white}
        borderColor={Colors.actionButtonColor}
        marginTop={verticalScale(20)}
      />
      {/* <Loader loader={props.loader} /> */}
    </View>
  </KeyboardAwareScrollView>
);

ForgotPasswordScreenMolecule.defaultProps = defaultProps;

export default ForgotPasswordScreenMolecule;
