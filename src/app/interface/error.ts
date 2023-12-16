export type TErrorSoures = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources : TErrorSoures;
}
