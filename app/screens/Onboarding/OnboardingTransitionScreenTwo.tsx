import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import OnboardingMolecule from './Molecule/OnboardingMolecule';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import FabButton from '../../components/atoms/FabButton';
import {Colors, Images} from '../../theme';
import strings from '../../theme/strings';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cecece',
  },
});

const OnboardingTransitionScreenTwo = () => {
  return (
    <View style={localStyles.container}>
      <OnboardingMolecule />
      <View style={{flex: 5, position: 'absolute'}}>
        <Text style={styles.text1}>
          Feel free to answer more questions to help others get to know you
          better!
        </Text>
      </View>
      <View style={{flex: 1}}></View>
      <FabButton
        style={styles.fabStyle}
        onClick={() => {
          NavigationService.navigate('OnboardingTransitionScreenThree');
        }}
      />
    </View>
  );
};

export default OnboardingTransitionScreenTwo;

let styles = StyleSheet.create({
  text1: {
    width: scale(277),
    height: scale(200),
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 32,
    top: scale(50),
    color: '#FFFFFF',
  },
  text2: {
    width: scale(270),
    height: scale(54),
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
    left: 10,
    marginTop: scale(80),
    alignSelf: 'center',
    top: scale(100),
    color: '#FFFFFF',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
    backgroundColor: '#8653FB',
  },
});
