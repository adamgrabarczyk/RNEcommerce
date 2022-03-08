import React from 'react';
import {Platform, View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
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
import Cart from '../screens/Cart';
import SearchBar from '../components/shop/SearchBar';
import PersonalData from '../screens/Profile/PersonalData';
import Adresses from '../screens/Profile/Adresses';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import EmailPassword from '../screens/Profile/EmailPassword';
import ChangePassword from '../screens/Profile/ChangePassword';
import ChangeEmail from '../screens/Profile/ChangeEmail';
import AddOrChangeAddress from '../screens/Profile/AddOrChangeAddress';
import ChooseCategoryScreen from '../screens/Home/ChooseCategoryScreen';
import CategoryScreen from '../screens/Home/CategoryScreen';
import SubcategoryScreen from '../screens/Home/SubcategoryScreen';
import SelectedMarkScreen from '../screens/Home/SelectedMarkScreen';
import NotificationDetailsScreen from '../screens/Profile/NotificationDetailsScreen';
import Permissions from '../screens/Profile/Permissions';

const HomeStack = createStackNavigator();

export function HomeStackScreen({navigation}) {

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

    const unreadNotifications = useSelector(state => state.notifications.unreadNotifications);

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
                    headerTitle: 'Strona główna',
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
                            title='notifications'
                            iconName={'notifications-sharp'}
                            onPress={() => {navigation.navigate('NotificationsScreen')} }
                            />
                            { unreadNotifications.length > 0 ?
                                <View style={styles.cartValueContainer}>
                                    <Text style={styles.value}>{unreadNotifications.length}</Text>
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
            <HomeStack.Screen name="Details" component={DetailsScreen}  options={{
                headerTitle: 'Szczegóły'
            }} />
            <HomeStack.Screen name="ProductDetails"
                              component={ProductDetails}
                              options={({ route }) => ({ title: route.params.productTitle })}

            />
            <HomeStack.Screen name="ChooseCategory"
                              component={ChooseCategoryScreen}
                              options={{
                                  headerTitle: 'Wybierz kategorię'
                              }}
            />
            <HomeStack.Screen name="Category"
                              component={CategoryScreen}
                              options={({ route }) => ({ title: route.params.categoryName})}
            />

            <HomeStack.Screen name="Subcategory"
                              component={SubcategoryScreen}
                              options={({ route }) => ({ title: route.params.categoryName})}
            />

            <HomeStack.Screen name="Mark"
                              component={SelectedMarkScreen}
                              options={({ route }) => ({ title: route.params.categoryName})}
            />

            <HomeStack.Screen name="CartScreen" component={Cart}  options={{
                headerTitle: 'Koszyk'
            }} />

            <HomeStack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerTitle: ''
                }}
            />

            <HomeStack.Screen
                name="NotificationDetails"
                component={NotificationDetailsScreen}
                options={{
                    headerTitle: ''
                }}
            />

        </HomeStack.Navigator>
    );
}

const CartStack = createStackNavigator();

function CartStackScreen({navigation}) {
    return (
        <CartStack.Navigator>
            <CartStack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerTitleStyle: {
                        fontFamily: "OpenSans-Regular"
                    },
                    headerBackTitleStyle: {
                        color: 'red',
                        fontFamily: "OpenSans-SemiBoldItalic"
                    },
                    headerTitle: 'Koszyk',
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

        </CartStack.Navigator>
    );
}

const SearchStack = createStackNavigator();

function SearchStackScreen({navigation}) {
    const dispatch = useDispatch();
    const focus = useSelector(state => state.search);
    const phrase = useSelector(state => state.search);
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
                            {
                            focus.inputFocus === true || phrase.searchPhrase !== '' ?
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    dispatch({type: 'RESET_INPUT'})

                                }}
                            >
                                <Text style={styles.cancelButtonText}>anuluj</Text>
                            </TouchableOpacity>
                                :
                                <View style={styles.cancelButton}>
                                <Text style={styles.cancelButtonTextHide}>anuluj</Text>
                                </View>
                        }
                        </View>
                    )

                }}
            />

            <SearchStack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={({ route }) => ({ title: route.params.productTitle })}
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
                    ),
                    headerTitle: 'Ulubione'
                }}
            />
            <FavouriteStack.Screen name="ProductDetails"
                              component={ProductDetails}
                              options={({ route }) => ({ title: route.params.productTitle })}

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
                    ),
                    headerTitle: 'Profil'
                }}
            />

            <ProfileStack.Screen
                name="PersonalData"
                component={PersonalData}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="Adresses"
                component={Adresses}
                options={{
                    headerTitle: ''
                }}
            />
            <ProfileStack.Screen
                name="AddOrChangeAddress"
                component={AddOrChangeAddress}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="Permissions"
                component={Permissions}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="NotificationDetails"
                component={NotificationDetailsScreen}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="EmailPassword"
                component={EmailPassword}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="ChangeEmail"
                component={ChangeEmail}
                options={{
                    headerTitle: ''
                }}
            />

            <ProfileStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerTitle: ''
                }}
            />
        </ProfileStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

const TabNavigator  = () => {
    const userFavProducts = useSelector(state => state.products.favoriteUserProducts);
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
        <Tab.Navigator
            initialRouteName='Home'
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
                    } else if (route.name === 'Cart') {
                        return (
                            <View>
                            <Ionicons
                                name={focused && Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
                                size={size}
                                color={color}
                            />
                                { cartItems.length > 0 ?
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.value}>{cartItems.length}</Text>
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
            <Tab.Screen name={'Home'} component={HomeStackScreen} options={{title: 'Strona główna'}}/>
            <Tab.Screen name={'Search'} component={SearchStackScreen} options={{title: 'Szukaj'}}/>
            <Tab.Screen name={'Cart'} component={CartStackScreen} options={{title: 'Koszyk'}}/>
            <Tab.Screen name={'Favourite'} component={FavouriteStackScreen} options={{title: 'Ulubione'}}/>
            <Tab.Screen name={'Profile'} component={ProfileStackScreen} options={{title: 'Profil'}}/>
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
    },
    cancelButtonTextHide: {
        fontSize: 15,
        color: 'transparent',
        width: 50
    }

});
