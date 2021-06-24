
import {IS_FOCUSED, RESET_INPUT, IS_NOT_FOCUSED, GET_PHRASE, CATEGORY_FILTER} from '../actions/search';


const initialState = {
    searchPhrase: '',
    inputFocus: false,
    activeFilterNames: []
}


export default (state = initialState, action) => {

    switch (action.type) {
        case GET_PHRASE:

            const phrase = action.phr;

           let handleSearchPhraseUpdate;

           const searchPhraseUpdate = state.activeFilterNames.filter(
               phrase => phrase !== 'phrase'
           ).concat(state.searchPhrase === '' ? [] : 'phrase');

            handleSearchPhraseUpdate = searchPhraseUpdate;
              console.log(searchPhraseUpdate);

            return {
                ...state,
                searchPhrase: phrase,
                activeFilterNames: handleSearchPhraseUpdate
            }

        case CATEGORY_FILTER:

            let filterName = action.filterName;

            console.log(filterName);

        return {
            ...state,
            activeFilterNames: []
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


