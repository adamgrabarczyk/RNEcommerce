import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { store } from '../store/store';
import * as notificationActions from '../store/actions/notifications'

const showNotification= (title, message) => {
    PushNotificationIOS.presentLocalNotification({
        alertTitle: title,
        alertBody: message,
    })
};


const handleScheduleNotification= (title, message) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 30);
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString()
    });
    console.log('log after notification');
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title, message));
            console.log('log from settimeout');
        }, 30000
    );
    console.log('log after settimeout');
};

const handleScheduleNotificationReadyOrder= (title, message) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3600000);
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString()
    });
    console.log('log after notification2');
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title, message));
            console.log('log from settimeout');
        }, 3600000
    )
    console.log('log after settimeout2');
};

const handleCancelNotification= () => {
    PushNotificationIOS.removeAllDeliveredNotifications();
};


export { showNotification, handleCancelNotification, handleScheduleNotification, handleScheduleNotificationReadyOrder };
