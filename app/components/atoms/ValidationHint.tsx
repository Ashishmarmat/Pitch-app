import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../theme';

interface CustomTextInputProps {
  label: string;
  isValid: boolean;
}

const defaultProps: CustomTextInputProps = {
  label: 'Email',
  isValid: false,
};
const CustomTextInput = (props: CustomTextInputProps) => {
  return <Text style={styles.view}>{props.label}</Text>;
};
CustomTextInput.defaultProps = defaultProps;
export default CustomTextInput;

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    backgroundColor: Colors.greyEnterPhone,
    width: 310,
    height: 39,
    borderRadius: 10,
  },
});
