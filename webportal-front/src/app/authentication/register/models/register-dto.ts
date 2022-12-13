import { RoleEnum } from './../../models/role-enum';
export interface RegisterDTO {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    repeatedPassword: string;
    email:string;
    role:RoleEnum;
  }