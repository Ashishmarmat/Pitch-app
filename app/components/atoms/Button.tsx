import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface ButtonProps {
  title: string;
  type: string;
  onClick?: () => void;
}

const defaultProps: ButtonProps = {
  title: '',
  type: 'border',
  onClick: () => {},
};

const Button = (props: ButtonProps) => (
  <TouchableOpacity
    onPress={props.onClick}
    style={
      props.type === 'border'
        ? styles.appButtonContainerBodred
        : styles.appButtonContainer
    }>
    <Text
      style={
        props.type === 'border'
          ? styles.appButtonTextBorder
          : styles.appButtonText
      }>
      {props.title}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = defaultProps;

export default Button;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#8653FB',
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainerBodred: {
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 30,
    borderColor: '#8653FB',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  appButtonTextBorder: {
    fontSize: 18,
    color: '#8653FB',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
