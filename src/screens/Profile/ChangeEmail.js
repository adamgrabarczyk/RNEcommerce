import {View, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback, Platform, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserDataInput from '../../components/user/UserDataInput';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';
import ActionButton from '../../components/UI/ActionButton';
import Spinner from '../../components/UI/Spinner';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import SettingsChangeFooter from '../../components/user/SettingsChangeFooter';
import {Header} from '@react-navigation/stack';
import SettingsChangeResponseMessage from '../../components/user/SettingsChangeResponseMessage';
import * as userActions from '../../store/actions/user';

const ChangeEmail = () => {
    const dispatch = useDispatch();
    const [newEmail, setNewEmail] = useState();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const responseMessage = useSelector(state => state.user.responseMessage);
    const loader = useSelector(state => state.user.loader);
    const userEmail = useSelector(state => state.auth.userEmail);

    useEffect(() => {
        dispatch(userActions.clearResponseMessage());
        setLoading(true);
        const getUserData = async () => {
            dispatch(userActions.clearResponseMessage);
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);
            setNewEmail(parseAuthData.email);
        }
        getUserData().then(
            () => {
                setLoading(false);
            }
        );
    },[]);

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
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
            inputValue={newEmail}
            inputChangeText={(value) => setNewEmail(value)}
            />

            <UserDataInput
                inputName={'Podaj hasło'}
                inputPalceholder={'hasło'}
                textContentType={'password'}
                keyboardType={'default'}
                secureTextEntry={true}
                inputValue={password}
                inputChangeText={(value) => setPassword(value)}
            />
            </View>

                {
                    loader === true ?
                        <Spinner
                        spinnerSize={'small'}
                        />
                        :
                        <SettingsChangeResponseMessage
                        responseMessageStatus={responseMessage.status}
                        responseMessage={responseMessage.message}
                        responseMessageCode={responseMessage.code}
                        code={'email'}
                        />
                }
            <ActionButton
                action={() => {
                    Keyboard.dismiss();
                    dispatch(userActions.updateUserEmail(userEmail, password, newEmail));
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


