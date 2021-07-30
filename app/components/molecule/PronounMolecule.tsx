import React from 'react';
import {Text, View, StyleSheet, FlatList, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Fonts, Images} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import FabButton from '../atoms/FabButton';
import strings from '../../theme/strings';
import HeaderImageMolecule from './HeaderImageMolecule';
import CommonStyles from './CommonStyles';

interface PronounMoleculeProps {
  onItemSelect?: (item: object) => void;
  onNextClick?: () => void;
  data: [{id: Number; value: String; isValid: Boolean}];
  isEnable: boolean;
}

const defaultProps: PronounMoleculeProps = {
  onNextClick: () => {},
  onItemSelect: ({}) => {},
  data: [{id: 0, value: '', isValid: false}],
  isEnable: false,
};

const PronounMolecule = (props: PronounMoleculeProps) => (
  console.log('Poprs pronoun', props),
  (
    <View style={CommonStyles.fabContainerStyle}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}>
        <View>
          <HeaderImageMolecule
            logo={Images.pronoun}
            heading={strings.PRONOUN}
            progress={45}
          />

          <View style={CommonStyles.containerStyle}>
            <View style={styles.listContainerStyle}>
              <FlatList
                data={props.data}
                renderItem={({item}) => (
                  <View
                    style={
                      item.isValid
                        ? styles.listItemContainer
                        : styles.listItemContainerChecked
                    }>
                    <Text
                      onPress={() => props.onItemSelect(item)}
                      style={
                        item.isValid
                          ? styles.validTextStyle
                          : styles.inValidTextStyle
                      }>
                      {item.value}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <FabButton enable={props.isEnable} onClick={props.onNextClick} />
    </View>
  )
);

PronounMolecule.defaultProps = defaultProps;

export default PronounMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  styleLowerContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? scale(35) : scale(10),
    justifyContent: 'flex-end',
  },

  listItemContainer: {
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
  listItemContainerChecked: {
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
  listContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(102),
  },
  validTextStyle: {
    fontSize: Fonts.size.size_15,
    color: Colors.white,
    fontFamily: Fonts.fontName.GibsonRegular,
    paddingHorizontal: scale(15),
  },
  inValidTextStyle: {
    fontSize: Fonts.size.size_15,
    color: Colors.black,
    paddingHorizontal: scale(15),
    fontFamily: Fonts.fontName.GibsonRegular,
  },
});
