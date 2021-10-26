import {LOGIN, SIGNUP, LOGOUT, GET_EMAIL, GET_PASSWORD, USER_DATA, login, AUTOLOGIN, CORRECT,  UNCORRECT} from '../actions/auth';

const initialState = {
    token: null,
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
                ...state,
                correctData: false
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

        case USER_DATA:

            const mail = action.email;
            const pass = action.password;
            const response = action.response;


            return {
                ...state,
                error: response
            }

    }

    return state;
};
