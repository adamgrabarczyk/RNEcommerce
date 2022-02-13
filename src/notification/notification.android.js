import PushNotification from "react-native-push-notification";

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


const handleScheduleNotification= (title, message) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message: message,
        date: new Date(Date.now() + 5 * 1000),
        channelId: "your-channel-id"
    })
};

const handleCancelNotification= () => {
    PushNotification.cancelAllLocalNotifications();
};


export { showNotification, handleCancelNotification, handleScheduleNotification };
