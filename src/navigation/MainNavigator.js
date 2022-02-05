import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import PaymentNavigator from './PaymentNavigator';


const MainStack = createStackNavigator();


const MainStackNavigator = () => {


    return (
        <MainStack.Navigator
            mode="modal"
            screenOptions={{
                headerShown: false
            }}
        >
            <MainStack.Screen name="MainStack" component={DrawerNavigator} />
            <MainStack.Screen name="PaymentNavigator" component={PaymentNavigator} />
        </MainStack.Navigator>
    );
}


export default MainStackNavigator;

