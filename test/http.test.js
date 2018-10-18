const chai = require('chai'),
    chaiHttp = require('chai-http'),
    httpRequests = require('../index'),
    querystring = require('querystring'),
    HttpBadRequestException = require('../exceptions/HttpBadRequestException'),
    {
        server,
        VALID_URL,
        CUSTOM_ERROR_NAME,
        OBJECT_ERROR_URL,
        STRING_ERROR_URL
    } = require('./app'),
    PORT = 8080,
    HOST = 'localhost',
    QUERYSTRING = 'awesome=true',
    NOT_FOUND_URL = '/bar/hello/world',
    BODY = {
        'foo': 'fighters',
        'is': 'an',
        'awesome': 'band'
    },
    {
        DELETE,
        GET,
        OPTIONS,
        PATCH,
        POST,
        PUT,
        TRACE
    } = require('../methods');

chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Http request promise simple', () => {

    before(async function () {
        server.listen(PORT);
    })

    after(async function () {
        server.close();
    })

    describe(`Error Handling`, () => {
        it('it should handle 404 errors', async function () {
            let res;
            try {
                res = await httpRequests.get({
                    hostname: HOST,
                    path: `${NOT_FOUND_URL}?${QUERYSTRING}`,
                    port: PORT,
                });
            } catch (error) {
                res = error;
            }
            res.should.have.status(404);
            res.should.be.an.instanceof(Object);
        });

        it('it should handle custom errors passed as strings', async function () {
            let res;
            try {
                res = await httpRequests.get({
                    hostname: HOST,
                    path: `${STRING_ERROR_URL}`,
                    port: PORT,
                });
            } catch (error) {
                res = error;
            }
            res.should.have.status(400);
            res.should.be.an.instanceof(HttpBadRequestException);
            res.name.should.be.eql(new HttpBadRequestException('', '').name);
        });

        it('it should handle custom errors passed as objects', async function () {
            let res;
            try {
                res = await httpRequests.get({
                    hostname: HOST,
                    path: `${OBJECT_ERROR_URL}?${QUERYSTRING}`,
                    port: PORT,
                });
            } catch (error) {
                res = error;
            }
            res.should.have.status(400);
            res.should.be.an.instanceof(Object);
            res.name.should.be.eql(CUSTOM_ERROR_NAME);
        });


    });

    describe(`GET Requests`, () => {
        it('it should make a GET request successfully', async function () {
            const res = await httpRequests.get({
                hostname: HOST,
                path: `${VALID_URL}?${QUERYSTRING}`,
                port: PORT,
            });
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
            res.reqMethod.should.be.eql(GET);
            res.reqBody.should.be.eql({});
        });

    });

    describe(`HEAD Requests`, () => {
        it('it should make a HEAD request successfully', async function () {
            const res = await httpRequests.head({
                hostname: HOST,
                path: `${VALID_URL}?${QUERYSTRING}`,
                port: PORT,
            });
            res.should.be.an.instanceof(Object);
            res.should.be.eql({
                status: res.statusCode,
                statusCode: res.statusCode
            });
        });

    });

    describe(`OPTIONS Requests`, () => {
        it('it should make a OPTIONS request successfully', async function () {
            const res = await httpRequests.options({
                hostname: HOST,
                path: `${VALID_URL}?${QUERYSTRING}`,
                port: PORT,
            });
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
            res.reqMethod.should.be.eql(OPTIONS);
            res.reqBody.should.be.eql({});
        });

    });

    describe(`TRACE Requests`, () => {
        it('it should make a TRACE request successfully', async function () {
            const res = await httpRequests.trace({
                hostname: HOST,
                path: `${VALID_URL}?${QUERYSTRING}`,
                port: PORT,
            });
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql(querystring.parse(QUERYSTRING));
            res.reqMethod.should.be.eql(TRACE);
            res.reqBody.should.be.eql({});
        });

    });

    describe(`Data parsing for Requests`, () => {

        it('it should make a POST request successfully with data being an object', async function () {
            const res = await httpRequests.post({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            }, BODY);
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(POST);
            res.reqBody.should.be.eql(BODY);
        });

        it('it should make a POST request successfully with data being a string', async function () {
            const res = await httpRequests.post({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            }, JSON.stringify(BODY));
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(POST);
            res.reqBody.should.be.eql(BODY);
        });

    });

    describe(`POST Requests`, () => {
        it('it should make a POST request successfully', async function () {
            const res = await httpRequests.post({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            }, BODY);
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(POST);
            res.reqBody.should.be.eql(BODY);
        });
    });

    describe(`PATCH Requests`, () => {
        it('it should make a PATCH request successfully', async function () {
            const res = await httpRequests.patch({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            }, BODY);
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(PATCH);
            res.reqBody.should.be.eql(BODY);
        });
    });

    describe(`PUT Requests`, () => {
        it('it should make a PUT request successfully', async function () {
            const res = await httpRequests.put({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            }, BODY);
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(PUT);
            res.reqBody.should.be.eql(BODY);
        });
    });

    describe(`DELETE Requests`, () => {
        it('it should make a DELETE request successfully', async function () {
            const res = await httpRequests.deleteRequest({
                hostname: HOST,
                path: `${VALID_URL}`,
                port: PORT,
            });
            res.should.have.status(200);
            res.should.be.an.instanceof(Object);
            res.reqPath.should.be.eql(VALID_URL);
            res.reqQueryString.should.be.eql({});
            res.reqMethod.should.be.eql(DELETE);
            res.reqBody.should.be.eql({});
        });
    });
});