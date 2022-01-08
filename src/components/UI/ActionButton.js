import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';

const ActionButton = (props) => {


    return (
        <TouchableOpacity
            onPress={props.action}
            style={styles.button}
            disabled={props.disabled}
        >
            <Text style={styles.buttonText}>{props.actionName}</Text>
        </TouchableOpacity>
    );
}

export default ActionButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal'
    }
});


