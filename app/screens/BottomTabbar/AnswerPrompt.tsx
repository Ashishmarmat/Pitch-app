import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Alert,
  BackHandler,
  Platform,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images, Fonts} from '../../theme';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../services/NavigationService';
import getWorkWithMeAPi from '../../actions/WorkWithMeAction';
import {getAllquestionAwnserlist} from '../../actions/AnswerPrompt';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
// import Modal from 'react-native-modal';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AnswerPrompt = () => {
  const dispatch = useDispatch();
  const WorkWithMeRes = useSelector(
    state => state.AnswerPromptReducer.getQuestionAnswerList,
  );
  // console.log("WorkWithMeRes",WorkWithMeRes)

  const [showDialog, setShowDialog] = useState(false);
  const [PromptArray, setPromptAray] = useState([]);

  useEffect(() => {
    dispatch(getAllquestionAwnserlist());
  }, []);

  useEffect(() => {
    if (
      WorkWithMeRes != undefined &&
      WorkWithMeRes.data != undefined &&
      WorkWithMeRes.data
    ) {
      if (WorkWithMeRes.data.length > 0) {
        setPromptAray(WorkWithMeRes.data);
      }
    }
  }, [WorkWithMeRes]);

  const goToChoosenCard = data => {
    // console.log("data",data)
    NavigationService.navigate('QuestionTypes', {data: data});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => NavigationService.navigateAndReset('HomeScreen')}>
          <Image
            source={require('../../../assets/images/crossImage.png')}
            style={{height: 15, width: 15, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            fontFamily: Fonts.fontName.GibsonBold,
          }}>
          New Prompt
        </Text>
        <View>
          {/* <Text style={{fontSize:12, fontWeight:'800', textDecorationLine:'underline', color:'#666565'}}>Next</Text> */}
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: width,
          backgroundColor: '#EBEBEB',
          marginTop: 15,
        }}
      />
      <ImageBackground
        source={require('../../../assets/images/bg-01.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.cardMainView}>
          {PromptArray.length > 0 ? (
            <ScrollView>
              {PromptArray.map((promptItem, promptIndex) => (
                <TouchableOpacity
                  onPress={() => goToChoosenCard(promptItem)}
                  style={{
                    minHeight: scale(43),
                    width: '90%',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#C7C7C7',
                    alignSelf: 'center',
                    marginTop: 10,
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}
                  key={promptIndex}>
                  <Text
                    style={{
                      color: '#252020',
                      fontWeight: '800',
                      fontSize: 12,
                      lineHeight: 16,
                    }}>
                    {promptItem.questions}
                  </Text>
                  {/* <Image source={require('../../../assets/images/right-arrow-angle.png')} style={{height:15, width:15, resizeMode:'contain'}} /> */}
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("Answer prompt state", state)
  return {};
};

export default connect(mapStateToProps, {})(AnswerPrompt);

const styles = StyleSheet.create({
  modalMainView: {
    height: 200,
    backgroundColor: '#fff',
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardMainView: {
    width: width - 40,
    height: height - 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    // marginTop:scale(60)
  },
});
