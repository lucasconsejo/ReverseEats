import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { API_URL } from "./firebaseConfig";

export const loginRequest = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

export const getUser = async (id: string) => {
    return await fetch(`${API_URL}/users?id=${id}`);
}

export const createUser = (email:string, password:string) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password); 
}

export const postUser = async (id: string, firstName:string, lastName:string, email:string, role:string, address:string|null) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            address: address,
        })
    };
    return await fetch(`${API_URL}/users`, requestOptions);
}