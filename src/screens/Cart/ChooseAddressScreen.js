import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ActionButton from '../../components/UI/ActionButton';
import CartSummary from '../../components/UI/CartSummary';
import CartStepHeader from '../../components/UI/CartStepHeader';
import ItemFrame from '../../components/UI/ItemFrame';
import * as userActions from '../../store/actions/user';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from '@react-navigation/native';
import Spinner from '../../components/UI/Spinner';

const deliveryMethod = [
    {
        method: 'Poczta',
        price: 15,
        id: '1'
    },

    {
        method: 'Kurier DPD',
        price: 18,
        id: '2'
    },

    {
        method: 'Transport dedykowany',
        price: 200,
        id: '4'
    },

    {
        method: 'Odbior osobisty',
        price: 0,
        id: '5'
    }

];


const ChooseAddressScreen = ({ navigation, route }, props) => {

    const { cartItems } = route.params;
    const { cartTotalAmount } = route.params;
    const address = useSelector(state => state.user.addresses);
    const isFocused = useIsFocused();

    const [activeAddress, setActiveAddress] = useState('');
    const [activeMethod, setActiveMethod] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(0);

    useEffect(() => {
        setLoading(true);
        const onValueChange = async () =>
        {
                   await console.log('siema')
        }
        onValueChange().then(
            () => {
                setTimeout(
                    () => {
                        setLoading(false);
                    }, 1000
                )
            }
        );
    }, [isFocused]);

    const [loading, setLoading] = useState(false);

    const totalAmount = cartTotalAmount + deliveryCost;

    const selectedAddress = address.filter(
        address => address.id === activeAddress
    )[0];

    const selectedDeliveryMethod = deliveryMethod.filter(
        method => method.id === activeMethod
    )[0];


    if (activeMethod === '5') {
       setTimeout(() => {
           setActiveAddress('odbiór osobisty')
       },0)
    }

    if (activeAddress === 'odbiór osobisty' && activeMethod !== '5' ) {
        setTimeout(() => {
            setActiveAddress('')
        },0)
    }

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
                <CartStepHeader headerText={'Adres dostawy'}/>
                <View style={styles.addressesOrDeliveryMethodList}>
                {
                    address.map(
                        item => {
                    const isActive = activeAddress.includes(item.id);

                    return (
                        <ItemFrame
                            itemAction={() => !isActive ? setActiveAddress(item.id) : setActiveAddress('')}
                            key={item.id}
                            isActive={isActive}
                            itemText={item.city + ' ul.' + item.street + " "  + item.houseNumber + [item.houseNumber !== '' && item.apartmentNumber !== ''? '/' + item.apartmentNumber : ' ' + item.apartmentNumber] + ' ' + item.postcode}
                            />
                    )}
                    )
                }
                </View>
                <View>
                    {
                        address.length < 5 ? <ItemFrame
                            itemAction={() => navigation.navigate('AddAddress')}
                            itemText={'Dodaj adres'}
                            add={true}
                            />
                            : null
                    }
                </View>
            </View>

            <View>
                <CartStepHeader headerText={'Metoda dostawy'}/>
                <View style={styles.addressesOrDeliveryMethodList}>
                    {
                        deliveryMethod.map(
                            item => {
                                const isActive = activeMethod.includes(item.id);
                                return (
                                    <ItemFrame
                                        itemAction={() => !isActive ? [setActiveMethod(item.id), setDeliveryCost(item.price)]  : [setActiveMethod(''), setDeliveryCost(0)]}
                                        key={item.id}
                                        isActive={isActive}
                                        itemText={item.method + ' +' + item.price + ' PLN'}
                                    />
                                )}
                        )
                    }
                </View>

            <View/>

            </View>
            </ScrollView>
            <CartSummary totalAmount={(cartTotalAmount + deliveryCost).toFixed(2)}/>
            <View style={styles.actionsButtonContainer}>
            <ActionButton
                action={() => navigation.navigate('ChoosePaymentMethod',
                    {
                        cartItems,
                        totalAmount,
                        selectedAddress,
                        selectedDeliveryMethod
                    }
                )}
                actionName={'Dalej'}
                disabled={activeAddress === '' || activeMethod === '' ? true : false}
            />
            </View>
        </View>
    );
}

export default ChooseAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    addressesOrDeliveryMethodList: {
        marginTop: 10,
        marginBottom: 10
    },

    actionsButtonContainer: {
        marginBottom: 50
    },

});


