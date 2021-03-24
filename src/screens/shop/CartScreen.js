import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constans/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }

        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1 );
    });
        const  dispatch = useDispatch();
    return(
    <View style={styles.cartScreen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
            <TouchableOpacity  onPress={() => {
                dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
            }} disabled={cartItems.length === 0}>
                <Text style={(cartItems.length === 0) ? styles.orderButtonDisabled : styles.orderButton}>Order now</Text>
            </TouchableOpacity>
        </View>
        <View>
            <FlatList
            data={cartItems}
            keyExtractor={item => item.productId}
            renderItem={itemData =>
                <CartItem
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                }}

            />}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({

    cartScreen: {
        margin: 20
    },

    summary: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    summaryText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 18
    },

    amount: {
        color: Colors.accent
    },

    orderButton: {
        color: Colors.primary
    },

    orderButtonDisabled: {
        color: 'grey'
    }


});

export default CartScreen;
