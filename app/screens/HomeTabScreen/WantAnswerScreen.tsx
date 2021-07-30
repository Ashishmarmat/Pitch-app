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
import {
  updateUserQuestionApi,
  updateUserQuestionSuccess,
} from '../../actions/EditWorkWithMeAction';
import {ScrollView} from 'react-native-gesture-handler';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let multipleArray = [];
let demoArray = [];

// const answerArray = [
//     {
//         id: 1,
//         text1: 'Coffee',
//         status: false
//     },
//     {
//         id: 2,
//         text1: 'Tea',
//         status: false
//     }
// ]

const WantAnswerScreen = props => {
  const dispatch = useDispatch();

  const updateUserQuestionRes = useSelector(
    state => state.EditWorkWithMeReducer.updateUserQuestion,
  );
  console.log('updateUserQuestionRes', updateUserQuestionRes);

  const [uiRender, setUiRender] = useState(false);
  const [type, setType] = useState('');
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerArray, setAnswerArray] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [singleAnswer, setSingleAnswer] = useState('');
  const [multiChoice, setMultiChoiceArray] = useState('');

  useEffect(() => {
    console.log('props', props);
    multipleArray = [];
    if (
      props &&
      props.navigation.state.params != undefined &&
      props.navigation.state.params.data != undefined
    ) {
      setType(props.navigation.state.params.data.ques_type);
      setQuestions(props.navigation.state.params.data.questions);
      setAnswer(props.navigation.state.params.data.ans_data);
      setQuestionId(props.navigation.state.params.data.question_id);
      // var ans = [];
      // for (let data of props.navigation.state.params.data.ans_data.split(',')) {
      //     ans.push({ ans: data })
      // }
      // setMultiChoiceArray(ans)
      var abc = [];
      for (let item of props.navigation.state.params.data.question_option) {
        abc.push({ans: item, value: false});
      }
      // for (let it of abc) {
      //     if (it.ans == props.navigation.state.params.data.ans_data) {
      //         it.value = true
      //         multipleArray.push(it.ans)
      //     }
      // }
      // console.log('item', abc)
      setAnswerArray(abc);
    }
  }, [props]);

  useEffect(() => {
    if (multiChoice && multiChoice.length > 0) {
      answerArray.forEach(element1 => {
        multiChoice.forEach(element2 => {
          if (element1['ans'] === element2['ans']) element1['value'] = true;
        });
      });
    }
    for (let it of answerArray) {
      if (it.value === true) {
        multipleArray.push(it.ans);
      }
    }
    setUiRender(!uiRender);
  }, [multiChoice]);

  useEffect(() => {
    if (updateUserQuestionRes != undefined && updateUserQuestionRes.data) {
      if (updateUserQuestionRes.response_code === 200) {
        NavigationService.goBack();
        dispatch(updateUserQuestionSuccess());
      }
    }
  }, [updateUserQuestionRes]);

  console.log('multipleArray', multipleArray);
  console.log('multiChoice', multiChoice);

  const checkType = data => {
    if (type === 'single_choice') {
      colorChange(data);
    } else if (type === 'multiple_choice') {
      multipleselectArray(data);
    } else if (type === 'core_values') {
      coreAnswers(data);
    }
  };

  const colorChange = selectItem => {
    for (let item of answerArray) {
      if (item.ans === selectItem.ans) {
        item.value = true;
        setSingleAnswer(item.ans);
      } else {
        item.value = false;
      }
    }
    setUiRender(!uiRender);
  };

  const multipleselectArray = getData => {
    for (let data of answerArray) {
      if (data.ans === getData.ans) {
        if (data.value === false) {
          data.value = true;
          multipleArray.push(data.ans);
        } else if (data.value === true) {
          data.value = false;
          const index = multipleArray.indexOf(getData);
          multipleArray.splice(index, 1);
        }
      }
    }
    setUiRender(!uiRender);
  };

  const coreAnswers = data => {
    console.log('data', data);
    // if (selectArray.length === 3) {
    for (let item of answerArray) {
      if (item.ans === data.ans) {
        if (item.value === false) {
          if (multipleArray.length <= 2) {
            item.value = true;
            multipleArray.push(item.ans);
          } else {
            Alert.alert('Cannot select more then three');
          }
        } else if (item.value == true) {
          item.value = false;
          var removeItem = multipleArray.indexOf(item);
          multipleArray.splice(removeItem, 1);
          // tempArray.splice(item)
        }
        break;
      }
    }
    // }
    setUiRender(!uiRender);
  };

  const checkApiDataTypeFunc = () => {
    if (type === 'single_choice') {
      singleChoiceApiCall();
    } else if (type === 'multiple_choice') {
      console.log('Multiple call');
      var stringArray = multipleArray.join(',');
      multipleChoiceApiCall(stringArray);
    } else if (type === 'text') {
      textChoiceApiCall();
    } else if (type === 'core_values') {
      coreValuesApiCall();
    }
  };

  const textChoiceApiCall = () => {
    const sendData = {
      question_id: questionId,
      ans_data: answer,
    };
    dispatch(updateUserQuestionApi(sendData));
  };

  const coreValuesApiCall = () => {
    const sendData = {
      question_id: questionId,
      ans_data: multipleArray.join(','),
    };
    dispatch(updateUserQuestionApi(sendData));
  };

  const singleChoiceApiCall = () => {
    const sendData = {
      question_id: questionId,
      ans_data: singleAnswer,
    };
    dispatch(updateUserQuestionApi(sendData));
  };

  const multipleChoiceApiCall = stringArray => {
    const sendData = {
      question_id: questionId,
      ans_data: stringArray,
    };
    dispatch(updateUserQuestionApi(sendData));
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
          <Text style={styles.titleTextStyle}>Edit Answer</Text>
        </View>
        <TouchableOpacity
          onPress={() => checkApiDataTypeFunc()}
          style={styles.settingImgMainView}>
          <Text
            style={{
              color: '#007AFF',
              fontSize: 12,
              fontWeight: '800',
              textDecorationLine: 'underline',
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView>
        {type === 'single_choice' ||
        type === 'multiple_choice' ||
        type === 'core_values' ? (
          <View>
            <View style={styles.questionCardMain}>
              <View style={styles.cardtitleMainView}>
                <Text style={styles.cardTitleTextStyle}>Interests</Text>
                {/* <TouchableOpacity 
                                onPress={() => NavigationService.navigate('EditListQuestions')}
                                >
                                    <Image source={Images.BlackEditPencil} style={styles.editPencilStyle} />
                                </TouchableOpacity> */}
              </View>
              <Text style={styles.questionTextStyle}>{questions}</Text>
            </View>
            <View style={{marginTop: 20}}>
              {answerArray &&
                answerArray.length > 0 &&
                answerArray.map((ansItem, ansIndex) => (
                  <View key={ansIndex}>
                    <TouchableOpacity
                      onPress={() => checkType(ansItem)}
                      style={[
                        styles.selectBtnMainStyle,
                        {
                          backgroundColor: ansItem.value ? '#8653FB' : '#fff',
                          // backgroundColor: ansItem.value ? '#fff' : '#fff',
                        },
                      ]}>
                      {/* <Image source={require('../../../../assets/images/ic_checked.png')} style={styles.selectedImgStyle} />  */}
                      <Text
                        style={{
                          color: ansItem.value ? '#fff' : '#8653FB',
                          alignSelf: 'center',
                          marginLeft: ansItem.value ? 0 : 0,
                        }}>
                        {ansItem.ans}
                      </Text>
                      {/* <Text style={{ color: ansItem.value ? '#fff' : '#8653FB', alignSelf: 'center', marginLeft: ansItem.value ? 10 : 0 }}>{ansItem.ans}</Text> */}
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </View>
        ) : null}
        {type === 'text' ? (
          <View>
            <View style={styles.questionCardMain}>
              <View style={styles.cardtitleMainView}>
                <Text style={styles.cardTitleTextStyle}>Interests</Text>
                {/* <TouchableOpacity onPress={() => NavigationService.navigate('EditListQuestions')}>
                                        <Image source={Images.BlackEditPencil} style={styles.editPencilStyle} />
                                    </TouchableOpacity> */}
              </View>
              <Text style={styles.questionTextStyle}>
                What are your hobbies/intereset?
              </Text>
            </View>
            <View style={styles.textInputMainView}>
              <TextInput
                placeholder="Enter answer here"
                multiline={true}
                value={answer}
                onChangeText={text => setAnswer(text)}
              />
            </View>
          </View>
        ) : null}
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('WantAnswerScreen answer Card state', state);
  return {};
};

export default connect(mapStateToProps, {})(WantAnswerScreen);

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
    height: scale(15),
    width: scale(15),
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
});
