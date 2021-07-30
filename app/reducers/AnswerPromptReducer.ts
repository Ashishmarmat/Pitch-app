import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  getanswePromptList: {},
  getQuestionAnswerList: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Answer Prompt action", action)
  switch (action.type) {
    case CONST.GET_ANSWER_PROMPT_SUCCESS:
      return {
        ...state,
        getanswePromptList: action.payload,
        loader: false,
      };
    case CONST.GET_ANSWER_PROMPT_FAILED:
      return {
        ...state,
        getanswePromptList: action.data,
        loader: false,
      };
    case CONST.GET_ANSWER_PROMPT:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_ALL_QUEST_ANSWER_SUCCESS:
      return {
        ...state,
        getQuestionAnswerList: action.payload,
        loader: false,
      };
    case CONST.GET_ALL_QUEST_ANSWER_FAILED:
      return {
        ...state,
        getQuestionAnswerList: action.data,
        loader: false,
      };
    case CONST.GET_ALL_QUEST_ANSWER:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
