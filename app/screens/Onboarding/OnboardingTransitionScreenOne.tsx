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

const OnboardingTransitionScreenOne = () => {
  return (
    <View style={localStyles.container}>
      <OnboardingMolecule />
      <View style={{flex: 5, position: 'absolute'}}>
        <Text style={styles.text1}>
          Profiles with character lead to genuine conversations
        </Text>
        <Text style={styles.text2}>
          *Your answers may be displayed on your profile, you can decide which
          ones to show or hide later
        </Text>
      </View>
      <View style={{flex: 1}}></View>
      <FabButton
        enable={true}
        style={styles.fabStyle}
        onClick={() => {
          NavigationService.navigate('OnboardingTransitionScreenTwo');
        }}
      />
    </View>
  );
};

export default OnboardingTransitionScreenOne;

let styles = StyleSheet.create({
  text1: {
    width: scale(257),
    height: scale(123),
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 30,
    top: scale(40),
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
    top: scale(40),
    color: '#FFFFFF',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
    backgroundColor: '#8653FB',
  },
});
