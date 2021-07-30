import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import MyProgressBar from './MyProgressBar';
import {Colors, Images} from '../../theme';
import NavigationService from '../../services/NavigationService';

interface HeaderProps {
  title: string;
  type: string;
  onBackClick?: () => void;
  showBackButton: boolean;
  progress: number;
  handleBackPress: boolean;
  textColorWhite: boolean;
  showProgressBar: true;
}

const defaultProps: HeaderProps = {
  title: '',
  type: 'border',
  onBackClick: () => {},
  showBackButton: true,
  progress: 0,
  handleBackPress: true,
  textColorWhite: false,
  showProgressBar: true,
};

const AppHeader = (props: HeaderProps) => (
  <View style={styles.logoViewStyle}>
    {props.showBackButton ? (
      <TouchableOpacity
        onPress={
          props.handleBackPress
            ? () => NavigationService.goBack()
            : props.onBackClick
        }>
        <Image
          resizeMode={'contain'}
          source={Images.back_button}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.iconStyle} />
    )}

    {/* {props.showProgressBar ? (
      <View style={styles.progressViewStyle}>
        <MyProgressBar
          progress={props.progress / 100}
          style={styles.progressBar}
          width={scale(260)}
        />
        <Text
          style={
            props.textColorWhite
              ? {...styles.textStyle, color: Colors.white}
              : styles.textStyle
          }>
          {props.progress}%
        </Text>
      </View>
    ) : null} */}
  </View>
);

AppHeader.defaultProps = defaultProps;

export default AppHeader;

const styles = StyleSheet.create({
  logoViewStyle: {
    marginTop: verticalScale(57),
    justifyContent: 'flex-start',
  },
  progressViewStyle: {
    marginHorizontal: scale(52),
    justifyContent: 'flex-start',
  },
  iconStyle: {
    width: scale(20),
    height: scale(20),
    marginLeft: scale(20),
  },
  progressBar: {
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  textStyle: {
    color: Colors.headerProgressbarTextColor,
    marginTop: scale(5),
  },
});
