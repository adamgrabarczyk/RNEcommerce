import { StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../store/actions/auth';
import UserProfile from '../../components/user/UserProfile';
import {useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';

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
            <View style={styles.userData}>
                <Text onPress={() => console.log('blah')}>{userEmail}</Text>
                <Text onPress={() => console.log('blah')}>{userName}  {userSurname}</Text>
            </View>
            <View style={styles.settings}>
                <View style={styles.accountSettings}>
                    <View style={styles.accountSettingsHeading}>
                        <Text style={styles.accountSettingsHeadingText}>Ustawienia konta</Text>
                    </View>
                    <View style={styles.accountSettingsHandleContainer}>
                        <TouchableOpacity style={styles.accountSettingsHandle}>
                            <View>
                        <Text style={styles.accountSettingsHandleText}>Twoje dane</Text>
                        <Text style={styles.accountSettingsHandleTip}>Informacje o Tobie i Twoim koncie</Text>
                            </View>
                        <Text style={styles.accountSettingsHandlePress}>ZMIEŃ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountSettingsHandleContainer}>
                        <TouchableOpacity style={styles.accountSettingsHandle}>
                            <View>
                                <Text style={styles.accountSettingsHandleText}>Adresy do wysyłki</Text>
                                <Text style={styles.accountSettingsHandleTip}>Zarządzaj swoimi adresami</Text>
                            </View>
                            <Text style={styles.accountSettingsHandlePress}>ZMIEŃ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.accountSettingsHandleContainer}>
                        <TouchableOpacity style={styles.accountSettingsHandle}>
                            <View>
                                <Text style={styles.accountSettingsHandleText}>Zgody na powiadomienia</Text>
                                <Text style={styles.accountSettingsHandleTip}>Bądź na bierząco</Text>
                            </View>
                            <Text style={styles.accountSettingsHandlePress}>ZMIEŃ</Text>
                        </TouchableOpacity>
                    </View>
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
    accountSettingsHandleContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
    },
    accountSettingsHandle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
    accountSettingsHandleText: {
        color: 'grey',
        fontSize: 20,
        marginBottom: 3
    },
    accountSettingsHandleTip: {
        fontSize: 12,
        color: 'grey',
    },
    accountSettingsHandlePress: {
        marginTop: 10,
        fontSize: 17,
        color: Colors.primary,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    }
});


