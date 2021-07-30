import {QuestionTypes} from '../model';
import * as CONST from '../utils/Constants';
import {addKeyValue} from '../utils/JsonUtils';

const initialState = {
  questionsResponse: {},
  loading: false,
  error: '',
  promptResponse: {},
  coreValueType: null,
  arrayItem: '',
};

export default function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CONST.GET_QUESTIONS_SUCCESS:
      let tempArr = action.payload.data;
      tempArr.map(({id, ques_type, options, questions}, index) => {
        if (ques_type !== QuestionTypes.input) {
          let optionsArray: {}[] = [];
          options.forEach(function(element, i) {
            let obj = {};
            addKeyValue(obj, 'id', i);
            addKeyValue(obj, 'value', element);
            addKeyValue(obj, 'isValid', false);
            optionsArray.push(obj);
          });
          tempArr[index] = {id, ques_type, options: optionsArray, questions};
        }
      });
      let promptData = action.payload.prompt_data;
      try {
        promptData.map(({id, ques_type, options, questions}, index) => {
          if (ques_type !== QuestionTypes.input) {
            let promptOptionsArray: {}[] = [];
            options.forEach(function(element, i) {
              let obj = {};
              addKeyValue(obj, 'id', i);
              addKeyValue(obj, 'value', element);
              addKeyValue(obj, 'isValid', false);
              promptOptionsArray.push(obj);
            });
            promptData[index] = {
              id,
              ques_type,
              options: promptOptionsArray,
              questions,
            };
          }
        });
      } catch {}
      return {
        ...state,
        questionsResponse: tempArr,
        loading: false,
        error: '',
        promptResponse: promptData,
      };
    case CONST.GET_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case CONST.ON_ANSER_SELECT:
      let position = action.payload.position;
      let temp = state.questionsResponse;
      let item = action.payload.answer;
      let corevalue = false;
      temp[position].options.forEach((data, _index) => {
        if (temp[position].ques_type === QuestionTypes.single) {
          data.isValid = data.id === item.id;
        } else if (temp[position].ques_type === QuestionTypes.multiple) {
          if (data.id === item.id) {
            data.isValid = !data.isValid;
          }
        } else if (temp[position].ques_type === QuestionTypes.core) {
          if (data.id === item.id) {
            // if(tempArray.length!=3) {
            //   data.isValid = !data.isValid;
            //   tempArray.push(item)
            // } else {
            //   alert('no selected')
            // }
            data.isValid = !data.isValid;
            corevalue = true;
          }
        }
      });
      return {
        ...state,
        questionsResponse: temp,
        coreValueType: corevalue,
        corePosition: temp[position].options,
        arrayItem: item,
      };
    case CONST.GET_QUESTIONS_CALL:
      return {...state, loading: true};
    case CONST.SEND_QUESTIONS_CALL:
      return {...state, loading: true};
    default:
      return state;
  }
}
