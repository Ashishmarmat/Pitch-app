import React, {createRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import Modal from 'react-native-modal';
import editShareMoments from '../../actions/EditSharedMoments';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EditPostScreen2 = props => {
  const dispatch = useDispatch();

  const [uiRender, setUiRender] = useState(false);
  const [sharedMomentImage, setSharedMomentImage] = useState('');
  const [sharedMomentTags, setSharedMomentTags] = useState('');
  const [sharedMomentPostId, setSharedMomentPostId] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileJob, setProfileJob] = useState('');
  const [isLoading, setIsLoadings] = useState(false);
  const [SharedImageType, setSharedImageType] = useState();

  useEffect(() => {
    console.log('props',props);
    
    setSharedMomentPostId(props.navigation.state.params.id);
    setSharedMomentImage(props.navigation.state.params.image);
    setSharedMomentTags(props.navigation.state.params.tags);
    setSharedImageType(props.navigation.state.params.imagetype);
    // setProfileName(props.navigation.state.params.first_name)
    // setProfileImage(props.navigation.state.params.profile_file)
    // setProfileJob(props.navigation.state.params.job_title)
  }, []);

  useEffect(() => {
    if (props != undefined) {
      if (props.profileRes != undefined && props.profileRes.data != undefined) {
        const name =
          props.profileRes.data.first_name + props.profileRes.data.last_name;
        setProfileName(name);
        setProfileImage(props.profileRes.data.profile_file);
        setProfileJob(props.profileRes.data.job_title);
      }
    }
  }, [props]);

  const saveUpadtes = () => {
    dispatch(
      editShareMoments({id: sharedMomentPostId, tags: sharedMomentTags}),
    );
    NavigationService.navigate('HomeScreen');
  };

  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    // console.log("load")
    setIsLoadings(false);
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Edit Post</Text>
        </View>
        <TouchableOpacity
          onPress={() => saveUpadtes()}
          style={styles.settingImgMainView}>
          <Text style={{color: '#B1B1B1', fontSize: 12, fontWeight: '600'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: width - 40,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: ProfileImage}}
            style={{
              height: scale(66),
              width: scale(66),
              resizeMode: 'cover',
              borderRadius: 50,
            }}
          />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                color: '#141414',
                fontSize: 17,
                lineHeight: 23,
                fontWeight: '800',
              }}>
              {ProfileName}
            </Text>
            <Text
              style={{color: '#828282', fontSize: 12, fontWeight: 'normal'}}>
              {ProfileJob}
            </Text>
            <Text
              style={{color: '#828282', fontSize: 12, fontWeight: 'normal'}}>
              2 days ago
            </Text>
          </View>
        </View>
      </View>
      {/* <Image source={{ uri: sharedMomentImage }} style={styles.shareMomBigImage} /> */}
      {SharedImageType == 1 ? (
        // <Image source={{ uri: shareItem.image }}
        //  style={styles.mapImageStyle} />
        <LazyLoader
          uriImg={sharedMomentImage}
          style={styles.shareMomBigImage}
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
            source={{uri: sharedMomentImage}}
            style={{
              height: height / 4,
              marginTop: scale(20),
              alignSelf: 'center',
            }}
            paused={true}
            disableFullscreen={true}
            seekColor="transparent"
            disableSeekbar
            controls={true}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
          />
        </View>
      )}

      {/* <TextInput
                value={sharedMomentTags}
                editable={true}
                onChangeText={(sharedMomentTags) => ({ sharedMomentTags: sharedMomentTags })}
                style={{
                    color: '#4D4D4D',
                    fontSize: 12,
                    lineHeight: 15,
                    marginLeft: 32,
                    marginTop: 14,
                }}
            /> */}
      <View
        style={{
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          width: 375,
          marginTop: 9,
          alignSelf: 'center',
          opacity: 0.4,
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    profileRes: state.profileReducer.data,
  };
};

export default connect(mapStateToProps, {})(EditPostScreen2);

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
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
  },
  likeBtn: {
    flex: 1,
    width: scale(9),
    height: scale(9),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentBtn: {
    flex: 1,
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeBtnCrcl: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
  },
  userPic: {
    width: scale(30),
    height: scale(30),
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
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  editPencilStyle: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  questionCardMain: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardtitleMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitleTextStyle: {
    color: '#4A20E4',
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
  },
  questionTextStyle: {
    marginTop: scale(8),
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
    display: 'flex',
    marginBottom: 10,
  },
  selectBtnMainStyle: {
    height: scale(40),
    width: width - 40,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C7C7C7',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  selectedImgStyle: {
    height: scale(25),
    width: scale(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textInputMainView: {
    height: 102,
    width: width - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    padding: 10,
    marginTop: scale(20),
  },
  shareMomBigImage: {
    height: height / 4,
    // width: width - 35,
    resizeMode: 'cover',
    marginTop: scale(20),
    alignSelf: 'center',
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
});
