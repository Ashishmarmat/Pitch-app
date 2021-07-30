import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import OnboardingMolecule from './Molecule/OnboardingMolecule';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import {Colors, Images} from '../../theme';
import strings from '../../theme/strings';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 83, 251, 0.34)',
  },
});

const Onboarding = () => {
  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../../assets/images/FrontCover1.jpg')}>
      <View style={localStyles.container}>
        <OnboardingMolecule />
        <View style={{flex: 5, top: '10%'}}>
          <Text style={styles.text1}>Let’s get to know you!</Text>
          <Text style={styles.text2}>
            Tell us about yourself to create more meaningful connections!
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ActionButtons
            title={strings.CONTINUE}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            marginTop={verticalScale(22)}
            onClick={() => {
              NavigationService.navigate('LocationScreen');
              // NavigationService.navigate('LocationScreen', {
              //     email: props.navigation.getParam('email'),
              //     name: props.navigation.getParam('name'),
              //     password: props.navigation.getParam('password'),
              //     mobile: props.navigation.getParam('mobile'),
              //   });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Onboarding;

let styles = StyleSheet.create({
  text1: {
    width: scale(206),
    height: scale(80),
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 39,
    top: scale(100),
    color: '#FFFFFF',
  },
  text2: {
    width: scale(233),
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
});
