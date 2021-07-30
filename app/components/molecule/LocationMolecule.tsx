import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Images, Metrics} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';
import FabButton from '../atoms/FabButton';
import strings from '../../theme/strings';
import HeaderImageMolecule from './HeaderImageMolecule';
import CommonStyles from './CommonStyles';
import CustomDropdown from '../atoms/CustomDropdown';
import NavigationService from '../../services/NavigationService';

interface LocationMoleculeProps {
  onCityChange?: (str: string) => void;
  onCountryChange?: (str: string) => void;
  onStateChange?: (str: string) => void;
  onNextClick?: () => void;
  isEnable: boolean;
}

const abc = (props, index, value) => {
  props.onSelectState(index, value);
  props.statesResponse = '';
};

const defaultProps: LocationMoleculeProps = {
  onCityChange: String,
  onCountryChange: String,
  onStateChange: String,
  onNextClick: () => {},
  isEnable: false,
};
const LocationMolecule = (props: LocationMoleculeProps) => (
  <View style={CommonStyles.fabContainerStyle}>
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}>
      <HeaderImageMolecule
        logo={Images.location}
        heading={strings.WHERE_YOU_LIVE}
        subHeading={strings.SET_LOCATION}
        progress={25}
      />
      <View style={styles.containerStyle}>
        {/* <CustomDropdown
          label={strings.COUNTRY_PLACEHOLDER}
          containerStyle={{}}
          textStyle={{}}
          onSelect={(index, value) => props.onSelectCountry(index, value)}
          options={props.countriesResponse}
          // disabled={true}
        /> */}
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.lighGray,
            height: 35,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: '5%', color: Colors.grayText}}>USA</Text>
        </View>
        <View style={styles.cityBoxStyleNew}>
          <CustomDropdown
            label={strings.STATE_PLACEHOLDER}
            disabled={props.countriesResponse.length === 0 ? true : false}
            textStyle={{}}
            // onSelect={(index, value) => props.onSelectState(index, value)}
            onSelect={(index, value) => abc(props, index, value)}
            options={props.statesResponse}
          />
          <View style={styles.cityContainer}>
            <CustomDropdown
              label={strings.CITY_PLACEHOLDER}
              // containerStyle={{marginTop: 0}}
              disabled={
                props.statesResponse && props.statesResponse.length === 0
                  ? true
                  : false
              }
              textStyle={{}}
              onSelect={(index, value) => props.onSelectCity(index, value)}
              options={props.citiesResponse}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
    <FabButton enable={props.isEnable} onClick={props.onNextClick} />
  </View>
);

LocationMolecule.defaultProps = defaultProps;

export default LocationMolecule;

let styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: scale(53),
    marginTop: verticalScale(59),
  },

  cityBoxStyle: {
    marginTop: scale(31),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityBoxStyleNew: {
    // marginTop: verticalScale(59),
    flexDirection: 'row',
  },
  countryBoxStyle: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityText: {
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: verticalScale(39),
    borderRadius: scale(10),
  },
  stateContainer: {
    flex: 1,
  },
  cityContainer: {
    flex: 2,
    marginLeft: scale(10),
  },
  stateText: {
    paddingHorizontal: Metrics.paddingHorizontal10,
    backgroundColor: Colors.lighGray,
    height: verticalScale(39),
    borderRadius: scale(10),
    flex: 1,
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
  },
});
