import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import OnboardingMolecule from './Molecule/OnboardingMolecule';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import {Colors, Fonts, Images} from '../../theme';
import strings from '../../theme/strings';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cecece',
  },
});

const OnboardingTransitionScreen = ({...props}) => {
  console.log('Onboarding props', props);
  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../../assets/images/FrontCover1.jpg')}>
      <View
        style={[
          localStyles.container,
          {backgroundColor: 'rgba(134, 83, 251, 0.34)'},
        ]}>
        <OnboardingMolecule />
        <View style={{flex: 5, top: '10%'}}>
          <Text style={styles.text1}>Let’s get to know you!</Text>
          <Text style={styles.text2}>
          Tell us about yourself to create more meaningful connections!
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ActionButtons
            title={'Continue'}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            marginTop={verticalScale(22)}
            onClick={() => {
              NavigationService.navigate('LocationScreen', {
                email: props.navigation.getParam('email'),
                name: props.navigation.getParam('name'),
                password: props.navigation.getParam('password'),
                mobile: props.navigation.getParam('mobile'),
                signup_type: props.navigation.getParam('signup_type'),
                apple_user_id: props.navigation.getParam('apple_user_id'),
              });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingTransitionScreen;

let styles = StyleSheet.create({
  text1: {
    width: scale(280),
    height: scale(80),
    fontWeight: 'bold',
    fontSize: scale(36),
    lineHeight: 40,
    top: '28%',
    left:'3%',
    color: '#FFFFFF',
    fontFamily:Fonts.fontName.GibsonRegular
  },
  text2: {
    width: scale(233),
    height: scale(54),
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
    left:'3%',
    marginTop: scale(111),
    top: scale(100),
    color: '#FFFFFF',
    fontFamily:Fonts.fontName.GibsonRegular
  },
});
