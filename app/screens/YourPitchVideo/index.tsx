import React from 'react';
import YourPitchVideoComponent from './YourPitchVideoComponent';
import {View} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';

const YourPitchVideoScreen = () => {
  return (
    <View style={CommonStyles.flex}>
      <YourPitchVideoComponent />
    </View>
  );
};

export default YourPitchVideoScreen;
