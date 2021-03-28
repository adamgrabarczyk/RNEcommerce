import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import DrawerNav from './src/navigation/DrawerNavigator';

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <DrawerNav/>
        </NavigationContainer>
  )
}
export default App;

