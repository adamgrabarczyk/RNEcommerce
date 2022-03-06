import { View, ScrollView, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import * as notificationActions from '../../store/actions/notifications'
import {useDispatch, useSelector} from 'react-redux';
import CartStepHeader from '../../components/UI/CartStepHeader';
import BoxItem from '../../components/UI/BoxItem';


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
            <CartStepHeader headerText={'Powiadomienia'}/>

            <ScrollView style={styles.notificationList}>
                {
                    notifications.sort((a,b) => {
                        return (a.date < b.date) ? 1 : ((a.date > b.date) ? -1 : 0)
                    }).map(
                        notification =>
                            <BoxItem
                                key={notification.id}
                                notificationTitleStyle={notification.status === 'unread' ? styles.unreadTitle : styles.title}
                                notificationTitle={notification.title}
                                notificationMessage={notification.message}
                            />
                    )
                }
            </ScrollView>
        </View>
    );
}

export default NotificationsPermission;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

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
    },

    notificationList: {
        margin: 10
    }
});


