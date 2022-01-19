import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const CartSummary = (props) => {


    return (
        <View style={styles.summary}>
            <Text style={styles.summaryText}>Razem:
                <Text style={styles.amount}> {props.totalAmount} PLN</Text>
            </Text>
            {
                props.actionsButton
            }
        </View>
    );
};

export default CartSummary;

const styles = StyleSheet.create({
    summary: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width : 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
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


