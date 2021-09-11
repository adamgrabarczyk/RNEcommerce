import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';

const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Wyloguj" onPress={() => {dispatch({ type: 'LOGOUT' })} }/>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
