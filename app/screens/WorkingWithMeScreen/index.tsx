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
  Alert,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import BottomTabbar from '../BottomTabbar';
import getWorkWithMeAPi from '../../actions/WorkWithMeAction';
import {ScrollView} from 'react-native-gesture-handler';
import postshowHideAns from '../../actions/PostWorkWithMeAction';
import hideAnswerSuccess from '../../actions/PostWorkWithMeAction';
import {useFocusEffect} from '@react-navigation/native';
import {getworkwithmeCommentsSuccess} from '../../actions/SharedMomentsComments';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const profileBadge = [
  {
    id: 1,
    type: 'Input',
    title: 'Career Goals',
    text1: 'Find a place to work where tenure is rewarded',
  },
  {
    id: 2,
    type: 'Multiple',
    title: 'Interests',
    text1: 'Listening to true crime prodcasts',
  },
  {
    id: 3,
    type: 'Input',
    title: `You just started a new job,${'\n'}what is the best way to help you?`,
    text1: 'Introduce me to a team',
  },
  {
    id: 4,
    type: 'Multiple',
    title: "It's important that the company i work for supports..",
    text1: 'Environmental Causes',
  },
];

const emptyArray = [{}];

const WorkingWithMeScreen = navigation => {
  const dispatch = useDispatch();

  const WorkWithMeData = useSelector(state => state.WorkWithMeReducer.data);
  const postHideAnsData = useSelector(
    state => state.PostWorkWithMeReducer.showHideData,
  );
  // console.log("WorkWithMeDatasdfsafsfwf", postHideAnsData)

  const [workWithMeArray, setWorkWithMeArray] = useState([]);
  const [uiRender, setUirender] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    // console.log("Focus call")
    dispatch(getWorkWithMeAPi());
    dispatch(getworkwithmeCommentsSuccess());
  }, []);

  useEffect(() => {
    if (
      WorkWithMeData &&
      WorkWithMeData.data != undefined &&
      WorkWithMeData.data.length > 0
    ) {
      for (let item of WorkWithMeData.data) {
        item.showtoothers = false;
      }
      setWorkWithMeArray(WorkWithMeData.data);
      dispatch(getworkwithmeCommentsSuccess());
      setUirender(!uiRender);
    }
  }, [WorkWithMeData]);

  useEffect(() => {
    if (postHideAnsData != undefined) {
      if (
        postHideAnsData.data != undefined &&
        postHideAnsData.response_code === 200
      ) {
        dispatch(getWorkWithMeAPi());
        dispatch(getworkwithmeCommentsSuccess());
      } else {
        // Alert.alert(postHideAnsData.message)
      }
    }
  }, [postHideAnsData]);

  //     const createTwoButtonAlert = () =>
  //     Alert.alert(
  //         "Update answer Successfully",
  //         "",
  //         [
  //             { text: "OK", onPress: () => goToNext() }
  //         ]
  //     );

  // const goToNext = () => {
  //     dispatch(hideAnswerSuccess())
  //     // NavigationService.navigateAndReset('HomeScreen')
  // }

  console.log('asddadfasdfasfafs', workWithMeArray);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('HomeScreen')}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Working With Me</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };

  const goToChoosenCard = data => {
    NavigationService.navigate('EditAnswerCard', {data: data});
  };
  const goToChoosenCard2 = data => {
    NavigationService.navigate('WorkWithMedetailsScreen', {data: data});
  };
  const showHideFunc = profileItem => {
    // console.log("profileItem", profileItem)
    for (let item of workWithMeArray) {
      if (item.id === profileItem.id) {
        if (item.showtoothers === false) {
          const sendData = {
            status: 1,
            question_id: profileItem.id,
          };
          item.showtoothers = true;
          dispatch(postshowHideAns(sendData));
        } else if (item.showtoothers === true) {
          const sendData = {
            status: 0,
            question_id: profileItem.id,
          };
          item.showtoothers = false;
          dispatch(postshowHideAns(sendData));
        }
      }
    }
    setUirender(!uiRender);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView>
        {workWithMeArray.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: width - 20,
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            {workWithMeArray.map((profileItem, profileIndex) => (
              <TouchableOpacity
                key={profileIndex}
                onPress={() => goToChoosenCard2(profileItem)}>
                <ImageBackground
                  resizeMode="contain"
                  source={Images.FrameImg}
                  style={styles.profileImageBackStyle}>
                  <TouchableOpacity
                    onPress={() => goToChoosenCard(profileItem)}
                    style={{alignSelf: 'flex-end', marginTop: '10%'}}>
                    <Image
                      source={Images.BlackEditPencil}
                      style={styles.editPencilStyle}
                    />
                  </TouchableOpacity>
                  <Text style={styles.profileTitleStyle}>
                    {profileItem.questions}
                  </Text>
                  {profileItem.ans_data != undefined && (
                    <View >
                      <Text style={styles.profileTextStyle}>
                        {profileItem.ans_data}
                      </Text>
                    </View>
                  )}
                  <View style={styles.bottomMainView}>
                    <TouchableOpacity
                      style={{height: 20, width: 30}}
                      onPress={() => showHideFunc(profileItem)}>
                      {profileItem.ansstatus === '1' ? (
                        <Image
                          source={require('../../../assets/images/openeye.png')}
                          style={styles.closeEyeStyle}
                        />
                      ) : (
                        <Image
                          source={Images.closeEye}
                          style={styles.closeEyeStyle}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.likeTextstyle}>
                          {profileItem.like_count === false
                            ? 0
                            : profileItem.like_count}
                        </Text>
                        <Image
                          source={Images.thumbImg}
                          style={[styles.closeEyeStyle, {marginLeft: 5}]}
                        />
                      </View>
                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <Text style={styles.likeTextstyle}>
                          {profileItem.commentcount === false
                            ? 0
                            : profileItem.commentcount}
                        </Text>
                        <Image
                          source={Images.chatImg}
                          style={styles.chatImgStyle}
                        />
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View
            style={{
              height: 200,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '400'}}>
              No data available
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('Status state', state);
  return {};
};

export default connect(mapStateToProps, {})(WorkingWithMeScreen);

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
  profileImageBackStyle: {
    height: height / 4,
    width: width / 2 - 20,
    marginTop: 10,
    padding: 10,
  },
  editPencilStyle: {
    width: scale(22),
    height: scale(22),
    resizeMode: 'contain',
  },
  profileTitleStyle: {
    fontSize: 11,
    color: '#4A20E4',
    marginTop: scale(12),
    fontWeight: '600',
  },
  profileTextStyle: {
    fontSize: 11,
    marginTop: scale(6),
    lineHeight: 15,
  },
  bottomMainView: {
    position: 'absolute',
    bottom: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: width / 2 - 20,
    justifyContent: 'space-between',
  },
  closeEyeStyle: {
    height: scale(17),
    width: scale(17),
    resizeMode: 'contain',
  },
  likeTextstyle: {
    fontSize: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  chatImgStyle: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
    marginLeft: 5,
  },
  emptyArrayMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  emptyImageBackStyle: {
    height: height / 4,
    width: width / 2 - 20,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyAddImage: {
    height: scale(50),
    width: scale(50),
    resizeMode: 'contain',
  },
});
