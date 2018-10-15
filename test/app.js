const http = require('http'),
    querystring = require('querystring'),
    VALID_URL = '/foo/fighters',
    STRING_ERROR_URL = '/string/error',
    OBJECT_ERROR_URL = '/object/error',
    CUSTOM_ERROR_NAME = 'CustomError';

const server = http.createServer((req, res) => {
    const [path, reqQuerystring] = req.url.split('?')
    req.path = path;
    req.query = querystring.parse(reqQuerystring);
    req.body = new Buffer('');
    req.on('data', (data) => {
        let auxBuffer = new Buffer(data, 'utf8')
        req.body = Buffer.concat([req.body, auxBuffer])
    }).on('end', () => {

        if (req.path === VALID_URL) {
            req.body = req.body.length > 0 ? JSON.parse(req.body.toString()) : {};
            res.writeHead(200);
            res.end(JSON.stringify({
                status: 200,
                reqPath: req.path,
                reqMethod: req.method,
                reqQueryString: req.query,
                reqBody: req.body,
            }));
        } else if (req.path === STRING_ERROR_URL) {
            res.writeHead(400);
            res.end('This is a string error!');
        } else if (req.path === OBJECT_ERROR_URL) {
            res.writeHead(400);
            res.end(JSON.stringify({
                status: 400,
                name: CUSTOM_ERROR_NAME,
            }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({
                status: 404,
                message: 'Resource not found!.'
            }))
        }

    })


})

module.exports = {
    server,
    VALID_URL,
    STRING_ERROR_URL,
    OBJECT_ERROR_URL,
    CUSTOM_ERROR_NAME
};