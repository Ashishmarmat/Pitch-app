import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Images, Metrics} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import DatePicker from 'react-native-date-picker';
import FabButton from '../atoms/FabButton';
import strings from '../../theme/strings';
import HeaderImageMolecule from './HeaderImageMolecule';
import CommonStyles from './CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface DobMoleculeProps {
  onOpenPicker?: () => void;
  onNextClick?: () => void;
  showPicker: boolean;
  onChange: (event: Event, selectedDate: Date) => void;
  onFocus: () => void;
}

const defaultProps: DobMoleculeProps = {
  onOpenPicker: () => {},
  onNextClick: () => {},
  showPicker: false,
  onChange: () => {},
  onFocus: () => {},
};

const DobMolecule = (props: DobMoleculeProps) => (
  <View style={CommonStyles.fabContainerStyle}>
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <View style={styles.containerTop}>
        <HeaderImageMolecule
          logo={Images.birthday}
          heading={strings.BIRTHDAY_TITLE}
          subHeading={strings.BITHDAY_SUB_TITLE}
          progress={35}
        />
        <View style={styles.containerStyle}>
          <View style={styles.lowerBoxStyle}>
            {/* <CustomTextInput
              label={strings.DOB_HINT}
              secureEntry={false}
              // onChange={props.onChange}
              editable
              onFocus={props.onFocus}
              value={props.value}
              editable={false}
            /> */}
            <TouchableOpacity onPress={() => props.onFocus()}>
              <Text>{!props.value ? strings.DOB_HINT : props.value}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerBoxStyle}>
            {props.showPicker && (
              <DatePicker
                // date={new Date()}
                mode={'date'}
                onDateChange={props.onChange}
              />
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
    <FabButton
      onClick={props.onNextClick}
      style={{...CommonStyles.fabStyle, marginTop: verticalScale(318)}}
      enable={props.value ? strings.DOB_HINT : props.value}
    />
  </View>
);

DobMolecule.defaultProps = defaultProps;

export default DobMolecule;

let styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: scale(53),
  },
  lowerBoxStyle: {
    marginTop: verticalScale(51),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(5),
    backgroundColor: Colors.lighGray,
    width: scale(270),
    paddingVertical: scale(10),
    justifyContent: 'center',
  },
  pickerBoxStyle: {
    flexDirection: 'row',
    paddingHorizontal: scale(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: scale(50),
  },
  dobText: {
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: scale(20),
    borderRadius: scale(5),
    marginTop: scale(20),
    marginHorizontal: Metrics.paddingHorizontal,
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dayText: {
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: scale(20),
    borderRadius: scale(5),
  },
  monthContainer: {flex: 2, marginHorizontal: scale(10)},
  dayContainer: {flex: 1},
  monthText: {
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: scale(20),
    borderRadius: scale(5),
  },
  yearText: {
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: scale(20),
    borderRadius: scale(5),
  },
  yearContainer: {flex: 1, marginRight: scale(10)},
  dobBoxStyleNew: {
    marginTop: scale(31),
    flexDirection: 'row',
    paddingHorizontal: scale(28),
  },
});
