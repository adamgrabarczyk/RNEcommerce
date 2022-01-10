import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderScreen from './Profile/OrderScreen';
import SettingsScreen from './Profile/Settings';


const Tab = createMaterialTopTabNavigator();

const Profile = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="Zamówienia" component={OrderScreen} />
            <Tab.Screen name="Ustawienia" component={SettingsScreen} />
        </Tab.Navigator>
    )
}



export default Profile;

