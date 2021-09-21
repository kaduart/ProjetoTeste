import { Role } from './role';
export interface User {
    id: number;
    login: string,
    password: string,
    email: string,
    name: string;
    cpf: string;
    addressCep: string;
    addressStreet: string;
    addressNumber: number;
    addressComplement:string;
    addressNeighborhood: string;
    addressCity: string;
    addressUf: string;
    role: Role,
    token: string;
}
