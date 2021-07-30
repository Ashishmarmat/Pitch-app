import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Images} from '../../theme';
import scale from '../../theme/scale';

interface FabButtonProps {
  title: string;
  type: string;
  enable: boolean;
  onClick?: () => void;
  style: any;
}

const defaultProps: FabButtonProps = {
  title: '',
  type: 'border',
  enable: false,
  onClick: () => {},
  style: null,
};

const FabButton = (props: FabButtonProps) => (
  console.log('FabProps', props),
  (
    <View style={styles.button}>
      <TouchableOpacity onPress={props.onClick}>
        <Image
          resizeMode={'contain'}
          source={props.enable ? Images.fab_enable : Images.fab_disable}
          style={styles.imgStyle}
        />
      </TouchableOpacity>
    </View>
  )
);

FabButton.defaultProps = defaultProps;

export default FabButton;

const styles = StyleSheet.create({
  button: {
    right: scale(20),
    bottom: scale(20),
    position: 'absolute',
  },
  imgStyle: {width: scale(55), height: scale(55), marginRight: scale(10)},
});
