import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../../constans/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SettingsChangeResponseMessage = (props) => {


    return (
        <View style={styles.responseMessageContainer}>
            {

                props.responseMessageStatus === true ?
                    <Octicons
                        style={styles.responseMessageIcon}
                        name={'check'}
                        size={25}
                        color={Colors.primary}
                    /> : null
                    ||

                    props.responseMessageStatus === false ?
                    <Ionicons
                        style={styles.responseMessageIcon}
                        name={'close'}
                        size={25}
                        color={'red'}
                    /> : null


            }
            <Text style={props.responseMessageStatus === true ? styles.responseMessageText : styles.responseMessageTextError}>{props.responseMessage}</Text>
        </View>
    );
}

export default SettingsChangeResponseMessage;

const styles = StyleSheet.create({
    responseMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height:20,
        marginTop: Platform.OS === 'ios' ? 5 : 20,
        marginBottom: Platform.OS === 'ios' ? 5 : 20
    },

    responseMessageText: {
        color: 'green',
        textAlign: 'center',
        height: 20,
        marginTop: 8
    },

    responseMessageTextError: {
        color: 'red',
        textAlign: 'center',
        height: 20,
        marginTop: Platform.OS === 'ios' ? 8 : 0
    },

    responseMessageIcon: {
        marginRight: 2
    },
});


