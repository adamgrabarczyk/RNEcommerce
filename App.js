import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import TabNavigator from './src/TabNavigator';

const App: () => React$Node = () => {
    return (
        <NavigationContainer>

<TabNavigator/>

        </NavigationContainer>
  )
}
export default App;

// const styles = StyleSheet.create({
//     container: {
//         height: 200,
//         // flex: ,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     }
// })
