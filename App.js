import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from './src/store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/constans/Colors';
import AuthStackScreen from './src/navigation/AuthNaviagator';
import * as orderActioncs from './src/store/actions/orders';
import * as productActioncs from './src/store/actions/products';
import * as userActions from './src/store/actions/user';
import MainStackNavigator from './src/navigation/MainNavigator';
import * as notificationActions from './src/store/actions/notifications';

const App: () => React$Node = () => {

    const dispatch = useDispatch();
    const correctData = useSelector(state => state.auth.correctData);
    const userCart = useSelector(state => state.cart.user);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const authData = await AsyncStorage.getItem('authData');
            if (!authData) {
                dispatch(authActions.unCorrectData());
                setIsLoading(false);
                return;
            }else  {
                dispatch(authActions.autoLogin(authData));
            }
            const parseAuthData = JSON.parse(authData);
            const {token, user, expireDate} = parseAuthData;
            const expiryDate = new Date(expireDate);

            if (user !== null && userCart !== user) {
                dispatch({ type: 'RESET_CART' });
            }

            if (expiryDate <= new Date() || !token || !user) {
                dispatch(authActions.unCorrectData());

            } else {
                dispatch(authActions.correctData())
            }
            await  dispatch(userActions._getUserAddresses());
            await  dispatch(productActioncs.fetchProducts());
            await  dispatch(productActioncs.fetchFavs());
            await  dispatch(orderActioncs.fetchOrders());
            await  dispatch(notificationActions._getUserNotifications());

            setIsLoading(false);
        };
        checkToken();
    },[]);

    const RootStack = createStackNavigator();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={styles.spinner}
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }

    return (
        <NavigationContainer>

            <RootStack.Navigator screenOptions={{
                headerShown: false
            }}>
            {
                !isLoading && correctData === true ?

                <RootStack.Screen name="AppScreen" component={MainStackNavigator} />
                :
                <RootStack.Screen name="AuthScreen" component={AuthStackScreen} />

            }
            </RootStack.Navigator>
        </NavigationContainer>
  )
}
export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

    spinner: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
});
