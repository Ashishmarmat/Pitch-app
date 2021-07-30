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
  ActivityIndicator,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import NavigationService from '../../services/NavigationService';
import CircleComp from '../HomeProfileScreen/CircleComp';
import {ScrollView} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import LazyLoader from '../../components/atoms/LazyLoader';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// const labels = [
//     {
//         profileImg: require('../../../assets/images/Ellipse72.png'),
//         name: 'Marketing & Sales',
//         name2: 'Microsoft',
//         startYear: '2020',
//         present: 'Present',
//         desc: 'Maintained regular customer transactions via Hellofresh.com',
//         teamArray: [
//             {
//                 team: require('../../../assets/images/Team1.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team2.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team1.png')
//             }
//         ],
//         status: false
//     },
//     {
//         profileImg: require('../../../assets/images/Ellipse73.png'),
//         name: 'Bank Teller',
//         name2: 'Pennsylvania Bank',
//         startYear: '2018',
//         present: '2018',
//         desc: 'Maintained regular customer transactions via Hellofresh.com',
//         teamArray: [
//             {
//                 team: require('../../../assets/images/Team1.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team2.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team1.png')
//             }
//         ],
//         status: false
//     },
//     {
//         profileImg: require('../../../assets/images/Ellipse74.png'),
//         name: 'Cashier',
//         name2: 'Hello Fresh',
//         startYear: '2020',
//         present: 'Present',
//         desc: 'Maintained regular customer transactions via Hellofresh.com',
//         teamArray: [
//             {
//                 team: require('../../../assets/images/Team1.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team2.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team1.png')
//             }
//         ],
//         status: true
//     },
//     {
//         profileImg: require('../../../assets/images/Ellipse75.png'),
//         name: 'Instructional Team',
//         name2: 'General Assembly',
//         startYear: '2016',
//         present: '2020',
//         desc: 'Maintained regular customer transactions via Hellofresh.com',
//         teamArray: [
//             {
//                 team: require('../../../assets/images/Team1.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team2.png'),
//             },
//             {
//                 team: require('../../../assets/images/Team1.png')
//             }
//         ],
//         status: false
//     },
// ];

