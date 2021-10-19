import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import DrawerNav from './src/navigation/DrawerNavigator';
import AuthScreen from './src/screens/user/AuthScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from './src/store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/constans/Colors';

const App: () => React$Node = () => {

    const dispatch = useDispatch();
    const correctData = useSelector(state => state.auth.correctData);

    const [content, setContent] = useState(<View style={styles.container}>
        <ActivityIndicator
            style={styles.spinner}
            size='large'
            color={Colors.primary}
        />
    </View>);

    useEffect(() => {

        const checkToken = async () => {
            const authData = await AsyncStorage.getItem('authData');
            if (!authData) {
                console.log('something went wrong');
                setContent(<AuthScreen/>)
                return;
            }else  {
                dispatch(authActions.autoLogin(authData));
            }
            const parseAuthData = JSON.parse(authData);
            const {token, user, expireDate} = parseAuthData;
            const expiryDate = new Date(expireDate);

            if (expiryDate <= new Date() || !token || !user) {
                setContent(<AuthScreen/>)
            } else {
                setContent(<DrawerNav/>)
            }
        };
        checkToken();
    },[]);

    return (
        <NavigationContainer>
            {
              correctData === true ? <DrawerNav/> : content
            }
        </NavigationContainer>
  )
}
export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

    spinner: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
});
