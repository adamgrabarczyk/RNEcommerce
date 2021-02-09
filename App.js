import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import  Home from './src/screens/Home'
import  Counter from './src/components/Counter'

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
        <SafeAreaView>
  <View>
      <Counter/>
      <Text>dupa</Text>
    </View>
        </SafeAreaView>
        </NavigationContainer>
  )
}
export default App;
