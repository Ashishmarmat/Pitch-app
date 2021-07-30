import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Fonts} from '../../theme';
import strings from '../../theme/strings';
import CreateVideoCard from '../atoms/CreateVideoCard';
import FabButton from '../atoms/FabButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderImageTitle from '../atoms/HeaderImageTitle';
import CommonStyles from './CommonStyles';

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: Fonts.size.size_32,
    fontFamily: Fonts.fontName.GibsonBold,
    color: Colors.createVideoTitleText,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: verticalScale(25),
  },
  bottomTextStyle: {
    color: Colors.black,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.fontName.GibsonBold,
    marginTop: verticalScale(10),
  },
  styl: {
    flex: 1,
    paddingHorizontal: scale(53),
    paddingVertical: verticalScale(16),
  },
});

interface CreateVideoMolecule {
  title: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  step1Text: string;
  step2Text: string;
  step3Text: string;
  step4Text: string;
  step5Title: string;
  step5Text: string;
  onNextClick: () => void;
  isFifthStepNeeded: boolean;
}

const defaultProps: CreateVideoMolecule = {
  title: '',
  step1Title: '',
  step2Title: '',
  step3Title: '',
  step4Title: '',
  step1Text: '',
  step2Text: '',
  step3Text: '',
  step4Text: '',
  step5Title: '',
  step5Text: '',
  onNextClick: () => {},
  isFifthStepNeeded: false,
};

const CreateVideoMolecule = (props: CreateVideoMolecule) => {
  return (
    <View style={CommonStyles.flex}>
      <HeaderImageTitle />
      <KeyboardAwareScrollView
        style={CommonStyles.flex}
        contentContainerStyle={styles.styl}>
        <Text style={styles.titleTextStyle}>{props.title}</Text>

        <CreateVideoCard
          stepTitle={props.step1Title}
          stepText={props.step1Text}
        />

        <CreateVideoCard
          stepTitle={props.step2Title}
          stepText={props.step2Text}
        />

        <CreateVideoCard
          stepTitle={props.step3Title}
          stepText={props.step3Text}
        />
        <CreateVideoCard
          stepTitle={props.step4Title}
          stepText={props.step4Text}
        />
        {props.step5Title ? (
          <CreateVideoCard
            stepTitle={props.step5Title}
            stepText={props.step5Text}
          />
        ) : null}
        {props.step5Title ? (
          <Text style={styles.bottomTextStyle}>{strings.THIS_VIDEO}</Text>
        ) : null}
      </KeyboardAwareScrollView>
      <FabButton enable onClick={props.onNextClick} />
    </View>
  );
};

CreateVideoMolecule.defaultProps = defaultProps;
export default CreateVideoMolecule;
