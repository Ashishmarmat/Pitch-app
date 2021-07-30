// Font Weight Constants
export const fontWeight = {
  Thin: '100',
  UltraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  Semibold: '600',
  Bold: '700',
  Heavy: '800',
  Black: '900',
};

// Font Family constants 'TODO custom fonts needs to install'
export const fontFamily = {
  // Regular: 'Raleway-Regular',
  // Medium: 'Raleway-Medium',
  // SemiBold: 'Raleway-SemiBold',
  // Light: 'Raleway-Light',
  // Bold: 'Raleway-Bold',
  // MediumItalic: 'Raleway-MediumItalic',
  // RegularItalic: 'Raleway-Italic',
  // Black: 'Raleway-Black',
  // Josef: 'JosefinSans-Regular',
  // JosefBold: 'JosefinSans-Bold',
};

// CONFIGURATIONS
export const API_TIMEOUT = 30000;

// API CALLING CONSTANTS
export const GET_API = 'GET';
export const POST_API = 'POST';
export const PUT_API = 'PUT';
export const DELETE_API = 'EDIT';
export const UPDATE_API = 'PUT';

// Saga Constants
export const START_UP = 'START_UP';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const VERIFY_OTP = 'VERIFY_OTP';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILED = 'VERIFY_OTP_FAILED';
export const RESEND_OTP = 'RESEND_OTP';
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS';
export const RESEND_OTP_FAILED = 'RESEND_OTP_FAILED';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED';
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS';
export const SOCIAL_LOGIN_FAILED = 'SOCIAL_LOGIN_FAILED';
export const APPLE_LOGIN = 'APPLE_LOGIN';
export const APPLE_LOGIN_SUCCESS = 'APPLE_LOGIN_SUCCESS';
export const APPLE_LOGIN_FAILED = 'APPLE_LOGIN_FAILED';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';
export const USER_EMAIL_CHECK = 'USER_EMAIL_CHECK';
export const USER_EMAIL_CHECK_SUCCESS = 'USER_EMAIL_CHECK_SUCCESS';
export const USER_EMAIL_CHECK_FAILED = 'USER_EMAIL_CHECK_FAILED';
export const USER_PHONE_CHECK = 'USER_PHONE_CHECK';
export const USER_PHONE_CHECK_SUCCESS = 'USER_PHONE_CHECK_SUCCESS';
export const USER_PHONE_CHECK_FAILED = 'USER_PHONE_CHECK_FAILED';
export const GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_FAILED = 'GET_COUNTRIES_FAILED';
export const GET_STATES_REQUEST = 'GET_STATES_REQUEST';
export const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS';
export const GET_STATES_FAILED = 'GET_STATES_FAILED';
export const GET_CITIES_REQUEST = 'GET_CITIES_REQUEST';
export const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';
export const GET_CITIES_FAILED = 'GET_CITIES_FAILED';

export const MESSAGE_COUNT = 'MESSAGE_COUNT';

//active screen message
export const ACTIVESTATE = 'ACTIVESTATE'; 

//notification delete constant
export const POST_DELETE_NOTIFY = 'POST_DELETE_NOTIFY';
export const POST_DELETE_NOTIFY_SUCCESS = 'POST_DELETE_NOTIFY_SUCCESS';
export const POST_DELETE_NOTIFY_FAILED = 'POST_DELETE_NOTIFY_FAILED';

//notification setting constant
export const NOTI_SETTING = 'NOTI_SETTING';
export const NOTI_SETTING_SUCCESS = 'NOTI_SETTING_SUCCESS';
export const NOTI_SETTING_FAILURE = 'NOTI_SETTING_FAILURE';

//Change Mob constant
export const CHANGEMOB = 'CHANGEMOB';
export const CHANGEMOB_SUCCESS = 'CHANGEMOB_SUCCESS';
export const CHANGEMOB_FAILURE = 'CHANGEMOB_FAILURE';

//Contact us constant
export const CONTACTUS = 'CONTACTUS';
export const CONTACTUS_SUCCESS = 'CONTACTUS_SUCCESS';
export const CONTACTUS_FAILURE = 'CONTACTUS_FAILURE';

//Report Problem constant
export const REPORT_PROBLEM = 'REPORT_PROBLEM';
export const REPORT_PROBLEM_SUCCESS = 'REPORT_PROBLEM_SUCCESS';
export const REPORT_PROBLEM_FAILURE = 'REPORT_PROBLEM_FAILURE';

