/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/store/store';
import {Provider} from 'react-redux';

const RootApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RootApp);
