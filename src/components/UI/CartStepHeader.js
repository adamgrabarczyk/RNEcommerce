import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const CartStepHeader = (props) => {


    return (
        <View style={styles.deliveryAddressHeader}>
            <Text style={styles.deliveryAddressHeaderText}>{props.headerText}</Text>
        </View>
    );
};

export default CartStepHeader;

const styles = StyleSheet.create({
    deliveryAddressHeader: {
        backgroundColor: Colors.primary,
        padding: 10,
        alignItems: 'center'
    },

    deliveryAddressHeaderText: {
        fontSize: 20
    },
});


