import { View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import * as notificationActions from '../../store/actions/notifications'
import {useDispatch, useSelector} from 'react-redux';


const NotificationsPermission = () => {
    const notifications = useSelector(state => state.notifications.notifications);

    useEffect(() => {
        const newNotifications = notifications.find(item => item.status === 'unread');

        let array = [];

        array.push(newNotifications);
    }, []);


    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <View style={styles.noOrdersTextContainer}>
                <Text style={styles.noNotificationText}>powiadomienia</Text>
            </View>

            <View>
                {
                    notifications.sort((a,b) => {
                        return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0)
                    }).map(
                        notification =>
                            <View key={notification.date}>
                                <Text style={notification.status === 'unread' ? styles.unreadTitle : styles.title} onPress={notification.status === 'unread' ? () => dispatch(notificationActions.readNotification(notification.title, notification.message, notification.date, notification.id)) : null}>{notification.title}</Text>
                                <Text>{notification.message}</Text>
                            </View>
                    )
                }
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

    },

    title: {

    },

    unreadTitle: {
        fontWeight: "800"
    }
});


