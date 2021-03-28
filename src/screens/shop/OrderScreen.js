import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const OrderScreen = props => {

    const orders = useSelector(state => state.orders.orders);

    return (
<FlatList
    data={orders}
    keyExtractor={item => item.id}
    renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
/>
    );
};


export default OrderScreen;


