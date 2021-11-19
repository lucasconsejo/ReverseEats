import { API_URL } from "./firebaseConfig";

export const getRestaurants = async (category: string) => {
    return await fetch(`${API_URL}/restaurants?category=${category}`);
}