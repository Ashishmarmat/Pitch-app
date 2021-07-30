import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LandingScreen from '../screens/Landing';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import EnterCode from '../screens/EnterCode';
import CreatePasswordScreen from '../screens/CreatePassword';
import JoinUsScreen from '../screens/JoinUs';
import CreatePasswordSignupScreen from '../screens/CreateSignupPassword';
import VerifyPhoneScreen from '../screens/VerifyPhone';
import AddPhoneScreen from '../screens/AddPhoneNumber';
import LocationScreen from '../screens/Location';
import DOBScreen from '../screens/DOB';
import Pronoun from '../screens/Pronoun';
import Work from '../screens/Work';
import Job from '../screens/Job';
import School from '../screens/School';
import MakeYourPitchScreen from '../screens/MakeYourPitch/MakeYourPitchComponent';
import YourPitchVideoScreen from '../screens/YourPitchVideo';
import CreateVideoScreen from '../screens/CreateVideo';
import CreateVideoGetStarted from '../screens/CreateVideoGetStarted';
import UploadVideo from '../screens/UploadVideo';
import UploadPhoto from '../screens/UploadPhoto';
import Questions from '../screens/Questions';
import ListQuestionsScreen from '../screens/ListQuestions';
import PromptItem from '../screens/PromptItem';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import TermsCondition from '../screens/TermsConditionScreen';
import PrivacyPolicy from '../screens/PrivacyPolicyScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from '../screens/HelpScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import EmailScreen from '../screens/AccountScreen/Emails/EmailScreen';
import PasswordChange from '../screens/AccountScreen/Emails/PasswordChange';
import PhonenoScreen from '../screens/AccountScreen/Emails/PhonenoScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeProfileScreen from '../screens/HomeProfileScreen';
import BadgeScreen from '../screens/BadgeScreen';
import WorkingWithMeScreen from '../screens/WorkingWithMeScreen';
import EditAnswerCard from '../screens/WorkingWithMeScreen/EditAnswerCard';
import EditListQuestions from '../screens/EditListQuestions';
import AnswerListScreen from '../screens/EditListQuestions/AnswerListScreen';
import EditPostScreen from '../screens/EditPostScreen';
import EditPostScreen2 from '../screens/EditPostScreen2';
import EditSharedMoments from '../screens/EditSharedMoments';
import EditTeamScreen from '../screens/EditTeamScreen';
import Workhistory from '../screens/Workhistory';
import EditDetailWorkHistory from '../screens/Workhistory/EditDetailWorkHistory';
import AddWorkHistory from '../screens/Workhistory/AddWorkHistory';
import SharedmomentsPhotos from '../screens/SharedMomentsPhotos';
import EducationListScreen from '../screens/EducationListScreen';
import EditEducation from '../screens/EditEducation';
import CreateEducationScreen from '../screens/CreateEducationScreen';
import CreateCertificateScreen from '../screens/CreateCertificateScreen';
import OnboardingTransitionScreen from '../screens/Onboarding/OnboardingScreen';
import OnboardingTransitionScreenOne from '../screens/Onboarding/OnboardingTransitionScreenOne';
import OnboardingTransitionScreenTwo from '../screens/Onboarding/OnboardingTransitionScreenTwo';
import OnboardingTransitionScreenThree from '../screens/Onboarding/OnboardingTransitionScreenThree';
import OnboardingScreenCover from '../screens/Onboarding/OnboardingScreenCover';
import OnboardingTransitionScreenFour from '../screens/Onboarding/OnboardingTransitionScreenFour';
import SkipCameraModal from '../screens/SkipCameraModal';
import EditCertificate from '../screens/EditCertificate/EditCertificate';
import HomeTabScreen from '../screens/HomeTabScreen/Index';
import SearchScreen from '../screens/HomeTabScreen/SearchScreen/Index';
import ConnectionTab from '../screens/ConnectionTab/Index';
import OtherUserProfileScreen from '../screens/OtherUserProfileScreen';
import AddbadgesScreen from '../screens/OtherUserProfileScreen/AddbadgesScreen';
import SeeAllWorkWithMeScreen from '../screens/OtherUserProfileScreen/SeeAllWorkWithMeScreen';
import SeeAllSharedMomentScreen from '../screens/OtherUserProfileScreen/SeeAllSharedMomentScreen';
import ShareMomentInfoScreen from '../screens/OtherUserProfileScreen/ShareMomentInfoScreen';
import WorkWithMedetailsScreen from '../screens/WorkingWithMeScreen/WorkWithMedetailsScreen';
import SampleVideoScreen from '../screens/SampleVideoScreen/index';
import WorkWithMeInfoScreen from '../screens/OtherUserProfileScreen/WorkWithMeInfoScreen';
import ConnectionList from '../screens/ConnectionsList';
import MutualAllList from '../screens/ConnectionsList/MutualAllList';
import SharedInsightScreen from '../screens/ConnectionTab/SharedInsightScreen';
import InviteToPichScreen from '../screens/ConnectionTab/InviteToPichScreen';
import RecommendedConnection from '../screens/ConnectionTab/RecommendedConnection';
import EndUserMutualList from '../screens/ConnectionsList/EndUserMutualList';
import EndUserCurrentSeeAll from '../screens/ConnectionsList/EndUserCurrentSeeAll';
import MessageList from '../screens/MessageList';
import MessageChatScreen from '../screens/MessageList/MessageChatScreen';
import InsightComment from '../screens/HomeTabScreen/InsightComment';
import BadgesCommentScreen from '../screens/HomeTabScreen/BadgesCommentScreen';
import ShareScreen from '../screens/ShareScreen';
import AnswerPrompt from '../screens/BottomTabbar/AnswerPrompt';
import QuestionTypes from '../screens/BottomTabbar/QuestionTypes';
import WantAnswerScreen from '../screens/HomeTabScreen/WantAnswerScreen';
import OpenShareMomentScreen from '../screens/HomeTabScreen/OpenShareMomentScreen';
import UserOpenShareMoment from '../screens/EditPostScreen/UserOpenShareMoment';
import FeedListScreen from '../screens/HomeTabScreen/FeedListScreen';
import BetweenUsScreen from '../screens/OtherUserProfileScreen/BetweenUsScreen';
import HomeProfileScreenNew from '../screens/HomeProfileScreenNew';
import AddNewTeam from '../screens/EditTeamScreen/AddNewTeam';
import Splash from '../screens/Splash';

const StackNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash
    },
    LandingScreen: {
      screen: LandingScreen,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
    Login: {
      screen: Login,
    },
    EnterCode: {
      screen: EnterCode,
    },
    CreatePasswordScreen: {
      screen: CreatePasswordScreen,
    },
    JoinUsScreen: {
      screen: JoinUsScreen,
    },
    CreateSignupPassword: {
      screen: CreatePasswordSignupScreen,
    },
    VerifyPhoneScreen: {
      screen: VerifyPhoneScreen,
    },
    AddPhoneScreen: {
      screen: AddPhoneScreen,
    },
    LocationScreen: {
      screen: LocationScreen,
    },
    DOBScreen: {
      screen: DOBScreen,
    },
    Pronoun: {
      screen: Pronoun,
    },
    Work: {
      screen: Work,
    },
    Job: {
      screen: Job,
    },
    School: {
      screen: School,
    },
    MakeYourPitchScreen: {
      screen: MakeYourPitchScreen,
    },
    YourPitchVideoScreen: {
      screen: YourPitchVideoScreen,
    },
    CreateVideoScreen: {
      screen: CreateVideoScreen,
    },
    CreateVideoGetStarted: {
      screen: CreateVideoGetStarted,
    },
    Questions: {
      screen: Questions,
    },
    UploadVideo: {
      screen: UploadVideo,
    },
    UploadPhoto: {
      screen: UploadPhoto,
    },
    SkipCameraModal: {
      screen: SkipCameraModal,
    },
    ListQuestionsScreen: {
      screen: ListQuestionsScreen,
    },
    PromptItem: {
      screen: PromptItem,
    },
    ProfileScreen: {
      screen: ProfileScreen,
    },
    SettingsScreen: {
      screen: SettingsScreen,
    },
    AccountScreen: {
      screen: AccountScreen,
    },
    TermsCondition: {
      screen: TermsCondition,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    NotificationScreen: {
      screen: NotificationScreen,
    },
    HelpScreen: {
      screen: HelpScreen,
    },
    ContactUsScreen: {
      screen: ContactUsScreen,
    },
    EmailScreen: {
      screen: EmailScreen,
    },
    PasswordChange: {
      screen: PasswordChange,
    },
    PhonenoScreen: {
      screen: PhonenoScreen,
    },
    HomeScreen: {
      screen: HomeScreen,
    },
    HomeProfileScreen: {
      screen: HomeProfileScreen,
    },
    BadgeScreen: {
      screen: BadgeScreen,
    },
    WorkingWithMeScreen: {
      screen: WorkingWithMeScreen,
    },
    EditAnswerCard: {
      screen: EditAnswerCard,
    },
    EditListQuestions: {
      screen: EditListQuestions,
    },
    AnswerListScreen: {
      screen: AnswerListScreen,
    },
    EditPostScreen: {
      screen: EditPostScreen,
    },
    EditPostScreen2: {
      screen: EditPostScreen2,
    },
    EditSharedMoments: {
      screen: EditSharedMoments,
    },
    EditTeamScreen: {
      screen: EditTeamScreen,
    },
    AddNewTeam: {
      screen: AddNewTeam,
    },
    Workhistory: {
      screen: Workhistory,
    },
    EditDetailWorkHistory: {
      screen: EditDetailWorkHistory,
    },
    AddWorkHistory: {
      screen: AddWorkHistory,
    },
    SharedmomentsPhotos: {
      screen: SharedmomentsPhotos,
    },
    EducationListScreen: {
      screen: EducationListScreen,
    },
    EditEducation: {
      screen: EditEducation,
    },
    EditCertificate: {
      screen: EditCertificate,
    },
    CreateEducationScreen: {
      screen: CreateEducationScreen,
    },
    CreateCertificateScreen: {
      screen: CreateCertificateScreen,
    },
    HomeTabScreen: {
      screen: HomeTabScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ConnectionTab: {
      screen: ConnectionTab,
    },
    ConnectionList: {
      screen: ConnectionList,
    },
    MutualAllList: {
      screen: MutualAllList,
    },
    MessageList: {
      screen: MessageList,
    },
    MessageChatScreen: {
      screen: MessageChatScreen,
    },
    ShareScreen: {
      screen: ShareScreen,
    },
    AnswerPrompt: {
      screen: AnswerPrompt,
    },
    QuestionTypes: {
      screen: QuestionTypes,
    },
    WantAnswerScreen: {
      screen: WantAnswerScreen,
    },
    EndUserMutualList: {
      screen: EndUserMutualList,
    },
    EndUserCurrentSeeAll: {
      screen: EndUserCurrentSeeAll,
    },
    SharedInsightScreen: {
      screen: SharedInsightScreen,
    },
    InviteToPichScreen: {
      screen: InviteToPichScreen,
    },
    RecommendedConnection: {
      screen: RecommendedConnection,
    },
    SearchScreen: {
      screen: SearchScreen,
    },
    OtherUserProfileScreen: {
      screen: OtherUserProfileScreen,
    },
    OnboardingTransitionScreen: {
      screen: OnboardingTransitionScreen,
    },
    OnboardingTransitionScreenOne: {
      screen: OnboardingTransitionScreenOne,
    },
    OnboardingTransitionScreenTwo: {
      screen: OnboardingTransitionScreenTwo,
    },
    OnboardingTransitionScreenThree: {
      screen: OnboardingTransitionScreenThree,
    },
    OnboardingScreenCover: {
      screen: OnboardingScreenCover,
    },
    OnboardingTransitionScreenFour: {
      screen: OnboardingTransitionScreenFour,
    },
    AddbadgesScreen: {
      screen: AddbadgesScreen,
    },
    SampleVideoScreen: {
      screen: SampleVideoScreen,
    },
    FeedListScreen: {
      screen: FeedListScreen,
    },
    SeeAllWorkWithMeScreen: {
      screen: SeeAllWorkWithMeScreen,
    },
    SeeAllSharedMomentScreen: {
      screen: SeeAllSharedMomentScreen,
    },
    WorkWithMedetailsScreen: {
      screen: WorkWithMedetailsScreen,
    },
    ShareMomentInfoScreen: {
      screen: ShareMomentInfoScreen,
    },
    WorkWithMeInfoScreen: {
      screen: WorkWithMeInfoScreen,
    },
    InsightComment: {
      screen: InsightComment,
    },
    BadgesCommentScreen: {
      screen: BadgesCommentScreen,
    },
    OpenShareMomentScreen: {
      screen: OpenShareMomentScreen,
    },
    UserOpenShareMoment: {
      screen: UserOpenShareMoment,
    },
    BetweenUsScreen: {
      screen: BetweenUsScreen,
    },
    HomeProfileScreenNew: {
      screen: HomeProfileScreenNew,
    },
  },

  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
export default createAppContainer(StackNavigator);
