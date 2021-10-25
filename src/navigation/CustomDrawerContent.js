import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        props.navigation.dispatch(DrawerActions.closeDrawer());
        dispatch(authActions.logout());
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Wyloguj" onPress={logoutHandler}/>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
