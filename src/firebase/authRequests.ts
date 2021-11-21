import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "@firebase/auth";
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

export const patchUserNotifToken = async (id: string, token: string|undefined) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            notifToken: token
        })
    };
    return await fetch(`${API_URL}/users?id=${id}`, requestOptions);
}

export const patchUserAvatar = async (id: string, avatar: string | undefined) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            avatar: avatar
        })
    };
    return await fetch(`${API_URL}/users?id=${id}`, requestOptions);
}

export const resetPassword = (email: string) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
}