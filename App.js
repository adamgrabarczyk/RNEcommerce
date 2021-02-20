import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import TabNavigator from './src/navigation/TabNavigator';

const App: () => React$Node = () => {
    return (
        <NavigationContainer>

<TabNavigator/>

        </NavigationContainer>
  )
}
export default App;

