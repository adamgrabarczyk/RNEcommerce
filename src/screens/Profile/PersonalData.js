import {ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserDataInput from '../../components/user/UserDataInput';
import Colors from '../../constans/Colors';
import * as userActions from '../../store/actions/user';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from 'react-redux';


const PersonalData = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getUserData = async () => {
            const authData = await AsyncStorage.getItem('authData');
            const parseAuthData = JSON.parse(authData);

            setId(parseAuthData.user);
            setkey(parseAuthData.key);
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
    const [key, setkey] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    if (loading) {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator
                    style={styles.spinner}
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.personalDataHeading}>
                <Text style={styles.personalDataHeadingText}>Dane konta</Text>
            </View>
            <View style={styles.personalDataInputsArea}>
                <UserDataInput
                    inputName={'Imię'}
                    inputPalceholder={'Imię'}
                    inputValue={name}
                    inputChangeText={(value) => setName(value)}
                />

                <UserDataInput
                    inputName={'Nazwisko'}
                    inputPalceholder={'Nazwisko'}
                    inputValue={surname}
                    inputChangeText={(value) => setSurname(value)}
                />

                <UserDataInput
                    inputName={'email'}
                    inputPalceholder={'email'}
                    inputValue={email}
                    inputChangeText={(value) => setEmail(value)}
                />

                <UserDataInput
                    inputName={'Telefon'}
                    inputPalceholder={'Telefon'}
                    inputValue={phone}
                    inputChangeText={(value) => setPhone(value)}
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    dispatch(userActions.updatePersonalData(id, name, surname, email, phone, key));
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Zapisz</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default PersonalData;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    personalDataHeading: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.6,
        marginTop: 30,
        paddingBottom: 30
    },

    personalDataHeadingText: {
        color: 'grey',
        fontSize: 21,
        fontWeight: 'bold'
    },

    personalDataInputsArea: {
        marginTop: 40
    },

    button: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
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
    }




});

