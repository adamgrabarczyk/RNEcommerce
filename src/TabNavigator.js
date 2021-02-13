
import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Search from './screens/Search';
import Favourite from './screens/Favourite';

const Tab = createBottomTabNavigator();

const TabNavigator  = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={'Home'} component={Home}/>
            <Tab.Screen name={'Search'} component={Search}/>
            <Tab.Screen name={'Favourite'} component={Favourite}/>
            <Tab.Screen name={'Profile'} component={Profile}/>
        </Tab.Navigator>
    )
}
export default TabNavigator;
