/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ACCESS_ROLE } from './user.constant';

// Role Type
export type TUserRole = 'admin' | 'user';


// user Type
export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  isBlocked: boolean;
}

export interface TUserLogin {
  email: string;
  password: string;
  role: string;
}


export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string | undefined): Promise<TUser>;

  
  isCheckPassword(
    myPlaintextPassword: string,
    hashPass: string,
  ): Promise<boolean>;
}
export type TUserAccessRole = keyof typeof USER_ACCESS_ROLE;
