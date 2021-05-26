import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY_FROM_INPUT, INCREASE_QUANTITY_CART_ITEM, DELETE_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import {ADD_ORDER} from '../actions/orders';

const initialState = {
    items: {},
    totalAmount: 0,
    total: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPriceString = addedProduct.price;
            const prodPrice = parseInt(prodPriceString, 10);
            const prodTitle = addedProduct.name;
            const prodId = addedProduct.id;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {

                updatedOrNewCartItem = new CartItem(
                    prodId,
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(prodId, 1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };

        case CHANGE_QUANTITY_FROM_INPUT:
            const selectCartItem = state.items[action.pid];
            const currentItemQty = selectCartItem.quantity;

            const selectedProduct = action.product;
            const selectedProductId = selectedProduct.id;
            const qtyFromInput = action.quantity;

            let updateFromInput;

            if (qtyFromInput !== currentItemQty) {
                const updatedCartItem = new CartItem(
                    selectCartItem,
                    qtyFromInput,
                    selectCartItem.productPrice,
                    selectCartItem.productTitle,
                    qtyFromInput * selectCartItem.productPrice
                );
                updateFromInput = { ...state.items, [action.pid]: updatedCartItem };
            }

            return {
                ...state,
                items: updateFromInput,
                totalAmount: state.totalAmount + (selectCartItem.productPrice * qtyFromInput)
            }

        case INCREASE_QUANTITY_CART_ITEM:
            const selCartItem = state.items[action.pid];
            const currentQtyItem = selCartItem.quantity;

            const selectedProd = action.product;
            const selectedProdId = selectedProd.id;
            const qtyCartItem = action.quantity;

            let increaseCartItem;

            if (state.items[selectedProd.id]) {
                const updatedCartItem = new CartItem(
                    selCartItem,
                    parseInt(currentQtyItem, 10) + 1,
                    selCartItem.productPrice,
                    selCartItem.productTitle,
                    state.items[selectedProd.id].sum + selCartItem.productPrice
                );
                increaseCartItem = { ...state.items, [action.pid]: updatedCartItem };
            }

            return {
                ...state,
                items: increaseCartItem,
                totalAmount: state.totalAmount + selCartItem.productPrice

            }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {

                const updatedCartItem = new CartItem(
                    selectedCartItem,
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };

        case DELETE_CART:
            const selectedCart = state.items[action.pid];
            const CartSum = selectedCart.sum;

            let updatedCartItem;
            updatedCartItem = { ...state.items };
            delete updatedCartItem[action.pid];
            return {
                ...state,
                items: updatedCartItem,
                totalAmount: state.totalAmount - CartSum
            };

        case ADD_ORDER:
            return initialState
    }

    return state;
};
