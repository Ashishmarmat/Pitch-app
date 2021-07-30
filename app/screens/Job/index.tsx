import React, {useState} from 'react';
import WorkMolecule from '../../components/molecule/WorkMolecule';
import NavigationService from '../../services/NavigationService';
import Validators from '../../utils/Validators';

const JobScreen = props => {
  const [isNotEmpty, setEmpty] = useState(false);
  const [data, setData] = useState('');

  return (
    <WorkMolecule
      onTextChange={str => {
        setData(str);
        setEmpty(!Validators.isEmpty(str));
      }}
      onNextClick={() => {
        if (isNotEmpty) {
          NavigationService.navigate('School', {
            email: props.navigation.getParam('email'),
            name: props.navigation.getParam('name'),
            password: props.navigation.getParam('password'),
            mobile: props.navigation.getParam('mobile'),
            city: props.navigation.getParam('city'),
            state: props.navigation.getParam('state'),
            country: props.navigation.getParam('country'),
            dob: props.navigation.getParam('dob'),
            work: props.navigation.getParam('work'),
            pronoun: props.navigation.getParam('pronoun'),
            signup_type: props.navigation.getParam('signup_type'),
            apple_user_id: props.navigation.getParam('apple_user_id'),
            job: data,
          });
        }
      }}
      screenType={'job'}
      isEnable={isNotEmpty}
    />
  );
};

export default JobScreen;
