import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {showNotification, handleCancelNotification, handleShudleNotification} from '../../notification/notification.android';



const NotificationsPermission = () => {


    return (
        <View style={styles.container}>
            <View style={styles.noOrdersTextContainer}>
                <Text style={styles.noNotificationText}>powiadomienia</Text>
                <TouchableOpacity
                onPress={() => showNotification('hallo', 'lorem impsum')}
                >
                    <Text>notyfikacja</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleShudleNotification('hallo', 'lorem ipsum')}
                >
                    <Text>notyfikacja po succes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleCancelNotification}
                >
                    <Text>notyfikacja anuluj</Text>
                </TouchableOpacity>
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


