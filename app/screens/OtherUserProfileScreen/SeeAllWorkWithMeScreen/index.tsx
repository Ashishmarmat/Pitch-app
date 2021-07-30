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
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import getWorkWithMeAPi from '../../../actions/WorkWithMeAction';
import {ScrollView} from 'react-native-gesture-handler';
import postshowHideAns from '../../../actions/PostWorkWithMeAction';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SeeAllWorkWithMeScreen = props => {
  console.log('props', props);

  const dispatch = useDispatch();

  const [workWithMeArray, setWorkWithMeArray] = useState([]);
  const [uiRender, setUirender] = useState(false);
  const [isVisible, setisVisible] = useState(false);

  const WorkWithMeRes = useSelector(state => state.EndUserProfileReducer.data);
  console.log('working with me@@@', WorkWithMeRes);
  useEffect(() => {}, []);
  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('OtherUserProfileScreen')}
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

  const goToChoosenCard = profileItem => {
    NavigationService.navigate('WorkWithMeInfoScreen', {profileItem});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView>
        {WorkWithMeRes &&
        WorkWithMeRes.data &&
        WorkWithMeRes.data.workwithme.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: width - 20,
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            {WorkWithMeRes &&
              WorkWithMeRes.data &&
              WorkWithMeRes.data.workwithme.map((profileItem, profileIndex) => (
                <TouchableOpacity onPress={() => goToChoosenCard(profileItem)}>
                  <ImageBackground
                    resizeMode="contain"
                    source={Images.FrameImg}
                    style={styles.profileImageBackStyle}>
                    <Text style={styles.profileTitleStyle}>
                      {profileItem.questions}
                    </Text>
                    {profileItem.ans_data != undefined && (
                      <View style={{height: 40}}>
                        <Text style={styles.profileTextStyle}>
                          {profileItem.ans_data}
                        </Text>
                      </View>
                    )}

                    <View style={styles.bottomMainView}>
                      {profileItem.likecount != undefined && (
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.likeTextstyle}>
                            {profileItem.likecount === false
                              ? 0
                              : profileItem.likecount}
                          </Text>
                          <Image
                            source={Images.thumbImg}
                            style={[styles.closeEyeStyle, {marginLeft: 5}]}
                          />
                        </View>
                      )}
                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                        <Text style={styles.likeTextstyle}>
                          {profileItem.workwithmecommentcount === false
                            ? 0
                            : profileItem.workwithmecommentcount}
                        </Text>
                        <Image
                          source={Images.chatImg}
                          style={styles.chatImgStyle}
                        />
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

export default connect(mapStateToProps, {})(SeeAllWorkWithMeScreen);

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
  profileTitleStyle: {
    fontSize: 12,
    color: '#4A20E4',
    marginTop: scale(50),
    fontWeight: '600',
    // textAlign: 'center'
  },
  profileTextStyle: {
    fontSize: 10,
    marginTop: scale(10),
    lineHeight: 15,
    // textAlign: 'center'
  },
  bottomMainView: {
    position: 'absolute',
    bottom: 28,
    paddingHorizontal: 15,
    width: width / 2 - 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeEyeStyle: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
  },
  likeTextstyle: {
    fontSize: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  chatImgStyle: {
    height: scale(12),
    width: scale(12),
    resizeMode: 'contain',
    marginLeft: 5,
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
