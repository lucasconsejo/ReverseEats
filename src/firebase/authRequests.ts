import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

export const loginRequest = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}

export const getUser = async (id: string) => {
    return await fetch(`https://europe-west1-reverse-eats.cloudfunctions.net/users?id=${id}`);
}