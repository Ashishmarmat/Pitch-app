import React, { createRef, useEffect, useState } from 'react';
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
import { connect, useDispatch, useSelector } from 'react-redux';
import scale, { verticalScale } from '../../../theme/scale';
import { Colors, Images, Fonts } from '../../../theme';
import { useFocusEffect } from '@react-navigation/native';
import NavigationService from '../../../services/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import LazyLoader from '../../../components/atoms/LazyLoader';
import { getinviteToPitchLinkconnectList } from '../../../actions/ConnectionsAction';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const InviteToPichScreen = props => {
  const dispatch = useDispatch();

  const getinviteToPitchRes = useSelector(
    state => state.ConnectionReducer.getInviteConnectList,
  );
  // console.log("getCurrentMutualListRes",getCurrentMutualListRes)

  const [uiRender, setUirender] = useState(false);
  const [inviteToPitchArray, setInviteToPitchArray] = useState([]);
  useEffect(() => {
    dispatch(getinviteToPitchLinkconnectList());
  }, []);

  // -----Called UseEffect when get connection list----- //
  useEffect(() => {
    if (
      getinviteToPitchRes != undefined &&
      getinviteToPitchRes.data != undefined
    ) {
      if (getinviteToPitchRes.data.length > 0) {
        setInviteToPitchArray(getinviteToPitchRes.data);
      }
    }
  }, [getinviteToPitchRes]);

  const openShare = () => {
    const options = {
      title: 'iOS 14 kit for Figma',
      url: 'https://www.pitch-app.com/',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      <View style={styles.headerMainView}>
        <View></View>
        {/* <Image source={Images.HomeLeftHeader} style={styles.leftHeaderImage} /> */}
        <TouchableOpacity onPress={() => openShare()}>
          <Image
            source={Images.HomeRightHeader}
            style={styles.rightHeaderImage}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => NavigationService.navigate('SearchScreen')}
        style={styles.searchBarMainView}>
        <View style={styles.searchIconImageView}>
          <Image source={Images.SearchImg} style={styles.searchIconStyle} />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            color: 'rgba(60, 60, 67, 0.6)',
            fontSize: 17,
          }}>
          Search
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View>
          <View>
            <View
              style={{
                height: 50,
                backgroundColor: 'rgba(118, 118, 128, 0.12)',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 12,
              }}>
              <TouchableOpacity onPress={() => NavigationService.goBack()}>
                <Image
                  source={Images.back_button}
                  style={styles.backImgStyle}
                />
              </TouchableOpacity>
              <Text style={{ color: '#252020', fontSize: 17, fontWeight: '600' }}>
                Invite to pitch
              </Text>
              <Text
                style={{
                  color: '#252020',
                  fontSize: 17,
                  fontWeight: '600',
                }}></Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(118, 118, 128, 0.12)',
              height: 1,
            }}
          />
          {inviteToPitchArray.length > 0 ? (
            <View>
              {inviteToPitchArray.map((sharedItem, sharedIndex) => (
                <View key={sharedIndex}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: 'rgba(118, 118, 128, 0.12)',
                      backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        alignItems: 'center',
                      }}>
                      {sharedItem.thumbnailPath != undefined &&
                        sharedItem.thumbnailPath === '' ? (
                        <Image
                          source={require('../../../../assets/images/Group1674.png')}
                          style={{
                            height: 45,
                            width: 45,
                            resizeMode: 'cover',
                            borderRadius: 50,
                          }}
                        />
                      ) : (
                        <LazyLoader
                          uriImg={sharedItem.thumbnailPath}
                          style={{
                            height: 45,
                            width: 45,
                            resizeMode: 'cover',
                            borderRadius: 50,
                          }}
                        />
                      )}
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#141414',
                            fontWeight: '600',
                            fontFamily: Fonts.fontName.GibsonBold,
                            lineHeight: 15,
                          }}>
                          {sharedItem.familyName}{' '}
                          {sharedItem.givenName != null &&
                            sharedItem.givenName != ''
                            ? sharedItem.givenName
                            : null}
                        </Text>
                        <Text
                          style={{
                            color: '#9A9A9A',
                            fontSize: 10,
                            lineHeight: 15,
                          }}>
                          Phone contact
                        </Text>
                        {/* <Text style={{ width: 180, color: '#C2C2C2', fontSize: 10, fontWeight: 'normal', lineHeight: 14 }}>{sharedItem.street}, {sharedItem.city}, {sharedItem.country}</Text> */}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openShare()}
                      style={{
                        alignSelf: 'center',
                        width: width / 4,
                        height: 35,
                        borderRadius: 8,
                        backgroundColor: '#4A20E4',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}>
                      <Text
                        style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>
                        Invite
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 20,
                height: 200,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#141414', fontSize: 14, lineHeight: 15 }}>
                No data available
              </Text>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // console.log("SharedInsightScreen state",state)
  return {};
};

export default connect(mapStateToProps, {})(InviteToPichScreen);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMainView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  backImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  leftHeaderImage: {
    height: height * 0.05,
    width: height * 0.05,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rightHeaderImage: {
    height: height * 0.06,
    width: height * 0.06,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchBarMainView: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
    marginTop: 8,
  },
  searchIconImageView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconStyle: {
    height: height * 0.023,
    width: height * 0.023,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 50,
    width: width - 70,
    alignSelf: 'center',
  },
});
