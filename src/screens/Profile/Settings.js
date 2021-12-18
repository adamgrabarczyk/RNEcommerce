import { StyleSheet, View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../store/actions/auth';
import UserProfile from '../../components/user/UserProfile';
import {useDispatch} from 'react-redux';

const SettingsScreen = (props) => {

    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [userSurname, setUserSurname] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);

            setUserEmail(parseAuthData.email);
            setUserName(parseAuthData.name);
            setUserSurname(parseAuthData.surname);
        }
        getUserData();
    });

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());

    }

    return (
        <ScrollView style={styles.container}>
            <UserProfile/>
            <View style={styles.settings}>
            <Text onPress={() => console.log('blah')}>{userEmail}</Text>
            <Text onPress={() => console.log('blah')}>{userName}  {userSurname}</Text>
            <Text onPress={logoutHandler}>wyloguj</Text>
            </View>
        </ScrollView>
    );
}

export default SettingsScreen;
const styles = StyleSheet.create({

    container: {
         flex: 1,
    },
    settings : {
        marginTop: 200
    }
});


