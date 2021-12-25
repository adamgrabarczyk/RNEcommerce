import { StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../store/actions/auth';
import UserProfile from '../../components/user/UserProfile';
import {useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';
import SettingsButton from '../../components/user/SettingsButton';

const SettingsScreen = ({navigation}) => {

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
            <View style={styles.userData}>
                <Text onPress={() => console.log('blah')}>{userEmail}</Text>
                <Text onPress={() => console.log('blah')}>{userName}  {userSurname}</Text>
            </View>
            <View style={styles.settings}>
                <View style={styles.accountSettings}>
                    <View style={styles.accountSettingsHeading}>
                        <Text style={styles.accountSettingsHeadingText}>Ustawienia konta</Text>
                    </View>

                    <SettingsButton
                        settingsActionButton={() => navigation.navigate('PersonalData')}
                        accountSettingsHandleText={'Twoje dane'}
                        accountSettingsHandleTip={'Informacje o Tobie i Twoim koncie'}
                        accountSettingsHandlePress={'ZMIEŃ'}
                    />

                    <SettingsButton
                        settingsActionButton={() => navigation.navigate('Adresses')}
                        accountSettingsHandleText={'Adresy do wysyłki'}
                        accountSettingsHandleTip={'Zarządzaj swoimi adresami'}
                        accountSettingsHandlePress={'ZMIEŃ'}
                    />

                    <SettingsButton
                        settingsActionButton={() => navigation.navigate('NotificationsPermission')}
                        accountSettingsHandleText={'Zgody na powiadomienia'}
                        accountSettingsHandleTip={'Bądź na bierząco'}
                        accountSettingsHandlePress={'ZMIEŃ'}
                    />

                </View>
                <TouchableOpacity
                onPress={logoutHandler}
                style={styles.button}
                >
                <Text style={styles.buttonText}>Wyloguj</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default SettingsScreen;
const styles = StyleSheet.create({

    container: {
         flex: 1,

    },
    userData: {

    },
    settings : {
        marginTop: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    accountSettings: {
        width: '100%',
        minHeight: 20,
        backgroundColor: 'rgba(177, 187, 201, 0.1)',
        justifyContent: 'center',
    },
    accountSettingsHeading: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    accountSettingsHeadingText: {
      color: 'grey',
      fontSize: 21,
       fontWeight: 'bold'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    }
});


