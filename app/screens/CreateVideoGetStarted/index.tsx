import React from 'react';
import CreateVideoMolecule from '../../components/molecule/CreateVideoMolecule';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';

const CreateVideoGetStarted = () => {
  return (
    <CreateVideoMolecule
      title={strings.VIDEO_GET_STARTED}
      step1Title={strings.step1Title}
      step2Title={strings.step2Title}
      step3Title={strings.step3Title}
      step4Title={strings.step4Title}
      step1Text={strings.step1Text}
      step2Text={strings.step2Text}
      step3Text={strings.step3Text}
      step4Text={strings.step4Text}
      step5Title={strings.step5Title}
      step5Text={strings.step5Text}
      onNextClick={() => {
        NavigationService.navigate('UploadVideo');
      }}
    />
  );
};

export default CreateVideoGetStarted;
