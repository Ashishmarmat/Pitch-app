import React, {useEffect, useState} from 'react';
import LocationMolecule from '../../components/molecule/LocationMolecule';
import NavigationService from '../../services/NavigationService';
import * as CONST from '../../utils/Constants';
import showToast from '../../utils/ShowToast';
import {connect, useDispatch} from 'react-redux';
import {
  getCountriesRequest,
  getStatesRequest,
  getCitiesRequest,
} from '../../actions/LocationActions';

const LocationScreen = props => {
  let [city, useCity] = useState({});
  let [state, onStateChange] = useState({});
  let [country, useCountry] = useState({});
  const [isNotEmpty, setEmpty] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const type = {
      code: '1',
      id: '233',
      name: 'United States',
    };
    OnSelectCountry(0, type);
    dispatch(getCountriesRequest());
  }, []);

  const OnSelectCountry = (index, value) => {
    console.log('jhff', value);
    const params = {
      country_id: value.id,
    };
    useCountry(value);
    dispatch(getStatesRequest(params));
  };

  const OnSelectState = (index, value) => {
    const params = {
      state_id: value.id,
    };
    onStateChange(value);
    dispatch(getCitiesRequest(params));
  };

  const OnSelectCity = (index, value) => {
    // const params = {
    //   country_id: value.id,
    // }
    // dispatch(getStatesRequest(params))
    useCity(value);
    setEmpty(true);
  };

  console.log('Location props', props);

  const onNextClick = () => {
    if (city.id === undefined) {
      showToast(CONST.MSG_ENTER_VALID_CITY);
    } else if (state.id === undefined) {
      showToast(CONST.MSG_ENTER_VALID_STATE);
    } else if (country.id === undefined) {
      showToast(CONST.MSG_ENTER_VALID_COUNTRY);
    } else {
      NavigationService.navigate('Pronoun', {
        email: props.navigation.getParam('email'),
        name: props.navigation.getParam('name'),
        password: props.navigation.getParam('password'),
        mobile: props.navigation.getParam('mobile'),
        signup_type: props.navigation.getParam('signup_type'),
        apple_user_id: props.navigation.getParam('apple_user_id'),
        city,
        state,
        country,
        dob: '',
      });
    }
  };

  const UseCountry = text => {
    console.log('country', text);
    useCountry(text);
  };

  const UseCity = text => {
    useCity(text);
  };

  return (
    <LocationMolecule
      onNextClick={() => {
        onNextClick();
      }}
      countriesResponse={props.countriesResponse}
      statesResponse={country.id === undefined ? [] : props.statesResponse}
      citiesResponse={
        country.id === undefined || state.id === undefined
          ? []
          : props.citiesResponse
      }
      onCityChange={text => UseCity(text)}
      onStateChange={text => onStateChange(text)}
      onCountryChange={text => UseCountry(text)}
      onSelectCountry={(index, value) => OnSelectCountry(index, value)}
      onSelectState={(index, value) => OnSelectState(index, value)}
      onSelectCity={(index, value) => OnSelectCity(index, value)}
      isEnable={isNotEmpty}
      // onSendClick={()=>{
      //  NavigationService.navigate('VerifyPhoneScreen');
      // }}
    />
  );
};

const mapStateToProps = state => {
  return {
    countriesResponse: state.LocationReducer.countriesResponse,
    statesResponse: state.LocationReducer.statesResponse,
    citiesResponse: state.LocationReducer.citiesResponse,
  };
};

export default connect(mapStateToProps, {
  getCountriesRequest,
  getStatesRequest,
  getCitiesRequest,
})(LocationScreen);
