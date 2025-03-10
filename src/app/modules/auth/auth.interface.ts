/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ACCESS_ROLE } from './auth.constant';


export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  imageUrl: string;
  isBlocked: boolean;
  city?: string;
  presentAddress?: string;
  phone?: string;
};
export interface UserModel extends Model<TRegisterUser> {
  isUserExistsEmail(email: string): Promise<TRegisterUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ACCESS_ROLE;
