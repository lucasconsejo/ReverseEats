export const initState = null;

export const orderReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD_ORDER":
            // Appel API recup commandes
            return action.payload;
        case "REMOVE_ORDER":
            // Appel API recup commandes
            return null
    
    default:
        return initState;
    }
}