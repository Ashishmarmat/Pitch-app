import React, {useEffect, useState} from 'react';
import ListQuestionMolecule from '../../components/molecule/ListQuestionMolecule';
import {connect, useDispatch} from 'react-redux';
import {savePrompts} from '../../actions/PromptActions';
import NavigationService from '../../services/NavigationService';
import {showAlert} from '../../utils/AlertUtils';
import strings from '../../theme/strings';

const ListQuestionsScreen = props => {
  const [array, setArray] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const dispatch = useDispatch();
  const onNextClick = () => {
    if (answerArray.length !== 0) {
      //Todo submit answer
      dispatch(savePrompts({data: answerArray}));
    } else {
      showAlert(strings.MSG_APP_IS_IN_DEVELOPMENT);
    }
  };
  // useEffect(() => {
  //   console.log("List Question props......", props)
  //   if (
  //     props.navigation.getParam('answerArray') !== undefined &&
  //     props.navigation.getParam('answerArray') !== []
  //   ) {
  //     setAnswerArray(props.navigation.getParam('answerArray'));
  //   }
  //   setArray(props.navigation.getParam('promptResponse'));
  //   console.log(array,'array');

  //   if (array.length === 0 && answerArray.length !== 0) {
  //     dispatch(savePrompts({data: answerArray}));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [array]);

  return (
    <ListQuestionMolecule
      data={array}
      onNextClick={() => onNextClick()}
      onItemClick={item => {
        NavigationService.navigate('PromptItem', {
          item: item,
          promptResponse: props.navigation.getParam('promptResponse'),
          answerArray: answerArray,
        });
      }}
      loader={props.loading}
    />
  );
};

const mapStateToProps = state => {
  return {
    error: state.PromptReducer.error,
    data: state.PromptReducer.data,
    loading: state.PromptReducer.loader,
  };
};

const mapDispatchToProps = dispatch => ({
  sendAnswer: params => {
    dispatch(savePrompts(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListQuestionsScreen);
