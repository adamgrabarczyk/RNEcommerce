import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import * as orderActioncs from '../../store/actions/orders';

const OrderScreen = props => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        dispatch(orderActioncs.fetchOrders());
    }, [dispatch]);


    if (orders.length < 1) {
        return (
            <View style={styles.container}>
                <View style={styles.noOrdersTextContainer}>
                    <Text style={styles.noFavText}>nie zrealizowano jeszcze żadnego zamówienia</Text>
                </View>
                <Text onPress={() => console.log(orders.length)}>blah</Text>
            </View>
        )
    }

    return (
        <View>
                 <FlatList
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={itemData => (
                            <OrderItem
                                amount={itemData.item.totalAmount}
                                date={itemData.item.readableDate}
                                items={itemData.item.items}
                            />)}
                    />
        </View>
    );
};


export default OrderScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    noOrdersTextContainer: {
        textAlign: 'center'
    },

    noFavText: {

    }
});
