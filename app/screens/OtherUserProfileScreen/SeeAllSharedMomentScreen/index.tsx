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
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import GridList from 'react-native-grid-list';
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {NavigationActions, StackActions} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getSharedMomentsCommentApi,
  postSharedCommentsAPi,
  postSharedCommentsSuccess,
  getSharedMomentsCommentSuccess,
} from '../../../actions/SharedMomentsComments';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SeeAllSharedMomentScreen = props => {
  const dispatch = useDispatch();

  const ProfileNameRes = useSelector(
    state => state.EndUserProfileReducer.data.data.first_name,
  );
  const sharedMomentData = useSelector(
    state => state.EndUserProfileReducer.data,
  );

  const [isLoading, setIsLoadings] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [uiRender, setUiRender] = useState(false);
  const [token, setToken] = useState('');

  const goBackFunc = () => {
    NavigationService.navigate('OtherUserProfileScreen');
  };

  const goToChoosenCard = shareItem => {
    NavigationService.navigate('ShareMomentInfoScreen', {shareItem});
    dispatch(getSharedMomentsCommentSuccess());
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
          <Text style={styles.titleTextStyle}>{ProfileNameRes}'s photos</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };
  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
  };

  useFocusEffect;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView>
        <View style={styles.gridContainer}>
          {sharedMomentData.data.sharemoment.length === 0 ? (
            <View
              style={{
                marginTop: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Nothing to show </Text>
            </View>
          ) : (
            <View style={styles.sharemomMapMaineView}>
              {sharedMomentData &&
                sharedMomentData.data &&
                sharedMomentData.data.sharemoment.map(
                  (shareItem, shareIndex) => (
                    <TouchableOpacity
                      onPress={() => goToChoosenCard(shareItem)}>
                      <View style={{alignSelf: 'center'}}>
                        {shareItem.imagetype === 1 ? (
                          <Image
                            source={{uri: shareItem.image}}
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
                                // resizeMode: 'cover',
                                marginLeft: 10,
                              }}
                              paused={true}
                              // resizeMode={'cover'}
                              disableFullscreen={true}
                              seekColor="transparent"
                              disableSeekbar
                              controls={true}
                              muted={true}
                              onLoadStart={onLoadStart}
                              onLoad={onLoad}
                            />
                          </View>
                        )}
                      </View>

                      {/* <Image source={{ uri: shareItem.image }} style={styles.mapImageStyle} /> */}
                    </TouchableOpacity>
                  ),
                )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(SeeAllSharedMomentScreen);

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
