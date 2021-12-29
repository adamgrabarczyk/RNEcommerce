import {View, TextInput, StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../../constans/Colors';


const UserDataInput = (props) => {


    return (
        <View>
            <View>
                <Text style={styles.inputName}>{props.inputName}</Text>
                <TextInput
                style={styles.inputChange}
                placeholder={props.inputPalceholder}
                textContentType={props.textContentType}
                keyboardType={props.keyboardType}
                value={props.inputValue}
                onChangeText={props.inputChangeText}
                />
            </View>
        </View>
    );
}

export default UserDataInput;


const styles = StyleSheet.create({

    inputChange: {
        width: '90%',
        height: 40,
        borderColor: Colors.primary,
        color: '#403e3e',
        borderWidth: 1,
        alignItems: 'center',
        margin: 20,
        marginTop: 2,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 5
    },
    inputName: {
        marginLeft: 20,
        marginTop: 30,
        fontSize: 15
    }

});

