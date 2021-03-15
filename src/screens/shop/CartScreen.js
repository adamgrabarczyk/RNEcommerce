import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constans/Colors';

const CartScreen = props => {

    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    return(
    <View style={styles.cartScreen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount}</Text></Text>
            <TouchableOpacity onPress={() => {}}>
                <Text>Order now</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text>Cart Items</Text>
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
    }


});

export default CartScreen;
