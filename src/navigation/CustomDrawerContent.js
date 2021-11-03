import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


const CustomDrawerContent = (props) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
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
