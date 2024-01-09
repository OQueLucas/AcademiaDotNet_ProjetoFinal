import { Role } from './Role';

export interface Usuario {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: number;
  phoneNumberConfirmed: boolean;
  roles: Role[];
}
