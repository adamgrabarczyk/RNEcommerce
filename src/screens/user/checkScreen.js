import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constans/Colors';
import AuthScreen from './AuthScreen';
import DrawerNav from '../../navigation/DrawerNavigator';

const CheckScreen = props => {

    useEffect(() => {
        const checkToken = async () => {
            const authData = await AsyncStorage.getItem('authData');
            if (!authData) {
                <AuthScreen/>
                return;
            }else  {
                <DrawerNav/>
            }
            const parseAuthData = JSON.parse(authData);
            const {token, user, expireDate} = parseAuthData;

            const expiryDate = new Date(expireDate);

            if (expiryDate <= new Date() || !token || !user) {
                <AuthScreen/>
                return;
            } else {
                <DrawerNav/>
            }
        };
        checkToken();
    },[]);

     return (
         <View style={styles.screenContainer}>
             <ActivityIndicator size='large' color={Colors.primary}/>
         </View>
     )
};


const styles = StyleSheet.create({

    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CheckScreen;
