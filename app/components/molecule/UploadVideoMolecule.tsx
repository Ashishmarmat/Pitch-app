import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Fonts, Images} from '../../theme';
import strings from '../../theme/strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderImageTitle from '../atoms/HeaderImageTitle';
import SkipVideoMolecule from './SkipVideoMolecule';
import FabButton from '../../components/atoms/FabButton';
import Video from 'react-native-video';

interface UploadVideoMoleculeProps {
  type: string;
  imageUrl: string;
  name: string;
  isEnabled: boolean;
  onRecordClick: () => void;
  onSkipClick: () => void;
  onBtnClick: () => void;
  showDialog: boolean;
}
const defaultProps: UploadVideoMoleculeProps = {
  type: 'camera',
  imageUrl: '',
  name: '',
  isEnabled: false,
  onRecordClick: () => {},
  onSkipClick: () => {},
  onBtnClick: () => {},
  showDialog: false,
};

const UploadVideoMolecule = (props: UploadVideoMoleculeProps) => {
  console.log('props', props);
  return (
    <View style={styles.containerStyle}>
      <HeaderImageTitle />
      <KeyboardAwareScrollView
        style={styles.containerStyle}
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.titleTextStyle}>{strings.PITCH_BEST}</Text>
        <View>
          {props.imageUrl === '' || props.imageUrl === undefined ? (
            <Image
              resizeMode={'contain'}
              source={Images.onboardingdummyPic}
              style={styles.iconStyle}
            />
          ) : (
            <Video
              source={{uri: props.imageUrl}}
              style={{
                width: scale(113),
                height: scale(113),
                marginTop: scale(30),
                borderRadius: 100,
              }}
              paused={false}
              // resizeMode={'cover'}
              disableFullscreen={true}
              seekColor="transparent"
              disableSeekbar
              controls={true}
            />
          )}
        </View>
        <Text
          style={{
            ...styles.textStyle,
            marginTop: verticalScale(11),
          }}>
          {props.name}
        </Text>

        <TouchableOpacity
          style={styles.dashedViewStyle}
          onPress={props.onRecordClick}>
          <Image
            resizeMode={'contain'}
            source={Images.capturePhoto}
            style={styles.iconCameraStyle}
          />

          <Text
            style={{
              ...styles.textStyle,
              fontSize: Fonts.size.size_15,
              color: Colors.black,
              marginTop: verticalScale(10),
            }}>
            {props.type === 'photo'
              ? strings.CHOOSE_PHOTO
              : strings.RECORD_VIDEO}
          </Text>
        </TouchableOpacity>

        <Text style={styles.skipStyle} onPress={props.onSkipClick}>
          {strings.SKIP_FOR_NOW}
        </Text>

        <FabButton
          enable={props.isEnabled}
          style={styles.fabStyle}
          onClick={props.onBtnClick}
        />
      </KeyboardAwareScrollView>
      <SkipVideoMolecule
        showDialog={false}
        onDoLaterClick={props.onSkipClick}
        onGoBcak={props.onSkipClick}
      />
    </View>
  );
};
UploadVideoMolecule.defaultProps = defaultProps;
export default UploadVideoMolecule;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: scale(53),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
  },
  titleTextStyle: {
    fontSize: Fonts.size.size_30,
    fontFamily: Fonts.fontName.GibsonBold,
    color: Colors.primary,
    textAlign: 'center',
  },
  bottomTextStyle: {
    color: Colors.black,
    fontSize: Fonts.size.size_20,
    textAlign: 'center',
    fontFamily: Fonts.fontName.GibsonBold,
    marginTop: verticalScale(23),
  },
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dashedViewStyle: {
    height: verticalScale(100),
    width: scale(200),
    borderStyle: 'dashed',
    borderRadius: scale(5),
    borderColor: Colors.dottedColor,
    borderWidth: scale(2),
    alignItems: 'center',
    marginTop: scale(90),
    justifyContent: 'center',
  },
  iconStyle: {
    width: scale(113),
    height: scale(113),
    marginTop: scale(30),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  textStyle: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.fontName.GibsonRegular,
    color: Colors.black,
    textAlign: 'center',
  },
  iconCameraStyle: {
    width: scale(33),
    height: scale(33),
  },
  skipStyle: {
    fontFamily: Fonts.fontName.GibsonRegular,
    textAlign: 'center',
    marginTop: verticalScale(36),
    fontSize: Fonts.size.size_17,
    color: Colors.grayText,
    textDecorationLine: 'underline',
  },
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
    backgroundColor: '#8653FB',
  },
});
