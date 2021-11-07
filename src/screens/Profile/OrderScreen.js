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


    return (
        <View>
            {
                orders.length > 0 ?
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
                    :
                    <View style={styles.noOrdersTextContainer}>
                        <Text style={styles.noFavText}>nie masz polubionych produktów</Text>
                    </View>
            }
        </View>
    );
};


export default OrderScreen;


const styles = StyleSheet.create({


    noOrdersTextContainer: {
        textAlign: 'center'
    }
});
