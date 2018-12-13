interface HttpError extends Error {
  status: number;
  statusCode: number;
  error?: any;
  [key: string]: any;
}

export default HttpError;
