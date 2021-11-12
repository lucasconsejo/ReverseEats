import { Order } from "../types/global.types";

export const initState = [];

export const orderReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD_ORDER":
            // Appel API recup commandes
            console.log(action.payload);
            return [...state, action.payload];
        case "REMOVE_ORDER":
            // Appel API recup commandes
            const newState = state.filter((f:Order) => f.id !== action.payload);
            return newState;
    
    default:
        return initState;
    }
}