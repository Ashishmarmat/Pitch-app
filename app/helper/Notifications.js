import AsyncStorage from '@react-native-community/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';

export const firebaseConfig = {
  apiKey: 'AIzaSyAwf7VqpITkLjht8Zg1zaJ1xk87Ffyzc-8',
  authDomain: 'pitch-305109.firebaseapp.com',
  projectId: 'pitch-305109',
  storageBucket: 'pitch-305109.appspot.com',
  messagingSenderId: '974205608421',
  appId: '1:974205608421:web:9f6f711dc1b4ed18228f0c',
  measurementId: 'G-VYJBSGYV76',
};

const setupNotifications = async () => {
  // 1
  const checkPermission = async () => {
    const hasPermission = await firebase.messaging().hasPermission();
    console.log('hasPermission', hasPermission);
    if (!hasPermission) {
      console.log('inside if');
      getToken();
    } else {
      requestPermission();
    }
  };

  checkPermission()
    .then(() => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        console.log('firebase apps already running...');
        getNotification();
      }
    })
    .catch(e => {
      console.log(e);
    });

  // 2
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // user has authorized
      getToken();
    } catch (e) {
      // user rejected permission
      console.log('permission rejected');
    }
  };

  const getNotification = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  // 3
  const getToken = async () => {
    // let fcmToken = await AsyncStorage.getItem('fcmToken')
    const fcmToken = await firebase.messaging().getToken();
    console.log('FCM Token -> ', fcmToken);
    //     if (!fcmToken) {
    //         fcmToken = await firebase.messaging().getToken()

    //         if (fcmToken) {
    //             // user has a device token
    //             await AsyncStorage.setItem('FcmToken', fcmToken)
    //         }
    //     }
  };
  console.log('Welcome to React Native!');
};

export default setupNotifications;
