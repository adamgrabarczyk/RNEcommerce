import React from 'react';
import {Platform} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constans/Colors';

import AuthScreen from '../screens/user/AuthScreen';


const AuthStack = createStackNavigator();


export function AuthStackScreen() {


    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen
                name="Auth"
                component={AuthScreen}
                options={{animationEnabled: false}}
            />

        </AuthStack.Navigator>
    );
}


export default AuthStackScreen;

