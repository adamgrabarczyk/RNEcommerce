export const GET_PHRASE = 'GET_PHRASE';
export const IS_FOCUSED = 'IS_FOCUSED';
export const IS_NOT_FOCUSED = 'IS_NOT_FOCUSED';
export const RESET_INPUT = 'RESET_INPUT';

export const getPhrase = phrase => {
    return {type: GET_PHRASE, phr: phrase}
}

