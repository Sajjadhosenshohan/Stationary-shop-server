export type TErrorSources = {
  path: string;
  message: string;
}[];
export type TGenericErrorResponse = {
  message: string;
  statusCode: number;
  error: TErrorSources;
};

export type TErrorAs = { path: string | number; message: string };
