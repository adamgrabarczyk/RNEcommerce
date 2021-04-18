import React from 'react';
import {Platform, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constans/Colors';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Favourite from '../screens/Favourite';
import DetailsScreen from '../screens/shop/DetailsScreen'
import ProductDetails from '../screens/shop/ProductDetailsScreen'
import HeaderButton from '../components/UI/HeaderButton'
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import SearchBar from '../components/shop/SearchBar';


const HomeStack = createStackNavigator();


function HomeStackScreen({navigation}) {

    const cartItems = useSelector(state => {
        const transformedCartItems = [];

        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }

        return transformedCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1 );
    });

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
                    headerTitle: 'All Products',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={() => {navigation.toggleDrawer()} }
                            />
                        </HeaderButtons>
                    ),
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title='cart'
                            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            onPress={() => {navigation.navigate('CartScreen')} }
                            />
                            { cartItems.length > 0 ?
                                <View style={styles.cartValueContainer}>
                                    <Text style={styles.value}>{cartItems.length}</Text>
                                </View>
                                :
                                <View>
                                    <Text style={styles.valueEmpty}></Text>
                                </View>
                            }
                        </HeaderButtons>
                    )

                }}
            />
            <HomeStack.Screen name="Details" component={DetailsScreen} />
            <HomeStack.Screen name="ProductDetails"
                              component={ProductDetails}
                              options={({ route }) => ({ title: route.params.productTitle })}

            />
            <HomeStack.Screen name="CartScreen" component={CartScreen} />
        </HomeStack.Navigator>
    );
}


const OrderStack = createStackNavigator();

function OrderStackScreen({navigation}) {
    return (
        <OrderStack.Navigator>
            <OrderStack.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    headerTitleStyle: {
                        fontFamily: "OpenSans-Regular"
                    },
                    headerBackTitleStyle: {
                        color: 'red',
                        fontFamily: "OpenSans-SemiBoldItalic"
                    },
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={() => {navigation.toggleDrawer()} }
                            />
                        </HeaderButtons>
                    )

                }}
            />
        </OrderStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

function SearchStackScreen({navigation}) {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
                name="Search"
                component={Search}
                options={{
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={() => {navigation.toggleDrawer()} }
                            />
                        </HeaderButtons>
                    ),

                    headerTitle: () => (
                        <View style={styles.searchBarContainer}>
                        <SearchBar/>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => alert('hallo')}
                            >
                                <Text style={styles.cancelButtonText}>anuluj</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }}
            />
        </SearchStack.Navigator>
    );
}


const FavouriteStack = createStackNavigator();

function FavouriteStackScreen({navigation}) {
    return (
        <FavouriteStack.Navigator>
            <FavouriteStack.Screen
                name="Favourite"
                component={Favourite}
                options={{
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={() => {navigation.toggleDrawer()} }
                            />
                        </HeaderButtons>
                    )
                }}
            />
        </FavouriteStack.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen({navigation}) {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                                title='Menu'
                                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                                onPress={() => {navigation.toggleDrawer()} }
                            />
                        </HeaderButtons>
                    )
                }}
            />
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator  = () => {
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
    const orders = useSelector(state => state.orders.orders);
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
                    } else if (route.name === 'Order') {
                        return (
                            <View>
                            <Ionicons
                                name={focused && Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
                                size={size}
                                color={color}
                            />
                                { orders.length > 0 ?
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>{orders.length}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.valueEmpty}></Text>
                                    </View>
                                }
                            </View>
                        );
                    } else if (route.name === 'Favourite') {
                        return (
                            <View>
                            <Ionicons
                                name={focused ? 'star-sharp' : 'star-outline'}
                                size={size}
                                color={color}
                            />
                                { userFavProducts.length > 0 ?
                                    <View style={styles.valueContainer}>
                                    <Text style={styles.value}>{userFavProducts.length}</Text>
                                    </View>
                                        :
                                    <View>
                                    <Text style={styles.valueEmpty}></Text>
                                    </View>
                                }
                            </View>
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
            <Tab.Screen name={'Order'} component={OrderStackScreen}/>
            <Tab.Screen name={'Favourite'} component={FavouriteStackScreen}/>
            <Tab.Screen name={'Profile'} component={ProfileStackScreen}/>
        </Tab.Navigator>
    )
}
export default TabNavigator;

const styles = StyleSheet.create({

    valueContainer: {
        width: 20,
        height: 20,
        position: 'absolute',
        top: -5,
        left: 20,
        borderRadius: 10,
        backgroundColor: Colors.accent,
        textAlign: 'center'
    },
    cartValueContainer: {
        width: 18,
        height: 18,
        position: 'absolute',
        top: -5,
        left: 30,
        borderRadius: 10,
        backgroundColor: Colors.accent,
        textAlign: 'center'
    },
    value: {
        color: 'white',
        borderRadius: 50,
        textAlign: 'center'
},

    valueEmpty: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute'
    },
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: Platform.OS === 'android' ? 0 : 30
    },
    cancelButton: {
        marginTop: 15,
        marginLeft: 10
    },
    cancelButtonText: {
        fontSize: 15,
        color: Colors.primary,
        width: 50
    }
});
