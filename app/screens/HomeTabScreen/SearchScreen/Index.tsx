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
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../../theme/scale';
import {Colors, Images, Fonts} from '../../../theme';
import NavigationService from '../../../services/NavigationService';
import {
  postUserFilterApi,
  postUserSuggestionApi,
  sendUserLinkApi,
  sendUserLinkSuccess,
} from '../../../actions/UserLinkedActions';
import AsyncStorage from '@react-native-community/async-storage';
import LazyLoader from '../../../components/atoms/LazyLoader';
import {postEndUserProfileSuccess} from '../../../actions/EndUserProfileAction';
import Video from 'react-native-video';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let searchArray = [
  {
    name: 'Developer',
  },
  {
    name: 'Abhishek',
  },
  {
    name: 'Senior Developer',
  },
  {
    name: 'Senior Designer in job title',
  },
];

const SearchScreen = props => {
  const dispatch = useDispatch();

  const FilterListRes = useSelector(
    state => state.UserLinkedReducer.postUserFilterList,
  );
  const suggestionListRes = useSelector(
    state => state.UserLinkedReducer.postSuggestionList,
  );
  const linkSendRes = useSelector(
    state => state.UserLinkedReducer.postsendLink,
  );

  console.log('linkSendRes', linkSendRes);

  const [uiRender, setUirender] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestionArray, setSuggestionArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("isModalVisible", isModalVisible)

  const searchApiCall = text => {
    setSearch(text);
    dispatch(postUserSuggestionApi(text));
  };

  const dismiss = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const selectedValue = name => {
    // console.log("name", name)
    const asdf = name.full_name;
    // console.log("asdf", asdf),
    setSearch(asdf);
    const sendData = {
      username: name.full_name,
    };
    dispatch(postUserFilterApi(sendData));
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const endUserProfile = async filterItem => {
    console.log('filterItem.id', filterItem.id);
    AsyncStorage.setItem('EndUSerId', filterItem.id);
    dispatch(postEndUserProfileSuccess());
    NavigationService.navigate('OtherUserProfileScreen');
  };

  const doneBtnCall = () => {
    // console.log("search", search)
    const sendData = {
      username: search,
    };
    dispatch(postUserFilterApi(sendData));
  };

  useEffect(() => {
    if (FilterListRes != undefined && FilterListRes.data) {
      if (FilterListRes.data.length > 0) {
        setFilterArray(FilterListRes.data);
      }
    }
  }, [FilterListRes]);

  useEffect(() => {
    if (linkSendRes != undefined) {
      if (linkSendRes.response_code === 200) {
        if (FilterListRes != undefined && FilterListRes.data) {
          if (FilterListRes.data.length > 0) {
            // setFilterArray(FilterListRes.data)
            doneBtnCall();
          }
        }
        // dispatch(sendUserLinkSuccess())
      }
    }
    setUirender(!uiRender);
  }, [linkSendRes]);

  useEffect(() => {
    if (suggestionListRes != undefined && suggestionListRes.data) {
      if (suggestionListRes.data.length > 0) {
        let temArray = [...suggestionListRes.data];
        if (search.length > 0) {
          temArray.unshift({
            first_name: search,
            last_name: 'in job Experiences',
            full_name: search + ' ' + 'in job Experiences',
          });
          temArray.unshift({
            first_name: search,
            last_name: 'in job title',
            full_name: search + ' ' + 'in job title',
          });
        }
        setSuggestionArray(temArray);
      }
    }
  }, [suggestionListRes]);

  const sendLinkInvite = id => {
    dispatch(sendUserLinkApi(id));
  };

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.navigateAndReset('HomeScreen')}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Search</Text>
        </View>
        <TouchableOpacity style={styles.settingImgMainView}>
          {/* <Text style={{ color: '#007AFF', fontSize: 12, fontWeight: '800', textDecorationLine: 'underline' }}>Done</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  console.log('filterArray', filterArray);
  const onLoadStart = () => {
    console.log('loadstart');
    setIsLoading(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.searchBarMainView}>
              <View style={styles.searchIconImageView}>
                <Image
                  source={Images.SearchImg}
                  style={styles.searchIconStyle}
                />
              </View>
              <TextInput
                style={styles.placeHolderStyle}
                placeholder="Search"
                value={search}
                autoFocus={true}
                onChangeText={text => searchApiCall(text)}
                onFocus={() => setModalVisible(true)}
                onBlur={() => setModalVisible(false)}
                returnKeyType="done"
                onSubmitEditing={() => doneBtnCall()}
              />
            </View>
            <TouchableOpacity
              onPress={() => dismiss()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 45,
                alignSelf: 'center',
                marginTop: 5,
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
          {isModalVisible === true ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                width: width,
                alignSelf: 'center',
                paddingHorizontal: 10,
              }}>
              {suggestionArray.map((searchItem, searchIndex) => (
                <View key={searchIndex}>
                  <TouchableOpacity
                    onPress={() => selectedValue(searchItem)}
                    style={{
                      padding: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>
                      {searchItem.first_name}{' '}
                      {searchItem.last_name != null &&
                      searchItem.last_name != ''
                        ? searchItem.last_name
                        : null}
                    </Text>
                    <Image
                      source={Images.searchRightArrow}
                      style={{height: 15, width: 15, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={{flex: 1}}>
              {filterArray && filterArray.length > 0 ? (
                <View>
                  {filterArray.map((filterItem, filterIndex) => (
                    <View key={filterIndex}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingVertical: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => endUserProfile(filterItem)}
                          style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            alignItems: 'center',
                          }}>
                          {filterItem.profile_file != 'undefined' ? (
                            <View>
                              {filterItem.imagetype === 1 ? (
                                <LazyLoader
                                  uriImg={filterItem.profile_file}
                                  style={{
                                    height: 45,
                                    width: 45,
                                    resizeMode: 'cover',
                                    borderRadius: 50,
                                  }}
                                />
                              ) : (
                                <View>
                                  {isLoading ? (
                                    <ActivityIndicator
                                      animating
                                      size="small"
                                      color="gray"
                                      style={{
                                        position: 'absolute',
                                        alignSelf: 'center',
                                        top: '25%',
                                      }}
                                    />
                                  ) : null}
                                  <Video
                                    source={{uri: filterItem.profile_file}}
                                    style={{
                                      height: 45,
                                      width: 45,
                                      borderRadius: 50,
                                    }}
                                    paused={true}
                                    disableFullscreen={true}
                                    seekColor="transparent"
                                    disableSeekbar
                                    controls={true}
                                    muted={true}
                                    onLoadStart={onLoadStart}
                                    onLoad={onLoad}
                                  />
                                </View>
                              )}
                            </View>
                          ) : (
                            <Image
                              source={Images.profile2}
                              style={{
                                height: 45,
                                width: 45,
                                resizeMode: 'cover',
                                borderRadius: 50,
                              }}
                            />
                          )}

                          <View style={{marginLeft: 10}}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: '#141414',
                                fontWeight: '600',
                                fontFamily: Fonts.fontName.GibsonBold,
                                lineHeight: 15,
                              }}>
                              {filterItem.first_name}{' '}
                              {filterItem.last_name != null &&
                              filterItem.last_name != ''
                                ? filterItem.last_name
                                : null}
                            </Text>
                            <Text
                              style={{
                                color: '#9A9A9A',
                                fontSize: 10,
                                fontWeight: 'normal',
                                lineHeight: 14,
                              }}>
                              {filterItem.job_title}
                            </Text>
                            <Text
                              style={{
                                color: '#C2C2C2',
                                fontSize: 10,
                                fontWeight: 'normal',
                                lineHeight: 14,
                                textDecorationLine: 'underline',
                                width: 200,
                              }}>
                              {filterItem.city}, {filterItem.state},{' '}
                              {filterItem.country}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View>
                          {filterItem.userlink_status === '1' ? (
                            <TouchableOpacity
                              onPress={() => sendLinkInvite(filterItem.id)}
                              style={{
                                alignSelf: 'center',
                                width: width / 4,
                                height: 35,
                                borderRadius: 8,
                                backgroundColor: '#4A20E4',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#4A20E4',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 15,
                                  fontWeight: '600',
                                }}>
                                Unlink
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => sendLinkInvite(filterItem.id)}
                              style={{
                                alignSelf: 'center',
                                width: width / 4,
                                height: 35,
                                borderRadius: 8,
                                backgroundColor: '#4A20E4',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontSize: 15,
                                  fontWeight: '600',
                                }}>
                                Link +
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          width: width,
                          backgroundColor: 'rgba(118, 118, 128, 0.12)',
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  <Text>No data available</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('Search state', state);
  return {};
};

export default connect(mapStateToProps, {})(SearchScreen);
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
    flex: 0.5,
  },
  backImgStyle: {
    width: scale(17),
    height: scale(17),
    resizeMode: 'contain',
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  searchBarMainView: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    width: width - 80,
    alignSelf: 'flex-start',
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
  },
  searchIconImageView: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconStyle: {
    height: height * 0.032,
    width: height * 0.032,
    resizeMode: 'contain',
  },
  placeHolderStyle: {
    height: 45,
    width: width - 130,
    alignSelf: 'center',
  },
});
