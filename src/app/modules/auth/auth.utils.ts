import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: any,
) => {
  const result = jwt.sign(jwtPayload, secret, {expiresIn});
  return result;
};
export let currentUserEmail: string | null = null;

export const loginUserEmail = (email: string) => {
  currentUserEmail = email;
};
