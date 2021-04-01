import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from './Profile/Home';
import SettingsScreen from './Profile/Settings';

const Tab = createMaterialTopTabNavigator();

const Profile = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}



export default Profile;

