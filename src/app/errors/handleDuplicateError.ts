/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSoures, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (err: any) : TGenericErrorResponse=> {

    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorSources : TErrorSoures = [{
        path: '',
        message: `${extractedMessage} is Alredy Exists!`
    }];

    const statusCode = 400;
    return {
      statusCode,
      message: extractedMessage,
      errorSources,
    };
}

export default handleDuplicateError;