//Change password constant
export const CHANGEPASS = 'CHANGEPASS';
export const CHANGEPASS_SUCCESS = 'CHANGEPASS_SUCCESS';
export const CHANGEPASS_FAILURE = 'CHANGEPASS_FAILURE';

//Between us constant
export const BETWEEN_US = 'BETWEEN_US';
export const BETWEEN_US_SUCCESS = 'BETWEEN_US_SUCCESS';
export const BETWEEN_US_FAILURE = 'BETWEEN_US_FAILURE';

//Delete chat message constant
export const DELETE_CHAT = 'DELETE_CHAT';
export const DELETE_CHAT_SUCCESS = 'DELETE_CHAT_SUCCESS';
export const DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE';

//Report post user constant
export const USER_POST_REPORT = 'USER_POST_REPORT';
export const USER_POST_REPORT_SUCCESS = 'USER_POST_REPORT_SUCCESS';
export const USER_POST_REPORT_FAILURE = 'USER_POST_REPORT_FAILURE';

//addContact constant
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const ADD_CONTACTS_SUCCESS = 'ADD_CONTACTS_SUCCESS';
export const ADD_CONTACTS_FAILURE = 'ADD_CONTACTS_FAILURE';

//get WorkList constant
export const UPDATE_USER_WORK = 'UPDATE_USER_WORK';
export const UPDATE_USER_WORK_SUCCESS = 'UPDATE_USER_WORK_SUCCESS';
export const UPDATE_USER_WORK_FAILED = 'UPDATE_USER_WORK_FAILED';

//get GET_SHARED_MOMENTS_COMMENTS constant
export const GET_SHARED_MOMENTS_COMMENTS = 'GET_SHARED_MOMENTS_COMMENTS';
export const GET_SHARED_MOMENTS_COMMENTS_SUCCESS =
  'GET_SHARED_MOMENTS_COMMENTS_SUCCESS';
export const GET_SHARED_MOMENTS_COMMENTS_FAILED =
  'GET_SHARED_MOMENTS_COMMENTS_FAILED';

//get POST_SHARED_COMMENTS constant
export const POST_SHARED_COMMENTS = 'POST_SHARED_COMMENTS';
export const POST_SHARED_COMMENTS_SUCCESS = 'POST_SHARED_COMMENTS_SUCCESS';
export const POST_SHARED_COMMENTS_FAILED = 'POST_SHARED_COMMENTS_FAILED';

export const WORK_LIST = 'WORK_LIST';
export const WORK_LIST_SUCCESS = 'WORK_LIST_SUCCESS';
export const WORK_LIST_FAILED = 'WORK_LIST_FAILED';

//get POST_WORKING_WITH_ME_COMMENTS constant
export const POST_WORKING_WITH_ME_COMMENTS = 'POST_WORKING_WITH_ME_COMMENTS';
export const POST_WORKING_WITH_ME_COMMENTS_SUCCESS =
  'POST_WORKING_WITH_ME_COMMENTS_SUCCESS';
export const POST_WORKING_WITH_ME_COMMENTS_FAILED =
  'POST_WORKING_WITH_ME_COMMENTS_FAILED';

//get GET_WORK_WITH_ME_MOMENTS_COMMENTS constant
export const GET_WORK_WITH_ME_MOMENTS_COMMENTS =
  'GET_WORK_WITH_ME_MOMENTS_COMMENTS';
export const GET_WORK_WITH_ME_MOMENTS_SUCCESS =
  'GET_WORK_WITH_ME_MOMENTS_SUCCESS';
export const GET_WORK_WITH_ME_MOMENTS_FAILED =
  'GET_WORK_WITH_ME_MOMENTS_FAILED';

//get GET_WORK_WITH_ME_MOMENTS_COMMENTS constant
export const LIKE_ON_SHARED_COMMENTS = 'LIKE_ON_SHARED_COMMENTS';
export const LIKE_ON_SHARED_COMMENTS_SUCCESS =
  'LIKE_ON_SHARED_COMMENTS_SUCCESS';
export const LIKE_ON_SHARED_COMMENTS_FAILED = 'LIKE_ON_SHARED_COMMENTS_FAILED';

