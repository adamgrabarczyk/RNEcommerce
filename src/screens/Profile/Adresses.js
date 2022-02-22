import {
    View,
    StyleSheet, FlatList, Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SettingsChangeHeader from '../../components/user/SettingsChangeHeader';
import SettingsButton from '../../components/user/SettingsButton';
import Colors from '../../constans/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import * as userActions from '../../store/actions/user';
import { useIsFocused } from '@react-navigation/native';
import SettingsChangeFooter from '../../components/user/SettingsChangeFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Adresses = ({navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        const onValueChange = async () =>
        {
            dispatch(userActions._getUserAddresses());
            await AsyncStorage.getItem('authData');
            setAddresses(address);
        }
        onValueChange().then(
            () => {
                setLoading(false);
            }
        );
    }, [isFocused]);

    const address = useSelector(state => state.user.addresses);
    const [addresses, setAddresses] = useState(address);
    const [loading, setLoading] = useState(false);


    const deleteAddresses = (addressId) => {
       const updatedAdresses = addresses.filter(
            (address) => address.id !== addressId
        );
       setAddresses(updatedAdresses);
    }


    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    return (
        <View>
            <SettingsChangeHeader
                headerTitle={"Dodaj swoje adresy"}
            />
            <SettingsButton
                settingsActionButton={() => navigation.navigate('AddOrChangeAddress')}
                disabled={addresses.length >= 5 ? true : null}
                accountSettingsHandleText={'Dodaj adres'}
                accountSettingsHandleTip={'Dodaj nowy adres'}
                accountSettingsHandlePress={<Octicons
                    style={styles.addIcon}
                    name={'plus'}
                    size={30}
                    color={Colors.primary}
                />}
            />

            <View style={styles.addressesList}>
                <FlatList
                    data={addresses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={itemData => (
                        <SettingsButton
                            settingsActionButton={() => navigation.navigate('AddOrChangeAddress', {
                                address: {
                                    id: itemData.item.id.toString(),
                                    city: itemData.item.city,
                                    street: itemData.item.street,
                                    houseNumber: itemData.item.houseNumber,
                                    apartmentNumber: itemData.item.apartmentNumber,
                                    postcode: itemData.item.postcode
                                },
                            })}
                            accountSettingsHandleText={itemData.item.city + ' ul.' + itemData.item.street + " "  + itemData.item.houseNumber + [itemData.item.houseNumber !== '' && itemData.item.apartmentNumber !== ''? '/' + itemData.item.apartmentNumber : ' ' + itemData.item.apartmentNumber]}
                            accountSettingsHandleTip={'Zmień adres na inny'}
                            deleteContnet={<Ionicons
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color={'#b53b36'}
                            />}
                            accountSettingsHandleContainerWithDelete={styles.accountSettingsHandleContainerWithDelete}
                            delete={() => {
                                dispatch(userActions.deleteAddress(itemData.item.id.toString()))
                                deleteAddresses(itemData.item.id.toString());
                            }
                            }
                            deleteStyle={styles.deleteStyle}
                        />
                    )}
                />
            </View>
            <View style={styles.footer}>
                <SettingsChangeFooter
                    footerText={'Zarządzaj swoimi adresami. Dadajn nowy lub aktualizuj istniejący. Możesz zadeklarować maksymalnie 5 adresów.'}
                />
            </View>
        </View>
    );
}

export default Adresses;



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    },

    addressesList: {

    },

    footer: {
        marginTop: 30
    },

    accountSettingsHandleContainerWithDelete: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    deleteStyle: {
        margin: 20
    }

});
