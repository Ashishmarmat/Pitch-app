import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images, Metrics} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import ActionButtons from '../../components/atoms/Actionbutton';
import {ScrollView} from 'react-native-gesture-handler';
import {
  UpdateUserCertificateApi,
  UpdateUserCertificateSuccess,
} from '../../actions/CertificateAction';
import ModalDropdown from 'react-native-modal-dropdown-deprecated-support';
import {getEducation} from '../../actions/EducationActions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const yearArray = [
  {
    year: 1980,
  },
  {
    year: 1981,
  },
  {
    year: 1982,
  },
  {
    year: 1983,
  },
  {
    year: 1984,
  },
  {
    year: 1985,
  },
  {
    year: 1986,
  },
  {
    year: 1987,
  },
  {
    year: 1988,
  },
  {
    year: 1989,
  },
  {
    year: 1990,
  },
  {
    year: 1991,
  },
  {
    year: 1992,
  },
  {
    year: 1993,
  },
  {
    year: 1994,
  },
  {
    year: 1995,
  },
  {
    year: 1996,
  },
  {
    year: 1997,
  },
  {
    year: 1998,
  },
  {
    year: 1999,
  },
  {
    year: 2000,
  },
  {
    year: 2001,
  },
  {
    year: 2002,
  },
  {
    year: 2003,
  },
  {
    year: 2004,
  },
  {
    year: 2005,
  },
  {
    year: 2006,
  },
  {
    year: 2007,
  },
  {
    year: 2008,
  },
  {
    year: 2009,
  },
  {
    year: 2010,
  },
  {
    year: 2011,
  },
  {
    year: 2012,
  },
  {
    year: 2013,
  },
  {
    year: 2014,
  },
  {
    year: 2015,
  },
  {
    year: 2016,
  },
  {
    year: 2017,
  },
  {
    year: 2018,
  },
  {
    year: 2019,
  },
  {
    year: 2020,
  },
  {
    year: 2021,
  },
  {
    year: 2022,
  },
  {
    year: 2023,
  },
  {
    year: 2024,
  },
  {
    year: 2025,
  },
  {
    year: 2026,
  },
  {
    year: 2027,
  },
  {
    year: 2028,
  },
  {
    year: 2029,
  },
  {
    year: 2030,
  },
  {
    year: 2031,
  },
  {
    year: 2032,
  },
  {
    year: 2033,
  },
  {
    year: 2034,
  },
  {
    year: 2035,
  },
  {
    year: 2036,
  },
  {
    year: 2037,
  },
  {
    year: 2038,
  },
  {
    year: 2039,
  },
  {
    year: 2040,
  },
];
let endYears: any = [];

