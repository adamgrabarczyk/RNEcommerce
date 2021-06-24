
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

            const filterName = action.filterName;
            const enabled = action.enabled;

            let handleFilterUpdate;

            const filterUpdate = state.activeFilterNames.filter(
                name => {
                    const selectedFilterNamePrefix = filterName.split('_')[0]
                    const currentFilterNamePrefix = name.split('_')[0]
                    return selectedFilterNamePrefix !== currentFilterNamePrefix
                }
            ).concat(enabled === true ? filterName : []);

            handleFilterUpdate = filterUpdate;

            console.log(filterName);

        return {
            ...state,
            activeFilterNames: handleFilterUpdate
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


