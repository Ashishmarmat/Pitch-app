import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextView from '../atoms/TextView';
import ActionButtons from '../atoms/Actionbutton';
import scale, {verticalScale} from '../../theme/scale';
import strings from '../../theme/strings';
import {Colors, Fonts} from '../../theme';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonStyles from './CommonStyles';
import Loader from '../atoms/Loader';

interface ListQuestionMoleculeProps {
  question: string;
  data: [{id: Number; questions: String}];
  onNextClick?: () => void;
  onItemClick?: (item: {}) => void;
  loader: boolean;
}

const defaultProps: ListQuestionMoleculeProps = {
  question: '',
  data: [{id: 0, questions: ''}],
  onNextClick: () => {},
  onItemClick: () => {},
  loader: false,
};
const ListQuestionMolecule = (props: ListQuestionMoleculeProps) => (
  <View style={styles.containerStyle}>
    <View style={styles.boxStyle}>
      <KeyboardAwareScrollView
        style={styles.innerBox}
        contentContainerStyle={CommonStyles.flex}
        enableOnAndroid={true}
        enableAutomaticScroll={true}>
        <TextView
          text={strings.CHOOSE_ANY_PROMPT}
          style={styles.questionTextStyle}
        />
        <View>
          <FlatList
            data={props.data}
            style={styles.listStyle}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => props.onItemClick(item)}
                style={styles.listItemContainer}>
                <Text style={styles.listText}>{item.questions}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={1}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
    <View style={styles.buttonViewStyle}>
      <ActionButtons
        onClick={props.onNextClick}
        title={strings.SKIP_FOR_NOW}
        buttonColor={Colors.white}
        textColor={Colors.grayText}
        borderColor={Colors.white}
        marginTop={verticalScale(20)}
      />
    </View>
    <Loader loader={props.loader} />
  </View>
);

ListQuestionMolecule.defaultProps = defaultProps;

export default ListQuestionMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  innerBox: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonViewStyle: {
    alignItems: 'center',
  },
  boxStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.lighGray,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(655),
    width: scale(335),
    alignSelf: 'center',
    borderWidth: scale(1),
    borderRadius: scale(35),
    padding: scale(32),
    marginTop: verticalScale(44),
  },
  listStyle: {
    marginTop: verticalScale(13),
  },
  listText: {
    fontSize: Fonts.size.size_17,
    color: Colors.purpleAnswerText,
    width: '100%',
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  listItemContainer: {
    backgroundColor: Colors.white,
    borderRadius: scale(5),
    flexDirection: 'row',
    borderWidth: 1,
    flex: 1,
    padding: scale(7),
    marginBottom: verticalScale(9),
    borderColor: Colors.greyAnswerBorder,
  },
  questionTextStyle: {
    fontSize: Fonts.size.size_17,
    color: Colors.black,
    marginVertical: verticalScale(10),
    textAlign: 'center',
    fontFamily: Fonts.fontName.GibsonBold,
  },
});
