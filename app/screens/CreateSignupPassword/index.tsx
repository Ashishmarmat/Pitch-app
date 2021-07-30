import React, {useState} from 'react';
import {Linking} from 'react-native';
import SignupPasswordMolecule from '../../components/molecule/CreatePasswordSignup';
import NavigationService from '../../services/NavigationService';
import Validators from '../../utils/Validators';
import showToast from '../../utils/ShowToast';
import * as CONST from '../../utils/Constants';

let validationItems = [
  {id: 'a', value: 'Lower case letter', isValid: false},
  {id: 'b', value: 'Uppercase letter', isValid: false},
  {id: 'c', value: 'Numbers', isValid: false},
  {id: 'd', value: 'Special character', isValid: false},
  {id: 'e', value: 'At least 8 characters', isValid: false},
];
const CreatePasswordSignupScreen = props => {
  let [password, usePasswordChange] = useState('');
  let [confirmPassword, useConfirmPasswordChange] = useState('');
  let [isValidated, useIsValidated] = useState(false);
  let [isAgreed, useIsAgreed] = useState(false);

  const OnPasswordChange = text => {
    let localValidatedItems = false;
    if (Validators.validPassword(text)) {
      validationItems[4] = {
        id: 'e',
        value: 'At least 8 characters',
        isValid: true,
      };
      localValidatedItems = true;
    } else {
      validationItems[4] = {
        id: 'e',
        value: 'At least 8 characters',
        isValid: false,
      };
      localValidatedItems = false;
    }
    if (Validators.validLowerCase(text)) {
      localValidatedItems = true;
      validationItems[0] = {id: 'a', value: 'Lower case letter', isValid: true};
    } else {
      localValidatedItems = false;
      validationItems[0] = {
        id: 'a',
        value: 'Lower case letter',
        isValid: false,
      };
    }
    if (Validators.validUpperCase(text)) {
      console.log('If console', validationItems);
      localValidatedItems = true;
      validationItems[1] = {id: 'b', value: 'Uppercase letter', isValid: true};
    } else {
      console.log('else console', validationItems);
      localValidatedItems = false;
      validationItems[1] = {id: 'b', value: 'Uppercase letter', isValid: false};
    }
    if (Validators.validNumber(text)) {
      localValidatedItems = true;
      validationItems[2] = {id: 'c', value: 'Numbers', isValid: true};
    } else {
      localValidatedItems = false;
      validationItems[2] = {id: 'c', value: 'Numbers', isValid: false};
    }
    if (Validators.validSpecialCharacter(text)) {
      localValidatedItems = true;
      validationItems[3] = {id: 'd', value: 'Special character', isValid: true};
    } else {
      localValidatedItems = false;
      validationItems[3] = {
        id: 'd',
        value: 'Special character',
        isValid: false,
      };
    }
    useIsValidated(localValidatedItems);
    usePasswordChange(text);
  };

  const OnConfirmPasswordChange = text => {
    useConfirmPasswordChange(text);
  };

  const onClickSubmit = () => {
    if (confirmPassword === '' && !isValidated) {
      showToast(CONST.MSG_ENTER_VALID_PASSWORD);
    } else if (password !== confirmPassword) {
      showToast(CONST.MSG_ENTER_VALID_CONFIRMPASSWORD);
    } else if (!isAgreed) {
      showToast(CONST.MSG_ENTER_VALID_AGREED);
    } else {
      NavigationService.navigate('AddPhoneScreen', {
        email: props.navigation.getParam('email'),
        name: props.navigation.getParam('name'),
        signup_type: props.navigation.getParam('signup_type'),
        password,
      });
    }
  };

  const UseIsAgreed = () => {
    console.log('kgjkjkgkjgjkgjk');
    useIsAgreed(!isAgreed);
  };

  return (
    <SignupPasswordMolecule
      data={validationItems}
      isAgreed={isAgreed}
      isEnabled={isValidated && isAgreed}
      useIsAgreed={() => UseIsAgreed()}
      onPasswordChange={(str: String) => {
        console.log('password change' + str);
        OnPasswordChange(str);
      }}
      onConfirmPasswordChange={(str: String) => {
        OnConfirmPasswordChange(str);
        console.log('OnConfirmPasswordChange ' + str);
      }}
      onTermsClicked={() => {
        console.log('onTermsClicked ');
        Linking.canOpenURL('https://www.pitch-app.com/terms-and-condtions').then(supported => {
          if (supported) {
            Linking.openURL('https://www.pitch-app.com/terms-and-condtions');
          } else {
            console.log("Don't know how to open URI: https://www.pitch-app.com/terms-and-condtions");
          }
        });
      }}
      onNextClick={() => {
        onClickSubmit();
      }}
    />
  );
};

export default CreatePasswordSignupScreen;
