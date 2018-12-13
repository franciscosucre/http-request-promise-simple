import HttpError from "./HttpError";

/**
 * Example Class for demostrating the error handler logic
 *
 * @class HttpNotFoundException
 * @extends {Error}
 */
class HttpNotFoundException extends Error implements HttpError {
  status = 404;
  statusCode = 404;

  /**
   *Creates an instance of HttpNotFoundException.
   * @param {*} args
   * @memberof HttpNotFoundException
   */
  constructor(url: string) {
    super(`The requested resource has not been found on "${url}"`);
    this.status = 404;
    this.statusCode = 404;
    this.name = "HttpNotFoundException";
  }
}

export default HttpNotFoundException;
