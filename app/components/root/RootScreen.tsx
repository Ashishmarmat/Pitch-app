import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import NavigationService from '../../services/NavigationService';
import AppNavigator from '../../navigators/AppNavigator';
import styles from './RootScreenStyle';
import startUp from '../../actions/StartUpActions';
import messaging, { firebase } from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { chatlistApi, messageCount } from '../../actions/MessagesAction';

const RootScreen = () => {
  // async componentDidMount() {
  //   this.props.startUp();
  // }
  const dispatch = useDispatch();
  const activeRes = useSelector(state => state.MessagesReducer.ActiveStateRes);
  const chatListRes = useSelector(state => state.MessagesReducer.chatListData);
  const [UserMessageData, setUserMessageData] = useState('');
  const [User_Id, setUser_Id] = useState('');

  console.log('activeRes@', activeRes);

  const getUserId = async () => {
    const user_Id = await AsyncStorage.getItem('USER_ID');
    console.log('user_Id', user_Id);
    setUser_Id(user_Id);
  };
  useEffect(() => {
    getUserId();
  }, []);
  console.log('User_Id', User_Id);

  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    let unreadArray = [];
    if (chatListRes != undefined && chatListRes.data != undefined) {
      for (let item of chatListRes.data) {
        if (item.unread_count) {
          unreadArray.push(item.unread_count);
        }
      }
      const countNum = unreadArray.reduce((a, b) => a + b, 0);
      dispatch(messageCount(countNum));
    }
  }, [chatListRes]);


  useEffect(() => {
      if (requestUserPermission()) {
        /**
         * Returns an FCM token for this device
         */
        messaging()
          .getToken()
          .then(fcmToken => {
            // Alert.alert('FCM Token asdf -------> ', fcmToken);
            AsyncStorage.setItem('FcmToken', fcmToken);
          });
      } else console.log('Not Authorization status:');
      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            console.log(
              'getInitialNotification:' +
              'Notification caused app to open from quit state',
            );
            console.log(remoteMessage);
            console.log(
              'getInitialNotification: Notification caused app to' +
              ' open from quit state',
            );
            const senddata = remoteMessage.data.my_key;
            const jsonData = JSON.parse(senddata);
            if (remoteMessage.notification && remoteMessage.notification.title) {
              if (remoteMessage.notification.title == 'Message') {
                const asdf = {
                  roomId: jsonData.roomId,
                  selectItem: {
                    user_id: User_Id,
                    receiver_id: jsonData.id,
                    full_name: jsonData.full_name,
                    profile_file: jsonData.profile_file,
                    image_type: jsonData.image_type,
                  },
                };
                console.log('navigation console', asdf);
                NavigationService.navigate('MessageChatScreen', asdf);
              }
            }
          }
        });

      /**
       * When the user presses a notification displayed via FCM,
       * this listener will be called if the app has opened from
       * a background state. See `getInitialNotification` to see
       * how to watch for when a notification opens the app from
       * a quit state.
       */
      messaging().onNotificationOpenedApp(async remoteMessage => {
        // const UserMessageData=remoteMessage.data.my_key
        if (remoteMessage) {
          console.log('background navigate', remoteMessage.data.my_key);
          const senddata = remoteMessage.data.my_key;
          const jsonData = JSON.parse(senddata);
          setUserMessageData(jsonData);
          console.log('jsonData', jsonData);
          console.log('remoteMessage opened', remoteMessage);
          if (remoteMessage.notification && remoteMessage.notification.title) {
            if (remoteMessage.notification.title == 'Message') {
              const asdf = {
                roomId: jsonData.roomId,
                selectItem: {
                  user_id: User_Id,
                  receiver_id: jsonData.id,
                  full_name: jsonData.full_name,
                  profile_file: '',
                  image_type: 1,
                },
              };
              console.log('navigation console', asdf);
              NavigationService.navigate('MessageChatScreen', asdf);
            }
          }
          console.log(
            'onNotificationOpenedApp: ' +
            'Notification caused app to open from background state',
          );

          console.log(
            'onNotificationOpenedApp: Notification caused app to' +
            ' open from background state',
          );
        }
      });
      console.log('UserMessageData', UserMessageData);

      /**
       * Set a message handler function which is called when
       * the app is in the background or terminated. In Android,
       * a headless task is created, allowing you to access the
       * React Native environment to perform tasks such as updating
       * local storage, or sending a network request.
       */
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });

      /**
       * When any FCM payload is received, the listener callback
       * is called with a `RemoteMessage`. Returns an unsubscribe
       * function to stop listening for new messages.
       */
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
        console.log('A new FCM message arrived!', remoteMessage);
        await notifee.displayNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          android: {
            channelId,
          },
        });
        getChatList();
      });

      const getChatList = async () => {
        const user_Id = await AsyncStorage.getItem('USER_ID');
        const sendData = {
          userId: Number(user_Id),
        };
        dispatch(chatlistApi(sendData));
      };

      /**
       * Apps can subscribe to a topic, which allows the FCM
       * server to send targeted messages to only those devices
       * subscribed to that topic.
       */

      return () => {
        unsubscribe;
        /**
         * Unsubscribe the device from a topic.
         */
        // messaging().unsubscribeFromTopic(TOPIC);
      };
  }, []);

  return (
    <View style={styles.container}>
      <AppNavigator
        // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  startUp: () => dispatch(startUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
