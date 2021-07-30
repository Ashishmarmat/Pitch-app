import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, BackHandler, Platform, TouchableOpacity, Dimensions, StyleSheet, Modal, Animated } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Images, Fonts } from "../../theme";
import { connect, useDispatch, useSelector } from 'react-redux';
import EmailScreen from "../AccountScreen/Emails/EmailScreen";
import HomeProfileScreen from '../HomeProfileScreen';
import HomeTabScreen from '../HomeTabScreen/Index';
import FeedListScreen from '../HomeTabScreen/FeedListScreen';
import MessageList from '../MessageList/index';
import ConnectionTab from '../ConnectionTab/Index';
import ShareScreen from '../ShareScreen/index';
import scale, { verticalScale } from '../../theme/scale';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from "../../services/NavigationService";
import ImagePicker from 'react-native-image-crop-picker';
// import Modal from 'react-native-modal';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Tab = createBottomTabNavigator();

const BottomTabbar = () => {

    const [showDialog, setShowDialog] = useState(false);

    const countRes = useSelector(state => state.MessagesReducer.messageCountRes);

    useEffect(() => {
        setShowDialog(true)
    }, []);

    const openLibraryFunc = () => {
        ImagePicker.openPicker({
            mediaType:'any',
            width: 300,
            height: 400,
            cropping: false
          }).then(response => {
            console.log("photo or video response",response);
          });
    }

    const openCameraFunc = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
          }).then(response => {
            console.log("camera response",response);
          });
    }
    // useEffect(() => {
    //     const backAction = () => {
    //       Alert.alert("", "Are you sure you want to exit from app", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "YES", onPress: () => BackHandler.exitApp() }
    //       ]);
    //       return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //       "hardwareBackPress",
    //       backAction
    //     );

    //     return () => backHandler.remove();
    //   }, []);

    const HomeTabData = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Home</Text>
            </View>
        )
    }

    const ConnectionTabData = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Connection</Text>
            </View>
        )
    }

    const ShareTabData = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                {showDialog ? (
                <Animated.View
                style={{
                    height: 200, width: width, position: 'absolute', bottom: 0, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                }}>
                    <View style={styles.modalMainView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 15 }}>
                            <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', fontFamily: Fonts.fontName.GibsonBold, }}>Share</Text>
                            <Image source={require('../../../assets/images/crossImage.png')} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, marginTop:20}}>
                            <TouchableOpacity 
                            onPress={() => NavigationService.navigate('AnswerPrompt')}
                            >
                            <Image source={require('../../../assets/images/AnswePrompt.png')} style={{height:105, width: 105, resizeMode:'contain'}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLibraryFunc()}>
                            <Image source={require('../../../assets/images/UploadPhoto.png')} style={{height:105, width: 105, resizeMode:'contain'}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openCameraFunc()}>
                            <Image source={require('../../../assets/images/TakePhoto.png')} style={{height:108, width: 108, resizeMode:'contain'}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>):null}
                {/* <View style={{width: width, backgroundColor:'#c4c4c4', height: height / 2 - 200,position:'absolute', bottom:0}}>

            </View> */}
            </View>
        )
    }

    const MessageTabData = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Message</Text>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    tabStyle: {
                        elevation: 0,
                        shadowColor: "transparent",
                        paddingTop: Platform.OS === 'ios' ? 20 : 7,
                        paddingBottom: Platform.OS === 'ios' ? 0 : 5,
                    },
                    activeTintColor: '#4A20E4',
                    inactiveTintColor: '#828282',
                    labelStyle: { marginTop: 12, alignSelf: 'center', fontSize: 11 }
                }}
            >

                <Tab.Screen
                    name="seekerHomeScreen"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={Images.tabHomeImages}
                                style={{ height: scale(25), width: scale(25), tintColor: color }}
                                resizeMode="contain"
                            />
                        ),
                        unmountOnBlur:{true},
                    }}
                    component={FeedListScreen}
                />
                <Tab.Screen
                    options={{
                        title: "Connections",
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={Images.tabConnectionImages}
                                style={{ height: scale(30), width: scale(30), tintColor: color }}
                                resizeMode="contain"
                            />
                        ),
                        unmountOnBlur:{true}
                    }}
                    name="demo1Screen"
                    component={ConnectionTab}
                />
                <Tab.Screen
                    options={{
                        title: "Share",
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={Images.tabShareImages}
                                style={{ height: scale(25), width: scale(25), tintColor: color }}
                                resizeMode="contain"
                            />
                        ),
                        unmountOnBlur:{true}
                    }}
                    name="SeekerProfileScren"
                    component={ShareScreen}
                />
                <Tab.Screen
                    options={{
                        title: "Messages",
                        tabBarIcon: ({ color }) => (
                            <View>
                                {countRes != undefined && countRes > 0 ? 
                                <View style={{borderRadius:30, height:15, width:15, backgroundColor:'red', position:'absolute',right: -5, top:-5, zIndex:2222, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{color:'white', fontSize:9}}>{countRes}</Text>
                                </View>
                                : null}
                            <Image
                                source={Images.tabMessagesImages}
                                style={{ height: scale(25), width: scale(25), tintColor: color }}
                                resizeMode="contain"
                            />
                            </View>
                        ),
                        unmountOnBlur:{true}
                    }}
                    name="asdf"
                    component={MessageList}
                />
                <Tab.Screen
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color }) => (
                            <Image
                                source={Images.tabProfileImages}
                                style={{ height: scale(25), width: scale(25), tintColor: color }}
                                resizeMode="contain"
                            />
                        ),
                        unmountOnBlur:{true}
                    }}
                    name="tyu"
                    component={HomeProfileScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>

    );
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps, {})(BottomTabbar);

const styles = StyleSheet.create({
    modalMainView: {
        height: 200,
        backgroundColor: '#fff',
        width: width,
        alignSelf: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
        // borderRadius: 10,
        // position:'absolute',
        // bottom:'10%'
    },
});