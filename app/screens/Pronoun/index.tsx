import React, {useState, useEffect} from 'react';
import PronounMolecule from '../../components/molecule/PronounMolecule';
import NavigationService from '../../services/NavigationService';
import Validators from '../../utils/Validators';
import showToast from '../../utils/ShowToast';

let validationItems = [
  {id: 'a', value: 'He/Him/His', isValid: false},
  {id: 'b', value: 'She/Her/Hers', isValid: false},
  {id: 'c', value: 'They/Them/Theirs', isValid: false},
  {id: 'd', value: 'Other', isValid: false},
  {id: 'e', value: 'Ze/Hir/Hirs', isValid: false},
  {id: 'f', value: 'Ze/Zir/Zirs', isValid: false},
  {id: 'g', value: 'Prefer Not To Say', isValid: false},
];
const PronounScreen = props => {
  const [array, setArray] = useState(validationItems);
  const [data, setData] = useState('');
  const [reset, setState] = useState(false);
  const [enable, setEnable] = useState(false);
  const [uiRender, setUiRender] = useState(false);

  useEffect(() => {
    console.log('qwerty');
    for(let item of validationItems){
      if(item.isValid === true){
        item.isValid = false;
      }
    }
    setUiRender(!uiRender);
  }, [])

  console.log('data', data);

  const goToNext = () => {
    if (data === '') {
      showToast('Please select pronoun');
    } else {
      NavigationService.navigate('Work', {
        email: props.navigation.getParam('email'),
        name: props.navigation.getParam('name'),
        password: props.navigation.getParam('password'),
        mobile: props.navigation.getParam('mobile'),
        city: props.navigation.getParam('city'),
        state: props.navigation.getParam('state'),
        country: props.navigation.getParam('country'),
        dob: props.navigation.getParam('dob'),
        signup_type: props.navigation.getParam('signup_type'),
        apple_user_id: props.navigation.getParam('apple_user_id'),
        pronoun: data,
      });
    }
  };

  // useEffect(() => {
  //   setArray([])
  // }, []);

  return (
    <PronounMolecule
      onNextClick={() => {
        goToNext();
      }}
      data={array}
      isEnable={enable}
      onItemSelect={({id}) => {
        for (let index = 0; index < array.length; index++) {
          if (id === array[index].id) {
            array[index].isValid = true;
            setData(array[index].value);
            setEnable(true);
          } else {
            array[index].isValid = false;
          }
        }
        setArray[array];
        setState(!reset);
      }}
    />
  );
};

export default PronounScreen;
