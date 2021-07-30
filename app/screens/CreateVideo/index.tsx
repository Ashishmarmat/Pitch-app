import React from 'react';
import {View} from 'react-native';
import CreateVideoMolecule from '../../components/molecule/CreateVideoMolecule';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import CommonStyles from '../../components/molecule/CommonStyles';

const CreateVideoScreen = () => {
  return (
    <View style={CommonStyles.flex}>
      <CreateVideoMolecule
        title={strings.HOW_TO_CREATE_VIDEO_TEXT}
        step1Title={strings.stepTitle1}
        step2Title={strings.stepTitle2}
        step3Title={strings.stepTitle3}
        step4Title={strings.stepTitle4}
        step1Text={strings.stepText1}
        step2Text={strings.stepText2}
        step3Text={strings.stepText3}
        step4Text={strings.stepText4}
        onNextClick={() => NavigationService.navigate('CreateVideoGetStarted')}
      />
    </View>
  );
};
export default CreateVideoScreen;
