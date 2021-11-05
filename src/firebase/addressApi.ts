

const ADDRESS_API_URL = "https://api-adresse.data.gouv.fr/search"

export const searchAddress = async (search: string) => {
    return await fetch(`${ADDRESS_API_URL}/?q=${search}&type=housenumber&limit=4`);
}