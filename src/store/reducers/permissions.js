import {CHANGE_PERMISSIONS, GET_USER_PERMISSIONS, SET_PERMISSIONS} from '../actions/permissions';



const initialState = {
    emailPermissions: [],
    pushNotificationPermissions: [],
    key: ''
    }


export default (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_PERMISSIONS:

            const emailPermission = action.emailPermission;
            const pushPermission = action.pushPermission;
            const key = action.key;


            return {
                ...state,
                emailPermissions: emailPermission,
                pushNotificationPermissions: pushPermission,
                key: key
            }

        case SET_PERMISSIONS:

            const permission = action.permission;

            return {
                ...state,
                emailPermissions: permission,
                pushNotificationPermissions: permission
            }

        case CHANGE_PERMISSIONS:
            console.log('log from change permission reducer');
            return{
                ...state
            }

    }

    return state;

};