//get LIKE_ON_WORK_WITH_ME_COMMENTS constant
export const LIKE_ON_WORK_WITH_ME_COMMENTS = 'LIKE_ON_WORK_WITH_ME_COMMENTS';
export const LIKE_ON_WORK_WITH_ME_COMMENTS_SUCCESS =
  'LIKE_ON_WORK_WITH_ME_COMMENTS_SUCCESS';
export const LIKE_ON_WORK_WITH_ME_COMMENTS_FAILED =
  'LIKE_ON_WORK_WITH_ME_COMMENTS_FAILED';

//get GET_CONNECTION_MUTUAL_LIST constant
export const GET_CONNECTION_MUTUAL_LIST = 'GET_CONNECTION_MUTUAL_LIST';
export const GET_CONNECTION_MUTUAL_LIST_SUCCESS =
  'GET_CONNECTION_MUTUAL_LIST_SUCCESS';
export const GET_CONNECTION_MUTUAL_LIST_FAILED =
  'GET_CONNECTION_MUTUAL_LIST_FAILED';

//get GET_INVITE_CONNECTION_LIST constant
export const GET_INVITE_CONNECTION_LIST = 'GET_INVITE_CONNECTION_LIST';
export const GET_INVITE_CONNECTION_LIST_SUCCESS =
  'GET_INVITE_CONNECTION_LIST_SUCCESS';
export const GET_INVITE_CONNECTION_LIST_FAILED =
  'GET_INVITE_CONNECTION_LIST_FAILED';

//get GET_SHARED_INSIGHT_LIST constant
export const GET_SHARED_INSIGHT_LIST = 'GET_SHARED_INSIGHT_LIST';
export const GET_SHARED_INSIGHT_LIST_SUCCESS =
  'GET_SHARED_INSIGHT_LIST_SUCCESS';
export const GET_SHARED_INSIGHT_LIST_FAILED = 'GET_SHARED_INSIGHT_LIST_FAILED';

//get GET_RECOMMENDED_LIST constant
export const GET_RECOMMENDED_LIST = 'GET_RECOMMENDED_LIST';
export const GET_RECOMMENDED_LIST_SUCCESS = 'GET_RECOMMENDED_LIST_SUCCESS';
export const GET_RECOMMENDED_LIST_FAILED = 'GET_RECOMMENDED_LIST_FAILED';

//get POST_END_USER_CONNECTION_LINK constant
export const POST_END_USER_CONNECTION_LINK = 'POST_END_USER_CONNECTION_LINK';
export const POST_END_USER_CONNECTION_LINK_SUCCESS =
  'POST_END_USER_CONNECTION_LINK_SUCCESS';
export const POST_END_USER_CONNECTION_LINK_FAILED =
  'POST_END_USER_CONNECTION_LINK_FAILED';

//get NEW_USER_FEEDLIST constant
export const NEW_USER_FEEDLIST = 'NEW_USER_FEEDLIST';
export const NEW_USER_FEEDLIST_SUCCESS = 'NEW_USER_FEEDLIST_SUCCESS';
export const NEW_USER_FEEDLIST_FAILED = 'NEW_USER_FEEDLIST_FAILED';

//Insight like constant
export const INSIGHT_LIKE = 'INSIGHT_LIKE';
export const INSIGHT_LIKE_SUCCESS = 'INSIGHT_LIKE_SUCCESS';
export const INSIGHT_LIKE_FAILURE = 'INSIGHT_LIKE_FAILURE';

//Insight comment constant
export const INSIGHT_COMMENT = 'INSIGHT_COMMENT';
export const INSIGHT_COMMENT_SUCCESS = 'INSIGHT_COMMENT_SUCCESS';
export const INSIGHT_COMMENT_FAILED = 'INSIGHT_COMMENT_FAILED';

export const GET_INSIGHT_COMMENT = 'GET_INSIGHT_COMMENT';
export const GET_INSIGHT_COMMENT_SUCCESS = 'GET_INSIGHT_COMMENT_SUCCESS';
export const GET_INSIGHT_COMMENT_FAILED = 'GET_INSIGHT_COMMENT_FAILED';

export const LIKE_ON_INSIGHT_COMMENTS = 'LIKE_ON_INSIGHT_COMMENTS';
export const LIKE_ON_INSIGHT_COMMENTS_SUCCESS =
  'LIKE_ON_INSIGHT_COMMENTS_SUCCESS';
