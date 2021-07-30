import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import HeaderImageTitle from '../../components/atoms/HeaderImageTitle';
import strings from '../../theme/strings';
import {Colors, Fonts, Images} from '../../theme';
import Modal from 'react-native-modal';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SkipCameraModal = props => {
  const [showDialog, setShowDialog] = useState(false);
  const [screenName, setScreenName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setShowDialog(true);
    console.log('show dialog props......... ', props);
    if (props != undefined) {
      if (
        props.navigation.state != undefined &&
        props.navigation.state.params != undefined
      ) {
        setScreenName(props.navigation.state.params.screenName);
      }
    }
  }, []);

  //   useEffect(() => {
  //     console.log('show dialog ' + showDialog);
  //   }, [showDialog]);

  const goBackFunc = () => {
    setShowDialog(false);
    if (screenName === 'MakeYourPitchScreen') {
      NavigationService.navigate('MakeYourPitchScreen');
    } else if (screenName === 'SkipCameraModal') {
      NavigationService.navigate('UploadVideo');
    }
  };

  const goToNextScreen = () => {
    setShowDialog(false);
    NavigationService.navigate('OnboardingTransitionScreenThree');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderImageTitle />
      <View style={{paddingHorizontal: 50}}>
        <Text style={styles.headingTextStyle}>{strings.PITCH_BEST}</Text>
      </View>

      <Modal isVisible={showDialog} animationIn="slideInUp">
        <View style={styles.modalMainView}>
          <Text style={[styles.headingTextStyle, {marginTop: height / 12}]}>
            Are you sure?
          </Text>
          <View style={styles.bestConnectTextView}>
            <Text style={styles.bestconnectTextStyle}>
              The best connections are made when you include a photo or video
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => goBackFunc()}
              style={styles.goBackBtnStyle}>
              <Text style={styles.goBackTextStyle}>Go back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => goToNextScreen()}
              style={{alignSelf: 'center', marginTop: '5%'}}>
              <Text
                style={{
                  color: '#828282',
                  fontSize: 17,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                I'll do it later!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(SkipCameraModal);

const styles = StyleSheet.create({
  headingTextStyle: {
    fontSize: Fonts.size.size_30,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalMainView: {
    height: height / 2 + 100,
    backgroundColor: '#fff',
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '10%',
  },
  bestConnectTextView: {
    width: width / 2,
    alignSelf: 'center',
    marginTop: '13%',
  },
  bestconnectTextStyle: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackBtnStyle: {
    backgroundColor: '#8650FD',
    height: 40,
    width: '65%',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '22%',
  },
  goBackTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
