import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';
import ApplicationStyles from '../../theme/ApplicationStyles';
import scale, {verticalScale} from '../../theme/scale';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingScreenStyle: {
    ...ApplicationStyles.screen.container,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  forgotPasswordScreenStyle: {
    // ...ApplicationStyles.screen.container,
    flex: 1,
    marginTop: verticalScale(151),
    marginHorizontal: verticalScale(50),
    alignItems: 'center',
  },
  text: {
    fontSize: Fonts.size.size_17,
    alignContent: 'center',
    lineHeight: scale(20),
    color: Colors.white,
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  textForgotPasswordHeading: {
    fontSize: Fonts.size.size_20,
    alignContent: 'center',
    color: Colors.primary,
    fontWeight: 'bold',
    fontFamily: Fonts.fontName.GibsonRegular,
  },
  textForgotPasswordBody: {
    fontSize: Fonts.size.size_17,
    marginTop: verticalScale(51),
    alignContent: 'center',
    color: Colors.borderGrey,
  },
  itemContainer: {
    width: 310,
    height: 39,
  },
  listItemContainer: {
    margin: 3,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  listItemContainerChecked: {
    margin: 3,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  item: {
    margin: 3,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 5,
    height: 25,
    fontSize: 13,
    alignItems: 'center',
  },
});
