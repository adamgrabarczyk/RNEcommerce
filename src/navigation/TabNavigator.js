
import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Favourite from '../screens/Favourite';
import DetailsScreen from '../screens/shop/DetailsScreen'
import ProductDetails from '../screens/shop/ProductDetailsScreen'
import Colors from '../constans/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';



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
                    headerTitleStyle: {
                      fontFamily: "OpenSans-Regular"
                    },
                    headerBackTitleStyle: {
                        color: 'red',
                        fontFamily: "OpenSans-SemiBoldItalic"
                    },
                    headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
                    headerTitle: 'All Products'

                }}
            />
            <HomeStack.Screen name="Details" component={DetailsScreen} />
            <HomeStack.Screen name="ProductDetails"
                              component={ProductDetails}
                              options={({ route }) => ({ title: route.params.productTitle })}

            />
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
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? 'home'
                                        : 'home-outline'
                                }
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Search') {
                        return (
                            <Ionicons
                                name={focused ? 'search' : 'search'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Favourite') {
                        return (
                            <Ionicons
                                name={focused ? 'star-sharp' : 'star-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Profile') {
                        return (
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={size}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: 'gray',
            }}

        >
            <Tab.Screen name={'Home'} component={HomeStackScreen}/>
            <Tab.Screen name={'Search'} component={SearchStackScreen}/>
            <Tab.Screen name={'Favourite'} component={FavouriteStackScreen}/>
            <Tab.Screen name={'Profile'} component={ProfileStackScreen}/>
        </Tab.Navigator>
    )
}
export default TabNavigator;
