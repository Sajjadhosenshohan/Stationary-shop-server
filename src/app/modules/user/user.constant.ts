import { TUserRole } from "./user.interface";

export const UserRole: TUserRole[] = ['admin' , 'user'];


export const USER_ACCESS_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;