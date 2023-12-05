import { Centre } from "./Centre"

export interface Admin{
    id?: number,
    email: string,
    password: string,
    centre: Centre;
}