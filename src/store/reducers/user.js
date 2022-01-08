import {
    UPDATE_PERSONAL_DATA,
    CLEAR_RESPONSE_MESSAGE,
    WARRINING_RESPONSE_MESSAGE,
    UPDATE_EMAIL,
    LOADER,
    UPDATE_PASSWORD,
    GET_ADDRESSES, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS,
} from '../actions/user';

const initialState = {
    userData: [],
    responseMessage: {
        message: '',
        status: '',
        code: ''
    },
    addresses: [],
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

        case ADD_ADDRESS:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case UPDATE_ADDRESS:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status,
                    code: action.code
                }
            }

        case DELETE_ADDRESS:

            return {
                ...state,
                addresses: action.addresses
            }

        case GET_ADDRESSES:

            const addresses = action.addresses;

            return {
                ...state,
                addresses: addresses
            }

        case LOADER:

            return {
                ...state,
                loader: action.loader
            }
    }

    return state
}
