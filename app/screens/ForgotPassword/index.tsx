import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import ForgotPasswordScreenMolecule from '../../components/molecule/ForgotPasswordScreenMolecule';
import {View, Alert} from 'react-native';
import CommonStyles from '../../components/molecule/CommonStyles';
import forgotPassword from '../../actions/ForgotPasswordActions';
import Validators from '../../utils/Validators';
import showToast from '../../utils/ShowToast';
import * as CONST from '../../utils/Constants';
import NavigationService from '../../services/NavigationService';

const ForgotPasswordScreen = props => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={CommonStyles.flex}>
      <ForgotPasswordScreenMolecule
        onSendInsctructionClick={() => {
          if (!Validators.validEmail(email)) {
            showToast(CONST.MSG_ENTER_VALID_EMAIL);
            // Alert.alert('pppp');
          } else {
            dispatch(forgotPassword({email}));
            // NavigationService.navigate('Login')
          }
        }}
        onEmailChange={str => {
          setEmail(str.trim());
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
  forgotPasswordCall: params => {
    dispatch(forgotPassword(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen);
