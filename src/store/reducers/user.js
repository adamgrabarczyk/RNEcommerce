import {UPDATE_PERSONAL_DATA} from "../actions/user";

const initialState = {
    userData: []
}

export default (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_PERSONAL_DATA:

            return {
                ...state
            }
    }

    return state
}
