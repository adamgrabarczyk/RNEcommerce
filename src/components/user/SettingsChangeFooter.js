import { View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsChangeFooter = (props) => {


    return (
        <View style={styles.container}>
            <Ionicons
                style={styles.footerIcon}
                name={'information-circle-outline'}
                size={25}
                color={'grey'}
            />
            <Text style={styles.footerText}>{props.footerText}</Text>
        </View>
    );
}

export default SettingsChangeFooter;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 15
    },

    footerIcon: {
        margin: 5
    },

    footerText: {
        marginTop: 8,
        marginLeft: 5,
        color: 'grey',
        margin: 20,
    }
});


