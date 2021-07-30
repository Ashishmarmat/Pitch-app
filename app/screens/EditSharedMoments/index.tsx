import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import GridList from 'react-native-grid-list';
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationActions, StackActions} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import shareMomentsSuccess from '../../actions/ShareMoments';
import shareMoments from '../../actions/ShareMoments';
import {getSharedMomentsCommentSuccess} from '../../actions/SharedMomentsComments';
import ProfileGet from '../../actions/ProfileActions';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';
import showToast from '../../utils/ShowToast';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EditSharedMoments = props => {
  const dispatch = useDispatch();
  const sharedMomentData = useSelector(
    state => state.shareMomentsReducer.data.data,
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [uiRender, setUiRender] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoadings] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getTokenFunc();
  }, []);

  const getTokenFunc = async () => {
    const asdwer = await AsyncStorage.getItem('Authorization');
    setToken(asdwer);
  };

  const goBackFunc = () => {
    // NavigationService.navigateAndReset('HomeScreen')
    dispatch(getSharedMomentsCommentSuccess());
    dispatch(shareMoments());
    dispatch(ProfileGet());
    NavigationService.goBack();
  };
  const OpenShareMomentPost = () => {
    NavigationService.navigate('UserOpenShareMoment', {
      shareItem: shareItemData,
    });
  };
  const onLoadStart = () => {
    console.log('loadstart');
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => goBackFunc()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>My photos</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
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
        sharedMomentAdd(response);
        toggleModal();
      },
    );
  };

  const openLibraryFunc = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1000,
        maxWidth: 1000,
      },
      response => {
        console.log('library response', response);
        const imageResponse = response;
        sharedMomentAdd(imageResponse);
        toggleModal();
      },
    );
  };
  const sharedMomentAdd = imageResponse => {
    console.log('profileImageUpload', imageResponse);
    var data = new FormData();
    data.append('tags', 'aaaa');
    data.append('image', {
      uri: imageResponse.uri,
      type: imageResponse.type,
      name: imageResponse.fileName,
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
        if (res.status) {
          console.log('img', res.data[0].image);
          sharedMomentData.push({image: res.data[0].image});
          setUiRender(!uiRender);
          dispatch(shareMoments());
        } else {
          console.log(res.message);
        }
      })
      .catch(e => {
        showToast('No Internet Connection');
          console.log(e);
          setIsLoadings(false);
      });
  };
  const sharedMomentItem = shareItem => {
    console.log('jhsgadfhjgfsa', shareItem);
    NavigationService.navigate('EditPostScreen', {shareItems: shareItem});
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView>
        <View style={styles.gridContainer}>
          {sharedMomentData.length === 0 ? (
            <View
              style={{
                height: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Text>Upload photos</Text> */}
            </View>
          ) : (
            <View style={styles.sharemomMapMaineView}>
              {sharedMomentData.map((shareItem, shareIndex) => (
                <TouchableOpacity onPress={() => sharedMomentItem(shareItem)}>
                  {shareItem.imagetype === 1 ? (
                    // <Image source={{ uri: shareItem.image }}
                    //  style={styles.mapImageStyle} />
                    <LazyLoader
                      uriImg={shareItem.image}
                      style={styles.mapImageStyle}
                    />
                  ) : (
                    <View pointerEvents="none">
                      {isLoading ? (
                        <ActivityIndicator
                          animating
                          size="large"
                          color="gray"
                          style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            top: '30%',
                          }}
                        />
                      ) : null}
                      <Video
                        source={{uri: shareItem.image}}
                        style={{
                          height: scale(105),
                          width: scale(105),
                          marginLeft: 10,
                        }}
                        paused={true}
                        // resizeMode={'cover'}
                        disableFullscreen={true}
                        seekColor="transparent"
                        disableSeekbar
                        controls={true}
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{
              backgroundColor: '#C4C4C4',
              height: scale(105),
              width: scale(105),
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: '#fff',
              marginTop: 5,
              marginLeft: 11,
            }}>
            <Image
              source={Images.addIcon}
              style={{
                height: scale(30),
                width: scale(30),
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
          <View style={{height: 20}} />
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    // shareMomentsdata: state.shareMomentsReducer.data,
  };
};

export default connect(mapStateToProps, {})(EditSharedMoments);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  gridContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
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
  sharemomMapMaineView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 20,
    alignSelf: 'center',
  },
  mapImageStyle: {
    height: scale(105),
    width: scale(105),
    resizeMode: 'cover',
    marginLeft: 10,
  },
});
