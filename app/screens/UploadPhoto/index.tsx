import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import UploadPhotoMolecule from '../../components/molecule/UploadPhotoMolecule';
import NavigationService from '../../services/NavigationService';
import * as ImagePicker from 'react-native-image-picker';
import {uploadMedia} from '../../actions/UploadMediaActions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, Images} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import showToast from '../../utils/ShowToast';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const UploadPhoto = props => {
  const [ImageResponse, setResponse] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstName, setIsFirstName] = useState('');
  const [isShowButton, setIsShowButton] = useState(false);
  const [uploadRes, setUploadRes] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getTokenFunc();
    setIsShowButton(false);
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    const first = await AsyncStorage.getItem('USER_FIRSTNAME');
    const last = await AsyncStorage.getItem('USER_LASTNAME');
    const firstLast = last != null ? first + ' ' + last : first;
    setToken(asdwer);
    setIsFirstName(first);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openCameraFunc = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          setModalVisible(!isModalVisible);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setModalVisible(!isModalVisible);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setModalVisible(!isModalVisible);
          Alert.alert(response.customButton);
        } else {
          console.log('response', JSON.stringify(response));
          setProfilePic(response.uri);
          setModalVisible(!isModalVisible);
          setUploadRes(response);
          setIsShowButton(true);
          toggleModal();
          // profileImageUpload(response);
        }
      },
    );
  };

  const openLibraryFunc = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        maxHeight: 1000,
        maxWidth: 1000,
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setModalVisible(!isModalVisible);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setModalVisible(!isModalVisible);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        setModalVisible(!isModalVisible);
        Alert.alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        setModalVisible(!isModalVisible);
        setProfilePic(response.uri);
        setUploadRes(response);
        setIsShowButton(true);
        toggleModal();
        // profileImageUpload(response);
      }
    });
  };

  console.log('asdwer', profilePic);

  const profileImageUpload = imageResponse => {
    console.log('imageResponse', imageResponse);
    if (profilePic === '') {
      showToast('Please select profile image');
    } else {
      setIsLoading(true);
      var data = new FormData();
      data.append('profile_pic', {
        uri: imageResponse.uri,
        type: imageResponse.type,
        name: imageResponse.fileName,
      });
      fetch('http://3.140.234.233/pitch/apiV1/upload_profile_photo', {
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
          setIsLoading(false);
          console.log('uploadImage res', res);
          if (res.status) {
            setProfilePic(res.data.profile_file);
            NavigationService.navigate('OnboardingTransitionScreenThree');
          } else {
            console.log(res.message);
          }
        })
        .catch(e => {
          showToast('No Internet Connection');
          console.log(e);
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    console.log('show dialog ' + showDialog);
  }, [showDialog]);

  return (
    <View style={{flex: 1}}>
      <UploadPhotoMolecule
        onSkipClick={() => {
          //TODO: Open modal to show alert SkipCameraModal ///OnboardingTransitionScreenThree
          // setShowDialog(!showDialog);
          NavigationService.navigate('SkipCameraModal', {
            screenName: 'SkipCameraModal',
          });
        }}
        onBtnClick={() => {
          profileImageUpload(uploadRes);
        }}
        type={'photo'}
        imageUrl={profilePic}
        name={isFirstName}
        showDialog={showDialog}
        onRecordClick={() => toggleModal()}
        isEnabled={isShowButton}
      />
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000050',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        </View>
      ) : null}

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.modalMainView}>
          <TouchableOpacity
            onPress={() => openLibraryFunc()}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#EBEBEB',
              padding: 10,
            }}>
            <Image
              source={Images.cameraImage}
              style={{
                height: scale(22),
                width: scale(22),
                resizeMode: 'contain',
                marginLeft: scale(30),
              }}
            />
            <Text style={{alignSelf: 'center', marginLeft: scale(30)}}>
              Upload via Camera Roll
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openCameraFunc()}
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#EBEBEB',
              padding: 10,
            }}>
            <Image
              source={Images.cameraImage}
              style={{
                height: scale(22),
                width: scale(22),
                resizeMode: 'contain',
                marginLeft: scale(30),
              }}
            />
            <Text style={{alignSelf: 'center', marginLeft: scale(30)}}>
              Take a new photo
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  console.log('state', state);
  return {
    isLoading: state.UploadMediaReducer.isLoading,
    imageResponse: state.UploadMediaReducer.mediaResponse,
  };
};

export default connect(mapStateToProps, {
  uploadMedia,
})(UploadPhoto);

let styles = StyleSheet.create({
  modalMainView: {
    height: height / 7.5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
