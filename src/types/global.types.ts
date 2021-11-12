import { int32ARGBColor } from "react-native-svg"

export type LoginFormData =  {
    email: string,
    password: string
}

export type SignupFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
}
export type SignupAdressFormData = {
    adress: string
}
export type ForgetPasswordFormData = {
    email: string
}

export type User = {
    id: string,
    email: string,
    address: string | null,
    firstName: string,
    lastName: string,
    role: "customer" | "cook"
}

export type Restaurant = {
    id: string,
    name: string,
    cook: string,
    cover: string,
    note: number,
    duration: string,
    category: string
}

export type Order = {
    id: string,
    userID: string,
    plats: Array<{id: string, quantity: number}>,
    restaurantID: string,
    status: string,
    orderDate: string,
    total: number,
}