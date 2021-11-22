import { Food, Order } from "../types/global.types";
import { API_URL } from "./firebaseConfig";

export const postOrder = async (order: Order) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: order.id,
            userID: order.userID,
            foods: order.foods,
            restaurantID: order.restaurantID,
            restaurantName: order.restaurantName,
            status: order.status,
            orderDate: order.orderDate,
            total: order.total,
        })
    };
    return await fetch(`${API_URL}/orders`, requestOptions);
}

export const getOrders = async (id: string) => {
    return await fetch(`${API_URL}/orders?userId=${id}`);
}

export const getOrder = async (id: string) => {
    return await fetch(`${API_URL}/orders?orderId=${id}`);
}