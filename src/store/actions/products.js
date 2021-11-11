import {ADD_ORDER, GET_ORDERS} from './orders';
import Order from '../../models/order';

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
            console.log(data);
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

            const resData = await response.json();
            const fatchedFavs = [];

            for (const key in resData) {
                fatchedFavs.push(
                        resData[key].productId
                )
            }

            dispatch({
                type: GET_FAVS,
                favs: fatchedFavs
            });
        } catch (e) {
            throw e;
        }
    }
}

export const addToFav = productId => {

    return async (dispatch, getState) => {

        const favouriteProducts = getState().products.favoriteUserProducts;
        const products = getState().products.availableProducts;
        const user = getState().auth.user;
        console.log(favouriteProducts);
        let AddNewOrNext;

        if (favouriteProducts.length > 0 && favouriteProducts.filter(product => product)) {

            const newProduct = favouriteProducts.find(product => product.id === productId);

            AddNewOrNext = favouriteProducts.concat(newProduct);

        }else  {

            AddNewOrNext = products.filter(product => product.id === productId);
        }

        const response = await fetch(
            `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/fav/${user}.json`
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

        const resData = await response.json();
        console.log(resData);

        dispatch({type: ADD_TO_FAV, pid: productId})
    }

}

export const deleteFromFav = productId => {
    return {type: DELETE_FROM_FAV, pid: productId}
}


