import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import * as authActions from '../../store/actions/auth';
import UserProfile from '../../components/user/UserProfile';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constans/Colors';
import SettingsButton from '../../components/user/SettingsButton';
import PersonalData from './PersonalData';

const SettingsScreen = ({navigation}) => {
    const userEmail = useSelector(state => state.auth.email);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    return (
        <ScrollView style={styles.container}>
            <UserProfile/>
            <View style={styles.userEmailContainer}>
                <Text style={styles.userEmail}>{userEmail}</Text>
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
                        settingsActionButton={() => navigation.navigate('EmailPassword')}
                        accountSettingsHandleText={'Email i hasło'}
                        accountSettingsHandleTip={'Zmień email lub hasło'}
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
    },
    spinnerContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    userEmailContainer: {
        alignItems: 'center'
    },

    userEmail: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey'
    }
});


