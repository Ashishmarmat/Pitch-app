import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import TextView from '../atoms/TextView';
import CustomTextInput from '../atoms/CustomTextInput';
import ActionButtons from '../atoms/Actionbutton';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import {Colors, Images} from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../atoms/Loader';

const localStyles = StyleSheet.create({
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyle: {
    marginLeft: -scale(30),
    width: scale(30),
    height: verticalScale(25),
  },
  textStyle: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: Colors.borderGrey,
    marginTop: verticalScale(7),
  },
  flex: {flex: 1},
});

interface ForgotPasswordScreenMoleculeProps {
  title: string;
  onChangePasswordClick?: () => void;
  onPasswordChange?: (str: string) => void;
  onConfirmPasswordChange?: (str: string) => void;
  showPasswordClick?: () => void;
  showConfirmPasswordClick?: () => void;
  canShowPassword: Boolean;
  canShowConfirmPassword: Boolean;
  loader: Boolean;
}

const defaultProps: ForgotPasswordScreenMoleculeProps = {
  title: '',
  onChangePasswordClick: () => {},
  onPasswordChange: () => {},
  onConfirmPasswordChange: () => {},
  showPasswordClick: () => {},
  showConfirmPasswordClick: () => {},
  canShowPassword: false,
  canShowConfirmPassword: false,
  loader: false,
};
const ForgotPasswordScreenMolecule = (
  props: ForgotPasswordScreenMoleculeProps,
) => (
  <KeyboardAwareScrollView
    style={localStyles.flex}
    contentContainerStyle={localStyles.flex}
    enableOnAndroid={true}
    enableAutomaticScroll={true}>
    <View style={styles.forgotPasswordScreenStyle}>
      <TextView
        text={strings.CREATE_YOUR_PASSWORD}
        style={styles.textForgotPasswordHeading}
      />

      <View
        style={[{marginTop: verticalScale(61)}, localStyles.textInputStyle]}>
        <CustomTextInput
          label={strings.CREATE_PASSWORD}
          placeholderTextColor={'#C4C4C4'}
          secureEntry={!props.canShowPassword}
          onChange={props.onPasswordChange}
        />
        {/* <TouchableOpacity
          style={localStyles.imageStyle}
          onPress={props.showPasswordClick}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{...localStyles.imageStyle, marginLeft: 0}}
            resizeMode={'center'}
            source={
              props.canShowPassword
                ? Images.ic_password
                : Images.ic_hide_password
            }
          />
        </TouchableOpacity> */}
      </View>

      <View
        style={[{marginTop: verticalScale(28)}, localStyles.textInputStyle]}>
        <CustomTextInput
          label={strings.CONFIRM_PASSWORD}
          placeholderTextColor={'#C4C4C4'}
          secureEntry={!props.canShowConfirmPassword}
          onChange={props.onConfirmPasswordChange}
        />
        {/* <TouchableOpacity
          style={localStyles.imageStyle}
          onPress={props.showConfirmPasswordClick}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{...localStyles.imageStyle, marginLeft: 0}}
            resizeMode={'center'}
            source={
              props.canShowPassword
                ? Images.ic_password
                : Images.ic_hide_password
            }
          />
        </TouchableOpacity> */}
      </View>

      <Text style={localStyles.textStyle}>{strings.BOTH_PASSWORD_MATCH}</Text>

      <ActionButtons
        onClick={props.onChangePasswordClick}
        title={strings.CHANGE_PASSWORD}
        buttonColor={Colors.actionButtonColor}
        textColor={Colors.white}
        borderColor={Colors.actionButtonColor}
        marginTop={verticalScale(39)}
      />
    </View>
    <Loader loader={props.loader} />
  </KeyboardAwareScrollView>
);

ForgotPasswordScreenMolecule.defaultProps = defaultProps;

export default ForgotPasswordScreenMolecule;
