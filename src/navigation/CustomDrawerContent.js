import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import * as authActions from '../../src/store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const asuncToken =  AsyncStorage.getItem('authData');
const blah =  AsyncStorage.getItem('blah');

const CustomDrawerContent = (props) => {

   const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('authData')
        } catch(e) {
            // remove error
        }

        console.log('Done.')
    }

    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Wyloguj" onPress={removeValue}/>
            <DrawerItem label="pele" onPress={() => {
                console.log(asuncToken._W);
            }}/>
            <DrawerItem label="lele" onPress={() => {
                console.log(asuncToken);
            }}/>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
