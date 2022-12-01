import * as React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {Linking} from 'react-native';
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
            <DrawerItem label="Cart" onPress={() => props.navigation.navigate('Cart')}/>
            <DrawerItem label="Wyloguj" onPress={logoutHandler}/>
            <DrawerItem
                label="Help"
                onPress={() => Linking.openURL('https://mywebsite.com/help')} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
