import mongoose from "mongoose";
import { TErrorSoures, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse => {

    const errorSources: TErrorSoures = [{
        path: err?.path,
        message: err?.message
    }]

    const statusCode = 400;
    return {
      statusCode,
      message: `${err.value} is a invalid id`,
      errorSources,
    };
}

export default handleCastError;