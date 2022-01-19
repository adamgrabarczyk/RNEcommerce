import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import * as ordersActions from '../../store/actions/orders';
import ActionButton from '../../components/UI/ActionButton';
import {useDispatch} from 'react-redux';
import CartSummary from '../../components/UI/CartSummary';
import CartStepHeader from '../../components/UI/CartStepHeader';


const OrderSummaryScreen = ({navigation, route}, props) => {

    const {cartItems} = route.params;
    const {totalAmount} = route.params;
    const {selectedAddress} = route.params;
    const {selectedDeliveryMethod} = route.params;
    const {selectedPaymentMethod} = route.params;
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={styles.catItemsContainer}>
                <ScrollView>
                    <View style={styles.cartSection}>
                      <CartStepHeader headerText={'Podsumowanie zamówienia'}/>
                        <View style={styles.cartItemList}>
                            {
                                cartItems.map(
                                    item =>
                                        <View style={styles.cartItemBox} key={item.productId}>
                                            <View style={styles.cartItemTitleContainer}>
                                                <Text style={styles.cartItemTitle}>{item.productTitle}</Text>
                                            </View>
                                            <View style={styles.cartItemPriceContainer}>
                                            <View style={styles.cartItemUnitPriceBox}>
                                                <Text style={styles.cartItemUnitPrice}>{item.productPrice} PLN x </Text>
                                                <Text style={styles.cartItemQuantity}>{item.quantity} szt.</Text>
                                            </View>
                                                <View style={styles.cartItemSummaryBox}>
                                            <Text style={styles.cartItemSummary}>Razem: {item.sum} PLN</Text>
                                                </View>
                                            </View>
                                        </View>
                                )
                            }
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Adres dostawy: {selectedAddress.city + ' ' + selectedAddress.street + ' ' + selectedAddress.houseNumber + ' ' + selectedAddress.apartmentNumber + ' ' + selectedAddress.postcode}</Text>
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Dostawa: {selectedDeliveryMethod.method + ' +' + selectedDeliveryMethod.price} zł</Text>
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Metoda płatności: {selectedPaymentMethod.method}</Text>
                        </View>
                    </View>
                </ScrollView>

                <CartSummary totalAmount={totalAmount}/>
                <View style={styles.actionsButtonContainer}>
                    <ActionButton
                        action={() => {
                            dispatch(ordersActions.addOrder(cartItems, totalAmount, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod));
                            navigation.navigate('Cart');
                        }}
                        actionName={'Zamawiam i płacę'}
                    />
                </View>

            </View>
        </View>
    );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    catItemsContainer: {
        textAlign: 'center',
    },

    cartSection: {},

    cartItemList: {
        marginTop: 10,
        marginBottom: 10
    },

    actionsButtonContainer: {
        marginBottom: 50
    },

    cartItemBox: {
        backgroundColor: 'white',
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80
    },

    cartItemTitleContainer: {
        width: '50%',
        marginLeft: 10
    },

    cartItemTitle: {
        fontSize: 18
    },

    cartItemPriceContainer: {
        width: '50%',
        alignItems: 'center'
    },

    cartItemUnitPriceBox: {
        flexDirection: 'row',
        margin: 5
    },

    cartItemUnitPrice: {

    },

    cartItemQuantity: {

    },

    cartItemSummaryBox: {
        margin: 5
    },

    cartItemSummary: {

    },

    customContainer: {
       backgroundColor: '#dedede',
        margin: 5,
        height: 50,
        justifyContent: 'center'
    },

    customText: {
        margin: 10,
        fontSize: 15
    }



});


