import { Cart } from "../types/global.types";

export const initState = [];

export const cartReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD_CART":
            return [...state, action.payload];
        case "UPDATE_CART":
            let index = state.findIndex((f: Cart) => f.id == action.payload.id);
            state[index] = action.payload
            return [...state];
        case "REMOVE_CART":
            const newState = state.filter((f:Cart) => f.id !== action.payload);
            return newState;
        case "RESET_CART":
            return [];
    default:
        return initState;
    }
}