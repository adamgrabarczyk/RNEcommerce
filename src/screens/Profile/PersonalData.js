import {Platform, ScrollView, Keyboard, TouchableWithoutFeedback, View, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserDataInput from '../../components/user/UserDataInput';
import Colors from '../../constans/Colors';
import * as userActions from '../../store/actions/user';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '@react-navigation/stack';
import ActionButton from '../../components/UI/ActionButton';
import Spinner from '../../components/UI/Spinner';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import SettingsChangeResponseMessage from '../../components/user/SettingsChangeResponseMessage';


const PersonalData = () => {

    const responseMessage = useSelector(state => state.user.responseMessage);
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
        return <Spinner/>
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
            <View style={styles.responseMessageContainer}>
                {

                    responseMessage.status === true ?
                        <Octicons
                            style={styles.responseMessageIcon}
                            name={'check'}
                            size={25}
                            color={Colors.primary}
                        /> : null
                    ||

                        responseMessage.status === false ?
                        <Ionicons
                            style={styles.responseMessageIcon}
                            name={'close'}
                            size={25}
                            color={'red'}
                        /> : null


                }
                <Text style={responseMessage.status === true ? styles.responseMessageText : styles.responseMessageTextError}>{responseMessage.message}</Text>
            </View>
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
                                <SettingsChangeResponseMessage
                                    responseMessageStatus={responseMessage.status}
                                    responseMessage={responseMessage.message}
                                />
                                <ActionButton
                                    action={() => {
                                        Keyboard.dismiss();
                                        dispatch(userActions.updatePersonalData(id, name, surname, email, phone, key));
                                    }}
                                    actionName={'Zapisz'}
                                />
                            <View style={Platform.OS === "ios" ? styles.footerContainer : styles.footerContainerAnd}>
                            </View>
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

    personalDataInputsArea: {

    },
    // responseMessageContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '100%',
    //     height:20,
    //     marginTop: Platform.OS === 'ios' ? 5 : 20,
    //     marginBottom: Platform.OS === 'ios' ? 5 : 20
    // },
    //
    // responseMessageText: {
    //     color: 'green',
    //     textAlign: 'center',
    //     height: 20,
    //     marginTop: 8
    // },
    //
    // responseMessageTextError: {
    //     color: 'red',
    //     textAlign: 'center',
    //     height: 20,
    //     marginTop: Platform.OS === 'ios' ? 8 : 0
    // },
    //
    // responseMessageIcon: {
    //     marginRight: 2
    // },

    footerContainer: {
        width: '100%',
        height: 120
    },

    footerContainerAnd: {
        width: '100%',
        height: 10
    }


});

