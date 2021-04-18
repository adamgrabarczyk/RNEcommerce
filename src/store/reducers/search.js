
import {GET_PHRASE} from '../actions/search';


const initialState = {
    searchPhrase: ''
}


export default (state = initialState, action) => {

    switch (action.type) {
        case GET_PHRASE:

            const phrase = action.phr;

            return {
                ...state,
                searchPhrase: phrase
            }


    }

    return state;

};


