import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import NavigationService from '../../services/NavigationService';
import ActionButtons from '../../components/atoms/Actionbutton';
import ContactUs from '../../actions/ContactUs';

interface ContactUsScreenProps {
  onEmailChange?: (str: string) => void;
}

const defaultProps: ContactUsScreenProps = {
  onEmailChange: String,
};

const ContactUsScreen = (props: ContactUsScreenProps) => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');
  const submitFunc = () => {
    const sendData = {
      email: Email,
      message: Message,
    };
    console.log('sendData', sendData);
    dispatch(ContactUs(sendData));
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Contact Us</Text>
        </View>
        <View style={styles.settingImgMainView}>
          {/* <Image source={Images.settingBtn} style={styles.backImgStyle} /> */}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={{paddingHorizontal: 20}}>
        <Text style={{color: '#000', fontWeight: '600'}}>
          Your Email Address
        </Text>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(242, 242, 242, 0.7)',
            borderRadius: 5,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <CustomTextInput
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              height: scale(40),
              paddingHorizontal: 8,
            }}
            label={''}
            placeholderTextColor={'#C4C4C4'}
            secureEntry={false}
            marginTop={verticalScale(0)}
            // onChange={props.onEmailChange}
            onChange={text => setEmail(text)}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{color: '#000', fontWeight: '600'}}>
          Tell us what you need help with:
        </Text>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgba(242, 242, 242, 0.7)',
            borderRadius: 5,
            flexDirection: 'row',
            marginTop: 5,
            paddingHorizontal: 5,
          }}>
          <CustomTextInput
            style={{width: '100%', height: scale(80), paddingHorizontal: 8}}
            label={'Enter a topic, like "password issue"'}
            secureEntry={false}
            multiline={true}
            placeholderTextColor={'#C4C4C4'}
            marginTop={verticalScale(0)}
            // onChange={props.onEmailChange}
            onChange={text => setMessage(text)}
          />
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <ActionButtons
        disabled={
          Email.length > 0 && Message.length > 0 ? false : true
        }
          onClick={() => submitFunc()}
          title={'Submit'}
          buttonColor={
            Email.length > 0 && Message.length > 0 ? Colors.actionButtonColor : 'grey'
          }
          textColor={Colors.white}
          borderColor={Colors.white}
          marginTop={verticalScale(50)}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

ContactUsScreen.defaultProps = defaultProps;

export default connect(mapStateToProps, {})(ContactUsScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
});
