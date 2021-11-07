import { StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

const SettingsScreen = (props) => {

    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [userSurname, setUserSurname] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);
            console.log('test');
            console.log(parseAuthData);
            setUserEmail(parseAuthData.email);
            setUserName(parseAuthData.name);
            setUserSurname(parseAuthData.surname);
        }
        getUserData();
    })

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text onPress={() => console.log('siema')}>{userEmail}</Text>
            <Text onPress={() => console.log('siema')}>{userName}  {userSurname}</Text>
            <Text onPress={logoutHandler}>wyloguj</Text>
        </View>
    );
}

export default SettingsScreen;
const styles = StyleSheet.create({


});


