import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import UserDataInput from '../../components/user/UserDataInput';
import SpecialAdresInput from '../../components/user/SpecialAdresInput';
import SettingsChangeResponseMessage from '../../components/user/SettingsChangeResponseMessage';
import * as userActions from '../../store/actions/user';
import Spinner from '../../components/UI/Spinner';
import ActionButton from '../../components/UI/ActionButton';
import SettingsChangeFooter from '../../components/user/SettingsChangeFooter';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constans/Colors';

const Address = (props) => {
    const dispatch = useDispatch();
    const responseMessage = useSelector(state => state.user.responseMessage);
    const loader = useSelector(state => state.user.loader);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [goBack, setGoBack] = useState(false);

    const saveDataHandler = async () => {
        let action;
        if(props.update) {
            action = dispatch(userActions.updateAddress(props.addressId, props.city, props.street, props.houseNumber, props.apartmentNumber, props.postcode));
        }else {
            action =  dispatch(userActions.addAddress(props.city, props.street, props.houseNumber, props.apartmentNumber, props.postcode));
        }
        try {
            await dispatch(action);

        } catch (error) {

        }

    }


    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    const back = () => navigation.navigate(props.route);

    if (goBack === true) {
        setTimeout(() => {
            back();
        }, 0);
    }


    if (responseMessage.status === true) {

        setTimeout(() => {
            setLoading(true);
            setTimeout(() => {
                dispatch(userActions.clearResponseMessage());
                setGoBack(true);
                setLoading(false);
            }, 2000);
        }, 2000);

    } else if (responseMessage.status === false) {

        setTimeout(() => {
            setDisabled(false);
        }, 0);
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
                                headerTitle={"Dodaj adres email"}
                            />

                            <ScrollView>
                                <View style={styles.addOrChangeAddressInputsArea}>
                                    <UserDataInput
                                        inputName={'Miasto'}
                                        inputPalceholder={'Miasto'}
                                        textContentType={'addressCity'}
                                        keyboardType={'default'}
                                        inputValue={props.city}
                                        inputChangeText={props.setCity}
                                    />

                                    <UserDataInput
                                        inputName={'Ulica'}
                                        inputPalceholder={'Ulica'}
                                        textContentType={'streetAddressLine1'}
                                        keyboardType={'default'}
                                        inputValue={props.street}
                                        inputChangeText={props.setStreet}
                                    />

                                    <View style={styles.specialAddressInputsArea}>
                                        <SpecialAdresInput
                                            inputNameStyle={styles.inputName}
                                            inputChangeStyle={styles.inputChange}
                                            inputName={'Nr domu'}
                                            inputPalceholder={'Nr domu'}
                                            textContentType={'streetAddressLine2'}
                                            keyboardType={'default'}
                                            inputValue={props.houseNumber}
                                            inputChangeText={props.setHouseNumber}
                                        />

                                        <SpecialAdresInput
                                            inputNameStyle={styles.inputName}
                                            inputChangeStyle={styles.inputChange}
                                            inputName={'Nr lokalu'}
                                            inputPalceholder={'Nr lokalu'}
                                            textContentType={'streetAddressLine2'}
                                            keyboardType={'default'}
                                            inputValue={props.apartmentNumber}
                                            inputChangeText={props.setApartmentNumber}
                                        />

                                        <SpecialAdresInput
                                            inputNameStyle={styles.inputName}
                                            inputChangeStyle={styles.inputChange}
                                            inputName={'Kod pocztowy'}
                                            inputPalceholder={'Kod pocztowy'}
                                            textContentType={'streetAddressLine2'}
                                            keyboardType={'default'}
                                            inputValue={props.postcode}
                                            inputChangeText={props.setPostcode}
                                        />
                                    </View>
                                </View>
                                {
                                    props.loader === true ?
                                        <Spinner
                                            spinnerSize={'small'}
                                        />
                                        :
                                        <SettingsChangeResponseMessage
                                            responseMessageStatus={responseMessage.status}
                                            responseMessage={responseMessage.message}
                                            responseMessageCode={responseMessage.code}
                                            code={'address'}
                                        />
                                }
                                <ActionButton
                                    action={() => {
                                        Keyboard.dismiss();
                                        saveDataHandler();
                                        setDisabled(true);
                                    }}
                                    disabled={disabled}
                                    actionName={'Zapisz'}
                                />
                            </ScrollView>
                            <SettingsChangeFooter
                                footerText={'Ze względów bezpieczeństwa, wprowadź hasło żeby zmienić adres email.'}
                            />
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
                                    inputName={'Miasto'}
                                    inputPalceholder={'Miasto'}
                                    textContentType={'addressCity'}
                                    keyboardType={'default'}
                                    inputValue={props.city}
                                    inputChangeText={props.setCity}
                                />

                                <UserDataInput
                                    inputName={'Ulica'}
                                    inputPalceholder={'Ulica'}
                                    textContentType={'streetAddressLine1'}
                                    keyboardType={'default'}
                                    inputValue={props.street}
                                    inputChangeText={props.setStreet}
                                />

                                <View style={styles.specialAddressInputsArea}>
                                    <SpecialAdresInput
                                        inputNameStyle={styles.inputName}
                                        inputChangeStyle={styles.inputChange}
                                        inputName={'Nr domu'}
                                        inputPalceholder={'Nr domu'}
                                        textContentType={'streetAddressLine2'}
                                        keyboardType={'default'}
                                        inputValue={props.houseNumber}
                                        inputChangeText={props.setHouseNumber}
                                    />

                                    <SpecialAdresInput
                                        inputNameStyle={styles.inputName}
                                        inputChangeStyle={styles.inputChange}
                                        inputName={'Nr lokalu'}
                                        inputPalceholder={'Nr lokalu'}
                                        textContentType={'streetAddressLine2'}
                                        keyboardType={'default'}
                                        inputValue={props.apartmentNumber}
                                        inputChangeText={props.setApartmentNumber}
                                    />

                                    <SpecialAdresInput
                                        inputNameStyle={styles.inputName}
                                        inputChangeStyle={styles.inputChange}
                                        inputName={'Kod pocztowy'}
                                        inputPalceholder={'Kod pocztowy'}
                                        textContentType={'streetAddressLine2'}
                                        keyboardType={'default'}
                                        inputValue={props.postcode}
                                        inputChangeText={props.setPostcode}
                                    />
                                </View>
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
                                        code={'address'}
                                    />
                            }
                            <ActionButton
                                action={() => {
                                    Keyboard.dismiss();
                                    saveDataHandler();
                                    setDisabled(true);
                                }}
                                disabled={disabled}
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

export default Address;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "space-around"
    },

    addOrChangeAddressInputsArea: {

    },

    personalDataInputsArea: {},

    inputChange: {
        width: 95,
        height: 40,
        borderColor: Colors.primary,
        color: '#403e3e',
        borderWidth: 1,
        alignItems: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 5
    },
    inputName: {
        marginLeft: 20,
        marginTop: 30,
        fontSize: 15
    },

    specialAddressInputsArea: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-around"

    }
});


