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
            status: order.status,
            orderDate: order.orderDate,
            total: order.total,
        })
    };
    return await fetch(`${API_URL}/orders`, requestOptions);
}