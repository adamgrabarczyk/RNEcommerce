import {
    LOGIN,
    SIGNUP,
    LOGOUT,
    GET_EMAIL,
    GET_PASSWORD,
    USER_DATA,
    AUTOLOGIN,
    CORRECT,
    UNCORRECT,
    GET_NAME, GET_SURNAME, GET_PHONE,DELETE_AVATAR, SET_USER_AVATAR_TO_STORAGE
} from '../actions/auth';

import {UPDATE_EMAIL, UPDATE_PERSONAL_DATA} from '../actions/user';

const initialState = {
    token: null,
    userName: '',
    userSurname: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
    user: null,
    error: '',
    correctData: null,
    email: null,
    avatar: null,
    avatarPath: null,
    key: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                userName: action.name,
                userSurname: action.surname,
                userPhone: action.phone,
                token: action.token,
                user: action.user,
                email: action.email,
                avatar: action.avatar,
                avatarPath: action.avatarPath,
                key: action.key,
                correctData: true,
            }

        case SIGNUP:

            return {
                ...state,
                token: action.token,
                user: action.user,
                email: action.email,
                correctData: true,
                userName: action.name
            }

        case AUTOLOGIN:

        return {
            ...state,
            token: action.token,
            user: action.user,
            email: action.email,
            userEmail: action.email,
            avatar: action.avatar,
            userName: action.name,
            userSurname: action.surname,
            avatarPath: action.avatarPath,
            key: action.key,
            correctData: true
        }

        case LOGOUT:
            return {
                ...initialState
            }

        case CORRECT:

            return {
                ...state,
                correctData: true
            }

        case UNCORRECT:

            return {
                ...initialState
            }

        case GET_EMAIL:

            const email = action.email;

            return {
                ...state,
                userEmail: email
            }

        case GET_PASSWORD:
            const password = action.password;

            return {
                ...state,
                userPassword: password
            }

        case GET_NAME:
            const name = action.name;

            return {
                ...state,
                userName: name
            }

        case GET_SURNAME:
            const surname = action.surname;

            return {
                ...state,
                userSurname: surname
            }

        case GET_PHONE:
            const phone = action.phone;

            return {
                ...state,
                userPhone: phone
            }

        case USER_DATA:

            const response = action.response;


            return {
                ...state,
                error: response
            }

        case SET_USER_AVATAR_TO_STORAGE:

            const uri = action.uri;
            const imageUri = action.imageUri

                return {
                    ...state,
                    avatar: uri,
                    avatarPath: imageUri
                }

        case DELETE_AVATAR:

            return {
                ...state,
                avatar: null,
                avatarPath: null
            }

        case UPDATE_PERSONAL_DATA:

            return {
                ...state,
                userName: action.name,
                userSurname: action.surname,
                userEmail: action.email,
                userPhone: action.phone
            }

        case UPDATE_EMAIL:

            return {
                ...state,
                userEmail: action.newEmail,
                email: action.newEmail
            }
    }

    return state;
};
