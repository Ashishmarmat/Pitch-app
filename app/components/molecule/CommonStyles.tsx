import {StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../theme/scale';
import {Colors} from '../../theme';
export default StyleSheet.create({
  fabStyle: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(250),
    marginRight: scale(26),
  },
  containerTop: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: scale(45.5),
  },
  fabContainerStyle: {flex: 1},
  flex: {flex: 1},
});
