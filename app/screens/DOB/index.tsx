/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import DobMolecule from '../../components/molecule/DobMolecule';
import NavigationService from '../../services/NavigationService';
import {Alert} from 'react-native';
import {userSignUpAct} from '../../actions/SignUpAction';
import {connect, useDispatch} from 'react-redux';
import showToast from '../../utils/ShowToast';
import * as CONST from '../../utils/Constants';

const DOBScreen = props => {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('value ' + value);
  }, [show, value]);

  const onNextClick = () => {
    if (value == '') {
      showToast(CONST.MSG_VALID_DOB);
    } else {
      NavigationService.navigate('Pronoun', {
        email: props.navigation.getParam('email'),
        name: props.navigation.getParam('name'),
        password: props.navigation.getParam('password'),
        mobile: props.navigation.getParam('mobile'),
        city: props.navigation.getParam('city'),
        state: props.navigation.getParam('state'),
        country: props.navigation.getParam('country'),
        dob: new Date(value).toISOString().split('T')[0],
      });
    }
  };

  return (
    <DobMolecule
      onChange={(selectedDate: Date) => {
        // const date = selectedDate;
        // setShow(Platform.OS === 'ios');
        // setCurrentDate(date);
        setValue(selectedDate);
      }}
      showPicker={show}
      onNextClick={() => {
        // setShow(true)
        onNextClick();
      }}
      value={
        value !== '' &&
        new Date(value)
          .toISOString()
          .split('T')[0]
          .toString()
      }
      onFocus={() => setShow(true)}
    />
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  userSignUpAct,
})(DOBScreen);
