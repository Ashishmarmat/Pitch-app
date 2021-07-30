import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import CircleComp from '../HomeProfileScreen/CircleComp';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const EducationListScreen = props => {
  const EducationListRes = useSelector(
    state => state.EducationListReducer.geteducationList,
  );

  const [uiRender, setUirender] = useState(false);
  const [certificateArray, setCertificatArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //     console.log("porps edu", props)
  //     if (props && props.navigation) {
  //         if (props.navigation.state && props.navigation.state.params != undefined && props.navigation.state.params.EducationArray != undefined) {
  //             const labelData = props.navigation.state.params.EducationArray
  //             setCertificatArray(labelData)
  //             setUirender(!uiRender)
  //         }
  //     }
  // }, []);

  useEffect(() => {
    if (EducationListRes && EducationListRes.data != undefined) {
      const array1 = EducationListRes.data.user_certificate;
      const array2 = EducationListRes.data.user_education;
      const array3 = [...array1, ...array2];
      setCertificatArray(array3);
      setUirender(!uiRender);
    }
  }, [EducationListRes]);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
      </View>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goToEducation = data => {
    toggleModal();
    if (data === 'Education') {
      NavigationService.navigate('CreateEducationScreen');
    } else {
      NavigationService.navigate('CreateCertificateScreen');
    }
  };

  const navigateFunc = dataItem => {
    if (dataItem.type === 'education') {
      NavigationService.navigate('EditEducation', {dataItem});
    } else if (dataItem.type === 'certificate') {
      NavigationService.navigate('EditCertificate', {dataItem});
    }
  };

  // console.log("certificateArray",certificateArray)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.historyTitleMainView}>
          <Text style={styles.workHistoryTitleStyle}>
            EDUCATION & CERTIFICATIONS
          </Text>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Image source={Images.addIcon} style={styles.addHistoryStyle} />
          </TouchableOpacity>
        </View>
        {certificateArray && certificateArray.length > 0 ? (
          <View style={{marginTop: scale(30)}}>
            {certificateArray &&
              certificateArray.map((dataItem, dataIndex) => (
                <View
                  style={{
                    height: scale(90),
                    width: width - 30,
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    borderRadius: 15,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../assets/images/educationCircle.png')}
                      style={{
                        height: scale(50),
                        width: scale(50),
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                    />
                    <View style={{marginLeft: 10, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '800',
                          width: width / 2 + 20,
                        }}>
                        {dataItem.type === 'certificate'
                          ? dataItem.certificate
                          : dataItem.school_name}
                      </Text>
                      <Text style={{fontSize: 12, marginTop: 3}}>
                        {dataItem.type === 'certificate'
                          ? dataItem.organization
                          : dataItem.degree}
                      </Text>
                      <Text
                        style={{fontSize: 12, color: '#B1B1B1', marginTop: 15}}>
                        {dataItem.type === 'certificate'
                          ? dataItem.year_issued
                          : dataItem.startyear}{' '}
                        -{' '}
                        {dataItem.type === 'certificate'
                          ? dataItem.expiration_year
                          : dataItem.endyear}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigateFunc(dataItem)}
                      style={{marginLeft: 30}}>
                      <Image
                        source={Images.BlackEditPencil}
                        style={{
                          height: scale(18),
                          width: scale(18),
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        ) : (
          <View
            style={{
              height: height / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>No data available</Text>
          </View>
        )}
        <View style={{height: 30}} />
      </ScrollView>
      <Modal isVisible={isModalVisible} animationIn="slideInUp">
        <View style={styles.modalMainView}>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={Images.closeImages}
              style={{
                height: scale(12),
                width: scale(12),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#252020',
              fontSize: 17,
              fontWeight: '600',
              textAlign: 'center',
              marginTop: scale(28),
            }}>
            Add New
          </Text>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <TouchableOpacity
              onPress={() => goToEducation('Certification')}
              style={{
                height: scale(45),
                width: width / 2,
                backgroundColor: '#4A20E4',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                Certification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => goToEducation('Education')}
              style={{
                height: scale(45),
                width: width / 2,
                backgroundColor: '#4A20E4',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                Education
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={{alignSelf: 'center', marginTop: 10}}>
            <Text
              style={{
                color: '#8D8D8D',
                fontSize: 12,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("Edit educationlist state",state)
  return {};
};

export default connect(mapStateToProps, {})(EducationListScreen);

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
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.1,
  },
  backImgStyle: {
    width: scale(17),
    height: scale(17),
    resizeMode: 'contain',
  },
  historyTitleMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: scale(15),
  },
  workHistoryTitleStyle: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  addHistoryStyle: {
    height: scale(30),
    width: scale(30),
    resizeMode: 'contain',
  },
  cardMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainCardTouchable: {
    width: width - 80,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
  },
  profileImagestyle: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  labelNameTextStyle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    fontStyle: 'normal',
  },
  name2TextStyle: {
    marginTop: 3,
    fontSize: 12,
  },
  name3TextStyle: {
    marginTop: 10,
    fontSize: 12,
    color: '#B1B1B1',
  },
  editPencilTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  editPencilImgStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  showStatusMainView: {
    width: width / 2,
    alignSelf: 'center',
    marginLeft: scale(33),
    marginTop: 10,
  },
  seeMoreTextstyle: {
    color: '#864AFF',
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 8,
  },
  teamImageStyle: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  modalMainView: {
    height: height / 3 + 20,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});
