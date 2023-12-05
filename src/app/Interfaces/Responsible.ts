import { Admin } from "./Admin";
import { Rayon } from "./Rayon";

export interface Responsible{
    id?: number,
    name:string,
    email: string,
    password: string,
    admin: Admin,
    rayon: Rayon
}