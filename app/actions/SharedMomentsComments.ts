import * as CONST from '../utils/Constants';

export function getSharedMomentsCommentApi(getData) {
  return {
    type: CONST.GET_SHARED_MOMENTS_COMMENTS,
    payload: getData,
  };
}
export function getSharedMomentsCommentSuccess(data) {
  return {
    type: CONST.GET_SHARED_MOMENTS_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function getSharedMomentsCommentFailure(error) {
  return {
    type: CONST.GET_SHARED_MOMENTS_COMMENTS_FAILED,
    payload: error,
  };
}

export function postSharedCommentsAPi(postData) {
  return {
    type: CONST.POST_SHARED_COMMENTS,
    payload: postData,
  };
}
export function postSharedCommentsSuccess(data) {
  return {
    type: CONST.POST_SHARED_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function postSharedCommentsFailure(error) {
  return {
    type: CONST.POST_SHARED_COMMENTS_FAILED,
    payload: error,
  };
}

export function postWorkingWithmeCommentsAPi(workData) {
  return {
    type: CONST.POST_WORKING_WITH_ME_COMMENTS,
    payload: workData,
  };
}
export function postWorkingWithmeCommentsSuccess(data) {
  return {
    type: CONST.POST_WORKING_WITH_ME_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function postWorkingWithmeCommentsFailure(error) {
  return {
    type: CONST.POST_WORKING_WITH_ME_COMMENTS_FAILED,
    payload: error,
  };
}

export function getworkwithmeCommentsApi(commentData) {
  return {
    type: CONST.GET_WORK_WITH_ME_MOMENTS_COMMENTS,
    payload: commentData,
  };
}
export function getworkwithmeCommentsSuccess(data) {
  return {
    type: CONST.GET_WORK_WITH_ME_MOMENTS_SUCCESS,
    payload: data,
  };
}
export function getworkwithmeCommentsFailure(error) {
  return {
    type: CONST.GET_WORK_WITH_ME_MOMENTS_FAILED,
    payload: error,
  };
}

export function likeOnSharedCommentsApi(workData) {
  return {
    type: CONST.LIKE_ON_SHARED_COMMENTS,
    payload: workData,
  };
}
export function likeOnSharedCommentsSuccess(data) {
  return {
    type: CONST.LIKE_ON_SHARED_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function likeOnSharedCommentsFailure(error) {
  return {
    type: CONST.LIKE_ON_SHARED_COMMENTS_FAILED,
    payload: error,
  };
}

export function likeWorkingwithmeCommentsApi(workData) {
  return {
    type: CONST.LIKE_ON_WORK_WITH_ME_COMMENTS,
    payload: workData,
  };
}
export function likeWorkingwithmeCommentsSuccess(data) {
  return {
    type: CONST.LIKE_ON_WORK_WITH_ME_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function likeWorkingwithmeCommentsFailure(error) {
  return {
    type: CONST.LIKE_ON_WORK_WITH_ME_COMMENTS_FAILED,
    payload: error,
  };
}

///// insight pitch //////

export function getInsightPitchCommentApi(getInsightData) {
  return {
    type: CONST.GET_INSIGHT_COMMENT,
    payload: getInsightData,
  };
}
export function getInsightPitchCommentSuccess(data) {
  return {
    type: CONST.GET_INSIGHT_COMMENT_SUCCESS,
    payload: data,
  };
}
export function getInsightPitchCommentFailure(error) {
  return {
    type: CONST.GET_INSIGHT_COMMENT_FAILED,
    payload: error,
  };
}

export function postInsightCommentAPi(postInsightData) {
  return {
    type: CONST.INSIGHT_COMMENT,
    payload: postInsightData,
  };
}
export function postInsightCommentSuccess(data) {
  return {
    type: CONST.INSIGHT_COMMENT_SUCCESS,
    payload: data,
  };
}
export function postInsightCommentFailure(error) {
  return {
    type: CONST.INSIGHT_COMMENT_FAILED,
    payload: error,
  };
}

export function likeInsightCommentsApi(InsightData) {
  return {
    type: CONST.LIKE_ON_INSIGHT_COMMENTS,
    payload: InsightData,
  };
}
export function likeInsightCommentsApiSuccess(data) {
  return {
    type: CONST.LIKE_ON_INSIGHT_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function likeInsightCommentsApiFailure(error) {
  return {
    type: CONST.LIKE_ON_INSIGHT_COMMENTS_FAILED,
    payload: error,
  };
}

///// badges feed //////

export function getBadgesCommentApi(getBadgesData) {
  return {
    type: CONST.GET_BADGES_COMMENT,
    payload: getBadgesData,
  };
}
export function getBadgesCommentSuccess(data) {
  return {
    type: CONST.GET_BADGES_COMMENT_SUCCESS,
    payload: data,
  };
}
export function getBadgesCommentFailure(error) {
  return {
    type: CONST.GET_BADGES_COMMENT_FAILED,
    payload: error,
  };
}

export function postBadgesCommentAPi(postBadgesData) {
  return {
    type: CONST.BADGES_COMMENT,
    payload: postBadgesData,
  };
}
export function postBadgesCommentSuccess(data) {
  return {
    type: CONST.BADGES_COMMENT_SUCCESS,
    payload: data,
  };
}
export function postBadgesCommentFailure(error) {
  return {
    type: CONST.BADGES_COMMENT_FAILED,
    payload: error,
  };
}

export function likeBadgesCommentsApi(badgeData) {
  return {
    type: CONST.LIKE_ON_BADGE_COMMENTS,
    payload: badgeData,
  };
}
export function likeBadgesCommentsApiSuccess(data) {
  return {
    type: CONST.LIKE_ON_BADGE_COMMENTS_SUCCESS,
    payload: data,
  };
}
export function likeBadgesCommentsApiFailure(error) {
  return {
    type: CONST.LIKE_ON_BADGE_COMMENTS_FAILED,
    payload: error,
  };
}
