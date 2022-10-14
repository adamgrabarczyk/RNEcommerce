import * as React from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';

const SwitchUI = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.switchText}>{props.switchText}</Text>
            <Switch
                trackColor={{ false: "#4b49bf", true: "#4b49bf" }}
                thumbColor={props.switchCondition ? "#f4f3f4" : "lightgrey"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={props.onValueChange}
                value={props.value}
            />
        </View>
    );
}

export default SwitchUI;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: 350,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black'
    }
});


