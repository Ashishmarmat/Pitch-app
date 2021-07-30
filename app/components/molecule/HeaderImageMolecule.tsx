import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import AppHeader from '../atoms/AppHeader';

interface HeaderImageMoleculeProps {
  logo: any;
  heading: string;
  subHeading: string;
  progress: number;
  showBackButton: boolean;
  internalPadding: number;
}

const defaultProps: HeaderImageMoleculeProps = {
  logo: null,
  heading: '',
  subHeading: '',
  progress: 1,
  showBackButton: false,
  internalPadding: 0,
};
const HeaderImageMolecule = (props: HeaderImageMoleculeProps) => (
  <View>
    <AppHeader progress={props.progress} />
    <View style={styles.styleLowerContainer}>
      <Image
        resizeMode={'contain'}
        source={props.logo}
        style={styles.logoStyle}
      />
      <Text style={styles.titleStyle}>{props.heading}</Text>
      {props.subHeading ? (
        <Text style={styles.subtitleStyle}>{props.subHeading}</Text>
      ) : null}
    </View>
  </View>
);

HeaderImageMolecule.defaultProps = defaultProps;

export default HeaderImageMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  styleLowerContainer: {
    alignItems: 'center',
    marginTop: verticalScale(35),
    paddingHorizontal: verticalScale(53),
    justifyContent: 'flex-end',
  },
  logoStyle: {
    width: scale(56),
    height: scale(56),
  },

  titleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: verticalScale(22),
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.fontName.GibsonBold,
    fontWeight: '700',
  },

  subtitleStyle: {
    color: Colors.borderGrey,
    fontSize: Fonts.size.size_15,
    marginTop: verticalScale(19),
    fontFamily: Fonts.fontName.GibsonRegular,
  },
});
