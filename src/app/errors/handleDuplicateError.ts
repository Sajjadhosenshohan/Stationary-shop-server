/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interfaces/error';

// Duplicate Error Handler
const handleDuplicateError = (er: any): TGenericErrorResponse => {
  const match = er.message.match(/"([^"]*)"/);
  const ExtractMessage = match && match[1];
  const error: TErrorSources = [
    {
      path: '',
      message: `${ExtractMessage} Already Exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    error,
  };
};

export default handleDuplicateError;
