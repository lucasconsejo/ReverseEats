import { clearCacheUser, setCacheUser } from "../cache/user";

export const initState = null;

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
    case "ADD_USER":
        setCacheUser(action.payload);
        return action.payload;
    case "UPDATE_USER_ADDRESS": 
        setCacheUser({ 
            ...state.user, 
            address: action.payload
        });
        return { 
            ...state.user, 
            address: action.payload
        };
    case "REMOVE_USER":
        clearCacheUser();
        return {
            user: null,
        }
    default:
        return initState;
    }
}