const Workhistory = props => {
  const WorkListData = useSelector(state => state.WorkListReducer.data);

  console.log('WorkListData', WorkListData);

  const [uiRender, setUirender] = useState(false);
  const [WorkListArray, setWorkListArray] = useState([]);
  const [isLoadings, setIsLoadings] = useState(false);

  useEffect(() => {
    console.log('props work history', props);
    if (WorkListData != undefined && WorkListData.data != undefined) {
      if (WorkListData.data.length > 0) {
        setWorkListArray(WorkListData.data);
      }
    }
  }, [WorkListData]);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 17, lineHeight: 20, fontWeight: '600'}}>
            Work History
          </Text>
        </View>
        <View style={{width: 30}} />
      </View>
    );
  };

  const showMore = labeltem => {
    for (let item of WorkListArray) {
      if (item.id === labeltem.id) {
        if (item.status === false) {
          item.status = true;
        } else if (item.status === true) {
          item.status = false;
        }
      }
    }
    setUirender(!uiRender);
  };
  const onLoadStart = () => {
    // console.log("loadstart")
    setIsLoadings(true);
  };
  const onLoad = () => {
    console.log('load');
    setIsLoadings(false);
  };
  console.log('WorkListArray', WorkListArray);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.historyTitleMainView}>
          <Text style={styles.workHistoryTitleStyle}>WORK HISTORY</Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('AddWorkHistory')}>
            <Image source={Images.addIcon} style={styles.addHistoryStyle} />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '9%'}}>
          {WorkListArray.length > 0 ? (
            <View style={{flexDirection: 'row'}}>
              <CircleComp array={WorkListArray} uiRender={uiRender} />
              <View style={{marginLeft: '6%'}}>
                {WorkListArray.map((labeltem, labelIndex) => (
                  <View>
                    <View style={{width: width - 30}}>
                      <View style={styles.cardMainView}>
                        <TouchableOpacity
                          onPress={() => showMore(labeltem)}
                          style={[
                            styles.mainCardTouchable,
                            {
                              minHeight: labeltem.status
                                ?  scale(100)
                                : scale(100),
                            },
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                              paddingTop: scale(20),
                            }}>
                            <Image
                              source={require('../../../assets/images/BriefCase.png')}
                              style={styles.profileImagestyle}
                            />
                            <View style={{width: width / 2 - 20}}>
                              <Text style={styles.labelNameTextStyle}>
                                {labeltem.title}
                              </Text>
                              <Text style={styles.name2TextStyle}>
                                {labeltem.company_name}
                              </Text>
                              <Text style={styles.name3TextStyle}>
                                {labeltem.startyear} - {labeltem.endyear}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                NavigationService.navigate(
                                  'EditDetailWorkHistory',
                                  {labeltem},
                                )
                              }
                              style={styles.editPencilTouchable}>
                              <Image
                                source={Images.BlackEditPencil}
                                style={styles.editPencilImgStyle}
                              />
                            </TouchableOpacity>
                          </View>
                          {labeltem.status && (
                            <View>
                              <View style={styles.showStatusMainView}>
                                <Text style={{fontSize: 12}}>
                                  {labeltem.describtion}
                                </Text>
                                <ScrollView
                                  horizontal
                                  style={{marginTop: 10, flexDirection: 'row'}}>
                                  {labeltem.teammmembers != null &&
                                    labeltem.teammmembers != '' &&
                                    labeltem.teammmembers.length > 0 && (
                                      <View style={{flexDirection: 'row'}}>
                                        {labeltem.teammmembers.map(
                                          (workItem, workIndex) => (
                                            <View>
                                              {workItem != undefined &&
                                              workItem.profile_file !=
                                                'undefined' ? (
                                                <View>
                                                  {workItem.imagetype == 1 ? (
                                                    <LazyLoader
                                                      uriImg={
                                                        workItem.profile_file
                                                      }
                                                      style={{
                                                        height: 45,
                                                        width: 45,
                                                        resizeMode: 'cover',
                                                        marginLeft: 10,
                                                        borderRadius: 50,
                                                      }}
                                                    />
                                                  ) : (
                                                    <View>
                                                      {isLoadings ? (
                                                        <ActivityIndicator
                                                          animating
                                                          size="small"
                                                          color="gray"
                                                          style={{
                                                            position:
                                                              'absolute',
                                                            alignSelf: 'center',
                                                            top: '10%',
                                                          }}
                                                        />
                                                      ) : null}
                                                      <View pointerEvents="none">
                                                        <Video
                                                          source={{
                                                            uri:
                                                              workItem.profile_file,
                                                          }}
                                                          style={{
                                                            height: 45,
                                                            width: 45,
                                                            marginLeft: 10,
                                                            borderRadius: 50,
                                                          }}
                                                          paused={true}
                                                          // resizeMode={'contain'}
                                                          disableFullscreen={
                                                            true
                                                          }
                                                          seekColor="transparent"
                                                          disableSeekbar
                                                          controls={true}
                                                          muted={true}
                                                          onLoadStart={
                                                            onLoadStart
                                                          }
                                                          onLoad={onLoad}
                                                        />
                                                        <View
                                                          style={{
                                                            position:
                                                              'absolute',
                                                            alignSelf: 'center',
                                                            top: '5%',
                                                          }}>
                                                          <Image
                                                            source={require('../../../assets/images/play-button.png')}
                                                            style={{
                                                              opacity: 0.5,
                                                              height: 42,
                                                              width: 42,
                                                              resizeMode:
                                                                'cover',
                                                              marginLeft: 10,
                                                              borderRadius: 50,
                                                            }}
                                                          />
                                                        </View>
                                                      </View>
                                                    </View>
                                                  )}
                                                </View>
                                              ) : (
                                                <Image
                                                  source={Images.profile2}
                                                  style={{
                                                    height: scale(45),
                                                    width: scale(45),
                                                    marginLeft: 10,
                                                    borderRadius: 50,
                                                  }}
                                                />
                                              )}
                                            </View>
                                            // <Image source={{ uri: workItem.profile_file }}
                                            // style={{ height: 50, width: 50, resizeMode: 'cover', marginLeft: 10, borderRadius: 50 }} />
                                          ),
                                        )}
                                      </View>
                                    )}
                                  {labeltem.teammmembers === null ||
                                    (labeltem.teammmembers === '' && (
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          fontWeight: '600',
                                        }}>
                                        Add Team Member +{' '}
                                      </Text>
                                    ))}
                                </ScrollView>
                              </View>
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 15}}>Add work history</Text>
            </View>
          )}
        </View>
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  console.log('Work history state', state);
  return {};
};

export default connect(mapStateToProps, {})(Workhistory);

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
    paddingHorizontal: 20,
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
    paddingBottom: 10,
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
});
