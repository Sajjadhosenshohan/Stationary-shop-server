import mongoose from 'mongoose';
import { TErrorSources } from '../interfaces/error';

// Validation Error Handler
const handleValidationError = (er: mongoose.Error.ValidationError) => {
  const error: TErrorSources = Object.values(er.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: String(val.path),
        message: val.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};

export default handleValidationError;
