
import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Favourite from '../screens/Favourite';
import DetailsScreen from '../screens/shop/DetailsScreen'
import Colors from '../constans/Colors';




const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                },
                    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,

                }}
            />
            <HomeStack.Screen name="Details" component={DetailsScreen} />
        </HomeStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={Search} />
            {/*<ProfileStack.Screen name="Details" component={DetailsScreen} />*/}
        </SearchStack.Navigator>
    );
}

const FavouriteStack = createStackNavigator();

function FavouriteStackScreen() {
    return (
        <FavouriteStack.Navigator>
            <FavouriteStack.Screen name="Favourite" component={Favourite} />
            {/*<ProfileStack.Screen name="Details" component={DetailsScreen} />*/}
        </FavouriteStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={Profile} />
            {/*<ProfileStack.Screen name="Details" component={DetailsScreen} />*/}
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator  = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={'Home'} component={HomeStackScreen}/>
            <Tab.Screen name={'Search'} component={SearchStackScreen}/>
            <Tab.Screen name={'Favourite'} component={FavouriteStackScreen}/>
            <Tab.Screen name={'Profile'} component={ProfileStackScreen}/>
        </Tab.Navigator>
    )
}
export default TabNavigator;
