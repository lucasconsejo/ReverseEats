import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { API_URL } from "./firebaseConfig";

export const loginRequest = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

export const getUser = async (id: string) => {
    return await fetch(`${API_URL}/users?id=${id}`);
}