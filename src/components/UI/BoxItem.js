import { View, Text, StyleSheet} from 'react-native';
import React from 'react';

const BoxItem = (props) => {

    return (
        <View style={styles.boxItemContainer}>
            <Text style={[props.notificationTitleStyle, styles.notificationTitleSize]}>{props.notificationTitle}</Text>
            <Text style={styles.notificationText}>{props.notificationMessage}</Text>
        </View>
    );
}

export default BoxItem;

const styles = StyleSheet.create({
    boxItemContainer: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10
    },
    notificationTitleSize: {
        fontSize: 18,
        margin: 5
    },

    notificationText: {
        fontSize: 15,
        margin: 5
    }
});


