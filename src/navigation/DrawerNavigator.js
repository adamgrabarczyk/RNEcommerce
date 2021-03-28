import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import Colors from '../constans/Colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen
                    name="Home"
                    component={TabNavigator}
                    options={{
                        drawerIcon: drawerConfig => (
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                                size={23}
                                color={Colors.primary}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>

    );
}

export default DrawerNavigator;
