import HttpBadRequestException from "./exceptions/HttpBadRequestException";
import HttpNotFoundException from "./exceptions/HttpNotFoundException";
import * as assert from "assert";
import {
  CONNECT,
  DELETE,
  GET,
  HEAD,
  OPTIONS,
  PATCH,
  POST,
  PUT,
  TRACE
} from "./methods";

import { ClientRequestArgs } from "http";

interface RequestOptions extends ClientRequestArgs {
  https?: boolean;
}

export const request = (
  options: RequestOptions,
  data?: string
): Promise<any> => {
  const hostname = options.hostname ? options.hostname : options.host;
  const path = options.path ? options.path : "/";
  const url = options.port
    ? hostname + `:${options.port}` + options.path
    : hostname + path;
  // return new pending promise
  return new Promise<any>(
    (resolve: (value?: any) => void, reject: (reason: any) => void) => {
      // select http or https module, depending on reqested url
      const lib = options.https ? require("https") : require("http");
      const req = lib.request(options, (res: any) => {
        // temporary data holder
        const body: any[] = [];
        // on every content chunk, push it to the data array
        res.on("data", (chunk: Buffer) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        res.on("end", () => {
          if (res.statusCode === 404) {
            return reject(new HttpNotFoundException(url));
          } else if (res.statusCode < 200 || res.statusCode > 299) {
            let errorBody = body.join("");
            try {
              const error = JSON.parse(errorBody);
              error.url = error;
              return reject(error);
            } catch (error) {
              return reject(new HttpBadRequestException(url, errorBody));
            }
          }
          if (body.length == 0) {
            return resolve({
              status: res.statusCode,
              statusCode: res.statusCode
            });
          }
          return resolve(
            Object.assign(
              {
                status: res.statusCode,
                statusCode: res.statusCode
              },
              JSON.parse(body.toString())
            )
          );
        });
      });
      req.on("error", (err: Error) => reject(err));
      // handle connection errors of the request
      if (data) {
        req.write(data);
      }
      req.end();
    }
  );
};

export const get = (options: RequestOptions): Promise<any> => {
  options.method = GET;
  return request(options);
};

export const head = (options: RequestOptions): Promise<any> => {
  options.method = HEAD;
  return request(options);
};

export const options = (options: RequestOptions): Promise<any> => {
  options.method = OPTIONS;
  return request(options);
};

export const connect = (options: RequestOptions): Promise<any> => {
  options.method = CONNECT;
  return request(options);
};

export const trace = (options: RequestOptions): Promise<any> => {
  options.method = TRACE;
  return request(options);
};

export const post = (
  options: RequestOptions,
  data: object | string
): Promise<any> => {
  options.method = POST;
  return request(options, verifyBody(data));
};

export const put = (options: RequestOptions, data: object): Promise<any> => {
  options.method = PUT;
  return request(options, verifyBody(data));
};

export const patch = (options: RequestOptions, data: object): Promise<any> => {
  options.method = PATCH;
  return request(options, verifyBody(data));
};

export const deleteRequest = (options: RequestOptions): Promise<any> => {
  options.method = DELETE;
  return request(options);
};

export const verifyBody = (data: object | string): string => {
  assert(
    data != null && !Array.isArray(data),
    `Invalid body for request "${data}"`
  );
  if (typeof data === "object") {
    return JSON.stringify(data);
  }
  return data;
};

export default {
  head,
  options,
  connect,
  trace,
  get,
  post,
  put,
  patch,
  request,
  deleteRequest
};
