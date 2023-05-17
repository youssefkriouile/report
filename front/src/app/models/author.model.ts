import { Sexe } from './sexe.model';

export interface Author {
    firstName: string;
    lastName: string; 
    email: string; 
    birthDate: string;
    sexe: Sexe;
}