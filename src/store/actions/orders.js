import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch,getState) => {
        const user = getState().auth.user;

        try {
            const response = await fetch(
                `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/orders/${user}.json`
            );

            if (!response.ok) {
                throw new Error(error);
            }

            const resData = await response.json();
            const fatchedOrders = [];

            for (const key in resData) {
                fatchedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date),
                        resData[key].selectedAddress,
                        resData[key].selectedDeliveryMethod,
                        resData[key].selectedPaymentMethod,
                        resData[key].status

                    )
                )
            }

        dispatch({
            type: GET_ORDERS,
            orders: fatchedOrders
        });
    } catch (e) {
            throw e;
        }
    }
}


export const addOrder = (cartItems, totalAmount, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod) => {

    return async (dispatch, getState) => {

        const user = getState().auth.user;

        const date = new Date();
            const response = await fetch(
                `https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/orders/${user}.json`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString(),
                    selectedAddress,
                    selectedDeliveryMethod,
                    selectedPaymentMethod,
                    status: 'W trakcie przetwarzania'
                })

            });

            if (!response.ok) {
                throw new Error(error);
            }

            const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date,
                address: selectedAddress,
                delivery: selectedDeliveryMethod,
                payment: selectedPaymentMethod,
                status: 'W trakcie przetwarzania'
            }
        })
    }
}
