import { Response } from 'express';

// Type define For Response
type TResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T | T[] | null;
};
// Success Response Function
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default sendResponse;
