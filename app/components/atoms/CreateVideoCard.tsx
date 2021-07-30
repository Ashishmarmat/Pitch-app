import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
import scale, {verticalScale} from '../../theme/scale';

interface CreateVideoCardProps {
  stepTitle: string;
  stepText: string;
}

function CreateVideoCard(props: CreateVideoCardProps) {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.subContainerStyle}>
        <Text style={styles.subContainerTextStyle}>{props.stepTitle}</Text>
      </View>
      <Text style={styles.containerTextStyle}>{props.stepText}</Text>
    </View>
  );
}

export default CreateVideoCard;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    paddingVertical: verticalScale(5),
    marginTop: verticalScale(28),
    width: '100%',
    minHeight: scale(65),
  },
  subContainerStyle: {
    marginTop: verticalScale(-12),
    marginLeft: scale(20),
    paddingHorizontal: scale(5),
    borderColor: Colors.primary,
    borderWidth: scale(1),
    position: 'absolute',
    backgroundColor: Colors.white,
    borderRadius: scale(20),
  },
  subContainerTextStyle: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Fonts.fontName.GibsonBold,
    paddingHorizontal: scale(8),
  },
  containerTextStyle: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    padding: scale(5),
    color: Colors.white,
    marginTop: verticalScale(5),
  },
});
