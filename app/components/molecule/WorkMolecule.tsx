import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../atoms/CustomTextInput';
import scale, {verticalScale} from '../../theme/scale';
import FabButton from '../atoms/FabButton';
import strings from '../../theme/strings';
import HeaderImageMolecule from './HeaderImageMolecule';
import CommonStyles from './CommonStyles';
interface WorkMoleculeProps {
  onNextClick?: () => void;
  onTextChange: (str: string) => void;
  screenType: String;
  isEnable: boolean;
}
const srcType = 'work|job|school';
const defaultProps: WorkMoleculeProps = {
  onNextClick: () => {},
  onTextChange: () => {},
  screenType: srcType,
  isEnable: false,
};
function getTitle(type: String) {
  if (type === 'work') {
    return strings.WHERE_YOU_WORK;
  } else if (type === 'job') {
    return strings.JOB_TITLE;
  } else {
    return strings.LAST_SCHOOL_ATTENTED;
  }
}

function getScreenIcon(type: String) {
  if (type === 'work') {
    return Images.work;
  } else if (type === 'job') {
    return Images.job;
  } else {
    return Images.school;
  }
}
function getHint(type: String) {
  if (type === 'work') {
    return strings.ADD_WORK_PALCE;
  } else if (type === 'job') {
    return strings.ADD_JOB_TITLE;
  } else {
    return strings.ADD_SCHOOL;
  }
}

function getProgress(type: String) {
  if (type === 'work') {
    return 55;
  } else if (type === 'job') {
    return 65;
  } else {
    return 75;
  }
}
const WorkMolecule = (props: WorkMoleculeProps) => (
  <View style={CommonStyles.fabContainerStyle}>
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <View style={CommonStyles.flex}>
        <HeaderImageMolecule
          logo={getScreenIcon(props.screenType)}
          heading={getTitle(props.screenType)}
          subHeading={props.screenType === 'school' ? strings.SCHOOL_TITLE : ''}
          progress={getProgress(props.screenType)}
        />

        <View style={styles.container}>
          <CustomTextInput
            label={getHint(props.screenType)}
            secureEntry={false}
            placeholderTextColor={'#C4C4C4'}
            onChange={props.onTextChange}
            marginTop={verticalScale(57)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
    <FabButton enable={props.isEnable} onClick={props.onNextClick} />
  </View>
);

WorkMolecule.defaultProps = defaultProps;

export default WorkMolecule;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: scale(53),
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(150),
    marginRight: scale(10),
    top: verticalScale(250),
  },
});