export const LIKE_ON_INSIGHT_COMMENTS_FAILED =
  'LIKE_ON_INSIGHT_COMMENTS_FAILED';

//Badges comment constant
export const BADGES_COMMENT = 'BADGES_COMMENT';
export const BADGES_COMMENT_SUCCESS = 'BADGES_COMMENT_SUCCESS';
export const BADGES_COMMENT_FAILED = 'BADGES_COMMENT_FAILED';

export const GET_BADGES_COMMENT = 'GET_BADGES_COMMENT';
export const GET_BADGES_COMMENT_SUCCESS = 'GET_BADGES_COMMENT_SUCCESS';
export const GET_BADGES_COMMENT_FAILED = 'GET_BADGES_COMMENT_FAILED';

export const LIKE_ON_BADGE_COMMENTS = 'LIKE_ON_BADGE_COMMENTS';
export const LIKE_ON_BADGE_COMMENTS_SUCCESS = 'LIKE_ON_BADGE_COMMENTS_SUCCESS';
export const LIKE_ON_BADGE_COMMENTS_FAILED = 'LIKE_ON_BADGE_COMMENTS_FAILED';
//get Education List constant
export const GET_EDUCATION = 'GET_EDUCATION';
export const GET_EDUCATION_LIST_SUCCESS = 'GET_EDUCATION_LIST_SUCCESS';
export const GET_EDUCATION_LIST_FAILED = 'GET_EDUCATION_LIST_FAILED';

//get Linked Team List constant
export const GET_LINKED_TEAM = 'GET_LINKED_TEAM';
export const GET_LINKED_TEAM_SUCCESS = 'GET_LINKED_TEAM_SUCCESS';
export const GET_LINKED_TEAM_FAILED = 'GET_LINKED_TEAM_FAILED';

//post UserProfile List constant
export const POST_USER_FILTER = 'POST_USER_FILTER';
export const POST_USER_FILTER_SUCCESS = 'POST_USER_FILTER_SUCCESS';
export const POST_USER_FILTER_FAILED = 'POST_USER_FILTER_FAILED';

//post userSuggestion List constant
export const POST_USER_SUGGESTION = 'POST_USER_SUGGESTION';
export const POST_USER_SUGGESTION_SUCCESS = 'POST_USER_SUGGESTION_SUCCESS';
export const POST_USER_SUGGESTION_FAILED = 'POST_USER_SUGGESTION_FAILED';

//post userLink  constant
export const POST_SEND_LINK = 'POST_SEND_LINK';
export const POST_SEND_LINK_SUCCESS = 'POST_SEND_LINK_SUCCESS';
export const POST_SEND_LINK_FAILED = 'POST_SEND_LINK_FAILED';

//post POST_TEAM_SUGGESTION  constant
export const POST_TEAM_SUGGESTION = 'POST_TEAM_SUGGESTION';
export const POST_TEAM_SUGGESTION_SUCCESS = 'POST_TEAM_SUGGESTION_SUCCESS';
export const POST_TEAM_SUGGESTION_FAILED = 'POST_TEAM_SUGGESTION_FAILED';

//post POST_ADD_USER_TEAM_MEMBER  constant
export const POST_ADD_USER_TEAM_MEMBER = 'POST_ADD_USER_TEAM_MEMBER';
export const POST_ADD_USER_TEAM_MEMBER_SUCCESS =
  'POST_ADD_USER_TEAM_MEMBER_SUCCESS';
export const POST_ADD_USER_TEAM_MEMBER_FAILED =
  'POST_ADD_USER_TEAM_MEMBER_FAILED';

//Feed posts constant
export const FEED_POST = 'FEED_POST';
export const FEED_POST_SUCCESS = 'FEED_POST_SUCCESS';
export const FEED_POST_FAILED = 'FEED_POST_FAILED';

//Add Education Certificate constant
export const ADD_USER_EDUCATION = 'ADD_USER_EDUCATION';
export const ADD_USER_EDUCATION_SUCCESS = 'ADD_USER_EDUCATION_SUCCESS';
export const ADD_USER_EDUCATION_FAILED = 'ADD_USER_EDUCATION_FAILED';

