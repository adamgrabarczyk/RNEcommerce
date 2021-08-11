
import {
    IS_FOCUSED,
    RESET_INPUT,
    IS_NOT_FOCUSED,
    GET_PHRASE,
    CATEGORY_FILTER,
    SUBCATEGORY_FILTER, RESET_SUBCATEGORY, RESET_FILTERS, PRICE_FILTER,
} from '../actions/search';


const initialState = {
    searchPhrase: '',
    inputFocus: false,
    activeFilterNames: [],
    activeSubCategory: [],
    filteredPrice: 10000
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
            const filterLabel = action.filterLabel;
            const enabled = action.enabled;

            let handleFilterUpdate;

            const filterUpdate = state.activeFilterNames.filter(
                name => {
                    const selectedFilterNamePrefix = filterName.split('_')[0]
                    const currentFilterNamePrefix = name.split('_')[0]
                    return selectedFilterNamePrefix !== currentFilterNamePrefix;
                }
            ).concat(enabled === true ? filterName : []);

            handleFilterUpdate = filterUpdate;

            console.log(filterName);
            console.log(state.activeFilterNames);


        return {
            ...state,
            activeFilterNames: handleFilterUpdate
            }

        case SUBCATEGORY_FILTER:

            const subcategoryName = action.filterName;
            const subcategoryLabel = action.filterLabel;

            const subObj = {name: subcategoryName, label: subcategoryLabel}

            return {
                ...state,
                activeSubCategory: [subObj]
            }

        case PRICE_FILTER:

            const price = action.filterPrice;
            const enabledPrice = action.enabled;

            return {
                ...state,
                filteredPrice: price,
            }

        case RESET_SUBCATEGORY:

            return {
                ...state,
                activeSubCategory: []
            }

        case RESET_FILTERS:

            return {
                ...state,
                activeFilterNames: [],
                activeSubCategory: [],
                filteredPrice: 10000

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
                ...state,
                inputFocus: false,
                searchPhrase: ''
            }

    }

    return state;

};


