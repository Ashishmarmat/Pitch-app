import React, {useEffect, useState} from 'react';
import QuestionMolecule from '../../components/molecule/QuestionMolecule';
import {connect, useDispatch} from 'react-redux';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  getQuestions,
  onItemSelect,
  sendQuestions,
} from '../../actions/QuestionsActions';
import {QuestionTypes} from '../../model';
import {addKeyValue} from '../../utils/JsonUtils';
import {log} from '../../utils/CommonUtils';
import NavigationService from '../../services/NavigationService';
import FabButton from '../../components/atoms/FabButton';
import scale, {verticalScale} from '../../theme/scale';

let NewArray = [];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const QuestionsScreen = props => {
  const [position, setPosition] = useState(0);
  const [temp, setTemp] = useState(false); // to update the view on re-select the same item
  const [answer, setAnswer] = useState('');
  const [showScreen, setShowScreen] = useState(false);
  const [hideScreen, setHideScreen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [answerArray, setAnswerArray] = useState([]);
  const [questArray, setQuestArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions()); //to call the api to retrieve the questions from the server
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Questions==>', props);
    let tempData = [];
    if (props != undefined) {
      if (props.data && props.data.length > 0) {
        for (let item of props.data) {
          if (item.id > 10) {
            tempData.push(item);
          }
        }
        setQuestArray(tempData);
      }
    }
    // console.log("questArray", questArray)
    // if (props != undefined) {
    //   if (props.coreData != undefined && props.coreData != false && props.coreData != null) {
    //     if (props.corePosition && props.corePosition.length > 0) {
    //       for (let item of props.corePosition) {
    //         if(props.arrayItem.id == item.id){
    //           item.isValid = !item.isValid;
    //           if(NewArray.length != 3) {
    //             console.log("Inside if")
    //             NewArray.push(item)
    //           } else{
    //             console.log("Inside else")
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }, [position, temp, props.data]);

  const onNextClick = () => {
    let tempAnswer = '';
    if (props.data[position].ques_type !== QuestionTypes.input) {
      tempAnswer = props.data[position].options
        .filter(({value, isValid}) => {
          if (isValid) {
            return value;
          }
        })
        .map(({value}) => {
          return value;
        })
        .toString();
    } else {
      tempAnswer = answer;
    }
    let myAnswer = {};
    addKeyValue(myAnswer, 'question_id', props.data[position].id);
    addKeyValue(myAnswer, 'answer', tempAnswer);
    console.log('myAnswer', myAnswer);
    console.log('answerArray outside if', answerArray);
    answerArray.filter(({question_id}, pos) => {
      if (question_id === props.data[position].id) {
        answerArray[pos] = myAnswer;
      }
    });
    if (props.data[position].ques_type == QuestionTypes.input) {
      setAnswer('');
    }
    if (answerArray.length !== props.data.length) {
      console.log('if');
      answerArray.push(myAnswer);
    } else {
      console.log('else');
      answerArray.pop();
      answerArray.push(myAnswer);
    }
    if (position !== props.data.length - 1) {
      setPosition(position + 1);
    } else {
      console.log('answerArray inside else ', answerArray);
      getUnique(answerArray);
    }
    console.log('Props.data', props.data[position]);
    if (position + 1 === 4) {
      setShowScreen(true);
    }
    console.log('position', position);
  };

  console.log('Outsideposition', position);

  // in the aaray if there is duplicate value insert into once in the array
  const getUnique = array => {
    var uniqueArray = [];

    // Loop through array values
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    console.log('uniqueArray', uniqueArray);

    dispatch(
      sendQuestions({
        data: uniqueArray,
        promptResponse: props.promptResponse,
      }),
    );
    NavigationService.navigate('OnboardingTransitionScreenFour');
  };

  const hideFirstScreenFunc = () => {
    setShowScreen(false);
    setHideScreen(true);
  };

  const hideSecondScreen = (questItem, questIndex) => {
    let tempArray = [...answerArray];
    const lastIndex = answerArray[answerArray.length - 1];
    const tempIndex = Number(questItem.id) - Number(lastIndex.question_id);
    let incId = Number(answerArray[answerArray.length - 1].question_id);
    for (let i = 0; i <= tempIndex - 1; i++) {
      const Obj = {
        question_id: String(incId + 1),
        answer: '',
      };
      tempArray.push(Obj);
      incId += 1;
    }
    setAnswerArray(tempArray);
    setHideScreen(false);
    setPosition(position + questIndex);
  };

  const skipFunc = () => {
    // setHideScreen(false)
    console.log('answerArray', answerArray);
    if (props != undefined) {
      if (props.data != undefined && props.data.length > 0) {
        let blankArray = [];
        let tempAnswerArray = [...answerArray];
        for (let i = 0; i <= answerArray.length; i++) {
          if (i <= 3) {
            blankArray.push(answerArray[i]);
          }
        }
        let temperoryArray = [...props.data];
        for (let i = 0; i < temperoryArray.length; i++) {
          if (i > 3) {
            const obj = {
              question_id: temperoryArray[i].id,
              answer: '',
            };
            blankArray.push(obj);
          }
        }
        console.log('blankArray', blankArray);
        setHideScreen(false);
        getUnique(blankArray);
      }
    }
    // setPosition(position + 1)
    // getUnique(answerArray)
  };

  const backManage = () => {
    if (position == 4) {
      setHideScreen(true);
    } else {
      setPosition(position - 1);
    }
  };

  const GoToPrompt = () => {
    setHideScreen(true);
    setPosition(4);
  };

  // console.log("Position", position)

  return (
    //typeof props.data  !== 'undefined' && props.data .length > 0
    <>
      {!showScreen && !hideScreen && (
        <QuestionMolecule
          data={
            typeof props.data !== undefined && props.data.length > 0
              ? props.data[position].options
              : []
          }
          onNextClick={() => onNextClick()}
          question={
            typeof props.data !== undefined && props.data.length > 0
              ? props.data[position].questions
              : []
          }
          answerType={
            typeof props.data !== undefined && props.data.length > 0
              ? props.data[position].ques_type
              : ''
          }
          onItemClick={item => {
            console.log('item Question modecule', item);
            //To handle items selected by the user.
            dispatch(onItemSelect({position, answer: item})); //to manage the selected items
            setTemp(!temp);
          }}
          onChange={ans => {
            setAnswer(ans);
          }}
          positionIndex={position}
          showBackButton={position !== 0}
          onBackClick={() => {
            backManage();
            // setPosition(position - 1);
          }}
          handleBackPress={position === 0}
          loader={props.loading}
          GoToPrompt={() => GoToPrompt()}
        />
      )}
      {showScreen && !hideScreen && (
        <View>
          <ImageBackground
            source={require('../../../assets/images/FrontCover4.jpg')}
            style={{height: height, width: width}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(134, 83, 251, 0.34)',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 32,
                  fontWeight: 'bold',
                  width: width / 2 + 50,
                  lineHeight: 32,
                  marginLeft: '10%',
                }}>
                Feel free to answer more questions to help others get to know
                you better!
              </Text>

              <FabButton
                enable={true}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: verticalScale(250),
                  marginRight: scale(26),
                  backgroundColor: '#8653FB',
                }}
                onClick={() => {
                  hideFirstScreenFunc();
                }}
              />
            </View>
          </ImageBackground>
        </View>
      )}
      {!showScreen && hideScreen && (
        <View
          style={{
            flex: 1,
            backgroundColor: '#8653FB',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: height / 1 - 170,
              width: width - 30,
              backgroundColor: '#fff',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 17,
                fontWeight: 'bold',
                lineHeight: 17,
                textAlign: 'center',
                marginTop: 25,
              }}>
              Choose any prompt
            </Text>
            <ScrollView style={{paddingHorizontal: 30, marginTop: 10}}>
              {questArray.map((questItem, questIndex) => (
                <TouchableOpacity
                  onPress={() => hideSecondScreen(questItem, questIndex)}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 10,
                    borderColor: '#C7C7C7',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: '#D3C1FC', fontSize: 17, lineHeight: 17}}>
                    {questItem.questions}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => skipFunc()}
            style={{
              height: 40,
              width: width / 2 + 80,
              backgroundColor: '#fff',
              marginTop: 20,
              alignSelf: 'center',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#8653FB',
                fontSize: 17,
                fontWeight: '600',
                lineHeight: 17,
              }}>
              Skip for Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const mapStateToProps = state => {
  console.log('Question state', state);
  return {
    error: state.QuestionsReducer.error,
    data: state.QuestionsReducer.questionsResponse,
    coreData: state.QuestionsReducer.coreValueType,
    corePosition: state.QuestionsReducer.corePosition,
    arrayItem: state.QuestionsReducer.arrayItem,
    promptResponse: state.QuestionsReducer.promptResponse,
    loading: state.QuestionsReducer.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getQuestionsList: params => {
    dispatch(getQuestions());
  },
  onSelected: params => {
    dispatch(onItemSelect(params));
  },
  sendAnswer: params => {
    dispatch(sendQuestions(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);
