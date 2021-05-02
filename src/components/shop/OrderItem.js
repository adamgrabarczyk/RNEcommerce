import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


import CartItem from './CartItem'

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
            <Text style={styles.totalAmount}>{props.amount} PLN</Text>
            <Text style={styles.date}>{props.date}</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.detailButton} onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
            </TouchableOpacity>
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(carItem => (
                    <CartItem
                        key={carItem.productId}
                        quantity={carItem.quantity}
                        amount={carItem.sum}
                        title={carItem.productTitle}
                    />
                )
                )}
            </View>}
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

    detailItems: {
      width: '100%'
    },

    detailButton: {

    }


});

export default OrderItem;
