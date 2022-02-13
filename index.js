/**
 * @format
 */
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import PushNotification from "react-native-push-notification";
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store, persistor} from './src/store/store';
import {Provider} from 'react-redux';

const RootApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
);


PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});


AppRegistry.registerComponent(appName, () => RootApp);
