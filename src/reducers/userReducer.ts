import { clearCacheUser, setCacheUser } from "../cache/user";

export const initState = null;

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
    case "ADD_USER":
        setCacheUser(action.payload);
        return action.payload;
    case "UPDATE_USER_ADDRESS": 
        setCacheUser({ 
            ...state, 
            address: action.payload.address,
            lat: action.payload.lat,
            long: action.payload.long
        });
        return { 
            ...state, 
            address: action.payload.address,
            lat: action.payload.lat,
            long: action.payload.long
        };
    case "UPDATE_USER_AVATAR": 
        setCacheUser({ 
            ...state, 
            avatar: action.payload
        });
        return { 
            ...state,
            avatar: action.payload
        };
    case "REMOVE_USER":
        clearCacheUser();
        return null;
    default:
        return initState;
    }
}