const EditCertificate = props => {
  const dispatch = useDispatch();

  const UpdateCertificateRes = useSelector(
    state => state.CertificateListReducer.updateCertificateData,
  );
  // console.log("UpdateCertificateRes", UpdateCertificateRes)

  const [uiRender, setUiRender] = useState(false);
  const [certificate, setCertificate] = useState('');
  const [organization, setOrganization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  // console.log("props", props)

  useEffect(() => {
    if (props != undefined) {
      if (props.navigation.state != undefined) {
        if (
          props.navigation.state.params != undefined &&
          props.navigation.state.params.dataItem != undefined
        ) {
          const data = props.navigation.state.params.dataItem;
          setCertificate(data.certificate);
          setOrganization(data.organization);
          setStartDate(data.year_issued);
          setEndDate(data.expiration_year);
          setDescription(data.description);
          setId(data.id);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (
      UpdateCertificateRes &&
      UpdateCertificateRes != undefined &&
      UpdateCertificateRes.response_code &&
      UpdateCertificateRes.response_code === 200
    ) {
      createTwoButtonAlert();
    }
  }, [UpdateCertificateRes]);

  const createTwoButtonAlert = () =>
    Alert.alert('Certificate updated successfully', '', [
      {text: 'OK', onPress: () => goToNext()},
    ]);

  const goToNext = () => {
    dispatch(UpdateUserCertificateSuccess());
    dispatch(getEducation());
    NavigationService.goBack();
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.closeImages} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Edit Certificate</Text>
        </View>
        <TouchableOpacity
          onPress={() => editCertificatefunc()}
          style={styles.settingImgMainView}>
          <Text style={{color: '#007AFF', fontSize: 12, fontWeight: '600'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const editCertificatefunc = () => {
    const sendData = {
      certificate: certificate,
      organization: organization,
      year_issued: startDate,
      expiration_year: endDate,
      description: description,
      id: id,
    };
    // console.log("sendData", sendData)
    if (startDate > endDate) {
      Alert.alert('Invalid entry of End year');
    } else {
      dispatch(UpdateUserCertificateApi(sendData));
    }
  };

  const onSelectStartYear = (index, value) => {
    let endYear = [];
    for (let i = 0; i < yearArray.length; i++) {
      let indexItem = yearArray.indexOf(yearArray[index]);
      if (i >= indexItem) {
        endYear.push(yearArray[i]);
      }
    }
    endYears = endYear;
    setStartDate(value.year);
  };

  const onSelectEndYear = (index, value) => {
    setEndDate(value.year);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{
                marginTop: scale(37),
                fontSize: 12,
                fontWeight: 'normal',
              }}>
              Certification
            </Text>
            <View>
              <CustomTextInput
                style={styles.titleTextInputStyle}
                label={''}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
                value={certificate}
                onChange={text => setCertificate(text)}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text
              style={{
                marginTop: scale(37),
                fontSize: 12,
                fontWeight: 'normal',
              }}>
              Organization
            </Text>
            <View>
              <CustomTextInput
                style={styles.titleTextInputStyle}
                label={''}
                placeholderTextColor={'#C4C4C4'}
                marginTop={verticalScale(0)}
                value={organization}
                onChange={text => setOrganization(text)}
              />
            </View>
          </View>
          <View style={styles.startEndDateMainView}>
            <View>
              <Text style={styles.startEndTextStyle}>Year Issued</Text>
              <ModalDropdown
                defaultValue={startDate}
                // label={'Start date'}
                style={[styles.containerStyle, props.containerStyle]}
                textStyle={[styles.textStyle, props.textStyle]}
                dropdownStyle={styles.dropdownStyle}
                renderRow={option => (
                  <View style={styles.dropdownViewStyle}>
                    <Text style={styles.nameStyle}>{option.year}</Text>
                  </View>
                )}
                renderButtonText={rowData => rowData.year}
                onSelect={(index, value) => onSelectStartYear(index, value)}
                disabled={props.disabled}
                options={yearArray}
              />
            </View>
            <View>
              <Text style={styles.startEndTextStyle}>Expiration Year</Text>
              <ModalDropdown
                defaultValue={endDate}
                style={[styles.containerStyle2, props.containerStyle]}
                textStyle={[styles.textStyle, props.textStyle]}
                dropdownStyle={styles.dropdownStyle}
                renderRow={option => (
                  <View style={styles.dropdownViewStyle}>
                    <Text style={styles.nameStyle}>{option.year}</Text>
                  </View>
                )}
                renderButtonText={rowData => rowData.year}
                onSelect={(index, value) => onSelectEndYear(index, value)}
                options={endYears}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.startEndTextStyle}>Description</Text>
            <CustomTextInput
              style={styles.titleTextInputStyle}
              label={''}
              placeholderTextColor={'#C4C4C4'}
              marginTop={verticalScale(0)}
              value={description}
              onChange={text => setDescription(text)}
            />
          </View>

          {/* <View style={{ marginTop: scale(45), alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 17, color: '#B1B1B1', textDecorationLine: 'underline', fontWeight: '600' }}>Delete</Text>
                        </TouchableOpacity>
                    </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("edit certificate state", state)
  return {};
};

export default connect(mapStateToProps, {})(EditCertificate);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(14),
    height: scale(14),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  titleTextInputStyle: {
    width: '100%',
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    height: scale(40),
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: scale(7),
  },
  currentWorkingCheckView: {
    flexDirection: 'row',
    marginTop: scale(25),
    paddingHorizontal: 15,
  },
  checkedImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  uncheckedImageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: '#141414',
  },
  checkedTextStyle: {
    marginLeft: scale(10),
    fontSize: 12,
  },
  checkedTouchView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  startEndDateMainView: {
    flexDirection: 'row',
    marginTop: scale(15),
    width: width / 1 - 120,
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  smallTextInputStyle: {
    width: width / 4 + 10,
    backgroundColor: 'rgba(242, 242, 242, 0.7)',
    height: scale(40),
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: scale(7),
  },
  startEndTextStyle: {
    marginTop: scale(18),
    fontSize: 12,
    fontWeight: 'normal',
  },
  nameStyle: {
    fontSize: 15,
  },
  containerStyle: {
    flex: 1,
    marginTop: verticalScale(22),
    backgroundColor: Colors.lighGray,
    justifyContent: 'center',
    height: verticalScale(39),
    borderRadius: scale(10),
    width: 80,
  },
  containerStyle2: {
    flex: 1,
    marginTop: verticalScale(22),
    backgroundColor: Colors.lighGray,
    justifyContent: 'center',
    height: verticalScale(39),
    borderRadius: scale(10),
    width: 80,
  },
  textStyle: {
    color: '#000',
    width: '100%',
    paddingHorizontal: Metrics.paddingHorizontal10,
    fontSize: 12,
  },
  dropdownStyle: {
    width: '25%',
    justifyContent: 'center',
    marginLeft: 5,
    marginTop: 8,
  },
  dropdownViewStyle: {
    height: scale(40),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
  },
});
