import * as chai from "chai";
import * as httpRequests from "../src/index";
import * as querystring from "querystring";
import HttpBadRequestException from "../src/exceptions/HttpBadRequestException";
import {
  server,
  VALID_URL,
  CUSTOM_ERROR_NAME,
  OBJECT_ERROR_URL,
  STRING_ERROR_URL
} from "./app";

const PORT = 8080;
const HOST = "localhost";
const QUERYSTRING = "awesome=true";
const NOT_FOUND_URL = "/bar/hello/world";
const BODY = {
  foo: "fighters",
  is: "an",
  awesome: "band"
};
import { DELETE, GET, OPTIONS, PATCH, POST, PUT, TRACE } from "../src/methods";

chai.should();

//Our parent block
describe("Http request promise simple", () => {
  before(async function() {
    server.listen(PORT);
  });

  after(async function() {
    server.close();
  });

  describe(`Error Handling`, () => {
    it("it should handle 404 errors", async function() {
      let res;
      try {
        res = await httpRequests.get({
          hostname: HOST,
          path: `${NOT_FOUND_URL}?${QUERYSTRING}`,
          port: PORT
        });
      } catch (error) {
        res = error;
      }
      res.status.should.be.eql(404);
      res.should.be.an.instanceof(Object);
    });

    it("it should handle custom errors passed as strings", async function() {
      let res;
      try {
        res = await httpRequests.get({
          hostname: HOST,
          path: `${STRING_ERROR_URL}`,
          port: PORT
        });
      } catch (error) {
        res = error;
      }
      res.status.should.be.eql(400);
      res.should.be.an.instanceof(HttpBadRequestException);
      res.name.should.be.eql(new HttpBadRequestException("", "").name);
    });

    it("it should handle custom errors passed as objects", async function() {
      let res;
      try {
        res = await httpRequests.get({
          hostname: HOST,
          path: `${OBJECT_ERROR_URL}?${QUERYSTRING}`,
          port: PORT
        });
      } catch (error) {
        res = error;
      }
      res.status.should.be.eql(400);
      res.should.be.an.instanceof(Object);
      res.name.should.be.eql(CUSTOM_ERROR_NAME);
    });
  });

  describe(`GET Requests`, () => {
    it("it should make a GET request successfully", async function() {
      const res = await httpRequests.get({
        hostname: HOST,
        path: `${VALID_URL}?${QUERYSTRING}`,
        port: PORT
      });
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
      res.reqMethod.should.be.eql(GET);
      res.reqBody.should.be.eql({});
    });
  });

  describe(`HEAD Requests`, () => {
    it("it should make a HEAD request successfully", async function() {
      const res = await httpRequests.head({
        hostname: HOST,
        path: `${VALID_URL}?${QUERYSTRING}`,
        port: PORT
      });
      res.should.be.an.instanceof(Object);
      res.should.be.eql({
        status: res.statusCode,
        statusCode: res.statusCode
      });
    });
  });

  describe(`OPTIONS Requests`, () => {
    it("it should make a OPTIONS request successfully", async function() {
      const res = await httpRequests.options({
        hostname: HOST,
        path: `${VALID_URL}?${QUERYSTRING}`,
        port: PORT
      });
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
      res.reqMethod.should.be.eql(OPTIONS);
      res.reqBody.should.be.eql({});
    });
  });

  describe(`TRACE Requests`, () => {
    it("it should make a TRACE request successfully", async function() {
      const res = await httpRequests.trace({
        hostname: HOST,
        path: `${VALID_URL}?${QUERYSTRING}`,
        port: PORT
      });
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
      res.reqMethod.should.be.eql(TRACE);
      res.reqBody.should.be.eql({});
    });
  });

  describe(`Data parsing for Requests`, () => {
    it("it should make a POST request successfully with data being an object", async function() {
      const res = await httpRequests.post(
        {
          hostname: HOST,
          path: `${VALID_URL}`,
          port: PORT
        },
        BODY
      );
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(POST);
      res.reqBody.should.be.eql(BODY);
    });

    it("it should make a POST request successfully with data being a string", async function() {
      const res = await httpRequests.post(
        {
          hostname: HOST,
          path: `${VALID_URL}`,
          port: PORT
        },
        JSON.stringify(BODY)
      );
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(POST);
      res.reqBody.should.be.eql(BODY);
    });
  });

  describe(`POST Requests`, () => {
    it("it should make a POST request successfully", async function() {
      const res = await httpRequests.post(
        {
          hostname: HOST,
          path: `${VALID_URL}`,
          port: PORT
        },
        BODY
      );
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(POST);
      res.reqBody.should.be.eql(BODY);
    });
  });

  describe(`PATCH Requests`, () => {
    it("it should make a PATCH request successfully", async function() {
      const res = await httpRequests.patch(
        {
          hostname: HOST,
          path: `${VALID_URL}`,
          port: PORT
        },
        BODY
      );
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(PATCH);
      res.reqBody.should.be.eql(BODY);
    });
  });

  describe(`PUT Requests`, () => {
    it("it should make a PUT request successfully", async function() {
      const res = await httpRequests.put(
        {
          hostname: HOST,
          path: `${VALID_URL}`,
          port: PORT
        },
        BODY
      );
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(PUT);
      res.reqBody.should.be.eql(BODY);
    });
  });

  describe(`DELETE Requests`, () => {
    it("it should make a DELETE request successfully", async function() {
      const res = await httpRequests.deleteRequest({
        hostname: HOST,
        path: `${VALID_URL}`,
        port: PORT
      });
      res.status.should.be.eql(200);
      res.should.be.an.instanceof(Object);
      res.reqPath.should.be.eql(VALID_URL);
      res.reqQueryString.should.be.eql({});
      res.reqMethod.should.be.eql(DELETE);
      res.reqBody.should.be.eql({});
    });
  });
});
