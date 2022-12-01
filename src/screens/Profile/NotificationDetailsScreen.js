import { View, ScrollView, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from '../../components/UI/Spinner';
import {useSelector} from 'react-redux';
import CartStepHeader from '../../components/UI/CartStepHeader';
import CartItem from '../../components/shop/CartItem';

const NotificationDetailsScreen = ({navigation, route}) => {

    const orders = useSelector(state => state.orders.orders);


    useEffect(() => {
        setLoading(true);
        const onValueChange = async () =>
        {
            const { notificationId, notificationTitle, notificationMessage, orderId } = route.params;

            await setNotificationId(notificationId);
            await setNotificationTitle(notificationTitle);
            await setNotificationMessage(notificationMessage);
            await setOrderId(orderId);

            const currentOrder = orders.find(item => item.id === orderId);
            await setOrder(currentOrder);
            await setOrderItems(currentOrder.items);
        }
        onValueChange().then(
            () => {
                setTimeout(
                    () => {
                        setLoading(false);
                    }, 2000
                )
            }
        );
    }, []);


    const [loading, setLoading] = useState(false);
    const [notificationId, setNotificationId] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    if (loading) {
        return<Spinner
            spinnerSize={'fullScreen'}
        />
    }

    return (
        <View style={styles.container}>
            <CartStepHeader headerText={notificationTitle}/>

            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{notificationMessage}</Text>
            </View>
            <ScrollView style={styles.scroll}>
            {
                orderItems.map(carItem => (
                    <CartItem
                        key={carItem.productId}
                        quantity={carItem.quantity}
                        amount={carItem.sum}
                        name={carItem.productTitle}
                        input={false}
                        additionalStyles={styles.cartItem}
                    />
                ))
            }

</ScrollView>
            <Pressable style={styles.confirmButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.confirmButtonText}>Ok</Text>
            </Pressable>
         </View>
    );
}

export default NotificationDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scroll: {

    },

    messageContainer: {
        margin: 20,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#9c9c9c',
        paddingBottom: 20,
        paddingTop: 20,
    },

    messageText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800'
    },

    cartItem: {
        margin: 0
    },

    confirmButton: {
        margin: 10,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#c2c2c2',
        paddingBottom: 10,
        paddingTop: 10,
    },

    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800'
    }
});




