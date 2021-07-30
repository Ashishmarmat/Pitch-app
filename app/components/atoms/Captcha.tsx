import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

interface CaptchaButtonProps {
  title: string;
  image: number;
}

const defaultProps: CaptchaButtonProps = {
  title: '',
  image: 0,
};

const CaptchaButton = (props: CaptchaButtonProps) => {
  return (
    <TouchableOpacity style={styles.containerStyle}>
      <Image resizeMode={'center'} source={props.image} style={styles.logo} />
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

CaptchaButton.defaultProps = defaultProps;
export default CaptchaButton;
let styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 310,
    height: 39,
    borderColor: Colors.borderGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  logo: {
    width: 18,
    height: 21,
  },
  textStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_16,
    fontWeight: 'bold',
  },
});
