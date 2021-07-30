import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View, Text, ImageBackground, Alert, StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import OnboardingMolecule from './Molecule/OnboardingMolecule';
import ActionButtons from '../../components/atoms/Actionbutton';
import NavigationService from '../../services/NavigationService';
import FabButton from '../../components/atoms/FabButton';
import {Colors, Images} from '../../theme';
import strings from '../../theme/strings';
import Contacts from 'react-native-contacts';
import addContacts from '../../actions/AddContact';
import AsyncStorage from '@react-native-community/async-storage';
import {chatHistorySuccess} from '../../actions/MessagesAction';
import {newuserFeedListSuccess} from '../../actions/NewFeedListAction';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 83, 251, 0.34)',
  },
});

const OnboardingTransitionScreenThree = () => {
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModelInv, setModelInvite] = useState(false);
  const [contactArray, setContactArray] = useState([]);

  //   useEffect(() => {
  //     Contacts.getAll().then(contacts => {
  //         console.log("contacts",contacts)
  //         setContactArray(contacts)
  //         // contacts returned
  //       })
  // }, []);

  useEffect(() => {
    AlertFunction();
    Contacts.getAll().then(contacts => {
      console.log('contacts', contacts);
      setContactArray(contacts);
    });
    dispatch(chatHistorySuccess())
    dispatch(newuserFeedListSuccess())
    // AlertFunction()
  }, []);

  const AlertFunction = async () => {
    const CheckValidate = await AsyncStorage.getItem('AllowContact');
    console.log('CheckValidate', CheckValidate);
    if (CheckValidate != 'Yes') {
      // contactPermission()
      inviteModalFunc();
      allowConFunc();
    }
  };
  const inviteModalFunc = () => {
    setModalVisible(false);
    callMethod();
  };
  const callMethod = () => {
    // console.log("kjghmnghjgk")
    setModelInvite(!isModelInv);
  };
  // const contactPermission = () => {
  //   inviteModalFunc()
  //   //function to make two option alert
  //   Alert.alert(
  //     //title
  //     '"Pitch" Would Like to Access your Contacts',
  //     //body
  //     'Pitch uses your contacts to make inviting team members more convenient.',
  //     [
  //       {
  //         text: 'Yes',
  //         onPress: () => allowConFunc()
  //       },
  //       {
  //         text: 'No',
  //         onPress: () => console.log("No pressed"), style: 'cancel'
  //       },
  //     ],
  //     { cancelable: false },
  //     //clicking out side of alert will not cancel
  //   );
  // };

  const allowConFunc = async () => {
    AsyncStorage.setItem('AllowContact', 'Yes');
    const sendData = {
      res: contactArray,
    };
    // console.log('addContacts sendData', sendData);
    // console.log('addContacts contactArray', contactArray);
    dispatch(addContacts(sendData));
  };

  return (
    <ImageBackground
      style={{width: '100%', height: '100%'}}
      source={require('../../../assets/images/FrontCover3.png')}>
      <View style={localStyles.container}>
        <OnboardingMolecule />
        <View style={{flex: 5, position: 'absolute'}}>
          <Text style={styles.text1}>
            Profiles with character lead to genuine conversations
          </Text>
          <Text style={styles.text2}>
            *Your answers may be displayed on your profile, you can decide which
            ones to show or hide later
          </Text>
        </View>
        <View style={{flex: 1}}></View>
        <FabButton
          enable={true}
          style={styles.fabStyle}
          onClick={() => {
            NavigationService.navigate('Questions');
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default OnboardingTransitionScreenThree;

let styles = StyleSheet.create({
  text1: {
    width: scale(257),
    height: scale(123),
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 30,
    top: scale(40),
    color: '#FFFFFF',
  },
  text2: {
    width: scale(270),
    height: scale(100),
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 18,
    left: 10,
    marginTop: scale(80),
    alignSelf: 'center',
    top: scale(40),
    color: '#FFFFFF',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
    backgroundColor: '#8653FB',
  },
});
