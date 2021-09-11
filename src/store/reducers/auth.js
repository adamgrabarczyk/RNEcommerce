import {LOGIN, LOGOUT} from '../actions/auth';

const initialState = {
    token: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:

            return {
                ...state,
                token: 'log'
            }

        case LOGOUT:

            return {
                ...state,
                token: ''
            }

    }

    return state;
};
