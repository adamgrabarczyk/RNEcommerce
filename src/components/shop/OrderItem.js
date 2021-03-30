import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


import CartItem from './CartItem'

const OrderItem = props => {
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.detailButton}>Show Details</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    totalAmount: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16
    },

    date: {
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBoldItalic',
        color: '#888'
    },

    detailButton: {

    }


});

export default OrderItem;
