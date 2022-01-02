import {Platform, ScrollView, Keyboard, TouchableWithoutFeedback, View, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserDataInput from '../../components/user/UserDataInput';
import * as userActions from '../../store/actions/user';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';
import { Header } from '@react-navigation/stack';
import ActionButton from '../../components/UI/ActionButton';
import Spinner from '../../components/UI/Spinner';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import SettingsChangeResponseMessage from '../../components/user/SettingsChangeResponseMessage';
import SettingsChangeFooter from '../../components/user/SettingsChangeFooter';


const PersonalData = () => {

    const responseMessage = useSelector(state => state.user.responseMessage);
    const loader = useSelector(state => state.user.loader);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');



            const parseAuthData = JSON.parse(authData);

            setId(parseAuthData.user);
            setKey(parseAuthData.key);
            setEmail(parseAuthData.email);
            setName(parseAuthData.name);
            setSurname(parseAuthData.surname);
            setPhone(parseAuthData.phone);
        }
        getUserData().then(
            () => {
                setLoading(false);
            }
        );
    },[]);


    const [id, setId] = useState();
    const [key, setKey] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

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

            {

                Platform.OS === "android" ?


            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <SettingsChangeHeader
                        headerTitle={"Dane konta"}
                    />

                    <ScrollView>
            <View style={styles.personalDataInputsArea}>
                <UserDataInput
                    inputName={'Imię'}
                    inputPalceholder={'Imię'}
                    textContentType={'username'}
                    keyboardType={'default'}
                    inputValue={name}
                    inputChangeText={(value) => setName(value)}
                />

                <UserDataInput
                    inputName={'Nazwisko'}
                    inputPalceholder={'Nazwisko'}
                    textContentType={'familyName'}
                    keyboardType={'default'}
                    inputValue={surname}
                    inputChangeText={(value) => setSurname(value)}
                />

                <UserDataInput
                    inputName={'Telefon'}
                    inputPalceholder={'Telefon'}
                    textContentType={'telephoneNumber'}
                    keyboardType={'phone-pad'}
                    inputValue={phone}
                    inputChangeText={(value) => setPhone(value)}
                />
            </View>
                        <SettingsChangeResponseMessage
                            responseMessageStatus={responseMessage.status}
                            responseMessage={responseMessage.message}
                            responseMessageCode={responseMessage.code}
                            code={'data'}
                        />
            <TouchableOpacity
                onPress={() => {
                    Keyboard.dismiss();
                    dispatch(userActions.updatePersonalData(id, name, surname, email, phone, key));
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Zapisz</Text>
            </TouchableOpacity>
                    </ScrollView>
                    <View style={Platform.OS === "ios" ? styles.footerContainer : styles.footerContainerAnd}>
                    </View>
                </View>
            </TouchableWithoutFeedback>

                    :
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                            <SettingsChangeHeader
                                headerTitle={"Dane konta"}
                            />
                                <View style={styles.personalDataInputsArea}>
                                    <UserDataInput
                                        inputName={'Imię'}
                                        inputPalceholder={'Imię'}
                                        textContentType={'username'}
                                        keyboardType={'default'}
                                        inputValue={name}
                                        inputChangeText={(value) => setName(value)}
                                    />

                                    <UserDataInput
                                        inputName={'Nazwisko'}
                                        inputPalceholder={'Nazwisko'}
                                        textContentType={'familyName'}
                                        keyboardType={'default'}
                                        inputValue={surname}
                                        inputChangeText={(value) => setSurname(value)}
                                    />

                                    <UserDataInput
                                        inputName={'Telefon'}
                                        inputPalceholder={'Telefon'}
                                        textContentType={'telephoneNumber'}
                                        keyboardType={'phone-pad'}
                                        inputValue={phone}
                                        inputChangeText={(value) => setPhone(value)}
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
                                        code={'data'}
                                    />
                            }
                                <ActionButton
                                    action={() => {
                                        Keyboard.dismiss();
                                        dispatch(userActions.updatePersonalData(id, name, surname, email, phone, key));
                                    }}
                                    actionName={'Zapisz'}
                                />
                            <SettingsChangeFooter
                                footerText={'Wpisz swoje aktualne dane w tym formularzu i zapisz je na serwerze.'}
                            />
                        </View>
                    </TouchableWithoutFeedback>
            }
        </KeyboardAvoidingView>
    );
}

export default PersonalData;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "space-around"
    },



});

