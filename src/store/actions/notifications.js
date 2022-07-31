import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';


export const _getUserNotifications = () => {

    return async (dispatch) => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;

        database()
            .ref('/notifications/' + id)
            .on('value', snapshot => {
                const data = snapshot.val();

                if (data !== null) {

                    console.log(data);

                    const ids = Object.keys(data);
                    let userNotification = [];

                    ids.forEach((key) => {
                        let obj = data[key];
                        obj.id = key;

                        userNotification.push(obj)
                    });
                    dispatch({type: GET_NOTIFICATION, notification: userNotification});
                }
            })
    }
}

export const setNotification = (title, message, orderId) => {

    return async dispatch => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;

        const date = new Date().toISOString();

        database()
            .ref('/notifications/' + id).push()
            .set({
                title: title,
                message: message,
                status: 'unread',
                date: date,
                order: orderId
            })
            .then(() => {

                database()
                    .ref('/notifications/' + id)
                    .on('value', snapshot => {
                        const data = snapshot.val();

                        if (data !== null) {

                            console.log(data);

                            const ids = Object.keys(data);
                            let userNotification = [];

                            ids.forEach((key) => {
                                let obj = data[key];
                                obj.id = key;
                                userNotification.push(obj)
                            });

                            dispatch({type: SET_NOTIFICATION, notification: userNotification});
                        }
                    })
            });


    }
};

export const readNotification = (title, message, date, id, orderId) => {
    return async dispatch => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const userId = parseAuthData.user;
        console.log('READ');

        database()
            .ref('/notifications/' + userId + '/' + id)
            .update({
                title: title,
                message: message,
                status: 'read',
                date: date,
                order: orderId
            })
            .then(() => {
                dispatch({type: READ_NOTIFICATION, notification: date })
            });



    }
}
