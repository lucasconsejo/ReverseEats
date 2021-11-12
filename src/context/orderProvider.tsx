import React, { useReducer } from "react";
import { initState, orderReducer } from "../reducers/orderReducer";
import { Order } from "../types/global.types";

const defaultValueType: OrderContextType = {
    orderState: initState,
    orderDispatch: () => null
};

export interface OrderContextType {
    orderState: Order | null;
    orderDispatch: any;
}

export const OrderContext = React.createContext<OrderContextType>(defaultValueType);
const OrderProvider: React.FC = ({ children }) => {
    const [orderState, orderDispatch] = useReducer(orderReducer, initState);

    return (
        <OrderContext.Provider value={{ orderState, orderDispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
export default OrderProvider;
