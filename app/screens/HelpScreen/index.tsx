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
import strings from '../../theme/strings';
import {ScrollView} from 'react-native-gesture-handler';
import NavigationService from '../../services/NavigationService';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import ReportProblem from '../../actions/ReportProblem';

const HelpScreen = props => {
  const dispatch = useDispatch();
  const bottomSheet = createRef();

  const options = [
    'Cancel',
    <Text style={styles.ActionOptionTextStyle}>Spam or Abuse</Text>,
    <Text style={styles.ActionOptionTextStyle}>Something isn't working</Text>,
    <Text style={styles.ActionOptionTextStyle}>General Feedback</Text>,
  ];

  const ActionBtnFunc = index => {
    if (index !== 0) {
      if (index === 1) {
        dispatch(ReportProblem({report: 'Spam or Abuse'}));
      } else if (index === 2) {
        dispatch(ReportProblem({report: 'Something is not working'}));
      } else if (index === 3) {
        dispatch(ReportProblem({report: 'General FeedBack'}));
        // console.log('General FeedBack');
      }
    }
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
          <Text style={styles.titleTextStyle}>Help</Text>
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
      <View style={styles.lineView} />
      <TouchableOpacity
        onPress={() => bottomSheet?.current.show()}
        style={styles.BtnMainViewStyle}>
        <Text style={styles.toggleTextStyle}>{strings.REPORT_PROBLEM}</Text>
        <Image source={Images.back_button} style={styles.rightImageStyle} />
      </TouchableOpacity>
      <View style={styles.lineView} />
      <TouchableOpacity
        onPress={() => NavigationService.navigate('ContactUsScreen')}
        style={styles.BtnMainViewStyle}>
        <Text style={styles.toggleTextStyle}>{strings.CONTACT_US}</Text>
        <Image source={Images.back_button} style={styles.rightImageStyle} />
      </TouchableOpacity>
      <View style={styles.lineView} />
      <ActionSheet
        ref={bottomSheet}
        title={
          <Text style={styles.reportProblemTextStyle}>Report a problem</Text>
        }
        options={options}
        cancelButtonIndex={0}
        destructiveButtonIndex={4}
        onPress={index => ActionBtnFunc(index)}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(HelpScreen);

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
  lineView: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEBEB',
  },
  BtnMainViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
  },
  toggleTextStyle: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  reportProblemTextStyle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  ActionOptionTextStyle: {
    color: '#007AFF',
    fontSize: 17,
  },
});
