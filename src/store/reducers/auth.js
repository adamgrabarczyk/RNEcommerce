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
    GET_NAME, GET_SURNAME, GET_PHONE,
} from '../actions/auth';

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
    email: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                token: action.token,
                user: action.user,
                email: action.email,
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

    }

    return state;
};
