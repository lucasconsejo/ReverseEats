import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";

export const loginRequest = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
}