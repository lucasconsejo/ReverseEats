import { API_URL } from "./firebaseConfig";

export const getRestaurants = async () => {
    return await fetch(`${API_URL}/restaurants`);
}