//Add User Certificate constant
export const ADD_USER_CERTIFICATE = 'ADD_USER_CERTIFICATE';
export const ADD_USER_CERTIFICATE_SUCCESS = 'ADD_USER_CERTIFICATE_SUCCESS';
export const ADD_USER_CERTIFICATE_FAILED = 'ADD_USER_CERTIFICATE_FAILED';

//Edit Education Certificate constant
export const EDIT_USER_EDUCATION = 'EDIT_USER_EDUCATION';
export const EDIT_USER_EDUCATION_SUCCESS = 'EDIT_USER_EDUCATION_SUCCESS';
export const EDIT_USER_EDUCATION_FAILED = 'EDIT_USER_EDUCATION_FAILED';

//Edit User Certificate constant
export const UPDATE_USER_CERTIFICATE = 'UPDATE_USER_CERTIFICATE';
export const UPDATE_USER_CERTIFICATE_SUCCESS =
  'UPDATE_USER_CERTIFICATE_SUCCESS';
export const UPDATE_USER_CERTIFICATE_FAILED = 'UPDATE_USER_CERTIFICATE_FAILED';

//get certificate List constant
export const GET_CERTIFICATE = 'GET_CERTIFICATE';
export const GET_CERTIFICATE_LIST_SUCCESS = 'GET_CERTIFICATE_LIST_SUCCESS';
export const GET_CERTIFICATE_LIST_FAILED = 'GET_CERTIFICATE_LIST_FAILED';

//Add WorkList constant
export const USER_WORK = 'USER_WORK';
export const USER_WORK_SUCCESS = 'USER_WORK_SUCCESS';
export const USER_WORK_FAILED = 'USER_WORK_FAILED';

//update profile constant
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';

//Forgot password constant
export const FORGET_PASSWORD_CALL = 'FORGET_PASSWORD_CALL';
export const FORGET_PASSWORD_SUCCESS = 'FORGET_PASSWORD_SUCCESS';
export const FORGET_PASSWORD_FAILURE = 'FORGET_PASSWORD_FAILURE';

//Get Badges constant
export const GET_BADGES = 'GET_BADGES';
export const GET_BADGES_SUCCESS = 'GET_BADGES_SUCCESS';
export const GET_BADGES_FAILURE = 'GET_BADGES_FAILURE';

//endUser badges

export const GET_USER_BADGES = 'GET_USER_BADGES';
export const GET_USER_BADGES_SUCCESS = 'GET_USER_BADGES_SUCCESS';
export const GET_USER_BADGES_FAILURE = 'GET_USER_BADGES_FAILURE';

export const ADD_USER_BADGES = 'ADD_USER_BADGES';
export const ADD_USER_BADGES_SUCCESS = 'ADD_USER_BADGES_SUCCESS';
export const ADD_USER_BADGES_FAILED = 'ADD_USER_BADGES_FAILED';

//Get GET_WORK_WITH_ME constant
export const GET_WORK_WITH_ME = 'GET_WORK_WITH_ME';
export const GET_WORK_WITH_ME_SUCCESS = 'GET_WORK_WITH_ME_SUCCESS';
export const GET_WORK_WITH_ME_FAILURE = 'GET_WORK_WITH_ME_FAILURE';

//Get show hide ans constant
export const GET_SHOW_HIDE_ANS = 'GET_SHOW_HIDE_ANS';
export const GET_SHOW_HIDE_ANS_SUCCESS = 'GET_SHOW_HIDE_ANS_SUCCESS';
export const GET_SHOW_HIDE_ANS_FAILURE = 'GET_SHOW_HIDE_ANS_FAILURE';

//Get Badges status constant
export const GET_STATUS_BADGES = 'GET_STATUS_BADGES';
export const GET_STATUS_BADGES_SUCCESS = 'GET_STATUS_BADGES_SUCCESS';
export const GET_STATUS_BADGES_FAILURE = 'GET_STATUS_BADGES_FAILURE';

export const SUGGEST_BADGES = 'SUGGEST_BADGES';
export const SUGGEST_BADGES_SUCCESS = 'SUGGEST_BADGES_SUCCESS';
export const SUGGEST_BADGES_FAILURE = 'SUGGEST_BADGES_FAILURE';

//Get Profile constant
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

//Get share moments
export const GET_SHARE_MOMENTS = 'GET_SHARE_MOMENTS';
export const GET_SHARE_MOMENTS_SUCCESS = 'GET_SHARE_MOMENTS_SUCCESS';
export const GET_SHARE_MOMENTS_FAILURE = 'GET_SHARE_MOMENTS_FAILURE';

