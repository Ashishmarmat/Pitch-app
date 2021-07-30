import {combineReducers} from 'redux';
import configureStore from '../stores/CreateStore';
import rootSaga from '../sagas';
import StartUpReducer from './StartUpReducer';
import LoginReducer from './LoginReducer';
import ForgotPasswordReducer from './ForgotPasswordReducer';
import SignupReducer from './SignupReducer';
import QuestionsReducer from './QuestionsReducer';
import PromptReducer from './PromptReducer';
import LocationReducer from './LocationReducer';
import UploadMediaReducer from './UploadMediaReducer';
import badgesReducer from './BadgesReducer';
import profileReducer from './ProfileReducer';
import updateProfileReducer from './UpdateProfileReducer';
import shareMomentsReducer from './ShareMomentsReducer';
import deleteShareMomentsReducer from './DeleteShareMomentsReducer';
import editShareMomentsReducer from './EditSharedMomentsReducer';
import badgesSuggestReducer from './BadgeSuggestRed';
import WorkWithMeReducer from './WorkWithMeReducer';
import WorkListReducer from './WorkListReducer';
import EducationListReducer from './EducationListReducer';
import PostWorkWithMeReducer from './PostWorkWithMeReducer';
import CertificateListReducer from './CertificateListReducer';
import AnswerPromptReducer from './AnswerPromptReducer';
import EditWorkWithMeReducer from './EditWorkWithMeReducer';
import UserLinkedReducer from './UserLinkedReducer';
import EndUserProfileReducer from './EndUserProfileReducer';
import EndUserBadgesReducer from './EndUserBadgesReducer';
import AddEndUserBadgesReducer from './AddEndUserBadgesReducer';
import TeamListReducer from './TeamListReducer';
import LikeShareMomentReducer from './LikeShareMomentReducer';
import LikeWorkWithMeReducer from './LikeWorkWithMeReducer';
import sharedMomentsCommentReducer from './sharedMomentsComentReducer';
import ConnectionReducer from './ConnectionReducer';
import AddContactReducer from './AddContactReducer';
import FeedPostReducer from './FeedPostReducer';
import UserPostReportReducer from './UserPostReportReducer';
import InsightLikeReducer from './InsightLikeReducer';
import LikeBadgesReducer from './LikeBadgesReducer';
import NewFeedListReducer from './NewFeedListReducer';
import MessagesReducer from './MessagesReducer';
import deleteChatReducer from './DeleteChatReducer';
import BetweenUsReducer from './BetweenUsReducer';
import ChangePassReducer from './ChangePassReducer';
import ReportProblemReducer from './ReportProblemReducer';
import ContactUsReducer from './ContactUsReducer';
import ChangeMobReducer from './ChangeMobReducer';
import NotiSettingReducer from './NotiSettingReducer';

export default () => {
  const rootReducer = combineReducers({
    StartUpReducer,
    LoginReducer,
    ForgotPasswordReducer,
    SignupReducer,
    QuestionsReducer,
    PromptReducer,
    LocationReducer,
    UploadMediaReducer,
    badgesReducer,
    profileReducer,
    updateProfileReducer,
    shareMomentsReducer,
    deleteShareMomentsReducer,
    editShareMomentsReducer,
    badgesSuggestReducer,
    WorkWithMeReducer,
    WorkListReducer,
    EducationListReducer,
    PostWorkWithMeReducer,
    CertificateListReducer,
    AnswerPromptReducer,
    EditWorkWithMeReducer,
    UserLinkedReducer,
    EndUserProfileReducer,
    EndUserBadgesReducer,
    AddEndUserBadgesReducer,
    TeamListReducer,
    LikeShareMomentReducer,
    LikeWorkWithMeReducer,
    sharedMomentsCommentReducer,
    ConnectionReducer,
    AddContactReducer,
    FeedPostReducer,
    UserPostReportReducer,
    InsightLikeReducer,
    LikeBadgesReducer,
    NewFeedListReducer,
    MessagesReducer,
    deleteChatReducer,
    BetweenUsReducer,
    ChangePassReducer,
    ReportProblemReducer,
    ContactUsReducer,
    ChangeMobReducer,
    NotiSettingReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
