import {UPDATE_PERSONAL_DATA, CLEAR_RESPONSE_MESSAGE} from "../actions/user";

const initialState = {
    userData: [],
    responseMessage: ''
}

export default (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_PERSONAL_DATA:

            return {
                ...state,
                responseMessage: [true, 'Twoje dane zostały uaktualnione']
            }

        case CLEAR_RESPONSE_MESSAGE:

            return {
                ...state,
                responseMessage: ''
            }
    }

    return state
}
