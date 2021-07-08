import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemCounter from './ItemCounter';

const CartItem = props => {



return (

    <View style={styles.cartItem}>
        <View style={styles.itemData}>
            <Text style={styles.mainText}>{props.name}</Text>
            <Text style={styles.mainText}>{props.amount + ' PLN'}</Text>
            {props.deletable &&
            (<TouchableOpacity onPress={props.deleteCart} style={styles.deleteButton}>
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={23}
                    color='red'
                    />
            </TouchableOpacity> )
            }
        </View>
        <ItemCounter {...props}/>
    </View>
)

};

const styles = StyleSheet.create({

    cartItem: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        padding: 5,
    },
    quantity: {
        textAlign: 'center',
        width: 30,
        margin: 10,
    },

    mainText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16
    },


    deleteButton: {
         marginLeft: 20
    },

    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
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

    inputQty: {
        width: 30,
        textAlign: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    },
    counterBox: {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'black'
    }

});

export default CartItem;
