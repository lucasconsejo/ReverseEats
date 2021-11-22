import { API_URL } from "./firebaseConfig";

const ADDRESS_API_URL = "https://api-adresse.data.gouv.fr/search"

export const searchAddress = async (search: string, limit: number) => {
    return await fetch(`${ADDRESS_API_URL}/?q=${search}&type=housenumber&limit=${limit}`);
}

export const updateAddress = async (id: string, address: string, lat: number, long: number) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            address: address,
            lat: lat,
            long: long
        })
    };
    return await fetch(`${API_URL}/users?id=${id}`, requestOptions);
}