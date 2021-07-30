import React, { useEffect, useState } from 'react';
import LandingScreenMolecule from '../../components/molecule/LandingScreenMolecule';
import NavigationService from '../../services/NavigationService';
import login from '../../actions/LoginActions';
import { connect, useDispatch } from 'react-redux';
import {
    resendOtpSuccess,
    checkPhoneExistSuccess,
    verifyOtpSuccess,
} from '../../actions/SignUpAction';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator, Alert, Image } from 'react-native';
import { tokenAuth } from '../../utils/SendJSON';

let loginStatus = false;

export default function Splash() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [isToken, setIsToken] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resendOtpSuccess(''));
        dispatch(checkPhoneExistSuccess(''));
        checkLoginFunc();
        dispatch(verifyOtpSuccess(''));
        setIsLoggedIn('');
        loginStatus = false;
    }, []);

    const checkLoginFunc = async () => {
        const data = await AsyncStorage.getItem('AutoLogin');
        const token = await AsyncStorage.getItem('Authorization');
        console.log('AutoLogin', data);
        if(data === '1'){
            loginStatus = true;
        } else {
            loginStatus = false;
        }
        setIsLoggedIn(data);
        dispatch(tokenAuth(token));
        
    };

    setTimeout(() => {
        if(loginStatus === true){
            NavigationService.navigate('HomeScreen')
        } else {
            NavigationService.navigate('LandingScreen')
        }
    }, 3000);

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/SplashScreennew.png')} style={{ height: '100%', width: '100%' }} />
        </View>
    );
}
