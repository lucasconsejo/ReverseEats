export type LoginFormData =  {
    email: string;
    password: string;
}

export type User = {
    id: string,
    email: string,
    address: string | null,
    city: string | null,
    zipCode: number | null,
    firstName: string,
    lastName: string,
    role: "customer" | "cook"
}