import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Images} from '../../theme';
import scale from '../../theme/scale';
import {Image} from 'react-native-elements';

interface LazyLoaderProps {
  title: string;
  uriImg: string;
  enable: boolean;
  onClick?: () => void;
  style: any;
}

const defaultProps: LazyLoaderProps = {
  title: '',
  uriImg: '',
  enable: false,
  onClick: () => {},
  style: null,
};

const LazyLoader = (props: LazyLoaderProps) => (
  // console.log("LazyLoaderProps",props),
  <View>
    <Image
      resizeMode={'contain'}
      source={{uri: props.uriImg}}
      style={props.style != null ? props.style : styles.imgStyle}
      PlaceholderContent={<ActivityIndicator />}
    />
  </View>
);

LazyLoader.defaultProps = defaultProps;

export default LazyLoader;

const styles = StyleSheet.create({
  button: {
    right: scale(20),
    bottom: scale(20),
    position: 'absolute',
  },
  imgStyle: {
    width: scale(35),
    height: scale(35),
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
