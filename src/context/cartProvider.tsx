import React, { useReducer } from "react";
import { initState, cartReducer } from "../reducers/cartReducer";
import { Cart } from "../types/global.types";

const defaultValueType: CartContextType = {
    cartState: initState,
    cartDispatch: () => null
};

export interface CartContextType {
    cartState: Array<Cart>;
    cartDispatch: any;
}

export const CartContext = React.createContext<CartContextType>(defaultValueType);
const CartProvider: React.FC = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initState);

    return (
        <CartContext.Provider value={{ cartState, cartDispatch }}>
            {children}
        </CartContext.Provider>
    );
};
export default CartProvider;
