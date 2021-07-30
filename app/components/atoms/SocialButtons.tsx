import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';

interface SocialButtonsProps {
  title: string;
  image: number;
  onClick?: () => void;
}

const defaultProps: SocialButtonsProps = {
  title: '',
  image: 0,
  onClick: () => {},
};

const SocialButtons = (props: SocialButtonsProps) => {
  return (
    <TouchableOpacity onPress={props.onClick} style={styles.view}>
      <Image
        resizeMode={'contain'}
        source={props.image}
        style={styles.socialButton}
      />
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};
SocialButtons.defaultProps = defaultProps;
export default SocialButtons;

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
