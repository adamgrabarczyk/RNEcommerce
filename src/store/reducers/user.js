import {
    UPDATE_PERSONAL_DATA,
    CLEAR_RESPONSE_MESSAGE,
    WARRINING_RESPONSE_MESSAGE,
    UPDATE_EMAIL,
    LOADER,
    UPDATE_PASSWORD,
} from '../actions/user';

const initialState = {
    userData: [],
    responseMessage: {
        message: '',
        status: '',
        code: ''
    },
    loader: null
}

export default (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_PERSONAL_DATA:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case WARRINING_RESPONSE_MESSAGE:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case CLEAR_RESPONSE_MESSAGE:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case UPDATE_EMAIL:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }
        case UPDATE_PASSWORD:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case LOADER:

            return {
                ...state,
                loader: action.loader
            }
    }

    return state
}
