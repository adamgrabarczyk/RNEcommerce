import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY_FROM_INPUT, INCREASE_QUANTITY_CART_ITEM, DELETE_CART, RESET_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import {ADD_ORDER} from '../actions/orders';
import {LOGIN, RESET_USER_LOG, SIGNUP} from '../actions/auth';

const initialState = {
    items: {},
    totalAmount: 0,
    total: [],
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const addedProductQty = action.quantity;
            const prodPriceString = addedProduct.price;
            const prodPrice = parseFloat(prodPriceString);
            const prodTitle = addedProduct.name;
            const prodId = addedProduct.id;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {

                updatedOrNewCartItem = new CartItem(
                    prodId,
                    state.items[addedProduct.id].quantity + addedProductQty,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice * addedProductQty
                );
            } else {
                updatedOrNewCartItem = new CartItem(prodId, addedProductQty, prodPrice, prodTitle, prodPrice * addedProductQty);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice * addedProductQty
            };

        case CHANGE_QUANTITY_FROM_INPUT:
            const selectCartItem = state.items[action.pid];
            const currentItemQty = selectCartItem.quantity;
            const currentCartAmount = currentItemQty * selectCartItem.productPrice;

            const qtyFromInput = action.quantity;

            let resetAmount;
            let updatedAmount;
            let updateFromInput;

            if (qtyFromInput !== currentItemQty && isNaN(qtyFromInput) == false ) {
                const updatedCartItem = new CartItem(
                    selectCartItem,
                    qtyFromInput,
                    selectCartItem.productPrice,
                    selectCartItem.productTitle,
                    qtyFromInput * selectCartItem.productPrice
                );
                updateFromInput = { ...state.items, [action.pid]: updatedCartItem };
                resetAmount = state.totalAmount - currentCartAmount;
                updatedAmount = resetAmount + (selectCartItem.productPrice * qtyFromInput);

            }

            return {
                ...state,
                items: updateFromInput,
                totalAmount: updatedAmount
            }

        case INCREASE_QUANTITY_CART_ITEM:
            const selCartItem = state.items[action.pid];
            const currentQtyItem = selCartItem.quantity;

            const selectedProd = action.product;

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

        case LOGIN:
            const userId = action.user
            return {
                ...state,
                user: userId
            }

        case RESET_CART: {
            return initialState
        }

        case RESET_USER_LOG: {
            return initialState
        }


        case SIGNUP: {
            return initialState
        }
    }

    return state;
};