export const DELETE_SHARE_MOMENTS = 'DELETE_SHARE_MOMENTS';
export const DELETE_SHARE_MOMENTS_SUCCESS = 'DELETE_SHARE_MOMENTS_SUCCESS';
export const DELETE_SHARE_MOMENTS_FAILURE = 'DELETE_SHARE_MOMENTS_FAILURE';

export const EDIT_SHARE_MOMENTS = 'EDIT_SHARE_MOMENTS';
export const EDIT_SHARE_MOMENTS_SUCCESS = 'EDIT_SHARE_MOMENTS_SUCCESS';
export const EDIT_SHARE_MOMENTS_FAILURE = 'EDIT_SHARE_MOMENTS_FAILURE';

export const LIKE_SHARE_MOMENTS = 'LIKE_SHARE_MOMENTS';
export const LIKE_SHARE_MOMENTS_SUCCESS = 'LIKE_SHARE_MOMENTS_SUCCESS';
export const LIKE_SHARE_MOMENTS_FAILURE = 'LIKE_SHARE_MOMENTS_FAILURE';

export const LIKE_WORK_WITH_ME = 'LIKE_WORK_WITH_ME';
export const LIKE_WORK_WITH_ME_SUCCESS = 'LIKE_WORK_WITH_ME_SUCCESS';
export const LIKE_WORK_WITH_ME_FAILURE = 'LIKE_WORK_WITH_ME_FAILURE';

export const LIKE_BADGES = 'LIKE_BADGES';
export const LIKE_BADGES_SUCCESS = 'LIKE_BADGES_SUCCESS';
export const LIKE_BADGES_FAILURE = 'LIKE_BADGES_FAILURE';
//Get Team list
export const GET_TEAM = 'GET_TEAM';
export const GET_TEAM_SUCCESS = 'GET_TEAM_SUCCESS';
export const GET_TEAM_FAILURE = 'GET_TEAM_FAILURE';

//Update User Question constant
export const UPDATE_USER_QUESTION = 'UPDATE_USER_QUESTION';
export const UPDATE_USER_QUESTION_SUCCESS = 'UPDATE_USER_QUESTION_SUCCESS';
export const UPDATE_USER_QUESTION_FAILED = 'UPDATE_USER_QUESTION_FAILED';

//get AnswerPrompt constant
export const GET_ANSWER_PROMPT = 'GET_ANSWER_PROMPT';
export const GET_ANSWER_PROMPT_SUCCESS = 'GET_ANSWER_PROMPT_SUCCESS';
export const GET_ANSWER_PROMPT_FAILED = 'GET_ANSWER_PROMPT_FAILED';

//get GET_ALL_QUEST_ANSWER constant
export const GET_ALL_QUEST_ANSWER = 'GET_ALL_QUEST_ANSWER';
export const GET_ALL_QUEST_ANSWER_SUCCESS = 'GET_ALL_QUEST_ANSWER_SUCCESS';
export const GET_ALL_QUEST_ANSWER_FAILED = 'GET_ALL_QUEST_ANSWER_FAILED';

//get POST_CREATE_ROOM constant
export const POST_CREATE_ROOM = 'POST_CREATE_ROOM';
export const POST_CREATE_ROOM_SUCCESS = 'POST_CREATE_ROOM_SUCCESS';
export const POST_CREATE_ROOM_FAILED = 'POST_CREATE_ROOM_FAILED';

//get POST_CHAT_HISTORY constant
export const POST_CHAT_HISTORY = 'POST_CHAT_HISTORY';
export const POST_CHAT_HISTORY_SUCCESS = 'POST_CHAT_HISTORY_SUCCESS';
export const POST_CHAT_HISTORY_FAILED = 'POST_CHAT_HISTORY_FAILED';

//get POST_CHAT_LIST constant
export const POST_CHAT_LIST = 'POST_CHAT_LIST';
export const POST_CHAT_LIST_SUCCESS = 'POST_CHAT_LIST_SUCCESS';
export const POST_CHAT_LIST_FAILED = 'POST_CHAT_LIST_FAILED';

