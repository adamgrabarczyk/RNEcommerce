import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constans/Colors';

import ChooseAddressScreen from '../screens/Cart/ChooseAddressScreen';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomCloseOrGoBackButton from '../components/UI/CustomCloseOrGoBackButton';
import ChoosePaymentMethodScreen from '../screens/Cart/ChoosePaymentMethodScreen';
import OrderSummaryScreen from '../screens/Cart/OrderSummaryScreen';
import SuccessScreen from '../screens/Cart/SuccessScreen';
import StepProgressBar from '../components/UI/StepProgressBar';
import AddAddress from '../screens/Cart/AddAddress';


const PaymentStack = createStackNavigator();


const PaymentNavigator = ({navigation}) => {


    return (
        <PaymentStack.Navigator screenOptions={{gestureEnabled: false}}>
                <PaymentStack.Screen
                    name="ChooseAddress"
                    component={ChooseAddressScreen}
                    options={{
                        headerTitle: () => (<StepProgressBar
                            firstCompletedStep={styles.completedStep}
                        />),
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
                        headerRight: () => (<View style={styles.stepTextContainer}><Text style={styles.stepText}>Krok: 1/4</Text></View>)
                    }}
                />

            <PaymentStack.Screen
                name="AddAddress"
                component={AddAddress}
                options={{
                    headerTitle: () => (<Text>Dodaj adres</Text>),
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
                name="ChoosePaymentMethod"
                component={ChoosePaymentMethodScreen}
                options={{
                    headerTitle: () => (<StepProgressBar
                        firstCompletedStep={styles.completedStep}
                        secondCompletedStep={styles.completedStep}
                    />),
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
                    headerRight: () => (<View style={styles.stepTextContainer}><Text style={styles.stepText}>Krok: 2/4</Text></View>)
                }}
            />


            <PaymentStack.Screen
                name="OrderSummary"
                component={OrderSummaryScreen}
                options={{
                    headerTitle: () => (<StepProgressBar
                    firstCompletedStep={styles.completedStep}
                    secondCompletedStep={styles.completedStep}
                    thirdCompletedStep={styles.completedStep}
                    />),
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
                    headerRight: () => (<View style={styles.stepTextContainer}><Text style={styles.stepText}>Krok: 3/4</Text></View>)
                }}
            />

            <PaymentStack.Screen
                name="SuccessScreen"
                component={SuccessScreen}
                options={{
                    headerTitle: () => (<StepProgressBar
                        firstCompletedStep={styles.completedStep}
                        secondCompletedStep={styles.completedStep}
                        thirdCompletedStep={styles.completedStep}
                        fourthCompletedStep={styles.completedStep}
                    />),
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={CustomCloseOrGoBackButton}>
                            <Item
                                title='close'
                                iconName={'close-circle'}
                                onPress={() => {navigation.navigate('Cart')} }
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => (<View style={styles.stepTextContainer}><Text style={styles.stepText}>Krok: 4/4</Text></View>)
                }}
            />
        </PaymentStack.Navigator>
    );
}


export default PaymentNavigator;

const styles = StyleSheet.create({
    stepTextContainer: {
    margin: 5
    },
    stepText: {
        color: 'grey',
        fontWeight: '600'
    },
    step: {
        width: 50,
        height: 5,
        backgroundColor: Colors.primary,
        margin: 3
    },

    completedStep: {
        backgroundColor: Colors.primary
    }



});
