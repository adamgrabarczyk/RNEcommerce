import { ScrollView, Text, StyleSheet} from 'react-native';
import React from 'react';
import SettingsButton from '../../components/user/SettingsButton';
import {useSelector} from 'react-redux';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';


const EmailPassword = ({navigation}) => {
    const userEmail = useSelector(state => state.auth.email);

    return (
        <ScrollView>
            <SettingsChangeHeader
                headerTitle={"Zmień adres email lub hasło"}
            />
            <SettingsButton
                settingsActionButton={() => navigation.navigate('ChangeEmail')}
                accountSettingsHandleText={userEmail}
                accountSettingsHandleTip={'Zmień adres email'}
            />
            <SettingsButton
                settingsActionButton={() => navigation.navigate('ChangePassword')}
                accountSettingsHandleText={'Hasło'}
                accountSettingsHandleTip={'Zmień hasło do swojego konta'}
            />
        </ScrollView>
    );
}

export default EmailPassword;

const styles = StyleSheet.create({

});


