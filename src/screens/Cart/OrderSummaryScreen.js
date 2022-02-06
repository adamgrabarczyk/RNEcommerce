import {View, Text, StyleSheet, ScrollView} from 'react-native';
import * as ordersActions from '../../store/actions/orders';
import ActionButton from '../../components/UI/ActionButton';
import {useDispatch, useSelector} from 'react-redux';
import CartSummary from '../../components/UI/CartSummary';
import CartStepHeader from '../../components/UI/CartStepHeader';
import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import { useStripe, initPaymentSheet, presentPaymentSheet} from '@stripe/stripe-react-native';
import Spinner from '../../components/UI/Spinner';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderSummaryScreen = ({navigation, route}, props) => {

    const {cartItems} = route.params;
    const {totalAmount} = route.params;
    const {selectedAddress} = route.params;
    const {selectedDeliveryMethod} = route.params;
    const {selectedPaymentMethod} = route.params;

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const dispatch = useDispatch();

    const publishableKey = 'pk_test_51KKV1XLiqKk5uVnEZ9PZrhRmaJ8q5IMfIxiXerehoYXTL2fAohNPKOwgXbTULVq1oFTbPmKcHakpzYzH7r3iUJMr00PfEYhNLx';

    const { confirmPayment } = useStripe();
    const [clientSecret, setClientSecret] = useState('');

    const userEmail = useSelector(state => state.auth.userEmail)

    useEffect(() => {
        setLoading(true);
        setPaymentMethod(selectedPaymentMethod.method);

        const amountString = totalAmount.toFixed(2).toString().replace(/\./g, "");

        const fetchPaymentIntentClientSecret = async () => {
            const response = await fetch(`https://adamgrabarczyk.pl/show/StripeAPI/PaymentIntent.php`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountString,
                    email: userEmail,
                    currency: 'eur',
                    payment_method_types: ['p24'],
                }),
            });

            const data = await response.json();

            setClientSecret(data[0].client_secret);
            const { error } = await initPaymentSheet({ paymentIntentClientSecret: data[0].client_secret, customerId: data[0].customer, googlePay: true,
                merchantDisplayName: 'Merchant Name', applePay: true,
                merchantCountryCode: 'PL',})

            console.log(error)
        };

        fetchPaymentIntentClientSecret().then(
            () => {
                setLoading(false);
            }
        );

    }, []);

    if (loading) {
        return <Spinner
            spinnerSize={'fullScreen'}
        />
    }

    const handlePayment = async () => {
        const {error} = await confirmPayment(clientSecret, {
            type: 'card',
            billingDetails: {
                email: userEmail
            }
        })
        if (error) {
            alert(error.message)
        } else {
            alert('payment succes')
        }
    };

    const handleSheet = async () => {
        const { error } = await presentPaymentSheet({
            clientSecret: clientSecret,
            allowsDelayedPaymentMethods: true
        })

        if (error) {
            console.log(`Error code: ${error.code}`+ 'lazoe' + error.message);
            setPaymentError('Twoja płatność nie powiodła się. Sprubój ponownie.');
        } else {
            console.log(
                `The payment was confirmed successfully! currency: eur`
            );
            setPaymentError('');
            dispatch(ordersActions.addOrder(cartItems, totalAmount, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod));
            navigation.navigate('SuccessScreen');
        }
    }

    const handlePayPress = async () => {


        const { error, paymentIntent } = await confirmPayment(clientSecret, {
            type: 'P24',
            billingDetails: {
                email: userEmail
            }
        });

        if (error) {
            console.log(`Error code: ${error.code}`, error.message);
            setPaymentError('Twoja płatność nie powiodła się. Sprubój ponownie.');
        } else if (paymentIntent) {
            console.log(
                `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
            );
            setPaymentError('');
            dispatch(ordersActions.addOrder(cartItems, totalAmount, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod));
            navigation.navigate('SuccessScreen');
        }
    }




    return (
        <StripeProvider
            publishableKey={publishableKey}
            urlScheme="https://nba.com"
            merchantIdentifier="merchant.identifier"
        >
        <View style={styles.container}>
            <View style={styles.catItemsContainer}>
                <ScrollView>
                    <View style={styles.cartSection}>
                      <CartStepHeader headerText={'Podsumowanie zamówienia'}/>
                        <View style={styles.cartItemList}>
                            {
                                cartItems.map(
                                    item =>
                                        <View style={styles.cartItemBox} key={item.productId}>
                                            <View style={styles.cartItemTitleContainer}>
                                                <Text style={styles.cartItemTitle}>{item.productTitle}</Text>
                                            </View>
                                            <View style={styles.cartItemPriceContainer}>
                                            <View style={styles.cartItemUnitPriceBox}>
                                                <Text style={styles.cartItemUnitPrice}>{item.productPrice} PLN x </Text>
                                                <Text style={styles.cartItemQuantity}>{item.quantity} szt.</Text>
                                            </View>
                                                <View style={styles.cartItemSummaryBox}>
                                            <Text style={styles.cartItemSummary}>Razem: {item.sum} PLN</Text>
                                                </View>
                                            </View>
                                        </View>
                                )
                            }
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Adres dostawy: {selectedAddress.city + ' ' + selectedAddress.street + ' ' + selectedAddress.houseNumber + ' ' + selectedAddress.apartmentNumber + ' ' + selectedAddress.postcode}</Text>
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Dostawa: {selectedDeliveryMethod.method + ' +' + selectedDeliveryMethod.price} zł</Text>
                        </View>
                        <View style={styles.customContainer}>
                            <Text style={styles.customText}>Metoda płatności: {selectedPaymentMethod.method}</Text>
                        </View>
                    </View>
                </ScrollView>

                <CartSummary totalAmount={totalAmount.toFixed(2)}/>
                <View style={styles.actionsButtonContainer}>
                    <ActionButton
                        action={
                            paymentMethod === 'Karta płatnicza' ? handleSheet : null || paymentMethod === 'Przelew bankowy' ? handlePayPress : null
                        }

                        actionName={'Zamawiam i płacę'}
                    />
                </View>
                {
                    paymentError !== '' ?
                        <View style={styles.errorContainer}>

                            <Ionicons
                                name={'warning-outline'}
                                size={20}
                                color={'red'}
                                // style={styles.icon}
                            />
                            <Text style={styles.error}> {paymentError}</Text>
                        </View>
                        :
                        null
                }

            </View>
        </View>
        </StripeProvider>
    );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },

    catItemsContainer: {
        textAlign: 'center',
    },

    errorContainer: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    error: {
      color: 'red',
        marginTop: 3
    },

    cartSection: {},

    cartItemList: {
        marginTop: 10,
        marginBottom: 10
    },

    actionsButtonContainer: {
        marginBottom: 50
    },

    cartItemBox: {
        backgroundColor: 'white',
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80
    },

    cartItemTitleContainer: {
        width: '50%',
        marginLeft: 10
    },

    cartItemTitle: {
        fontSize: 18
    },

    cartItemPriceContainer: {
        width: '50%',
        alignItems: 'center'
    },

    cartItemUnitPriceBox: {
        flexDirection: 'row',
        margin: 5
    },

    cartItemUnitPrice: {

    },

    cartItemQuantity: {

    },

    cartItemSummaryBox: {
        margin: 5
    },

    cartItemSummary: {

    },

    customContainer: {
       backgroundColor: '#dedede',
        margin: 5,
        height: 50,
        justifyContent: 'center'
    },

    customText: {
        margin: 10,
        fontSize: 15
    }



});


