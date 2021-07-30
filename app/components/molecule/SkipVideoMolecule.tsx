import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Fonts} from '../../theme';
import strings from '../../theme/strings';
import ActionButtons from '../atoms/Actionbutton';

interface SkipVideoMoleculeProps {
  onGoBcak: () => void;
  onDoLaterClick: () => void;
  showDialog: boolean;
}
const defaultProps: SkipVideoMoleculeProps = {
  onGoBcak: () => {},
  onDoLaterClick: () => {},
  showDialog: false,
};

const SkipVideoMolecule = (props: SkipVideoMoleculeProps) => {
  return (
    <Modal
      transparent={true}
      visible={props.showDialog}
      onRequestClose={props.onGoBcak}>
      <View style={styles.containerStyle}>
        <View style={styles.boxStyle}>
          <Text style={styles.titleTextStyle}>{strings.ARE_YOU_SURE}</Text>
          <Text
            style={{
              ...styles.textStyle,
              marginTop: verticalScale(69),
            }}>
            {strings.THE_BEAST}
          </Text>

          <ActionButtons
            title={strings.GO_BACK}
            buttonColor={Colors.primary}
            borderColor={Colors.primary}
            textColor={Colors.white}
            onClick={props.onGoBcak}
            marginTop={verticalScale(97)}
          />
          <Text
            style={{
              ...styles.textStyleBottom,
            }}
            onPress={props.onDoLaterClick}>
            {strings.DO_LATER}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
SkipVideoMolecule.defaultProps = defaultProps;
export default SkipVideoMolecule;

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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxStyle: {
    borderRadius: scale(20),
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: verticalScale(503),
    width: scale(276),
    backgroundColor: 'white',
    paddingHorizontal: scale(25),
  },
  iconStyle: {
    width: scale(113),
    height: scale(113),
    marginTop: scale(30),
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
  textStyleBottom: {
    fontFamily: Fonts.fontName.GibsonRegular,
    textAlign: 'center',
    marginTop: verticalScale(36),
    fontSize: Fonts.size.size_17,
    color: Colors.grayText,
    textDecorationLine: 'underline',
  },
});
