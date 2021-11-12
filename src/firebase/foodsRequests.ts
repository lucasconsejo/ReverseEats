import { API_URL } from "./firebaseConfig";

export const getFoods = async (ids: Array<string>) => {
    const parseArray = JSON.stringify(ids);
    return await fetch(`${API_URL}/foods?foodIds=${parseArray}`);
}