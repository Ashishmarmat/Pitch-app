import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import CreatePasswordScreenMolecule from '../../components/molecule/CreatePasswordScreenMolecule';
import {View} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';
import * as CONST from '../../utils/Constants';
import createPasswordAPI from '../../actions/CreatePasswordActions';
import Validators from '../../utils/Validators';
import showToast from '../../utils/ShowToast';
import AsyncStorage from '@react-native-community/async-storage';

const CreatePasswordScreen = props => {
  const [new_password, setPassword] = useState('');
  const [confirm_new_password, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, seToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem(CONST.USER_EMAIL).then(userEmail => {
      setEmail(userEmail);
    });
    getToken()
  }, [email]);

  const getToken = async() => {
    const tokenA = await AsyncStorage.getItem('RESETTOKEN');
    seToken(tokenA);
  }

  return (
    <View style={CommonStyles.flex}>
      <CreatePasswordScreenMolecule
        onConfirmPasswordChange={(str: string) => {
          setConfirmPassword(str);
        }}
        onPasswordChange={(str: string) => {
          setPassword(str);
        }}
        onChangePasswordClick={() => {
          if (!Validators.validPassword(new_password)) {
            showToast(CONST.MSG_ENTER_VALID_PASSWORD);
          } else if (new_password !== confirm_new_password) {
            showToast(CONST.MSG_PASSWORD_MATCH);
          } else {
            dispatch(
              createPasswordAPI({new_password, token}),
            );
          }
        }}
        loader={props.loader}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    error: state.ForgotPasswordReducer.error,
    data: state.ForgotPasswordReducer.data,
    loader: state.ForgotPasswordReducer.loader,
  };
};

const mapDispatchToProps = dispatch => ({
  createPasswordCall: params => {
    dispatch(createPasswordAPI(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePasswordScreen);
