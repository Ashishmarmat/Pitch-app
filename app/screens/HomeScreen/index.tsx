import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import BottomTabbar from '../BottomTabbar';
import {Colors, Images} from '../../theme';
import NavigationService from '../../services/NavigationService';

const HomeScreen = ({navigation}) => {
  // console.log("Call",navigation)

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* <View style={{flex:11}}> 
                 <Text style={{alignSelf:'center',marginTop:100}}> Home Screen</Text>
            </View> */}

      <BottomTabbar />
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(HomeScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
