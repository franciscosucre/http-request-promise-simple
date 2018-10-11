const HttpRequestException = require('./HttpRequestException'),
    assert = require('assert');

const request = function (options, data) {
    const hostname = options.hostname ? options.hostname : options.host;
    const url = options.port ? hostname + `:${options.port}` + options.path : hostname + options.path;
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = options.https ? require('https') : require('http');
        const req = lib.request(options, (res) => {
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            res.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            res.on('end', () => {
                if (res.statusCode < 200 || res.statusCode > 299) {
                    let errorBody = body.join('');
                    try {
                        return reject(new HttpRequestException(url, JSON.parse(errorBody)));
                    } catch (error) {
                        return reject(new HttpRequestException(url, errorBody));
                    }
                }
                if (body.length == 0) {
                    return resolve({})
                }
                return resolve(JSON.parse(body.join('')))
            });
        });
        req.on('error', (err) => reject(new HttpRequestException(url, err)));
        // handle connection errors of the request
        if (options.method != 'GET' && options.method != 'HEAD') {
            req.write(data);
        }
        req.end();
    })
};

function get(options) {
    options.method = 'GET'
    return request(options);
}

function head(options) {
    options.method = 'HEAD'
    return request(options);
}

function options(options) {
    options.method = 'OPTIONS'
    return request(options);
}

function connect(options) {
    options.method = 'CONNECT'
    return request(options);
}

function trace(options) {
    options.method = 'TRACE'
    return request(options);
}

function post(options, data) {
    options.method = 'POST'
    return request(options, verifyBody(data));
}

function put(options, data) {
    options.method = 'PUT'
    return request(options, verifyBody(data));
}

function patch(options, data) {
    options.method = 'PATCH'
    return request(options, verifyBody(data));
}


function verifyBody(data) {
    assert(data != null && data != '' && !Array.isArray(data), `Invalid body for request "${data}"`);
    if (typeof data === "object") {
        return JSON.stringify(data);
    }
    return data;

}



module.exports = {
    head,
    options,
    connect,
    trace,
    get,
    post,
    put,
    patch,
    request
}