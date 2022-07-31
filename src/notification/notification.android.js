import PushNotification from "react-native-push-notification";
import {store} from '../store/store';
import * as notificationActions from '../store/actions/notifications';

PushNotification.createChannel(
    {
        channelId: "your-channel-id",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: false,
        soundName: "default",
        importance: 4,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

const showNotification= (title, message) => {
    PushNotification.localNotification({
    title: title,
    message: message,
        channelId: "your-channel-id"
    })
};


const handleScheduleNotification= (title, message, orderId) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message: message,
        date: new Date(Date.now() + 30000),
        channelId: "your-channel-id"
    })
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title, message, orderId))
        }, 30000
    )
};

const handleScheduleNotificationReadyOrder= (title, message, orderId) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message: message,
        date: new Date(Date.now() + 3600000),
        channelId: "your-channel-id"
    })
    setTimeout(
        () => {
            store.dispatch(notificationActions.setNotification(title,message, orderId))
        }, 3600000
    )
};

const handleCancelNotification= () => {
    PushNotification.cancelAllLocalNotifications();
};


export { showNotification, handleCancelNotification, handleScheduleNotification, handleScheduleNotificationReadyOrder };
