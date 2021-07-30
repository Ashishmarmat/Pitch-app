import * as CONST from '../utils/Constants';

const initialState = {
  status: false,
  message: '',
  logoutStatus: false,
  getSharedComments: {},
  getPostCommentsData: {},
  getPostWorkingwithmeComments: {},
  getWorkWithMeComments: {},
  gatSharedLikeCommentsCalled: {},
  likeWorkWithMeComments: {},
  getInsightComments: {},
  PostInsightComment: {},
  likeInsightComments: {},
  PostBadgesComment: {},
  getBadgesComments: {},
  likeBadgesComments: {},
};
// This reducer stores the data of user details.
export default function(state = initialState, action) {
  // console.log("Shared moments comments action", action)
  switch (action.type) {
    case CONST.GET_SHARED_MOMENTS_COMMENTS_SUCCESS:
      return {
        ...state,
        getSharedComments: action.payload,
        loader: false,
      };
    case CONST.GET_SHARED_MOMENTS_COMMENTS_FAILED:
      return {
        ...state,
        getSharedComments: action.payload,
        loader: false,
      };
    case CONST.GET_SHARED_MOMENTS_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_SHARED_COMMENTS_SUCCESS:
      return {
        ...state,
        getPostCommentsData: action.payload,
        loader: false,
      };
    case CONST.POST_SHARED_COMMENTS_FAILED:
      return {
        ...state,
        getPostCommentsData: action.payload,
        loader: false,
      };
    case CONST.POST_SHARED_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_WORK_WITH_ME_MOMENTS_SUCCESS:
      return {
        ...state,
        getWorkWithMeComments: action.payload,
        loader: false,
      };
    case CONST.GET_WORK_WITH_ME_MOMENTS_FAILED:
      return {
        ...state,
        getWorkWithMeComments: action.payload,
        loader: false,
      };
    case CONST.GET_WORK_WITH_ME_MOMENTS_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.POST_WORKING_WITH_ME_COMMENTS_SUCCESS:
      return {
        ...state,
        getPostWorkingwithmeComments: action.payload,
        loader: false,
      };
    case CONST.POST_WORKING_WITH_ME_COMMENTS_FAILED:
      return {
        ...state,
        getPostWorkingwithmeComments: action.payload,
        loader: false,
      };
    case CONST.POST_WORKING_WITH_ME_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.LIKE_ON_SHARED_COMMENTS_SUCCESS:
      return {
        ...state,
        gatSharedLikeCommentsCalled: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_SHARED_COMMENTS_FAILED:
      return {
        ...state,
        gatSharedLikeCommentsCalled: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_SHARED_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.LIKE_ON_WORK_WITH_ME_COMMENTS_SUCCESS:
      return {
        ...state,
        likeWorkWithMeComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_WORK_WITH_ME_COMMENTS_FAILED:
      return {
        ...state,
        likeWorkWithMeComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_WORK_WITH_ME_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    case CONST.GET_INSIGHT_COMMENT_SUCCESS:
      return {
        ...state,
        getInsightComments: action.payload,
        loader: false,
      };
    case CONST.GET_INSIGHT_COMMENT_FAILED:
      return {
        ...state,
        getInsightComments: action.payload,
        loader: false,
      };
    case CONST.GET_INSIGHT_COMMENT:
      return {
        ...state,
        loader: true,
      };

    case CONST.INSIGHT_COMMENT_SUCCESS:
      return {
        ...state,
        PostInsightComment: action.payload,
        loader: false,
      };
    case CONST.INSIGHT_COMMENT_FAILED:
      return {
        ...state,
        PostInsightComment: action.payload,
        loader: false,
      };
    case CONST.INSIGHT_COMMENT:
      return {
        ...state,
        loader: true,
      };

    case CONST.LIKE_ON_INSIGHT_COMMENTS_SUCCESS:
      return {
        ...state,
        likeInsightComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_INSIGHT_COMMENTS_FAILED:
      return {
        ...state,
        likeInsightComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_INSIGHT_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    ////badges////
    case CONST.GET_BADGES_COMMENT_SUCCESS:
      return {
        ...state,
        getBadgesComments: action.payload,
        loader: false,
      };
    case CONST.GET_BADGES_COMMENT_FAILED:
      return {
        ...state,
        getBadgesComments: action.payload,
        loader: false,
      };
    case CONST.GET_BADGES_COMMENT:
      return {
        ...state,
        loader: true,
      };

    case CONST.BADGES_COMMENT_SUCCESS:
      return {
        ...state,
        PostBadgesComment: action.payload,
        loader: false,
      };
    case CONST.BADGES_COMMENT_FAILED:
      return {
        ...state,
        PostBadgesComment: action.payload,
        loader: false,
      };
    case CONST.BADGES_COMMENT:
      return {
        ...state,
        loader: true,
      };

    case CONST.LIKE_ON_BADGE_COMMENTS_SUCCESS:
      return {
        ...state,
        likeBadgesComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_BADGE_COMMENTS_FAILED:
      return {
        ...state,
        likeBadgesComments: action.payload,
        loader: false,
      };
    case CONST.LIKE_ON_BADGE_COMMENTS:
      return {
        ...state,
        loader: true,
      };

    default:
      return state;
  }
}
