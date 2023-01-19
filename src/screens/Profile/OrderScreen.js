import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import * as orderActioncs from '../../store/actions/orders';
import Spinner from '../../components/UI/Spinner';



const OrderScreen = props => {
    const dispatch = useDispatch();
    const ordersData = useSelector(state => state.orders.orders);
    const orders = ordersData.sort((a,b) => {return new Date(b.date) - new Date(a.date)});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(orderActioncs.fetchOrders()).then(
            () => {
                setLoading(false);
            }
        );
    }, [dispatch]);

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    if (orders.length < 1) {
        return (
            <View style={styles.container}>
                <View style={styles.noOrdersTextContainer}>
                    <Text style={styles.noFavText}>nie zrealizowano jeszcze żadnego zamówienia</Text>
                </View>
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
                                status={'Zamówienie ' + itemData.item.status}
                                delivery={itemData.item.delivery.method}
                                payment={itemData.item.payment.method}
                                address={ itemData.item.address !== undefined ?
                                    itemData.item.address.city + ' ' + itemData.item.address.street + ' ' + itemData.item.address.houseNumber + ' ' + itemData.item.address.apartmentNumber + ' ' + itemData.item.address.postcode
                                    : null
                                }
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
