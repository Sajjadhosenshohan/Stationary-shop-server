import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserAccessRole } from '../modules/user/user.interface';


// Create Zod Validate Function
const auth = (...requiredRole: TUserAccessRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // Check Token
    if (!token) {
      throw new AppError(401, 'You are not Unauthorized!');
    }


    // Validate token if available
    jwt.verify(
      token,
      config.JWT_ACCESS_TOKEN as string,
      function (err: any, decoded: any) {
        if (err) {
          throw new AppError(401, 'You are not Unauthorized!');
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRole && !requiredRole.includes(role)) {
          throw new AppError(401, 'You are not Unauthorized!');
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
