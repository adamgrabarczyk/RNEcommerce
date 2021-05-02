import PRODUCT from '../../data/dummy-data';
import {ADD_TO_FAV, DELETE_FROM_FAV, SET_PRODUCTS}  from '../actions/products';


const initialState = {
    availableProducts: [],
    userProducts: PRODUCT.filter(product => product.ownerId === 'u1'),
    favoriteUserProducts: []
}


export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_FAV:
            let AddNewOrNext;
            const addedProductId = action.pid;

            if (state.favoriteUserProducts.length > 0 && state.favoriteUserProducts.filter(product => product)) {

                const newProduct = state.availableProducts.find(product => product.id === addedProductId);
                console.log(state.favoriteUserProducts);
                AddNewOrNext = state.favoriteUserProducts.concat(newProduct);

            }else  {


                AddNewOrNext = state.availableProducts.filter(product => product.id === addedProductId);

                }

                return {
                    ...state,
                    favoriteUserProducts: AddNewOrNext
                }


        case DELETE_FROM_FAV:
            const selectedProductId = action.pid;

            const updatedFav = state.favoriteUserProducts.filter(product => product.id !== selectedProductId);

            return {
                ...state,
                favoriteUserProducts: updatedFav
            }
        case SET_PRODUCTS:

        return{
            ...state,
            availableProducts: action.prod
        }

    }

    return state;

};

