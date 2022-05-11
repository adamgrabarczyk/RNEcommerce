import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GET_USER_PERMISSIONS = 'GET_USER_PERMISSIONS';
export const SET_PERMISSIONS = 'SET_PERMISSIONS';
export const CHANGE_PERMISSIONS = 'CHANGE_PERMISSIONS';


export const _getUserPermissions = () => {

    return async (dispatch) => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;

        database()
            .ref('/permissions/' + id)
            .on('value', snapshot => {
                const data = snapshot.val();

                if (data !== null) {

                    console.log(data);

                    const key = Object.keys(data);
                    const k = key[0];

                    console.log(key)
                    console.log(k)

                    const ids = Object.keys(data[k]);

                    console.log(ids);

                    let emailPermission = [];
                    let pushPermission = [];

                    key.forEach((key) => {
                        const values = Object.values(data[key]);
                        const valuesEmail = Object.values(values[0]);
                        const valuesPush = Object.values(values[1]);

                        console.log(values);
                        console.log('bla');
                        console.log(values[0]);
                        console.log('le');
                        console.log(values[1]);
                        console.log('kmin');
                        console.log(valuesEmail);

                        emailPermission = valuesEmail;

                        pushPermission = valuesPush;

                        console.log('kiwi');
                        console.log(emailPermission);


                    });
                    dispatch({type: GET_USER_PERMISSIONS, emailPermission: emailPermission, pushPermission: pushPermission, key: k});
                }
            })
    }
}

export const _setPermission = (title, status) => {

    return async dispatch => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const id = parseAuthData.user;

        console.log('log from action creator ' + status);

        database()
            .ref('/permissions/' + id).push()
            .set({
                emailPermission: {
                    orderStatus: {
                        title: 'orderStatus',
                        status: true
                    },
                    news: {
                        title: 'news',
                        status: true
                    },
                    promotion: {
                        title: 'promotion',
                        status: true
                    },
                    changes: {
                        title: 'changes',
                        status: true
                    },
                },
                pushPermission: {
                    blah: 'blah'
                }
            })
            .then(() => {

                database()
                    .ref('/permissions/' + id)
                    .on('value', snapshot => {
                        const data = snapshot.val();

                        if (data !== null) {

                            console.log(data);

                            const ids = Object.keys(data);
                            let userPermissions = [];

                            ids.forEach((key) => {
                                const values = Object.values(data[key]);
                                userPermissions.push({
                                    'id': key,
                                    'title': values[1],
                                    'status': values[0],
                                })
                            });

                            dispatch({type: SET_PERMISSIONS, permission: userPermissions});
                        }
                    })
            });

    }
};

export const _changePermission = (title, status, category, key, permission) => {
    return async dispatch => {
        const authData = await AsyncStorage.getItem('authData');
        const parseAuthData = JSON.parse(authData);
        const userId = parseAuthData.user;
        console.log('change');

        database()
            .ref('/permissions/' + userId + '/' + key + '/' + category + '/' + permission)
            .update({
                title: title,
                status: status
            })
            .then(() => {
                dispatch({type: CHANGE_PERMISSIONS})
            });



    }
}
