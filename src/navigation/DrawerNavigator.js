import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import Colors from '../constans/Colors';
import CustomDrawerContent from './CustomDrawerContent';
import AuthStackScreen from './AuthNaviagator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} options={{ animationEnabled: false }} />
      )}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primary}
            />
          ),
          title: 'Strona główna',
        }}
      />
      <Drawer.Screen
        name="Search"
        component={AuthStackScreen}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primary}
            />
          ),
          title: 'Szukaj',
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={TabNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primary}
            />
          ),
          title: 'Koszyk',
        }}
      />
      <Drawer.Screen
        name="Favourite"
        component={TabNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={Colors.primary}
            />
          ),
          title: 'Ulubione',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