// OTP verify
export const OTP_VERIFY_CALL = 'OTP_VERIFY_CALL';
export const OTP_VERIFY_SUCCESS = 'OTP_VERIFY_SUCCESS';
export const OTP_VERIFY_FAILURE = 'OTP_VERIFY_FAILURE';

//Email OTP verify
export const EMAIL_OTP_VERIFY_CALL = 'EMAIL_OTP_VERIFY_CALL';
export const EMAIL_OTP_VERIFY_SUCCESS = 'EMAIL_OTP_VERIFY_SUCCESS';
export const EMAIL_OTP_VERIFY_FAILURE = 'EMAIL_OTP_VERIFY_FAILURE';

// Create password
export const CREATE_PASSWORD_CALL = 'CREATE_PASSWORD_CALL';
export const CREATE_PASSWORD_SUCCESS = 'CREATE_PASSWORD_SUCCESS';
export const CREATE_PASSWORD_FAILURE = 'CREATE_PASSWORD_FAILURE';

//Questions constant
export const GET_QUESTIONS_CALL = 'GET_QUESTIONS_CALL';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILURE = 'GET_QUESTIONS_FAILURE';
export const ON_ANSER_SELECT = 'ON_ANSWER_SELECT';
export const SEND_QUESTIONS_CALL = 'SEND_QUESTIONS_CALL';
export const SEND_QUESTIONS_SUCCESS = 'SEND_QUESTIONS_SUCCESS';
export const SEND_QUESTIONS_FAILURE = 'SEND_QUESTIONS_FAILURE';
export const NEXT_QUESTION_CLICK = 'NEXT_QUESTION_CLICK';

//prompt constant
export const SAVE_PRMPT_CALL = 'SAVE_PRMPT_CALL';
export const SAVE_PRMPT_SUCCESS = 'SAVE_PRMPT_SUCCESS';
export const SAVE_PRMPT_FAILURE = 'SAVE_PRMPT_FAILURE';

export const UPLOAD_MEDIA_REQUEST = 'UPLOAD_MEDIA_REQUEST';
export const UPLOAD_MEDIA_SUCCESS = 'UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_FAILURE = 'UPLOAD_MEDIA_FAILURE';

//AsyncStorage constants
export const AUTHORIZATION = 'Authorization';
export const USER_EMAIL = 'USER_EMAIL';
export const USER_FIRSTNAME = 'USER_FIRSTNAME';
export const USER_LASTNAME = 'USER_LASTNAME';
export const USER_ID = 'USER_ID';

//API End points
export const API_FORGOT_PASSWORD = 'forgot_password_new';
export const API_LOGIN = 'login_new_user';
export const API_VERIFY_OTP = 'verify_otp';
export const EMAIL_API_VERIFY_OTP = 'resetOtpMatch';
export const API_CREATE_PASSWORD = 'reset_password_new';
export const API_GET_QUESTIONS = 'get_questions';
export const API_SAVE_QUESTIONS = 'AddQuestionAnswar';
export const API_GET_BADGES = 'getUserBadgesStatus';
export const API_GET_WORK_LIST = 'getUserWorklist';
export const API_GET_EDUCATION_LIST = 'getUserEducation';

export const API_GET_LINKED_TEAM_LIST = 'usersLinkconnectList';
export const API_POST_USER_PROFILE_FILTER = 'userProfileFilter';

export const API_GET_CERTIFICATEAPI_LIST = 'getUserCertificate';
export const API_GET_CONNECTIONMUTUAL_LIST = 'usersLinkconnectListMutual';
export const API_GET_INVITECONNECTION_LIST = 'inviteToPitchLinkconnectList';

export const API_GET_PEOPLE_SHAREDINSIGHT_LIST = 'PeopleWithSharedInsights';
export const API_GET_RECOMMENDED_LIST = 'recommendedConnectionList';
export const API_POST_END_USER_LINK_MUTUAL = 'enduserLinkconnectListMutual';

export const API_ADD_USER_EDUCATION = 'addUserEducation';
export const API_EDIT_USER_EDUCATION = 'updateUserEducation';

export const API_ADD_USER_CERTIFICATE = 'addUserCertificate';
export const API_UPDATE_USER_CERTIFICATE = 'updateUserCertificate';
export const API_UPDATE_USER_QUESTION = 'updateUserQuestion';
export const API_POST_USER_SUGGESTION = 'userSuggestionFilter';
export const API_POST_SEND_LINK = 'usersLinkSend';

