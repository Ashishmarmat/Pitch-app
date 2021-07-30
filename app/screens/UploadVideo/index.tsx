import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import UploadVideoMolecule from '../../components/molecule/UploadVideoMolecule';
import NavigationService from '../../services/NavigationService';
import * as ImagePicker from 'react-native-image-picker';
import {uploadMedia} from '../../actions/UploadMediaActions';
import AsyncStorage from '@react-native-community/async-storage';
import showToast from '../../utils/ShowToast';

const UploadVideo = props => {
  const [showDialog, setShowDialog] = useState(false);
  const [responseData, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [isFirstName, setIsFirstName] = useState('');
  const [uploadRes, setUploadRes] = useState();
  const [token, setToken] = useState('');
  const [videoName, setVideoName] = useState({});
  const [isShowButton, setIsShowButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('show dialog ' + responseData);
  }, [responseData]);

  useEffect(() => {
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    const first = await AsyncStorage.getItem('USER_FIRSTNAME');
    const last = await AsyncStorage.getItem('USER_LASTNAME');
    const firstLast = last != null ? first + ' ' + last : first;
    setToken(asdwer);
    setIsFirstName(first);
  };

  function openPicker() {
    let options = {
      mediaType: 'video',
      videoQuality: 'medium',
      durationLimit: 30000,
      thumbnail: true,
      allowsEditing: true,
    };

    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        console.log(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        setProfilePic(response.uri);
        setUploadRes(response);
        setIsShowButton(true);
        const uri = response.uri;
        const Filename = uri.split('/');
        console.log('name', Filename[10]);

        const params = {
          uri: response.uri,
          name: Filename[10],
          filename: Filename[10],
          type: 'video',
        };
        setVideoName(params);
        console.log('videoName', videoName);
      }
    });
  }
  const profileImageUpload = imageResponse => {
    console.log('imageResponse', imageResponse);
    const Filename = imageResponse.uri.split('/');
    console.log('Filename', Filename);
    if (profilePic === '') {
      showToast('Please record a profile video');
    } else {
      setIsLoading(true);
      var data = new FormData();
      data.append('profile_pic', {
        uri: imageResponse.uri,
        type: 'video',
        name: Filename[10],
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
  console.log('profilePic11', profilePic);

  return (
    <UploadVideoMolecule
      onBtnClick={() => {
        profileImageUpload(uploadRes);
      }}
      onSkipClick={() => {
        NavigationService.navigate('UploadPhoto');
      }}
      type={'video'}
      onRecordClick={() => openPicker()}
      imageUrl={profilePic}
      name={isFirstName}
      showDialog={showDialog}
      isEnabled={isShowButton}
    />
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.UploadMediaReducer.isLoading,
    imageResponse: state.UploadMediaReducer.mediaResponse,
  };
};

export default connect(mapStateToProps, {
  uploadMedia,
})(UploadVideo);
