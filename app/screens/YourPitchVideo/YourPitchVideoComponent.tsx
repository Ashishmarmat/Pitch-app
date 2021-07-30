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
import Video from 'react-native-video';
import {signUpSuccess} from '../../actions/SignUpAction';
import {connect, useDispatch, useSelector} from 'react-redux';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

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
});

const YourPitchVideoComponent = () => {
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playpause, setPlayPause] = useState(false);


  useEffect(() => {
    dispatch(signUpSuccess(''))
  }, []);

  const toggleModal = () => {
    setShowDialog(!showDialog);
    setPlayPause(false);
    setActiveIndex(0);
  };

  const renderWorking = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => setPlayPause(!playpause)}>
        <Video
          source={require('../../../assets/video/clouds.mp4')}
          style={{
            width: 260,
            height: 260,
            borderRadius: 260 / 2,
            alignSelf: 'center',
            zIndex: 0,
          }}
          paused={playpause === false}
          // resizeMode={'contain'}
          disableFullscreen={true}
          seekColor="transparent"
          disableSeekbar
          controls={true}
        />
        {/* <View style={{position:'absolute', left: 70, zIndex: 222}}>
            <Image source={require('../../../assets/images/SampleVidImg.png')} style={{height:40, width: 40, resizeMode:'contain'}} />
          </View> */}
        {/* <ImageBackground imageStyle={{ borderRadius: 15 }} source={item.image1} style={{
          height: 212,
          width: 223,
          paddingHorizontal: 10,
          alignSelf: 'center'
        }}>

          {pagination()}
        </ImageBackground> */}
        {pagination()}
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
            marginTop: scale(80),
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
            onClick={() => toggleModal()}
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
        <View style={{marginBottom: scale(30)}}>
          <ActionButtons
            title={strings.READY_TO_RECORD}
            buttonColor={Colors.actionButtonColor}
            textColor={Colors.white}
            borderColor={Colors.actionButtonColor}
            onClick={() => NavigationService.navigate('UploadVideo')}
          />
        </View>
      </View>
      <Modal
        isVisible={showDialog}
        animationIn="slideInUp"
        onBackdropPress={() => setShowDialog(!showDialog)}>
        <View style={styles.modalMainView}>
          <TouchableOpacity
            onPress={() => setShowDialog(!showDialog)}
            style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}>
            <Image
              source={require('../../../assets/images/crossImage.png')}
              style={{height: 16, width: 16, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Image
            source={require('../../../assets/images/SampleTextImg.png')}
            style={{
              height: height / 6,
              width: width - 100,
              resizeMode: 'contain',
              alignSelf: 'center',
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

export default YourPitchVideoComponent;