export const API_ADD_CONTACTS = 'AddUserContactList';

export const API_FEED_POSTS = 'userFeedList';
export const API_NEW_FEED_POSTS = 'newuserFeedList';
export const API_USER_POST_REPORT = 'userPostReport';
export const API_INSIGHT_LIKE = 'doinsightpostlike';
export const API_INSIGHT_COMMENT = 'doinsightpostcomments';

//post EndUserProfile List constant
export const POST_END_USER_PROFILE = 'POST_END_USER_PROFILE';
export const POST_END_USER_PROFILE_SUCCESS = 'POST_END_USER_PROFILE_SUCCESS';
export const POST_END_USER_PROFILE_FAILED = 'POST_END_USER_PROFILE_FAILED';

export const API_HIDE_SHOW_ANS = 'hideShowAns';
export const API_GET_BADGES_STATUS = 'changeBadgestatus';
export const API_ADD_WORK_LIST = 'addUserWork';
export const API_GET_PROFILE = 'get_profile';
export const API_UPDATE_PROFILE = 'profile_update_new';
export const API_GET_SHARE_MOMENTS = 'listShareMoment';
export const API_DELETE_SHARE_MOMENTS = 'deleteShareMoment';
export const API_EDIT_SHARE_MOMENTS = 'editShareMoment';
export const API_SUGGEST_BADGES = 'userBadgeSuggest';

export const API_GET_USER_BADGES = 'getAdminEndUserBadges';
export const API_ADD_END_USER_BADGES = 'removeEndUserBadges';
export const API_POST_END_USER_PROFILE = 'userProfileDetails';
export const API_UPDATE_USER_WORK = 'updateUserWork';
export const API_GET_TEAM = 'userTeamMemberList';
export const API_LIKE_SHARE_MOMENTS = 'dosharedmomentlike';
export const API_LIKE_WORK_WITH_ME = 'dolike';

/**
 * @Brands Constants
 */
export const GET_ALL_BRANDS = 'GET_ALL_BRANDS';
export const GET_ALL_BRANDS_SUCCESS = 'GET_ALL_BRANDS_SUCCESS';
export const GET_ALL_BRANDS_FAILURE = 'GET_ALL_BRANDS_FAILURE';

// Messages
export const MSG_VALID_DOB = 'Enter Valid DOB';
export const MSG_TITLE = 'Any Message Title';
export const MSG_ENTER_VALID_EMAIL = 'Please enter valid email address';
export const MSG_ENTER_VALID_PASSWORD = 'Please enter valid password';
export const MSG_ENTER_VALID_PHONE = 'Please enter valid phone number';
export const MSG_PASSWORD_MATCH = 'Both password must match';
export const MSG_ENTER_VALID_OTP = 'Please enter valid OTP';

export const MSG_ENTER_VALID_NAME = 'Please enter valid name';
export const MSG_ENTER_VALID_CONFIRMPASSWORD =
  'Please enter correct password again';
export const MSG_ENTER_VALID_CITY = 'Please enter valid city';
export const MSG_ENTER_VALID_STATE = 'Please enter valid state';
export const MSG_ENTER_VALID_COUNTRY = 'Please enter valid country';
export const MSG_ENTER_VALID_AGREED = 'Please accept Terms & conditions';
// image constants 'TODO specify correct assets path'
// export const HOME_INACTIVE = require('@assets/');
// export const HOME_ACTIVE = require('@assets/');

// Screen uri constants
export const BONUS_URI = 'https://www.xyz.com/app/bonus/';
export const FAQS_URI = 'https://www.xyz.com/app/faq/';

// Style Constants
export const POSITION_ABSOLUTE = 'absolute';
export const POSITION_RELATIVE = 'relative';
export const CENTER = 'center';
export const UNDEFINED = 'undefined';
export const SPACE_BETWEEN = 'space-between';
export const FLEX_START = 'flex-start';
export const FLEX_END = 'flex-end';
export const ROW = 'row';
export const COLUMN = 'column';
export const WINDOW = 'window';
export const PLATFORM_ANDROID = 'android';
export const PLATFORM_IOS = 'ios';
export const POSITION_RIGHT = 'right';
export const SPACE_AROUND = 'space-around';
export const STRETCH = 'stretch';
export const CONTAIN = 'contain';
export const BOLD = 'bold';
