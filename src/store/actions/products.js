export const ADD_TO_FAV = 'ADD_TO_FAV';
export const DELETE_FROM_FAV = 'DELETE_FROM_FAV';


export const addToFav = productId => {
    return {type: ADD_TO_FAV, pid: productId}
}

export const deleteFromFav = productId => {
    return {type: DELETE_FROM_FAV, pid: productId}
}


