import React from 'react';
import Order from '../../models/order';
import {handleScheduleNotification, handleScheduleNotificationReadyOrder} from '../../notification/notification';


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


export const addOrder = (cartItems, totalAmount, selectedAddress, selectedDeliveryMethod, selectedPaymentMethod, status) => {

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
                    status: status
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
                status: status
            }
        })
        handleScheduleNotification('Zamówienie ' + resData.name, 'Dziękujemy za złożenie zamówienia. Jesteśmy w trakcie jego reallizacji. Poinformujemy Cie o następnych krokach.', resData.name);
        handleScheduleNotificationReadyOrder('Zamówienie ' + resData.name, 'Twoje zamowienie zostało skompletowane. Już wkrótce będzie u Ciebie!', resData.name);
    }
}
