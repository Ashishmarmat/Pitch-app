import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import {ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../../../services/NavigationService';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CircleComp = props => {
  console.log('props', props);

  return (
    <View style={{marginTop: 40}}>
      {props &&
        props.array.map((arrayItem, arrayIndex) => (
          <View key={arrayIndex}>
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 15 / 2,
                backgroundColor: '#ABABAB',
              }}></View>
            {arrayIndex !== props.array.length - 1 && (
              <View
                style={{
                  backgroundColor: '#ABABAB',
                  height: arrayItem.status ? height / 3 - 12 : height / 6 - 30,
                  width: 1,
                  alignSelf: 'center',
                }}></View>
            )}
          </View>
        ))}
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(CircleComp);

let styles = StyleSheet.create({
  container: {
    // marginTop:40,
  },
});
