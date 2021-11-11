import React, { useReducer } from "react"
import { initState, dateReducer } from "../reducers/dateReducer"

const defaultValueType: DateContextType = {
    dateState: initState,
    dateDispatch: () => null
}

export interface DateContextType {
    dateState: { date: any, dateFormat: string},
    dateDispatch: any
}

export const DateContext = React.createContext<DateContextType>(defaultValueType);

const DateProvider: React.FC = ({ children }) => {
    const [dateState, dateDispatch] = useReducer(dateReducer, initState);

    return (
        <DateContext.Provider value={{ dateState, dateDispatch }}>
            { children }
        </DateContext.Provider>
    );
}

export default DateProvider;
