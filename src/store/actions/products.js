export const ADD_TO_FAV = 'ADD_TO_FAV';
export const DELETE_FROM_FAV = 'DELETE_FROM_FAV';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
    try {
        return async dispatch => {

            const response = await fetch('http://adamgrabarczyk.pl/show/simpleAPI/productJSON.php');

            if (!response.ok) {
                throw new Error('Błąd pobierania')
            }

            const data = await response.json();
            console.log(data);
            dispatch({type: SET_PRODUCTS, prod: data });
        }
    } catch (e) {
        throw e;
    }
};

export const addToFav = productId => {
    return {type: ADD_TO_FAV, pid: productId}
}

export const deleteFromFav = productId => {
    return {type: DELETE_FROM_FAV, pid: productId}
}


