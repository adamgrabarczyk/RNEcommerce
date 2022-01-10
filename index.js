/**
 * @format
 */
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import {AppRegistry} from 'react-native';
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

AppRegistry.registerComponent(appName, () => RootApp);
