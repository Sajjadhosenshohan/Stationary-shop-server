import { TUserRole } from "./auth.interface";

export const UserRole: TUserRole[] = ['admin' , 'user'];


export const USER_ACCESS_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;