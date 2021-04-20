
import {IS_FOCUSED, RESET_INPUT, IS_NOT_FOCUSED, GET_PHRASE} from '../actions/search';


const initialState = {
    searchPhrase: '',
    inputFocus: false
}


export default (state = initialState, action) => {

    switch (action.type) {
        case GET_PHRASE:

            const phrase = action.phr;

            return {
                ...state,
                searchPhrase: phrase
            }

        case IS_FOCUSED:

            return {
                ...state,
                inputFocus: true
            }

        case IS_NOT_FOCUSED:

            return {
                ...state,
                inputFocus: false
            }

        case RESET_INPUT:

            return {
                inputFocus: false,
                searchPhrase: ''
            }

    }

    return state;

};


