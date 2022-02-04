import {View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ordersActions from '../../store/actions/orders';
import ActionButton from '../../components/UI/ActionButton';
import CartSummary from '../../components/UI/CartSummary';
import CartStepHeader from '../../components/UI/CartStepHeader';
import ItemFrame from '../../components/UI/ItemFrame';


const paymentMethods = [
    {
        method: 'Karta płatnicza',
        icon: 'card',
        id: '1'
    },

    {
        method: 'Przelew bankowy',
        icon: '',
        id: '2'
    },

    {
        method: 'Płatność przy odbiorze',
        icon: '',
        id: '3'
    }
];

const ChoosePaymentMethodScreen = ({navigation, route}, props) => {

    const {cartItems} = route.params;
    const {totalAmount} = route.params;
    const {selectedAddress} = route.params;
    const {selectedDeliveryMethod} = route.params;

    const [activeMethod, setActiveMethod] = useState('');

    const selectedPaymentMethod = paymentMethods.filter(
        method => method.id === activeMethod
    )[0];

    return (
        <View style={styles.container}>
            <View style={styles.noOrdersTextContainer}>
                <ScrollView>
                    <View style={styles.paymentMethodSection}>
                        <CartStepHeader headerText={'Metoda Płatnosci'}/>
                        <View style={styles.paymentMethodList}>
                            {
                                paymentMethods.map(
                                    item => {
                                        const isActive = activeMethod.includes(item.id);
                                        return (
                                        <ItemFrame
                                            itemAction={() => !isActive ? setActiveMethod(item.id) : setActiveMethod('')}
                                            key={item.id}
                                            isActive={isActive}
                                            itemText={item.method}
                                        />
                                        )}
                                )
                            }
                        </View>
                    </View>
                </ScrollView>
                <CartSummary totalAmount={totalAmount.toFixed(2)}/>
                <View style={styles.actionsButtonContainer}>
                    <ActionButton
                        action={() => navigation.navigate('OrderSummary',
                            {
                                cartItems,
                                totalAmount,
                                selectedAddress,
                                selectedDeliveryMethod,
                                selectedPaymentMethod
                            })}
                        actionName={'Dalej'}
                        disabled={activeMethod === '' ? true : false}
                    />
                </View>

            </View>
        </View>
    );
};

export default ChoosePaymentMethodScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    noOrdersTextContainer: {
        textAlign: 'center',
    },

    paymentMethodSection: {},

    paymentMethodList: {
        marginTop: 10,
        marginBottom: 10
    },
    actionsButtonContainer: {
        marginBottom: 50
    },

});


