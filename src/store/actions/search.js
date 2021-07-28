export const GET_PHRASE = 'GET_PHRASE';
export const IS_FOCUSED = 'IS_FOCUSED';
export const IS_NOT_FOCUSED = 'IS_NOT_FOCUSED';
export const RESET_INPUT = 'RESET_INPUT';
export const CATEGORY_FILTER = 'CATEGORY_FILTER';
export const SUBCATEGORY_FILTER = 'SUBCATEGORY_FILTER';
export const RESET_SUBCATEGORY = 'RESET_SUBCATEGORY';
export const RESET_FILTERS = 'RESET_FILTERS';

export const getPhrase = phrase => {
    return {type: GET_PHRASE, phr: phrase}
}


export const categoryFilter = (filterName, enabled, filterLabel) => {

    return {type: CATEGORY_FILTER, filterName: filterName, enabled: enabled, filterLabel: filterLabel}

}

export const subcategoryFilter = (filterName, enabled, filterLabel) => {

    return {type: SUBCATEGORY_FILTER, filterName: filterName, enabled: enabled, filterLabel: filterLabel}

}
