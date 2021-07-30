import React from 'react';
import {View, StyleSheet} from 'react-native';
import OnboardingMolecule from './Molecule/OnboardingMolecule';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Onboarding = () => {
  return (
    <View style={localStyles.container}>
      <OnboardingMolecule />
    </View>
  );
};

export default Onboarding;
