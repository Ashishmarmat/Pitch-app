import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';

interface ActionButtonsProps {
  title: string;
  buttonColor: string;
  textColor: string;
  borderColor: string;
  onClick?: () => void;
  style: any;
  marginTop: number;
  disabled:boolean;
}

const defaultProps: ActionButtonsProps = {
  title: '',
  buttonColor: Colors.primary,
  textColor: Colors.white,
  borderColor: '',
  onClick: () => {},
  style: null,
  marginTop: 0,
};

const ActionButtons = (props: ActionButtonsProps) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      disabled={props.disabled}
      style={
        props.style
          ? props.style
          : {
              ...styles.buttonStyle,
              backgroundColor: props.buttonColor,
              borderColor: props.borderColor,
              marginTop: props.marginTop,
            }
      }>
      <Text style={{...styles.textColor, color: props.textColor}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

ActionButtons.defaultProps = defaultProps;

export default ActionButtons;

let styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.actionButtonColor,
    borderColor: Colors.actionButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    marginHorizontal: scale(30),
    height: verticalScale(40),
    borderWidth: 2,
    borderRadius: 10,
    width: scale(270),
    shadowOffset: {height: 2, width: 1},
  },
  textColor: {color: Colors.primary, fontSize: 16, fontWeight: 'bold'},
});
