import { View, Text, StyleSheet} from 'react-native';
import React from 'react';


const SettingsChangeHeader = (props) => {


    return (
        <View style={styles.personalDataHeading}>
            <Text style={styles.personalDataHeadingText}>{props.headerTitle}</Text>
        </View>
    );
}

export default SettingsChangeHeader;

const styles = StyleSheet.create({
    personalDataHeading: {
        alignItems: 'center',
        padding: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.6
    },

    personalDataHeadingText: {
        color: 'grey',
        fontSize: 21,
        fontWeight: 'bold'
    },
});


