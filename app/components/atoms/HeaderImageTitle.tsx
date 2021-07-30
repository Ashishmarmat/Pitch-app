import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import NavigationService from '../../services/NavigationService';

interface HeaderProps {
  title: string;
  onClick?: () => void;
  showBackButton: boolean;
}

const defaultProps: HeaderProps = {
  title: '',
  onClick: () => {},
  showBackButton: false,
};

const HeaderImageTitle = (props: HeaderProps) => (
  <View style={styles.logoViewStyle}>
    <TouchableOpacity onPress={() => NavigationService.goBack()}>
      <Image
        resizeMode={'contain'}
        source={Images.back_button}
        style={styles.iconStyle}
      />
    </TouchableOpacity>
    {props.title ? (
      <Text
        style={
          props.textColorWhite
            ? {...styles.textStyle, color: Colors.white}
            : styles.textStyle
        }>
        {props.title}
      </Text>
    ) : null}
  </View>
);

HeaderImageTitle.defaultProps = defaultProps;

export default HeaderImageTitle;

const styles = StyleSheet.create({
  logoViewStyle: {
    marginTop: verticalScale(57),
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  iconStyle: {
    width: scale(20),
    height: scale(20),
    marginLeft: scale(20),
  },
  textStyle: {
    color: Colors.headerProgressbarTextColor,
    marginRight: scale(40),
    textAlign: 'center',
  },
});
