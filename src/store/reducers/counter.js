
import {DECREASE_COUNTER, INCREASE_COUNTER, RESET_COUNTER} from "../actions/counter";

const initialState = {
    counter: 0
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case INCREASE_COUNTER: return{counter: state.counter + 1}
        case DECREASE_COUNTER: return{counter: state.counter - 1}
        case RESET_COUNTER: return{counter: state.counter = 0}
    }

    return state
}
