import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Wyloguj" onPress={() => {
                dispatch({ type: 'LOGOUT' });
                AsyncStorage.removeItem('authData');
                props.navigation.dispatch(DrawerActions.closeDrawer())
            }}/>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
