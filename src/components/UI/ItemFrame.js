import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const ItemFrame = (props) => {


    return (
        props.manage === true ?
        <Pressable onPress={props.itemAction} style={styles.addressContainer}
        >
            <Pressable style={styles.addressTextContainer} onPress={props.itemAction}>
                <Text>
                    {props.itemText}
                </Text>
            </Pressable>
            <View style={styles.addressIconContainer}>
                <Pressable onPress={props.deleteAddress}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color={'#b53b36'}
                    />
                </Pressable>
            </View>

        </Pressable>
            :

            <Pressable style={styles.addressContainer}
                       onPress={props.itemAction}
                       active={props.isActive}
            >
                <View style={styles.addressTextContainer}>
                    <Text>
                        {props.itemText}
                    </Text>
                </View>
                <View style={styles.addressIconContainer}>
                    {
                        props.isActive === true ? <Ionicons
                            name={'md-checkmark'}
                            size={30}
                            color={Colors.primary}
                        /> : null
                        ||
                        props.add === true ? <Octicons
                            style={styles.addIcon}
                            name={'plus'}
                            size={20}
                            color={Colors.primary}
                        /> : null
                    }
                </View>
            </Pressable>
    );
};

export default ItemFrame;

const styles = StyleSheet.create({
    addressContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: '#dedede'
    },

    addressTextContainer: {
        width: '70%',
        marginLeft: '5%'
    },

    addressIconContainer: {
        // width: '20%',
        marginLeft: '5%'
    },

});


