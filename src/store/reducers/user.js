import {UPDATE_PERSONAL_DATA, CLEAR_RESPONSE_MESSAGE, WARRINING_RESPONSE_MESSAGE} from '../actions/user';

const initialState = {
    userData: [],
    responseMessage: {
        message: '',
        status: ''
    }
}

export default (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_PERSONAL_DATA:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status
                }
            }

        case WARRINING_RESPONSE_MESSAGE:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status
                }
            }

        case CLEAR_RESPONSE_MESSAGE:

            return {
                ...state,
                responseMessage: {
                    message: action.message,
                    status: action.status
                }
            }
    }

    return state
}
