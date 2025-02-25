import jwt from 'jsonwebtoken';
import config from '../../config';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { StatusCodes } from 'http-status-codes';
import { createToken, loginUserEmail } from './auth.utils';
import { UserRegister } from './auth.model';
import AppError from '../../errors/AppError';

const loginUser = async (payload: TLoginUser) => {
  const user = await UserRegister.isUserExistsEmail(payload?.email);
  // console.log("user",user);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated !');
  }

  // checking if the password is correct
  if (
    !(await UserRegister.isPasswordMatched(payload?.password, user?.password))
  )
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not matched');

  //create token and sent to the  client
  const jwtPayload = {
    name: user.name,
    email: user.email,
    role: user.role,
    imageUrl: user.imageUrl,
  };

  // console.log(jwtPayload);

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN as string,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  );

  const decodedAccessToken = jwt.decode(accessToken) as { email: string };
  const emailFromAccessToken = decodedAccessToken?.email;

  loginUserEmail(emailFromAccessToken);

  return {
    accessToken,
    email: payload.email,
  };
};

const registerUser = async (payload: TRegisterUser) => {
  
    // Step 1: Check if user already exists
    const prevUser = await UserRegister.isUserExistsEmail(payload?.email);
    console.log(prevUser)
    if (prevUser) {
      throw new AppError(409, "This user already exists!");
    }

    // Step 2: Create the user
    const user = await UserRegister.create(payload);
    if (!user) {
      throw new AppError(500, "User registration failed!");
    }

    // Step 3: Create JWT payload
    const jwtPayload = {
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl,
    };

    // Step 4: Generate Access Token
    const accessToken = createToken(
      jwtPayload,
      config.JWT_ACCESS_TOKEN as string,
      config.JWT_ACCESS_TOKEN_EXPIRES_IN as string
    );

    return {
      accessToken,
      userInfo: user,
    }
};

export default registerUser;

const getAllUserFromDB = async () => {
  const result = await UserRegister.find();
  return result;
};

const getSingleUserFromDB = async (email:string) => {
  const result = await UserRegister.findOne({email});
  return result;
};
const updateUserInfoFromDB = async (email:string, data:TRegisterUser) => {
  const result = await UserRegister.findOneAndUpdate(
    { email },
    { $set: data }, // Use $set to update only specific fields
    { new: true } // Return the updated document
  );
  return result;
};

const deactivateAccount = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, { isBlocked: true });
  return result;
};
const activeAccountIntoDB = async (id: string) => {
  // console.log(id);
  const result = await UserRegister.findByIdAndUpdate(id, { isBlocked: false });
  return result;
};

const changeRoleFromDB = async (userInfo: { role: string; email: string }) => {
  // console.log('service ', userInfo);

  const result = await UserRegister.findOneAndUpdate(
    { email: userInfo.email },
    { role: userInfo.role },
  );
  return result;
};
export const AuthServices = {
  loginUser,
  registerUser,
  getAllUserFromDB,
  deactivateAccount,
  activeAccountIntoDB,
  changeRoleFromDB,
  getSingleUserFromDB,
  updateUserInfoFromDB
};
