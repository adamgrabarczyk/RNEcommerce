import PushNotification from "react-native-push-notification";

PushNotification.createChannel(
    {
        channelId: "your-channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const showNotification= (title, message) => {
    PushNotification.localNotification({
    title: title,
    message: message,
        channelId: "your-channel-id"
    })
};


const handleShudleNotification= (title, message) => {
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


export { showNotification, handleCancelNotification, handleShudleNotification };
