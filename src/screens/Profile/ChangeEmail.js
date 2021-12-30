import {View, ScrollView,  Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserDataInput from '../../components/user/UserDataInput';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from 'react-redux';
import ActionButton from '../../components/UI/ActionButton';
import Spinner from '../../components/UI/Spinner';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import SettingsChangeFooter from '../../components/user/SettingsChangeFooter';
import {Header} from '@react-navigation/stack';
import SettingsChangeResponseMessage from '../../components/user/SettingsChangeResponseMessage';


const ChangeEmail = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);
            setEmail(parseAuthData.email);
        }
        getUserData().then(
            () => {
                setLoading(false);
            }
        );
    },[]);

    if (loading) {
        return <Spinner/>
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset = {Platform.OS === "android" ? Header.HEIGHT + 20 : null}
            style={styles.container}
        >


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
            <SettingsChangeHeader
                headerTitle={"Zmiana adresu email"}
            />
            <ScrollView>
            <View style={styles.inputsArea}>
            <UserDataInput
            inputName={'Zmień adres email'}
            inputPalceholder={'email'}
            textContentType={'emailAddress'}
            keyboardType={'default'}
            inputValue={email}
            inputChangeText={(value) => setEmail(value)}
            />

            <UserDataInput
                inputName={'Podaj hasło'}
                inputPalceholder={'hasło'}
                textContentType={'password'}
                keyboardType={'default'}
                inputValue={password}
                inputChangeText={(value) => setPassword(value)}
            />
            </View>
                <SettingsChangeResponseMessage
                    responseMessageStatus={responseStatus}
                    responseMessage={responseMessage}
                />
            <ActionButton
                action={() => {
                    Keyboard.dismiss();
                    setResponseStatus(true);
                    setResponseMessage('Adres email został zaktualizowany');
                }}
                actionName={'Zapisz'}
            />

            <SettingsChangeFooter
                footerText={'Ze względów bezpieczeństwa, wprowadź hasło żeby zmienić adres email.'}
            />
            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
    );
}

export default ChangeEmail;

const styles = StyleSheet.create({

    container: {
      flex: 1,
    },
    inner: {
        flex: 1,
    },

    inputsArea: {
        marginBottom: 25
    }
});


