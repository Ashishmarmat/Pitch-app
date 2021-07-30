import React from 'react';
import {Image, StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';

const Logo = () => (
  <Image
    resizeMode={'contain'}
    source={require('../../../assets/images/logo_pitch.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: scale(256),
    height: verticalScale(98),
  },
});

export default Logo;
