import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../constans/Colors';
import CartItem from '../components/shop/CartItem';
import * as cartActions from '../store/actions/cart'
import CartSummary from '../components/UI/CartSummary';

const Cart = ({ navigation },props) => {

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
            cartItems.length > 0  ?

            <View style={styles.cartContainer}>

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
                                quantity={isNaN(itemData.item.quantity) == true ? '1' : itemData.item.quantity.toString()}
                                getValue={

                                    (value) => {
                                        const selectedProduct =  product.find(prod => prod.id === itemData.item.productId);
                                        const cleanValue = value.replace(/[- #*;,.<>\{\}\[\]\\\/0]/gi, '1');

                                        if (value == 0) {
                                           alert('wprowadz poprawna liczbe')
                                        }else if(isNaN(value)) {
                                            alert('put number here! ' + cleanValue + ' ' + value)
                                        }else {

                                        dispatch(cartActions.changeQtyFromInput(selectedProduct, cleanValue, itemData.item.productId));
                                    }
                                    }
                                }
                                checkValue={
                                    () => {
                                        const selectedProduct =  product.find(prod => prod.id === itemData.item.productId);
                                        const value = itemData.item.quantity;
                                        if (value == '' || value == ' ' || isNaN(value)) {
                                            dispatch(cartActions.changeQtyFromInput(selectedProduct, 1, itemData.item.productId));
                                        }

                                }
                                }
                                input={true}
                                name={itemData.item.productTitle}
                                amount={itemData.item.sum.toFixed(2)}
                                deletable
                                onRemove={() => {
                                    dispatch(cartActions.removeFromCart(itemData.item.productId))
                                }}
                                subtractItem={' - '}
                                deleteCart={() => {
                                    dispatch(cartActions.deleteCart(itemData.item.productId, itemData.item.sum))
                                }}
                                counterContainer={styles.counterContainer}
                                counterBox={styles.counterBox}
                                plus={styles.plusMinus}
                                minus={itemData.item.quantity <= 1 ? styles.disabledMinus : styles.plusMinus}
                            />}
                    />
                    <CartSummary
                    totalAmount={cartTotalAmount.toFixed(2)}
                    actionsButton={<TouchableOpacity onPress={() => navigation.navigate('PaymentNavigator', {
                        screen: 'ChooseAddress',
                        params: {
                            cartItems,
                            cartTotalAmount
                        }
                    })} disabled={cartItems.length === 0}>
                        <Text style={(cartItems.length === 0) ? styles.orderButtonDisabled : styles.orderButton}>DO KASY</Text>
                    </TouchableOpacity>}
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
      marginTop: 30,
    },

    orderButton: {
        color: Colors.primary,
        fontWeight: '500',
        fontSize: 18
    },

    orderButtonDisabled: {
        color: 'grey'
    },
    noCartTextContainer: {
        textAlign: 'center'
    },

    noCartText: {

    },

    counterBox: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },

    plusMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black'
    },
    disabledMinus: {
        textAlign: 'center',
        width: 30,
        margin: 10,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: 'black',
        color: 'grey'

    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black'
    }


});

export default Cart;
