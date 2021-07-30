import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import ActionButtons from '../../components/atoms/Actionbutton';
import scale from '../../theme/scale';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Carousel, {Pagination} from 'react-native-snap-carousel';

let snapData = [
  {
    image1: require('../../../assets/images/DummySample.png'),
  },
  {
    image1: require('../../../assets/images/DummySample.png'),
  },
  {
    image1: require('../../../assets/images/DummySample.png'),
  },
  {
    image1: require('../../../assets/images/DummySample.png'),
  },
  {
    image1: require('../../../assets/images/DummySample.png'),
  },
];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: scale(30),
  },
  notCameraReadyTextStyle: {
    marginVertical: scale(18),
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: scale(50),
    color: Colors.createVideoTitleText,
    fontFamily: Fonts.fontName.GibsonBold,
  },
  notCameraReadyTextStyle2: {
    alignSelf: 'flex-start',
    width: 320,
    fontSize: 36,
    fontWeight: '800',
    color: '#8653FB',
    paddingLeft: scale(50),
    fontFamily: Fonts.fontName.GibsonBold,
    marginTop: scale(35),
  },
  modalMainView: {
    height: height / 2 + 100,
    backgroundColor: '#fff',
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '10%',
  },
  bestConnectTextView: {
    width: width / 2,
    alignSelf: 'center',
    marginTop: '13%',
  },
  bestconnectTextStyle: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackBtnStyle: {
    backgroundColor: '#8650FD',
    height: 40,
    width: '65%',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '22%',
  },
  goBackTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headingTextStyle: {
    fontSize: Fonts.size.size_20,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Fonts.fontName.GibsonBold,
    marginTop: 20,
    width: width / 2 + 80,
    lineHeight: 20,
    alignSelf: 'center',
  },
});

const SampleVideoScreen = props => {
  const [showDialog, setShowDialog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setShowDialog(true);
  }, []);

  const renderWorking = ({item, index}) => {
    return (
      <TouchableOpacity>
        <ImageBackground
          imageStyle={{borderRadius: 15}}
          source={item.image1}
          style={{
            height: 212,
            width: 223,
            paddingHorizontal: 10,
            alignSelf: 'center',
          }}>
          {pagination()}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const pagination = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 20,
          position: 'absolute',
          bottom: -60,
          alignSelf: 'center',
        }}>
        {snapData.length > 0 &&
          snapData.map((item, index) => {
            return activeIndex === index ? (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: '#413B3A',
                  marginHorizontal: 2.5,
                }}></View>
            ) : (
              <View
                key={index}
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  backgroundColor: '#D3C1FC',
                  marginHorizontal: 2.5,
                }}></View>
            );
          })}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/Ellipse64.png')}
          resizeMode="cover"
          style={{
            height: 148,
            width: 151,
            alignSelf: 'center',
            marginTop: scale(130),
          }}
        />
        <Text style={styles.notCameraReadyTextStyle2}>
          {strings.YOUR_PITCH_VIDEO_HELP}
        </Text>
        <Text style={styles.notCameraReadyTextStyle}>
          {strings.CREATE_A_VIDEO_TITLE}
        </Text>
        <View style={{marginBottom: scale(30)}}>
          <ActionButtons
            title={strings.VIEW_SAMPLE_PITCH}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
          />
        </View>
        <View style={{marginBottom: scale(30)}}>
          <ActionButtons
            title={strings.NEED_SOME_HELP}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            onClick={() => NavigationService.navigate('CreateVideoScreen')}
          />
        </View>
        <View style={{marginTop: scale(30)}}>
          <ActionButtons
            title={strings.READY_TO_RECORD}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            onClick={() => NavigationService.navigate('UploadVideo')}
          />
        </View>
      </View>
      <Modal isVisible={showDialog} animationIn="slideInUp">
        <View style={styles.modalMainView}>
          <Image
            source={require('../../../assets/images/SampleTextImg.png')}
            style={{
              height: height / 5,
              width: width - 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 6,
            }}
          />
          <View style={{alignSelf: 'center'}}>
            <Carousel
              data={snapData}
              renderItem={renderWorking}
              // currentPage={currentJobsPage}
              sliderWidth={width - 50}
              itemWidth={width - 50}
              onSnapToItem={index => setActiveIndex(index)}
            />
          </View>

          <Image
            source={require('../../../assets/images/crousalImgStatic.png')}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SampleVideoScreen;
