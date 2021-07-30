import React, {useEffect, useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {connect, useDispatch} from 'react-redux';
import {QuestionTypes} from '../../model';
import {addKeyValue} from '../../utils/JsonUtils';
import {log} from '../../utils/CommonUtils';
import PromptMolecule from '../../components/molecule/PromptMolecule';
import NavigationService from '../../services/NavigationService';

const PromptItemScreen = props => {
  const [temp, setTemp] = useState(false); // to update the view on re-select the same item
  const [answerArray, setAnswerArray] = useState([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({});

  console.log('page called');

  const onItemSelect = item => {
    console.log('sdgsgsgdfsghdghedsgdfsgsdgdsgdseg', item);
    currentQuestion.options.forEach((data, _index) => {
      if (currentQuestion.ques_type === QuestionTypes.single) {
        data.isValid = data.id === item.id;
      } else if (
        currentQuestion.ques_type === QuestionTypes.multiple ||
        currentQuestion.ques_type === QuestionTypes.core
      ) {
        if (data.id === item.id) {
          data.isValid = !data.isValid;
          setTemp(!data.isValid); // to update the view on reselect the same item
        }
      }
    });
    setTemp(!temp);
    setCurrentQuestion(currentQuestion);
  };

  useEffect(() => {
    if (
      props.navigation.getParam('answerArray') !== undefined &&
      props.navigation.getParam('answerArray') !== []
    ) {
      setAnswerArray(props.navigation.getParam('answerArray'));
    }
    setCurrentQuestion(props.navigation.getParam('item'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Questions==>');
  }, [temp, currentQuestion]);
  const onNextClick = () => {
    let tempAnswer = '';
    if (currentQuestion.ques_type !== QuestionTypes.input) {
      tempAnswer = currentQuestion.options
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
      tempAnswer = inputAnswer;
    }
    let myAnswer = {};
    addKeyValue(myAnswer, 'question_id', currentQuestion.id);
    addKeyValue(myAnswer, 'answer', tempAnswer);
    let tempArray = props.navigation
      .getParam('promptResponse')
      .filter(({id}) => {
        return id !== currentQuestion.id;
      });
    answerArray.push(myAnswer);
    NavigationService.navigateAndReset('ListQuestionsScreen', {
      promptResponse: tempArray,
      answerArray: answerArray,
    });
  };

  return (
    <PromptMolecule
      data={currentQuestion.options}
      onNextClick={() => onNextClick()}
      question={currentQuestion.questions}
      answerType={currentQuestion.ques_type}
      onItemClick={item => {
        onItemSelect(item);
      }}
      onChange={str => {
        setInputAnswer(str);
      }}
    />
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(PromptItemScreen);
