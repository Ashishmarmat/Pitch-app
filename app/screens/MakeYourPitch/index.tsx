import React from 'react';
import MakeYourPitchComponent from './MakeYourPitchComponent';
import {View} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';

const MakeYourPitchScreen = () => {
  return (
    <View style={CommonStyles.flex}>
      <MakeYourPitchComponent />
    </View>
  );
};

export default MakeYourPitchScreen;
