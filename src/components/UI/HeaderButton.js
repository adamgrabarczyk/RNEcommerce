import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constans/Colors';
import {Platform} from 'react-native';


const CustomHeaderButton= props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color={Platform.OS === 'android' ? '#fff' : Colors.primary} />
}

export default CustomHeaderButton;
