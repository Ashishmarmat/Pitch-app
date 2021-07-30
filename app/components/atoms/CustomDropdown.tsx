import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Colors, Metrics} from '../../theme';
import ModalDropdown from 'react-native-modal-dropdown-deprecated-support';
import scale, {verticalScale} from '../../theme/scale';

interface CustomDropdownProps {}

const defaultProps: CustomDropdownProps = {};

const CustomDropdown = (props: CustomDropdownProps) => {
  return (
    <ModalDropdown
      defaultValue={props.label}
      style={[styles.containerStyle, props.containerStyle]}
      textStyle={[styles.textStyle, props.textStyle]}
      dropdownStyle={styles.dropdownStyle}
      renderRow={option => (
        <View style={styles.dropdownViewStyle}>
          <Text style={styles.nameStyle}>{option.name}</Text>
        </View>
      )}
      renderButtonText={rowData => rowData.name}
      onSelect={(index, value) => props.onSelect(index, value)}
      disabled={props.disabled}
      options={props.options}
    />
  );
};

CustomDropdown.defaultProps = defaultProps;

export default CustomDropdown;
let styles = StyleSheet.create({
  nameStyle: {
    fontSize: 15,
  },
  containerStyle: {
    flex: 1,
    marginTop: verticalScale(22),
    width: '100%',
    backgroundColor: Colors.lighGray,
    justifyContent: 'center',
    height: verticalScale(39),
    borderRadius: scale(10),
  },
  textStyle: {
    color: Colors.grayText,
    width: '100%',
    paddingHorizontal: Metrics.paddingHorizontal10,
    fontSize: 14,
  },
  dropdownStyle: {
    width: '72%',
    justifyContent: 'center',
  },
  dropdownViewStyle: {
    height: scale(40),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
  },
});
