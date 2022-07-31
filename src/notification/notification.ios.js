import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { store } from '../store/store';
import * as notificationActions from '../store/actions/notifications'

const showNotification= (title, message) => {
    PushNotificationIOS.presentLocalNotification({
        alertTitle: title,
        alertBody: message,
    })
};


const handleScheduleNotification= (title, message, orderId) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 30);
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString()
    });
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title, message, orderId));
        }, 30000
    );
};

const handleScheduleNotificationReadyOrder= (title, message, orderId) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3600);
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString()
    });
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title, message, orderId));
        }, 3600000
    )
};

const handleCancelNotification= () => {
    PushNotificationIOS.removeAllDeliveredNotifications();
};


export { showNotification, handleCancelNotification, handleScheduleNotification, handleScheduleNotificationReadyOrder };
