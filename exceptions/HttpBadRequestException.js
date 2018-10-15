/**
 * Example Class for demostrating the error handler logic
 *
 * @class HttpBadRequestException
 * @extends {Error}
 */
class HttpBadRequestException extends Error {

    /**
     *Creates an instance of HttpBadRequestException.
     * @param {*} args
     * @memberof HttpBadRequestException
     */
    constructor(url, httpError) {
        if (typeof httpError === 'string') {
            super(httpError);
            this.name = "There has been an error in the http request";
            this.status = 400;
            this.statusCode =  400;
        } else if (httpError.error && typeof httpError.error !== 'string') {
            super(httpError.error.message || "There has been an error in the http request");
            this.name = httpError.error.code || httpError.error.name || "HttpBadRequestException";
            this.status = httpError.error.status || 400;
            this.statusCode = httpError.error.statusCode || 400;
            this.stack = httpError.error.stack;
        } else {
            super(httpError.message || "There has been an error in the http request");
            this.name = httpError.code || httpError.name || "HttpBadRequestException";
            this.status = httpError.status || 400;
            this.statusCode = httpError.statusCode || 400;
            this.stack = httpError.stack;
        }
        this.url = url;
        if (httpError.error) this.httpError = httpError.error;
        if (!httpError.error) this.httpError = httpError;
    }

}

module.exports = HttpBadRequestException;