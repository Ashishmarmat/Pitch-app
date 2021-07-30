import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import OnboardingMolecule from './Molecule/OnboardingMolecule';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import FabButton from '../../components/atoms/FabButton';
import {Colors, Images} from '../../theme';
import strings from '../../theme/strings';
import AsyncStorage from '@react-native-community/async-storage';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(146, 123, 199, 0.46)',
  },
});

const OnboardingTransitionScreenFour = () => {
  const [isFirstName, setIsFirstName] = useState('');

  useEffect(() => {
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const first = await AsyncStorage.getItem('USER_FIRSTNAME');
    // const last = await AsyncStorage.getItem('USER_LASTNAME')
    // const firstLast = first + ' ' + last
    setIsFirstName(first);
  };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../../assets/images/FrontCover5.jpg')}>
      <View style={localStyles.container}>
        <OnboardingMolecule />
        <View style={{flex: 5, position: 'absolute'}}>
          <Text style={styles.text1}>Welcome,</Text>
          <Text style={styles.text2}>{isFirstName}!</Text>
        </View>
        <View style={{flex: 1}}></View>
        <FabButton
          enable={true}
          style={styles.fabStyle}
          onClick={() => {
            NavigationService.navigate('HomeScreen');
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default OnboardingTransitionScreenFour;

let styles = StyleSheet.create({
  text1: {
    width: scale(285),
    height: scale(36),
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 36,
    top: scale(120),
    textAlign: 'center',
    color: '#FFFFFF',
  },
  text2: {
    width: scale(285),
    height: scale(36),
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 36,
    marginTop: scale(50),
    textAlign: 'center',
    top: scale(80),
    color: '#FFFFFF',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
    backgroundColor: '#8653FB',
  },
});
