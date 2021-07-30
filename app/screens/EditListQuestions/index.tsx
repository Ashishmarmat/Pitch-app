import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';

import {getAnswerPrompt} from '../../actions/AnswerPrompt';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const questionArray = [
  {
    id: 1,
    text1: 'What are your top 3 core values?',
    status: false,
  },
  {
    id: 2,
    text1: 'What are your hobbies/interests?',
    status: false,
  },
  {
    id: 3,
    text1: 'Describe your personality and Working style',
    status: false,
  },
  {
    id: 4,
    text1: 'You have 45 minutes to grab lunch..',
    status: false,
  },
  {
    id: 5,
    text1: 'Coffee or tea?',
    status: false,
  },
  {
    id: 6,
    text1: 'Where do you prefer to work?',
    status: false,
  },
  {
    id: 7,
    text1: 'Are you a morning person?',
    status: false,
  },
  {
    id: 8,
    text1: 'Once I clock out, my time is...?',
    status: false,
  },
  {
    id: 9,
    text1: 'Do you take your work home?',
    status: false,
  },
  {
    id: 10,
    text1: 'It is important the company I work for..',
    status: false,
  },
  {
    id: 11,
    text1: "At the bar. What's your drink of?",
    status: false,
  },
];

const EditListQuestions = props => {
  const dispatch = useDispatch();
  const AnswePromptListRes = useSelector(
    state => state.AnswerPromptReducer.getanswePromptList,
  );
  console.log('AnswePromptListRes', AnswePromptListRes);

  const [propmtanswerArray, setPromptanswerArray] = useState([]);

  useEffect(() => {
    dispatch(getAnswerPrompt());
  }, []);

  useEffect(() => {
    if (
      AnswePromptListRes != undefined &&
      AnswePromptListRes.data != undefined &&
      AnswePromptListRes.data.length > 0
    ) {
      setPromptanswerArray(AnswePromptListRes.data);
    }
  }, [AnswePromptListRes]);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Choose any prompt</Text>
        </View>
        <TouchableOpacity style={styles.settingImgMainView}>
          {/* <Text style={{ color: '#007AFF', fontSize: 12, fontWeight: '800', textDecorationLine: 'underline' }}>Done</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <ImageBackground
        source={require('../../../assets/images/bg-01.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.cardMainView}>
          {headerView()}
          <ScrollView>
            {propmtanswerArray.map((questItem, questIndex) => (
              <TouchableOpacity
                onPress={() =>
                  NavigationService.navigate('AnswerListScreen', {
                    questItem: questItem,
                  })
                }
                key={questIndex}
                style={styles.cardBtnStyle}>
                <Text
                  style={{
                    color: '#D3C1FC',
                    fontSize: 17,
                    lineHeight: 18,
                    fontWeight: 'normal',
                  }}>
                  {questItem.questions}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={{height: 20}} />
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.doneBtnStyle}>
          <Text style={styles.doneTextStyle}>Done</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(EditListQuestions);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c4c4',
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
    width: scale(17),
    height: scale(17),
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
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  cardMainView: {
    width: width - 40,
    height: height - 180,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: scale(60),
  },
  cardBtnStyle: {
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
  },
  doneBtnStyle: {
    height: scale(35),
    width: width / 2,
    alignSelf: 'center',
    backgroundColor: '#4A20E4',
    borderRadius: 5,
    marginTop: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneTextStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
});
