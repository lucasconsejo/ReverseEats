import React, { useReducer } from "react"
import { initState, userReducer } from "../reducers/userReducer"
import { User } from "../types/global.types"

export const defaultValueType: UserContextType = {
    userState: initState,
    userDispatch: () => null
}

export interface UserContextType {
    userState: User | null,
    userDispatch: any
}

export const UserContext = React.createContext<UserContextType>(defaultValueType);

const UserProvider: React.FC = ({ children }) => {
    const [userState, userDispatch] = useReducer(userReducer, initState);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;
