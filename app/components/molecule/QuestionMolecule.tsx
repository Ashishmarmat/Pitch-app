import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextView from '../atoms/TextView';
import CustomTextInput from '../atoms/CustomTextInput';
import ActionButtons from '../atoms/Actionbutton';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import {Colors, Fonts, Metrics} from '../../theme';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import AppHeader from '../atoms/AppHeader';
import {QuestionTypes} from '../../model';
import CommonStyles from './CommonStyles';
import Loader from '../atoms/Loader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface QuestionMoleculeProps {
  question: string;
  answerType: string;
  data: [{id: Number; value: String; isValid: Boolean}];
  onNextClick?: () => void;
  onItemClick?: (item: {}) => void;
  onChange?: (str: String) => void;
  onBackClick?: () => void;
  showBackButton: boolean;
  handleBackPress: boolean;
  loader: boolean;
  positionIndex: Number;
  GoToPrompt?: () => void;
}

const answerType = 'multiple| single| input';
const defaultProps: QuestionMoleculeProps = {
  question: '',
  answerType: answerType,
  data: [{id: 0, value: '', isValid: false}],
  onNextClick: () => {},
  onItemClick: () => {},
  onChange: () => {},
  onBackClick: () => {},
  showBackButton: true,
  handleBackPress: true,
  loader: false,
  positionIndex: 0,
  GoToPrompt: () => {},
};
const QuestionMolecule = (props: QuestionMoleculeProps) => (
  console.log('props.POsitionIndex', props.positionIndex),
  (
    <View style={styles.containerStyle}>
      {/* <AppHeader
      progress={85}
      textColorWhite={true}
      handleBackPress={props.handleBackPress}
      showBackButton={props.showBackButton}
      onBackClick={props.onBackClick}
    /> */}
      <KeyboardAwareScrollView
        style={styles.containerStyle}
        contentContainerStyle={{
          ...CommonStyles.flex,
          marginTop: verticalScale(30),
        }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}>
        <View style={styles.boxStyle}>
          <TextView text={props.question} style={styles.questionTextStyle} />
          {props.answerType === QuestionTypes.multiple ? (
            <TextView
              text={strings.SELECT_ALL}
              style={styles.questionHintTextStyle}
            />
          ) : null}
          {props.positionIndex === 3 ? (
            <Text style={styles.randomFactStyle}>
              “Share something fun or interesting. This will appear as your
              tagline on your profile”
            </Text>
          ) : null}
          <View style={styles.listContainerStyle}>
            {props.answerType === QuestionTypes.single ||
            props.answerType === QuestionTypes.multiple ||
            props.answerType === QuestionTypes.core ? (
              <FlatList
                data={props.data}
                style={styles.listStyle}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => props.onItemClick(item)}
                    style={
                      item.isValid
                        ? styles.listItemContainerChecked
                        : styles.listItemContainer
                    }>
                    {item.isValid ? (
                      <Image
                        resizeMode={'contain'}
                        style={styles.checkedStyle}
                        source={require('../../../assets/images/ic_checked_white.png')}
                      />
                    ) : (
                     null
                    )}
                    <Text
                      style={
                        item.isValid ? styles.listTextSelected : styles.listText
                      }>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={1}
              />
            ) : null}
            {props.answerType === QuestionTypes.input ? (
              <CustomTextInput
                label={strings.HINT_ANSWER}
                style={styles.inputStyle}
                multiline={true}
                placeholderTextColor={'#C4C4C4'}
                onChange={props.onChange}
              />
            ) : null}
          </View>

          <View style={{marginTop: scale(30), paddingHorizontal: scale(15)}}>
            <ActionButtons
              onClick={props.onNextClick}
              title={strings.Next}
              buttonColor={Colors.actionButtonColor}
              textColor={Colors.white}
              borderColor={Colors.actionButtonColor}
            />
          </View>
        </View>
        {props.positionIndex > 3 ? (
          <View style={{alignSelf: 'center', marginTop: 20}}>
            <TouchableOpacity
              onPress={props.GoToPrompt}
              style={{
                width: width / 2 + 80,
                height: 40,
                backgroundColor: '#fff',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#8650FD', fontWeight: 'bold', fontSize: 16}}>
                Go to Prompt
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* </View> */}
        {/* <Loader loader={props.loader} /> */}
      </KeyboardAwareScrollView>
    </View>
  )
);

QuestionMolecule.defaultProps = defaultProps;

export default QuestionMolecule;

let styles = StyleSheet.create({
  listContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  styleLowerContainer: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    justifyContent: 'flex-end',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boxStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.lighGray,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(538),
    width: scale(335),
    alignSelf: 'center',
    borderWidth: scale(1),
    borderRadius: scale(15),
    padding: scale(20),
    marginTop: scale(60),
  },
  listStyle: {
    marginTop: scale(3),
    width: '98%',
  },
  checkedStyle: {
    width: scale(18),
    height: scale(18),
    alignSelf: 'center',
  },
  listText: {
    fontSize: Fonts.size.size_17,
    color: Colors.purpleAnswerText,
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listTextSelected: {
    marginLeft: 9,
    fontSize: Fonts.size.size_17,
    color: Colors.white,
    width: width / 2,
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listItemContainer: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#C7C7C7',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    width: width - 90,
    alignItems: 'center',
    flex: 1,
  },
  listItemContainerChecked: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#C7C7C7',
    backgroundColor: Colors.primary,
    marginBottom: verticalScale(9),
    width: width - 90,
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    borderColor: Colors.primary,
  },
  questionTextStyle: {
    fontSize: Fonts.size.size_17,
    color: Colors.black,
    marginVertical: verticalScale(10),
    textAlign: 'center',
    fontFamily: Fonts.fontName.GibsonBold,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 17,
  },
  questionHintTextStyle: {
    fontSize: Fonts.size.size_17,
    color: Colors.borderGrey,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    fontFamily: Fonts.fontName.GibsonBold,
    fontWeight: 'normal',
  },
  inputStyle: {
    backgroundColor: Colors.white,
    height: verticalScale(109),
    width: scale(272),
    textAlignVertical: 'top',
    color: Colors.purpleAnswerText,
    borderRadius: scale(5),
    marginVertical: verticalScale(53),
    borderWidth: scale(1),
    padding: Metrics.paddingHorizontal10,
    borderColor: Colors.greyAnswerBorder,
  },
  buttonStyle: {
    backgroundColor: Colors.white,
    flex: 1,
    height: verticalScale(50),
    color: Colors.purpleAnswerText,
    borderRadius: scale(2),
    marginVertical: scale(3),
    borderWidth: scale(1),
    padding: Metrics.paddingHorizontal10,
    borderColor: Colors.greyAnswerBorder,
  },
  randomFactStyle: {
    fontSize: Fonts.size.size_14,
    color: Colors.borderGrey,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    fontFamily: Fonts.fontName.GibsonBold,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
