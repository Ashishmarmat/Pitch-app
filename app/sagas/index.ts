import { takeLatest, all } from 'redux-saga/effects';
import startup from './StartupSaga';
import * as CONST from '../utils/Constants';
import { userLogin } from './LoginSaga';
import { forgotPasswordCall } from './ForgotPasswordSaga';
import { VerifyOTPCall, EmailVerifyOTPCall } from './VerifyOTPSaga';
import { CreatePasswordCall } from './CreatePasswordSaga';
import {
  userSignUp,
  verifyOtp,
  resendOtp,
  updateProfile,
  checkEmailApi,
  checkPhoneExistApi,
  changeBadgestatusApi,
  socialLoginApi,
  appleLogin,
} from './SignUpSaga';
import { getQuestionsCall, saveQuestionsCall } from './QuestionsSaga';
import { savePromptCall } from './PromptSaga';
import { getCountries, getStates, getCities } from './LocationSaga';
import { uploadMedia } from './UploadMediaSaga';
import { BadgesGet } from './Badges';
import { shareMomentsGet } from './shareMomentsSaga';
import { deleteShareMoments } from './DeleteShareMomentsSaga';
import { WorkWithMeGet } from './WorkwithMe';
import { getWorkList, postAddWorkApi, updateWorkDataApi } from './WorkListSaga';
import {
  getEducationListApi,
  AddUserEducationApi,
  editEducationApi,
} from './EducationListSaga';
import { hideShowAnsAPi } from './PostWorkWithMe';
import {
  getCertificateListApi,
  AddUserCertificate,
  editCertificateApi,
} from './CertificateListSaga';
import { getAnswerPromptListApi, getQuestionAnswerApi } from './AnswerPromptSaga';
import { ProfileGet } from './ProfileSaga';
import { postWorkWithMe } from './EditWorkWithMeSaga';
import {
  getUserLinkedList,
  postUserProfileFilterApi,
  postSuggestionApi,
  linkSendApi,
  postTeamSuggetion,
  postAddUserTeamMember,
} from './UserLinkedSagas';
import { EndUserProfileSaga } from './EndUserProfileSaga';
import { EndUserBadgesSaga } from './EndUserBadgesSaga';
import { AddEndUserBadgesSaga } from './AddEndUserBadgesSaga';
import { TeamListGet } from './TeamListSaga';
import { LikeShareMoment } from './LikeShareMoment';
import { LikeWorkWithMe } from './LikeWorkWithMe';
import {
  getSharedMomentsCommentsCall,
  postSharedComment,
  postWorkingWithMeComments,
  getWorkWithMeCommentsData,
  likeOnSharedComments,
  likeWorkingWithmeComments,
  postInsightCommentSaga,
  getInsightCommentsSaga,
  likeInsightComments,
  postBadgesCommentSaga,
  getBadgesCommentsSaga,
  likeBadgesComments,
} from './SharedMomentsCommentSaga';
import {
  getConnectionMutualApi,
  getInviteToPitchConnectionApi,
  getSharedInsightListApi,
  getRecommendedListApi,
  enduserLinkconnectListMutualApi,
} from './ConnectionSaga';
import { addContacts } from './AddContactSaga';
import { suggestBadges } from './BadgeSuggestSaga';
import { FeedPostSaga } from './FeedPostSaga';
import { UserPostReportSaga } from './UserPostReportSaga';
import { InsightLikeSaga } from './InsightLikeSaga';
import { LikeBadgesSaga } from './LikeBadgesSaga';
import { newFeedList } from './NewFeedListSaga';
import {
  postCreateRoom,
  postChatHistory,
  postChatList,
  postDeleteNotification,
} from './MessagesSaga';
import { deleteChat } from './DeleteChatSaga';
import { BetweenUsSaga } from './BetweenUsSaga';
import { ChangePassSaga } from './ChangePassSaga';
import { ReportProblemSaga } from './ReportProblemSaga';
import { ContactUsSaga } from './ContactUsSaga';
import { ChangeMobSaga } from './ChangeMobSaga';
import { NotiSettingSaga } from './NotiSettingSaga';
import { LogoutSaga } from './LogoutSaga';

