export const ADD_TO_CART = "ADD_TO_CART";
export const CHANGE_QUANTITY_FROM_INPUT = "CHANGE_QUANTITY_FROM_INPUT";
export const INCREASE_QUANTITY_CART_ITEM = "INCREASE_QUANTITY_CART_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_CART = "DELETE_CART";
export const RESET_CART = "RESET_CART";


export const  addToCart = (product, quantity) => {
    return {type: ADD_TO_CART, product: product, quantity: quantity};
};


 export const  removeFromCart = productId => {
     return {type: REMOVE_FROM_CART, pid: productId};
 }

export const  deleteCart = (productId, sum) => {
    return {type: DELETE_CART, pid: productId, sum: sum};
}

 export const increaseCartItem = (product, quantity, productId) => {

     return async dispatch => {

         dispatch({type: INCREASE_QUANTITY_CART_ITEM, product: product, quantity: quantity, pid: productId});
     }
 }


export const changeQtyFromInput = (product, quantity, productId) => {
    return async dispatch => {

        dispatch({type: CHANGE_QUANTITY_FROM_INPUT, product: product, quantity: quantity, pid: productId});
    }
};
