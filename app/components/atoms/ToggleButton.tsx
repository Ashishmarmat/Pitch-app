import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import ToggleSwitch from 'toggle-switch-react-native';

interface ToggleButtonProps {
  onOffValue: boolean;
  onClick?: () => void;
}

const defaultProps: ToggleButtonProps = {
  onOffValue: false,
  onClick: () => {},
};

const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <ToggleSwitch
      isOn={props.onOffValue}
      onColor="#34C759"
      offColor="rgba(120, 120, 128, 0.16)"
      label={null}
      labelStyle={{color: 'black', fontWeight: '900'}}
      trackOnStyle={{height: 28, width: 45}}
      trackOffStyle={{height: 28, width: 45}}
      thumbOnStyle={{height: 21, width: 19, borderRadius: 20 / 2}}
      thumbOffStyle={{height: 21, width: 19, borderRadius: 20 / 2}}
      size="medium"
      onToggle={props.onClick}
    />
  );
};
ToggleButton.defaultProps = defaultProps;
export default ToggleButton;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: scale(270),
    height: verticalScale(39),
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  socialButton: {width: 18, height: 21},
  textStyle: {color: Colors.borderGrey, fontSize: 16, fontWeight: 'bold'},
});
