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
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import scale, {verticalScale} from '../../theme/scale';
import {Colors, Images} from '../../theme';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import strings from '../../theme/strings';
import NavigationService from '../../services/NavigationService';
import GridList from 'react-native-grid-list';
import Modal from 'react-native-modal';
import * as ImagePicker from 'react-native-image-picker';

let tempData = [];

let items = [
  {
    thumbnail: 'https://cdn.eso.org/images/thumb300y/eso1322a.jpg',
    status: false,
    id: 1,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLsNxuFkAf4X7Xhb4d3URp2SrREJuRzTYCA&usqp=CAU',
    status: false,
    id: 2,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg-rOENtkYuzeqFQrKphuXqVQ5n1wdLj_mQ&usqp=CAU',
    status: false,
    id: 3,
  },
  {
    thumbnail:
      'https://cbtpsychology.com/wp-content/uploads/2018/10/Therapy.jpg',
    status: false,
    id: 4,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1C_XKVrOg2tha1_QMQcEYwG_q_TKg5haZg&usqp=CAU',
    status: false,
    id: 5,
  },
  {
    thumbnail: 'https://cdn.eso.org/images/thumb300y/eso1322a.jpg',
    status: false,
    id: 6,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLsNxuFkAf4X7Xhb4d3URp2SrREJuRzTYCA&usqp=CAU',
    status: false,
    id: 7,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg-rOENtkYuzeqFQrKphuXqVQ5n1wdLj_mQ&usqp=CAU',
    status: false,
    id: 8,
  },
  {
    thumbnail:
      'https://cbtpsychology.com/wp-content/uploads/2018/10/Therapy.jpg',
    status: false,
    id: 9,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1C_XKVrOg2tha1_QMQcEYwG_q_TKg5haZg&usqp=CAU',
    status: false,
    id: 10,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg-rOENtkYuzeqFQrKphuXqVQ5n1wdLj_mQ&usqp=CAU',
    status: false,
    id: 11,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1C_XKVrOg2tha1_QMQcEYwG_q_TKg5haZg&usqp=CAU',
    status: false,
    id: 10,
  },
  {
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIg-rOENtkYuzeqFQrKphuXqVQ5n1wdLj_mQ&usqp=CAU',
    status: false,
    id: 11,
  },
];

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const SharedmomentsPhotos = props => {
  const [uiRender, setUiRender] = useState(false);
  const [photosArray, setPhotosArray] = useState([]);

  const selectFunc = value => {
    // console.log("value", value)
    for (let data of items) {
      if (data.id === value.id) {
        console.log('inside if');
        if (data.status === false) {
          console.log('inside if ifffff');
          data.status = true;
          tempData.push(data);
          setUiRender(!uiRender);
        } else if (data.status === true) {
          console.log('inside else if');
          data.status = false;
          setUiRender(!uiRender);
        }
      }
    }
    setPhotosArray(tempData);
  };

  console.log('photosArray', photosArray);

  const headerView = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backImgMainView}>
          <Image source={Images.back_button} style={styles.backImgStyle} />
        </TouchableOpacity>
        <View style={styles.titleMainView}>
          <Text style={styles.titleTextStyle}>Work Highlights</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('AddWorkHistory', {
              workArray: photosArray,
            })
          }
          style={styles.settingImgMainView}>
          <Text style={{color: '#007AFF', fontSize: 12, fontWeight: '600'}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  console.log('items.......', items);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} />
      {headerView()}
      <View style={styles.gridContainer}>
        {items.length === 0 ? (
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Upload photos</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            {items.map((labelItem, labelIndex) => (
              <View>
                <TouchableOpacity onPress={() => selectFunc(labelItem)}>
                  <ImageBackground
                    style={{height: scale(119), width: scale(119)}}
                    source={{uri: labelItem.thumbnail}}>
                    {labelItem.status ? (
                      <Image
                        source={require('../../../assets/images/Ellipse156.png')}
                        style={styles.checkUncheckImgStyle}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/images/Ellipse155.png')}
                        style={styles.checkUncheckImgStyle}
                      />
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          // <GridList
          //     data={items}
          //     numColumns={3}
          //     renderItem={renderItem}
          // />
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(SharedmomentsPhotos);

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rightImageStyle: {
    width: scale(15),
    height: scale(15),
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
    marginLeft: 10,
  },
  titleMainView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '600',
  },
  settingImgMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4,
  },
  gridContainer: {
    // flex: 1,
    // backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalMainView: {
    height: height / 7.5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    width: width,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  checkUncheckImgStyle: {
    height: scale(25),
    width: scale(25),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
});
