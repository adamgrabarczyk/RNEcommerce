import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNav from './src/navigation/DrawerNavigator';
import AuthScreen from './src/screens/user/AuthScreen';
import {useSelector} from 'react-redux';

const App: () => React$Node = () => {

    const token = useSelector(state => state.auth.token);

    return (
        <NavigationContainer>
            {
                token != '' ?
                    <DrawerNav/>
                    :
                    <AuthScreen/>

            }

        </NavigationContainer>
  )
}
export default App;

