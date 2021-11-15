export const ADD_TO_FAV = 'ADD_TO_FAV';
export const DELETE_FROM_FAV = 'DELETE_FROM_FAV';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const GET_FAVS = 'GET_FAVS';


export const fetchProducts = () => {
    try {
        return async dispatch => {

            const response = await fetch('http://adamgrabarczyk.pl/show/simpleAPI/productJSON.php');

            if (!response.ok) {
                throw new Error('Błąd pobierania')
            }

            const data = await response.json();

            dispatch({type: SET_PRODUCTS, prod: data });
        }
    } catch (e) {
        throw e;
    }
};

export const fetchFavs = () => {
    return async (dispatch,getState) => {
        const user = getState().auth.user;

        try {
            const response = await fetch(
                `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/fav/${user}.json`
            );

            if (!response.ok) {
                throw new Error(error);
            }

            const reply = await response.json();

            const firebaseResponse = reply !== null ? Object.keys(reply) : [];

            dispatch({
                type: GET_FAVS,
                favs: firebaseResponse
            });
        } catch (e) {
            throw e;
        }
    }
}

export const addToFav = productId => {

    return async (dispatch, getState) => {

        const user = getState().auth.user;

        const response = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/fav/${user}/${productId}.json`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId
                })

            });

        if (!response.ok) {
            throw new Error(error);
        }

        dispatch({type: ADD_TO_FAV, pid: productId})
    }

}

export const deleteFromFav = productId => {

    return async (dispatch, getState) => {

        const user = getState().auth.user;

        const response = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/fav/${user}/${productId}.json`
            , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId
                })

            });

        if (!response.ok) {
            throw new Error(error);
        }

        const resData = await response.json();

        dispatch({type: DELETE_FROM_FAV, pid: productId})
    }
}


