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

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
            setEmail(parseAuthData.email);
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
                                inputName={'Podaj hasło'}
                                inputPalceholder={'hasło'}
                                textContentType={'password'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                inputValue={password}
                                inputChangeText={(value) => setPassword(value)}
                            />

                            <UserDataInput
                                inputName={'Podaj nowe hasło'}
                                inputPalceholder={'nowe hasło'}
                                textContentType={'password'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                inputValue={newPassword}
                                inputChangeText={(value) => setNewPassword(value)}
                            />

                            <UserDataInput
                                inputName={'Potweirdź nowe hasło'}
                                inputPalceholder={'potwierdź nowe hasło'}
                                textContentType={'password'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                inputValue={confirmPassword}
                                inputChangeText={(value) => setConfirmPassword(value)}
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
                                    code={'password'}
                                />
                        }
                        <ActionButton
                            action={() => {
                                Keyboard.dismiss();
                                dispatch(userActions.updateUserPassword(password, newPassword, confirmPassword, userEmail)).then(
                                    () => {
                                        setPassword('');
                                        setNewPassword('');
                                        setConfirmPassword('');
                                    }
                                );
                            }}
                            actionName={'Zapisz'}
                        />

                        <SettingsChangeFooter
                            footerText={'Ze względów bezpieczeństwa, wprowadź obecne hasło żeby zmienić je na nowe.'}
                        />
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default ChangePassword;

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


