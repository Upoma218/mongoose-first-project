import { ZodError, ZodIssue } from 'zod';
import { TErrorSoures, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError) : TGenericErrorResponse => {
  const errorSources: TErrorSoures = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error!',
    errorSources,
  };
};

export default handleZodError;
