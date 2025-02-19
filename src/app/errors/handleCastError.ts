import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

// handle cast Error 
const handleCastError = (
  er: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: TErrorSources = [
    {
      path: String(er?.path),
      message: er?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    error,
  };
};

export default handleCastError;
