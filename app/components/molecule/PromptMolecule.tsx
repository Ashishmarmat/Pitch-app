import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
};
const PromptMolecule = (props: QuestionMoleculeProps) => (
  <View style={styles.containerStyle}>
    <AppHeader
      handleBackPress={props.handleBackPress}
      showProgressBar={false}
      onBackClick={props.onBackClick}
    />
    <KeyboardAwareScrollView
      style={styles.containerStyle}
      contentContainerStyle={{
        ...CommonStyles.flex,
        marginTop: verticalScale(59),
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
        <View style={styles.listContainerStyle}>
          {props.answerType === QuestionTypes.single ||
          props.answerType === QuestionTypes.multiple ||
          props.answerType === QuestionTypes.core ? (
            props.answerType === QuestionTypes.core ? (
              <FlatList
                data={props.data}
                style={{marginTop: verticalScale(34)}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => props.onItemClick(item)}
                    style={
                      item.isValid
                        ? styles.roundedlistItemContainer
                        : styles.roundedlistItemContainerChecked
                    }>
                    <Text
                      style={
                        item.isValid
                          ? styles.roundedvalidTextStyle
                          : styles.roundedinValidTextStyle
                      }>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            ) : (
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
                    ) : null}
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
            )
          ) : (
            <CustomTextInput
              label={strings.HINT_ANSWER}
              style={styles.inputStyle}
              placeholderTextColor={'#C4C4C4'}
              multiline={true}
              onChange={props.onChange}
            />
          )}
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
      {/* </View> */}
    </KeyboardAwareScrollView>
  </View>
);

PromptMolecule.defaultProps = defaultProps;

export default PromptMolecule;

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
  },
  listStyle: {
    marginTop: scale(3),
  },
  checkedStyle: {
    width: scale(18),
    height: scale(18),
    alignSelf: 'center',
  },
  listText: {
    fontSize: Fonts.size.size_17,
    color: Colors.purpleAnswerText,
    padding: scale(5),
    width: '100%',
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listTextSelected: {
    padding: scale(5),
    fontSize: Fonts.size.size_17,
    color: Colors.white,
    width: '100%',
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: scale(5),
    flexDirection: 'row',
    borderWidth: 1,
    flex: 1,
    padding: scale(10),
    marginBottom: verticalScale(9),
    borderColor: Colors.greyAnswerBorder,
  },
  listItemContainerChecked: {
    backgroundColor: Colors.primary,
    borderRadius: scale(5),
    marginBottom: verticalScale(9),
    padding: scale(10),
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.primary,
  },
  questionTextStyle: {
    fontSize: Fonts.size.size_17,
    color: Colors.black,
    marginVertical: verticalScale(10),
    textAlign: 'center',
    fontFamily: Fonts.fontName.GibsonBold,
  },
  questionHintTextStyle: {
    fontSize: Fonts.size.size_17,
    color: Colors.borderGrey,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    fontFamily: Fonts.fontName.GibsonBold,
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
  roundedlistItemContainer: {
    marginHorizontal: scale(2),
    backgroundColor: Colors.primary,
    borderRadius: scale(50),
    marginVertical: verticalScale(5),
    height: verticalScale(36),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: scale(2),
    borderColor: Colors.primary,
    paddingHorizontal: scale(10),
  },
  roundedlistItemContainerChecked: {
    marginHorizontal: scale(2),
    backgroundColor: Colors.white,
    borderRadius: scale(50),
    marginVertical: verticalScale(5),
    height: verticalScale(36),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    borderColor: Colors.borderGrey,
    borderWidth: scale(2),
  },
  roundedlistContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(102),
  },
  roundedvalidTextStyle: {
    fontSize: Fonts.size.size_16,
    color: Colors.white,
    fontFamily: Fonts.fontName.GibsonRegular,
    paddingHorizontal: scale(15),
  },
  roundedinValidTextStyle: {
    fontSize: Fonts.size.size_16,
    color: Colors.black,
    paddingHorizontal: scale(15),
    fontFamily: Fonts.fontName.GibsonRegular,
  },
});
