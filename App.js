import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import  Home from './src/screens/Home'
import  Counter from './src/components/Counter'

const App: () => React$Node = () => {
    return (
        <SafeAreaView>
  <View>
      <Counter/>
    </View>
        </SafeAreaView>
  )
}
export default App;
