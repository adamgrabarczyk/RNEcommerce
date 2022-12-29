import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as ordersActions from '../../store/actions/orders';
import ActionButton from '../../components/UI/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from '../../components/UI/CartSummary';
import CartStepHeader from '../../components/UI/CartStepHeader';
import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { useStripe, useApplePay } from '@stripe/stripe-react-native';
import Spinner from '../../components/UI/Spinner';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderSummaryScreen = ({ navigation, route }, props) => {
  const { cartItems } = route.params;
  const { totalAmount } = route.params;
  const { selectedAddress } = route.params;
  const { selectedDeliveryMethod } = route.params;
  const { selectedPaymentMethod } = route.params;

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [clientSecretKey, setClientSecretKey] = useState('');
  const dispatch = useDispatch();

  const publishableKey =
    'pk_test_51KKV1XLiqKk5uVnEZ9PZrhRmaJ8q5IMfIxiXerehoYXTL2fAohNPKOwgXbTULVq1oFTbPmKcHakpzYzH7r3iUJMr00PfEYhNLx';

  const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
  const { presentApplePay, isApplePaySupported } = useApplePay();
  // const { isApplePaySupported } = useApplePay();
  const userEmail = useSelector((state) => state.auth.userEmail);
  const amountString = totalAmount.toFixed(2).toString().replace(/\./g, '');

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      'https://adamgrabarczyk.pl/show/apiStripe/session.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountString,
          email: userEmail,
          currency: 'pln',
          payment_method_types: ['card'],
        }),
      },
    );
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    //

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      applePay: {
        merchantCountryCode: 'PL',
      },
      googlePay: {
        merchantCountryCode: 'PL',
        testEnv: true,
        currencyCode: 'pln',
      },
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (error) {
      setPaymentError('Wystąpił błąd. Spróbuj za chwilę.');
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log('The payment was confirmed successfully! currency: eur');
      setPaymentError('');
      dispatch(
        ordersActions.addOrder(
          cartItems,
          totalAmount,
          selectedAddress,
          selectedDeliveryMethod,
          selectedPaymentMethod,
          'Opłacone',
        ),
      );
      navigation.navigate('SuccessScreen');
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    console.log('start');
    const response = await fetch(
      'https://adamgrabarczyk.pl/show/apiStripe/p24session.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountString,
          email: userEmail,
          currency: 'pln',
          payment_method_types: ['p24'],
        }),
      },
    );
    const { clientSecret, error } = await response.json();
    setClientSecretKey(clientSecret);

    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    const { error, paymentIntent } = await confirmPayment(clientSecretKey, {
      paymentMethodType: 'P24',
      paymentMethodData: {
        billingDetails: {
          name: 'joe',
          email: userEmail,
        },
      },
    });

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else if (paymentIntent) {
      console.log('The payment was confirmed successfully! currency: eur');
      setPaymentError('');
      dispatch(
        ordersActions.addOrder(
          cartItems,
          totalAmount,
          selectedAddress,
          selectedDeliveryMethod,
          selectedPaymentMethod,
          'Opłacone',
        ),
      );
      navigation.navigate('SuccessScreen');
    }
  };

  useEffect(() => {
    setLoading(true);
    setPaymentMethod(selectedPaymentMethod.method);
    if (selectedPaymentMethod.method === 'Karta płatnicza') {
      initializePaymentSheet().then(() => {
        console.log('done');
        setLoading(false);
      });
    } else if (selectedPaymentMethod.method === 'Przelew bankowy') {
      fetchPaymentIntentClientSecret().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (!isApplePaySupported) {
    console.log('apple pay is not supported');
  }

  if (loading) {
    return <Spinner spinnerSize={'fullScreen'} />;
  }
  const handlePayOnDelivery = () => {
    dispatch(
      ordersActions.addOrder(
        cartItems,
        totalAmount,
        selectedAddress,
        selectedDeliveryMethod,
        selectedPaymentMethod,
        'Nieopłacone',
      ),
    );
    navigation.navigate('SuccessScreen');
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="https://nba.com"
      merchantIdentifier="merchant.RNEcommerce">
      <View style={styles.container}>
        <View style={styles.catItemsContainer}>
          <ScrollView>
            <View style={styles.cartSection}>
              <CartStepHeader headerText={'Podsumowanie zamówienia'} />
              <View style={styles.cartItemList}>
                {cartItems.map((item) => (
                  <View style={styles.cartItemBox} key={item.productId}>
                    <View style={styles.cartItemTitleContainer}>
                      <Text style={styles.cartItemTitle}>
                        {item.productTitle}
                      </Text>
                    </View>
                    <View style={styles.cartItemPriceContainer}>
                      <View style={styles.cartItemUnitPriceBox}>
                        <Text style={styles.cartItemUnitPrice}>
                          {item.productPrice} PLN x{' '}
                        </Text>
                        <Text style={styles.cartItemQuantity}>
                          {item.quantity} szt.
                        </Text>
                      </View>
                      <View style={styles.cartItemSummaryBox}>
                        <Text style={styles.cartItemSummary}>
                          Razem: {item.sum} PLN
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              {selectedAddress !== undefined ? (
                <View style={styles.customContainer}>
                  <Text style={styles.customText}>
                    Adres dostawy:{' '}
                    {selectedAddress.city +
                      ' ' +
                      selectedAddress.street +
                      ' ' +
                      selectedAddress.houseNumber +
                      ' ' +
                      selectedAddress.apartmentNumber +
                      ' ' +
                      selectedAddress.postcode}
                  </Text>
                </View>
              ) : null}
              <View style={styles.customContainer}>
                <Text style={styles.customText}>
                  Dostawa:{' '}
                  {selectedDeliveryMethod.method +
                    ' +' +
                    selectedDeliveryMethod.price}{' '}
                  zł
                </Text>
              </View>
              <View style={styles.customContainer}>
                <Text style={styles.customText}>
                  Metoda płatności: {selectedPaymentMethod.method}
                </Text>
              </View>
            </View>
          </ScrollView>

          <CartSummary totalAmount={totalAmount.toFixed(2)} />
          <View style={styles.actionsButtonContainer}>
            <ActionButton
              action={
                paymentMethod === 'Karta płatnicza'
                  ? openPaymentSheet
                  : null || paymentMethod === 'Przelew bankowy'
                  ? handlePayPress
                  : null || paymentMethod === 'Płatność przy odbiorze'
                  ? handlePayOnDelivery
                  : null
              }
              actionName={'Zamawiam i płacę'}
            />
          </View>
          {paymentError !== '' ? (
            <View style={styles.errorContainer}>
              <Ionicons name={'warning-outline'} size={20} color={'red'} />
              <Text style={styles.error}> {paymentError}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </StripeProvider>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  catItemsContainer: {
    textAlign: 'center',
  },

  errorContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  error: {
    color: 'red',
    marginTop: 3,
  },

  cartSection: {},

  cartItemList: {
    marginTop: 10,
    marginBottom: 10,
  },

  actionsButtonContainer: {
    marginBottom: 50,
  },

  cartItemBox: {
    backgroundColor: 'white',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },

  cartItemTitleContainer: {
    width: '50%',
    marginLeft: 10,
  },

  cartItemTitle: {
    fontSize: 18,
  },

  cartItemPriceContainer: {
    width: '50%',
    alignItems: 'center',
  },

  cartItemUnitPriceBox: {
    flexDirection: 'row',
    margin: 5,
  },

  cartItemUnitPrice: {},

  cartItemQuantity: {},

  cartItemSummaryBox: {
    margin: 5,
  },

  cartItemSummary: {},

  customContainer: {
    backgroundColor: '#dedede',
    margin: 5,
    height: 50,
    justifyContent: 'center',
  },

  customText: {
    margin: 10,
    fontSize: 15,
  },
});
