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
  Alert,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images} from '../../../theme';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import strings from '../../../theme/strings';
import NavigationService from '../../../services/NavigationService';
import {TextInput} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
let tempArray = [];

const answerArray = [
  {
    id: 1,
    text1: 'Kindness',
    status: false,
  },
  {
    id: 2,
    text1: 'Honesty',
    status: false,
  },
  {
    id: 3,
    text1: 'Respect',
    status: false,
  },
  {
    id: 4,
    text1: 'Hard work',
    status: false,
  },
  {
    id: 5,
    text1: 'Authenticity',
    status: false,
  },
  {
    id: 6,
    text1: 'Fairness',
    status: false,
  },
  {
    id: 7,
    text1: 'Accountability',
    status: false,
  },
  {
    id: 8,
    text1: 'Humility',
    status: false,
  },
  {
    id: 9,
    text1: 'Perserverance',
    status: false,
  },
  {
    id: 10,
    text1: 'Loyalty',
    status: false,
  },
];

const AnswerListScreen = props => {
  const [uiRender, setUiRender] = useState(false);
  const [selectArray, setSelectArray] = useState([]);
  const [optionArray, setOptionArray] = useState([]);
  const [questions, setQuestions] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [answerInput, setAnswerInput] = useState('');

  useEffect(() => {
    console.log('Props Answer list screen', props);
    tempArray = [];
    let questArray = [];
    setSelectArray([]);
    setAnswerInput('');
    refereshArray();
    if (props != undefined) {
      if (props.navigation.state != undefined) {
        if (
          props.navigation.state.params != undefined &&
          props.navigation.state.params.questItem != undefined
        ) {
          for (let item of props.navigation.state.params.questItem
            .question_option) {
            questArray.push({option: item, status: false});
          }
          setOptionArray(questArray);
          setQuestionType(props.navigation.state.params.questItem.ques_type);
          setQuestions(props.navigation.state.params.questItem.questions);
        }
      }
    }
  }, []);

  console.log('optionArray', optionArray);

  const refereshArray = () => {
    for (let item of answerArray) {
      if (item.status === true) {
        item.status = false;
      }
    }
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
          <Text style={[styles.titleTextStyle, {marginTop: 10}]}>
            {questions}
          </Text>
        </View>
        <TouchableOpacity style={styles.settingImgMainView}>
          {/* <Text style={{ color: '#007AFF', fontSize: 12, fontWeight: '800', textDecorationLine: 'underline' }}>Done</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  // const selectedAnswer = (data) => {
  //     console.log("data", data)
  //     for (let item of optionArray) {
  //         if (item.option === data.option) {
  //             if (item.status === false) {
  //                 if (selectArray.length <= 2) {
  //                     item.status = true;
  //                     tempArray.push(item)
  //                 } else {
  //                     Alert.alert("Cannot select more then three")
  //                 }
  //             }
  //             else if (item.status == true) {
  //                 item.status = false
  //                 var removeItem = tempArray.indexOf(item);
  //                 tempArray.splice(removeItem, 1);
  //             }
  //             break;
  //         }
  //     }
  //     setSelectArray(tempArray)
  //     setUiRender(!uiRender)
  // }

  const selectSingleAnswer = data => {
    for (let item of optionArray) {
      if (item.option === data.option) {
        if (item.status === false) {
          item.status = true;
        }
      } else {
        item.status = false;
      }
    }
    setUiRender(!uiRender);
  };

  const selectMultipleAnswer = data => {
    for (let item of optionArray) {
      if (item.option === data.option) {
        if (item.status === false) {
          item.status = true;
        } else {
          item.status = false;
        }
      }
    }
    setUiRender(!uiRender);
  };

  console.log('questionType', questionType);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <ImageBackground
        source={require('../../../../assets/images/bg-01.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.cardMainView}>
          {headerView()}
          {/* <Text style={{ textAlign: 'center', marginTop: 10, color: '#C4C4C4', fontSize: 14, lineHeight: 19 }}>*Select upto three</Text> */}
          <View style={{height: height / 2 + 30}}>
            <ScrollView>
              {questionType === 'single_choice' && (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: width - 30,
                    marginTop: scale(40),
                  }}>
                  {optionArray.map((questItem, questIndex) => (
                    <TouchableOpacity
                      onPress={() => selectSingleAnswer(questItem)}
                      key={questIndex}
                      style={[
                        styles.cardBtnStyle,
                        {
                          backgroundColor: questItem.status
                            ? '#8653FB'
                            : '#fff',
                        },
                      ]}>
                      <Text
                        style={{
                          color: questItem.status ? '#fff' : '#000',
                          fontSize: 17,
                          lineHeight: 17,
                          fontWeight: 'normal',
                        }}>
                        {questItem.option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {questionType === 'multiple_choice' && (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: width - 30,
                    marginTop: scale(40),
                  }}>
                  {optionArray.map((questItem, questIndex) => (
                    <TouchableOpacity
                      onPress={() => selectMultipleAnswer(questItem)}
                      key={questIndex}
                      style={[
                        styles.cardBtnStyle,
                        {
                          backgroundColor: questItem.status
                            ? '#8653FB'
                            : '#fff',
                        },
                      ]}>
                      <Text
                        style={{
                          color: questItem.status ? '#fff' : '#000',
                          fontSize: 17,
                          lineHeight: 17,
                          fontWeight: 'normal',
                        }}>
                        {questItem.option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {questionType === 'text' && (
                <View style={{alignSelf: 'center', marginTop: 20}}>
                  <TextInput
                    placeholder="Enter your answer"
                    placeholderTextColor="rgba(60, 60, 67, 0.6)"
                    textAlignVertical="top"
                    multiline={true}
                    style={{
                      height: 150,
                      width: width / 2 + 80,
                      backgroundColor: 'rgba(118, 118, 128, 0.12)',
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                    value={answerInput}
                    onChangeText={text => setAnswerInput(text)}
                  />
                </View>
              )}
            </ScrollView>
          </View>
          <TouchableOpacity
            // onPress={() => NavigationService.navigate('WorkingWithMeScreen')}
            style={styles.doneBtnStyle}>
            <Text style={styles.doneTextStyle}>Done</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(AnswerListScreen);

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
    height: height / 2 + 160,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: scale(60),
  },
  cardBtnStyle: {
    minWidth: scale(126),
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#C7C7C7',
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 20,
    alignItems: 'center',
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
