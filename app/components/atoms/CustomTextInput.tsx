import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';

interface CustomTextInputProps {
  label: string;
  placeholderTextColor: string;
  secureEntry: boolean;
  onChange: (str: string) => String;
  onFocus: (str: string) => String;
  style: any;
  multiline: boolean;
  marginTop: number;
  editable: boolean;
}

const defaultProps: CustomTextInputProps = {
  label: 'Email',
  placeholderTextColor: '',
  secureEntry: false,
  onChange: () => '',
  onFocus: () => '',
  style: null,
  multiline: false,
  marginTop: 0,
  editable: true,
};
const CustomTextInput = (props: CustomTextInputProps) => {
  return (
    <TextInput
      editable={props.editable}
      secureTextEntry={props.secureEntry}
      placeholder={props.label}
      placeholderTextColor={props.placeholderTextColor}
      onChangeText={props.onChange}
      onFocus={props.onFocus}
      value={props.value}
      style={
        props.style
          ? props.style
          : {...styles.button, marginTop: props.marginTop}
      }
      multiline={props.multiline}
      textAlignVertical="top"
    />
  );
};
CustomTextInput.defaultProps = defaultProps;
export default CustomTextInput;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    width: scale(270),
    height: verticalScale(45),
    borderRadius: 10,
  },
});
