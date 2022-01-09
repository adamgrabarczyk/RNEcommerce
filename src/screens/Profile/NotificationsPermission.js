import { View, Text, StyleSheet} from 'react-native';
import React from 'react';


const NotificationsPermission = () => {


    return (
        <View style={styles.container}>
            <View style={styles.noOrdersTextContainer}>
                <Text style={styles.noNotificationText}>powiadomienia</Text>
            </View>
        </View>
    );
}

export default NotificationsPermission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    noOrdersTextContainer: {
        textAlign: 'center'
    },

    noNotificationText: {

    }
});


