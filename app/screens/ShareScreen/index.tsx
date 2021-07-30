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
  ActivityIndicator,
} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import shareMoments from '../../actions/ShareMoments';
import RNHeicConverter from 'react-native-heic-converter';
import showToast from '../../utils/ShowToast';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ShareScreen = props => {
  const [showDialog, setShowDialog] = useState(true);
  const [screenName, setScreenName] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [uiRender, setUiRender] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setShowDialog(true);
      console.log('show dialog props......... ', props);
      getTokenFunc();
      if (props != undefined) {
        if (
          props.navigation.state != undefined &&
          props.navigation.state.params != undefined
        ) {
          setScreenName(props.navigation.state.params.screenName);
        }
      }
    }, []),
  );

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  const openLibraryFunc = () => {
    let heicName = '';
    ImagePicker.openPicker({
      mediaType: 'any',
      width: 1000,
      height: 1000,
      cropping: false,
    })
      .then(response => {
        console.log('photo or video response', response);
        if (
          response.filename.endsWith('.heic') ||
          response.filename.endsWith('.HEIC')
        ) {
          RNHeicConverter.convert({
            // options
            path: response.sourceURL,
          }).then(result => {
            console.log('result', result); // { success: true, path: "path/to/jpg", error, base64, }
            const sendData = {
              filename: response.filename,
              sourceURL: result.path,
              mime: response.mime,
            };
            sharedMomentAdd(sendData);
          });
        } else {
          const sendData = {
            filename: response.filename,
            sourceURL: response.sourceURL,
            mime: response.mime,
          };
          sharedMomentAdd(sendData);
        }
      })
      .catch(err => {
        console.log('kjgasyjfjdhsjkwdbkjadb', err);
        setShowDialog(false);
        NavigationService.navigateAndReset('HomeScreen');
      });
  };

  const sharedMomentAdd = imageResponse => {
    setIsLoading(true);
    console.log('profileImageUpload', imageResponse);
    var data = new FormData();
    data.append('tags', 'aaaa');
    data.append('image', {
      uri: imageResponse.sourceURL,
      // uri: imageResponse.path,
      type: imageResponse.mime,
      name: imageResponse.filename,
    });
    fetch('http://3.140.234.233/pitch/apiV1/addShareMoment', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
        version: '1',
      },
    })
      .then(res => res.json())
      .then(async res => {
        console.log('uploadImage res', res);
        setIsLoading(false);
        if (res.status) {
          setUiRender(!uiRender);
          dispatch(shareMoments());
          setShowDialog(false);
          NavigationService.navigateAndReset('HomeScreen');
        } else {
          console.log(res.message);
        }
      })
      .catch(e => {
        showToast('No Internet Connection');
        console.log(e);
        setIsLoading(false);
      });
  };

  const openCameraFunc = () => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      cropping: false,
    })
      .then(response => {
        console.log('camera response', response);
        const abc = response.path.split('/');
        const def = abc[abc.length - 1];
        console.log('pathh', def);
        const imageResponse = {
          sourceURL: response.path,
          mime: response.mime,
          filename: def,
        };
        sharedMomentAdd(imageResponse);
      })
      .catch(err => {
        console.log('kjgasyjfjdhsjkwdbkjadb', err);
        setShowDialog(false);
        NavigationService.navigateAndReset('HomeScreen');
      });
  };

  const goToNextScreen = () => {
    setShowDialog(false);
    NavigationService.navigateAndReset('HomeScreen');
  };

  const closeModal = () => {
    setShowDialog(false);
    NavigationService.navigate('AnswerPrompt');
  };

  const closeModal1 = () => {
    // setShowDialog(false)
    openLibraryFunc();
  };

  const closeModal2 = () => {
    // setShowDialog(false)
    openCameraFunc();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Modal isVisible={showDialog} animationIn="slideInUp">
        <View style={styles.modalMainView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: '600',
                fontFamily: Fonts.fontName.GibsonBold,
              }}>
              Share
            </Text>
            <TouchableOpacity onPress={() => goToNextScreen()}>
              <Image
                source={require('../../../assets/images/crossImage.png')}
                style={{height: 18, width: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={() => closeModal()}>
              <Image
                source={require('../../../assets/images/AnswePrompt.png')}
                style={{height: 105, width: 105, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeModal1()}>
              <Image
                source={require('../../../assets/images/UploadPhoto.png')}
                style={{height: 105, width: 105, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeModal2()}>
              <Image
                source={require('../../../assets/images/TakePhoto.png')}
                style={{height: 108, width: 108, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isloading ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <View>
              <ActivityIndicator size="large" color="grey" />
            </View>
          </View>
        ) : null}
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ShareScreen);

const styles = StyleSheet.create({
  headingTextStyle: {
    fontSize: Fonts.size.size_30,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalMainView: {
    height: height / 2 - 130,
    backgroundColor: '#fff',
    width: width,
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: '-8%',
    paddingTop: 15,
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
