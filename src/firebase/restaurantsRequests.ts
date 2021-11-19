import { API_URL } from "./firebaseConfig";

export const getRestaurants = async (category: string, page: number, limit: number) => {
    return await fetch(`${API_URL}/restaurants?category=${category}&page=${page}&limit=${limit}`);
}