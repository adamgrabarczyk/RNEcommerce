import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemFrame = (props) => {


    return (
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
                {props.isActive === true ? <Ionicons
                    name={'md-checkmark'}
                    size={30}
                    color={Colors.primary}
                /> : null}
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
        width: '20%',
        marginLeft: '5%'
    },

});


