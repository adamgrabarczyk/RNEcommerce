import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constans/Colors';
import CartItem from '../components/shop/CartItem';
import * as cartActions from '../store/actions/cart'
import * as ordersActions from '../store/actions/orders'

const Cart = props => {

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

    const product = useSelector(state => state.products.availableProducts);


    const dispatch = useDispatch();
    return(
    <View style={styles.cartScreen}>
        {
            cartItems.length > 0 ?

            <View style={styles.cartContainer}>
                <View style={styles.summary}>
                    <Text style={styles.summaryText}>Total:
                        <Text style={styles.amount}> {cartTotalAmount} PLN</Text>
                    </Text>
                    <TouchableOpacity onPress={() => {
                        dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
                    }} disabled={cartItems.length === 0}>
                        <Text style={(cartItems.length === 0) ? styles.orderButtonDisabled : styles.orderButton}>Order
                            now</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.productId}
                        renderItem={itemData =>
                            <CartItem
                                onAdd={
                                    () => {
                             const selectedProduct =  product.find(prod => prod.id === itemData.item.productId);

                                        dispatch(cartActions.increaseCartItem(selectedProduct, itemData.item.quantity, selectedProduct.id));
                                        console.log(cartItems);
                                    }
                                }
                                add={" + "}
                                quantity={itemData.item.quantity}
                                getValue={

                                    (value) => {
                                        const selectedProduct =  product.find(prod => prod.id === itemData.item.productId);
                                        const cleanValue = value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '1');

                                        if (value == 0) {
                                            const cleanVal = value.replace(/[0]/gi, '1');
                                            dispatch(cartActions.changeQtyFromInput(selectedProduct, cleanVal, itemData.item.productId));
                                        }else {

                                        dispatch(cartActions.changeQtyFromInput(selectedProduct, cleanValue, itemData.item.productId));
                                    }
                                    }
                                }
                                checkValue={
                                    () => {
                                        const selectedProduct =  product.find(prod => prod.id === itemData.item.productId);
                                        const value = itemData.item.quantity;
                                        if (value == '') {
                                            dispatch(cartActions.changeQtyFromInput(selectedProduct, 1, itemData.item.productId));
                                        }

                                }
                                }
                                name={itemData.item.productTitle}
                                amount={itemData.item.sum}
                                deletable
                                onRemove={() => {
                                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                                }}
                                subtractItem={' - '}
                                deleteCart={() => {
                                    dispatch(cartActions.deleteCart(itemData.item.productId, itemData.item.sum))
                                }}
                            />}
                    />
                </View>
            </View>
                :
               <View style={styles.noCartTextContainer}>
                   <Text style={styles.noCartText}>Koszyk jest pusty</Text>
               </View>
        }
    </View>
    )
}

const styles = StyleSheet.create({

    cartScreen: {
        margin: 20,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cartContainer: {
      marginTop: 30
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
    },
    noCartTextContainer: {
        textAlign: 'center'
    },

    noCartText: {

    }


});

export default Cart;
