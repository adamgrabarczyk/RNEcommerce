import React from 'react';
import {Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constans/Colors';

import ChooseAddressScreen from '../screens/Cart/ChooseAddressScreen';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomCloseOrGoBackButton from '../components/UI/CustomCloseOrGoBackButton';
import ChoosePaymentMethodScreen from '../screens/Cart/ChoosePaymentMethodScreen';
import OrderSummaryScreen from '../screens/Cart/OrderSummaryScreen';


const PaymentStack = createStackNavigator();


const PaymentNavigator = ({navigation}) => {


    return (
        <PaymentStack.Navigator>
                <PaymentStack.Screen
                    name="ChooseAddress"
                    component={ChooseAddressScreen}
                    options={{
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                        },
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={CustomCloseOrGoBackButton}>
                                <Item
                                    title='close'
                                    iconName={'close-circle'}
                                    onPress={() => {navigation.goBack()} }
                                />
                            </HeaderButtons>
                        ),
                    }}
                />

            <PaymentStack.Screen
                name="ChoosePaymentMethod"
                component={ChoosePaymentMethodScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomCloseOrGoBackButton}>
                            <Item
                                title='close'
                                iconName={Platform.OS === 'android' ? "md-arrow-back-sharp" : 'ios-chevron-back-sharp'}
                                onPress={() => navigation.navigate('ChooseAddress')}
                            />
                        </HeaderButtons>
                    ),
                }}
            />


            <PaymentStack.Screen
                name="OrderSummary"
                component={OrderSummaryScreen}
                options={{
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomCloseOrGoBackButton}>
                            <Item
                                title='close'
                                iconName={Platform.OS === 'android' ? "md-arrow-back-sharp" : 'ios-chevron-back-sharp'}
                                onPress={() => navigation.navigate('ChoosePaymentMethod')}
                            />
                        </HeaderButtons>
                    ),
                }}
            />

        </PaymentStack.Navigator>
    );
}


export default PaymentNavigator;

