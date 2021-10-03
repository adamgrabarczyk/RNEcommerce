
export const ADD_ORDER = 'ADD_ORDER';


export const addOrder = (cartItems, totalAmount) => {

    return async dispatch => {

        const date = new Date();
            const response = await fetch(
                'https://rnecommerce-3bc8a-default-rtdb.europe-west1.firebasedatabase.app/orders/sampleUser.json'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    data: date.toISOString()
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
                date: date
            }
        })
    }
}