export default function* root() {
  yield all([takeLatest(CONST.START_UP, startup)]);
  yield all([takeLatest(CONST.USER_LOGIN, userLogin)]);
  yield all([takeLatest(CONST.FORGET_PASSWORD_CALL, forgotPasswordCall)]);
  yield all([takeLatest(CONST.OTP_VERIFY_CALL, VerifyOTPCall)]);
  yield all([takeLatest(CONST.CREATE_PASSWORD_CALL, CreatePasswordCall)]);
  yield all([takeLatest(CONST.USER_SIGNUP, userSignUp)]);
  yield all([takeLatest(CONST.SOCIAL_LOGIN, socialLoginApi)]);
  yield all([takeLatest(CONST.APPLE_LOGIN, appleLogin)]);
  yield all([takeLatest(CONST.WORK_LIST, getWorkList)]);
  yield all([takeLatest(CONST.USER_WORK, postAddWorkApi)]);
  yield all([takeLatest(CONST.GET_EDUCATION, getEducationListApi)]);
  yield all([takeLatest(CONST.ADD_USER_EDUCATION, AddUserEducationApi)]);
  yield all([takeLatest(CONST.EDIT_USER_EDUCATION, editEducationApi)]);
  yield all([takeLatest(CONST.GET_CERTIFICATE, getCertificateListApi)]);
  yield all([takeLatest(CONST.ADD_USER_CERTIFICATE, AddUserCertificate)]);
  yield all([takeLatest(CONST.UPDATE_USER_CERTIFICATE, editCertificateApi)]);
  yield all([takeLatest(CONST.UPDATE_USER_QUESTION, postWorkWithMe)]);
  yield all([takeLatest(CONST.GET_ANSWER_PROMPT, getAnswerPromptListApi)]);
  yield all([takeLatest(CONST.GET_ALL_QUEST_ANSWER, getQuestionAnswerApi)]);
  yield all([takeLatest(CONST.GET_SHOW_HIDE_ANS, hideShowAnsAPi)]);
  yield all([takeLatest(CONST.UPDATE_PROFILE, updateProfile)]);
  yield all([takeLatest(CONST.USER_EMAIL_CHECK, checkEmailApi)]);
  yield all([takeLatest(CONST.USER_PHONE_CHECK, checkPhoneExistApi)]);
  yield all([takeLatest(CONST.VERIFY_OTP, verifyOtp)]);
  yield all([takeLatest(CONST.RESEND_OTP, resendOtp)]);
  yield all([takeLatest(CONST.GET_QUESTIONS_CALL, getQuestionsCall)]);
  yield all([takeLatest(CONST.SAVE_PRMPT_CALL, savePromptCall)]);
  yield all([takeLatest(CONST.SEND_QUESTIONS_CALL, saveQuestionsCall)]);
  yield all([takeLatest(CONST.GET_COUNTRIES_REQUEST, getCountries)]);
  yield all([takeLatest(CONST.GET_STATES_REQUEST, getStates)]);
  yield all([takeLatest(CONST.GET_CITIES_REQUEST, getCities)]);
  yield all([takeLatest(CONST.UPLOAD_MEDIA_REQUEST, uploadMedia)]);
  yield all([takeLatest(CONST.GET_BADGES, BadgesGet)]);
  yield all([takeLatest(CONST.GET_WORK_WITH_ME, WorkWithMeGet)]);
  yield all([takeLatest(CONST.GET_STATUS_BADGES, changeBadgestatusApi)]);
  yield all([takeLatest(CONST.GET_SHARE_MOMENTS, shareMomentsGet)]);
  yield all([takeLatest(CONST.DELETE_SHARE_MOMENTS, deleteShareMoments)]);
  yield all([takeLatest(CONST.GET_PROFILE, ProfileGet)]);
  yield all([takeLatest(CONST.GET_LINKED_TEAM, getUserLinkedList)]);
  yield all([takeLatest(CONST.POST_USER_FILTER, postUserProfileFilterApi)]);
  yield all([takeLatest(CONST.POST_USER_SUGGESTION, postSuggestionApi)]);
  yield all([takeLatest(CONST.POST_SEND_LINK, linkSendApi)]);
  yield all([takeLatest(CONST.POST_TEAM_SUGGESTION, postTeamSuggetion)]);
  yield all([
    takeLatest(CONST.POST_ADD_USER_TEAM_MEMBER, postAddUserTeamMember),
  ]);
  yield all([
    takeLatest(CONST.GET_SHARED_MOMENTS_COMMENTS, getSharedMomentsCommentsCall),
  ]);
  yield all([takeLatest(CONST.POST_SHARED_COMMENTS, postSharedComment)]);
  yield all([
    takeLatest(CONST.POST_WORKING_WITH_ME_COMMENTS, postWorkingWithMeComments),
  ]);
  yield all([
    takeLatest(
      CONST.GET_WORK_WITH_ME_MOMENTS_COMMENTS,
      getWorkWithMeCommentsData,
    ),
  ]);
  yield all([takeLatest(CONST.LIKE_ON_SHARED_COMMENTS, likeOnSharedComments)]);
  yield all([
    takeLatest(CONST.LIKE_ON_WORK_WITH_ME_COMMENTS, likeWorkingWithmeComments),
  ]);
  yield all([takeLatest(CONST.POST_END_USER_PROFILE, EndUserProfileSaga)]);
  yield all([takeLatest(CONST.GET_USER_BADGES, EndUserBadgesSaga)]);
  yield all([takeLatest(CONST.ADD_USER_BADGES, AddEndUserBadgesSaga)]);
  yield all([takeLatest(CONST.UPDATE_USER_WORK, updateWorkDataApi)]);
  yield all([takeLatest(CONST.GET_TEAM, TeamListGet)]);
  yield all([takeLatest(CONST.LIKE_SHARE_MOMENTS, LikeShareMoment)]);
  yield all([takeLatest(CONST.LIKE_WORK_WITH_ME, LikeWorkWithMe)]);
  yield all([
    takeLatest(CONST.GET_CONNECTION_MUTUAL_LIST, getConnectionMutualApi),
  ]);
  yield all([
    takeLatest(CONST.GET_INVITE_CONNECTION_LIST, getInviteToPitchConnectionApi),
  ]);
  yield all([
    takeLatest(CONST.GET_SHARED_INSIGHT_LIST, getSharedInsightListApi),
  ]);
  yield all([takeLatest(CONST.GET_RECOMMENDED_LIST, getRecommendedListApi)]);
  yield all([
    takeLatest(
      CONST.POST_END_USER_CONNECTION_LINK,
      enduserLinkconnectListMutualApi,
    ),
  ]);
  yield all([takeLatest(CONST.ADD_CONTACTS, addContacts)]);
  yield all([takeLatest(CONST.SUGGEST_BADGES, suggestBadges)]);
  yield all([takeLatest(CONST.FEED_POST, FeedPostSaga)]);
  yield all([takeLatest(CONST.USER_POST_REPORT, UserPostReportSaga)]);
  yield all([takeLatest(CONST.INSIGHT_LIKE, InsightLikeSaga)]);
  yield all([takeLatest(CONST.INSIGHT_COMMENT, postInsightCommentSaga)]);
  yield all([takeLatest(CONST.GET_INSIGHT_COMMENT, getInsightCommentsSaga)]);
  yield all([takeLatest(CONST.LIKE_ON_INSIGHT_COMMENTS, likeInsightComments)]);
  yield all([takeLatest(CONST.LIKE_BADGES, LikeBadgesSaga)]);
  yield all([takeLatest(CONST.BADGES_COMMENT, postBadgesCommentSaga)]);
  yield all([takeLatest(CONST.GET_BADGES_COMMENT, getBadgesCommentsSaga)]);
  yield all([takeLatest(CONST.LIKE_ON_BADGE_COMMENTS, likeBadgesComments)]);
  yield all([takeLatest(CONST.NEW_USER_FEEDLIST, newFeedList)]);
  yield all([takeLatest(CONST.POST_CREATE_ROOM, postCreateRoom)]);
  yield all([takeLatest(CONST.POST_CHAT_HISTORY, postChatHistory)]);
  yield all([takeLatest(CONST.POST_CHAT_LIST, postChatList)]);
  yield all([takeLatest(CONST.DELETE_CHAT, deleteChat)]);
  yield all([takeLatest(CONST.BETWEEN_US, BetweenUsSaga)]);
  yield all([takeLatest(CONST.CHANGEPASS, ChangePassSaga)]);
  yield all([takeLatest(CONST.REPORT_PROBLEM, ReportProblemSaga)]);
  yield all([takeLatest(CONST.CONTACTUS, ContactUsSaga)]);
  yield all([takeLatest(CONST.CHANGEMOB, ChangeMobSaga)]);
  yield all([takeLatest(CONST.NOTI_SETTING, NotiSettingSaga)]);
  yield all([takeLatest(CONST.POST_DELETE_NOTIFY, postDeleteNotification)]);
  yield all([takeLatest(CONST.EMAIL_OTP_VERIFY_CALL, EmailVerifyOTPCall)]);
  yield all([takeLatest(CONST.USER_LOGOUT, LogoutSaga)]);

}
